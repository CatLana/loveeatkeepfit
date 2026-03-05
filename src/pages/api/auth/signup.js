/**
 * Sign Up API Endpoint
 * POST /api/auth/signup
 *
 * Security controls:
 *  - Rate limited: 5 signups per 10 minutes per IP
 *  - CSRF origin check
 *  - Input length & complexity validation
 *  - Password minimum 8 characters
 *  - Sends email verification link before granting access
 */

import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { rateLimit } from '@/lib/rateLimit';
import { validateOrigin, validateLengths } from '@/lib/validateRequest';

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.CONTACT_SENDER || 'LoveEatKeepFit <no-reply@loveeatkeepfit.ie>';
const APP_URL = process.env.NEXTAUTH_URL || 'https://www.loveeatkeepfit.ie';

// Password must be ≥ 8 chars, contain a letter and a digit
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── CSRF origin validation ──────────────────────────────────────────────
  if (!validateOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // ── Rate limiting: 5 signups / 10 minutes per IP ───────────────────────
  const { limited } = await rateLimit(req, res, { requests: 5, window: '10 m' });
  if (limited) return;

  try {
    const { name, email, password } = req.body;

    // ── Presence validation ─────────────────────────────────────────────
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // ── Length validation ────────────────────────────────────────────────
    const lengthError = validateLengths(
      { name: name || '', email, password },
      { name: 100, email: 254, password: 128 }
    );
    if (lengthError) {
      return res.status(400).json({ error: lengthError });
    }

    // ── Email format ─────────────────────────────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // ── Password strength ────────────────────────────────────────────────
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters and include at least one letter and one number',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // ── Duplicate email check ────────────────────────────────────────────
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      // Return the same message as "not found" to prevent email enumeration
      return res.status(400).json({
        error: 'If this email is not already registered, you will receive a verification link shortly.',
      });
    }

    // ── Create user (unverified) ─────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name?.trim() || null,
        email: normalizedEmail,
        password: hashedPassword,
        // emailVerified is null — blocks login until verified
      },
    });

    // ── Initialise lesson progress ────────────────────────────────────────
    const allLessons = await prisma.lesson.findMany();
    const defaultUnlockedIds = new Set(
      allLessons.filter(l => l.isDefaultUnlocked || l.order <= 2).map(l => l.id)
    );

    await prisma.lessonProgress.createMany({
      data: allLessons.map(lesson => ({
        id: require('crypto').randomUUID(),
        userId: user.id,
        lessonId: lesson.id,
        status: defaultUnlockedIds.has(lesson.id) ? 'unlocked' : 'locked',
        unlockedAt: defaultUnlockedIds.has(lesson.id) ? new Date() : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      skipDuplicates: true,
    });

    // ── Create email verification token ───────────────────────────────────
    const token = require('crypto').randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.verificationToken.create({
      data: {
        email: normalizedEmail,
        token,
        type: 'email_verification',
        expiresAt,
      },
    });

    // ── Send verification email ───────────────────────────────────────────
    const verifyUrl = `${APP_URL}/api/auth/verify-email?token=${token}`;

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: sender,
        to: normalizedEmail,
        subject: 'Verify your LoveEatKeepFit account',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
            <h2 style="color:#2d5a3d;">Welcome to Love. Eat. Keep Fit.!</h2>
            <p>Hi ${name ? name.trim() : 'there'},</p>
            <p>Thanks for creating your account. Please verify your email address to get started:</p>
            <p style="text-align:center;margin:30px 0;">
              <a href="${verifyUrl}"
                 style="background:#4f46e5;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
                Verify my email
              </a>
            </p>
            <p style="color:#666;font-size:13px;">This link expires in 24 hours. If you did not create an account, you can safely ignore this email.</p>
            <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">
            <p style="color:#999;font-size:12px;text-align:center;">Love. Eat. Keep Fit. &bull; Ashbourne, Co. Meath, Ireland</p>
          </div>
        `,
      });
    } else {
      console.log(`[signup] Verification link for ${normalizedEmail}: ${verifyUrl}`);
    }

    return res.status(201).json({
      message: 'Account created! Please check your email to verify your account before signing in.',
      requiresVerification: true,
    });

  } catch (error) {
    console.error('[signup] Error:', error.message);
    return res.status(500).json({ error: 'An error occurred during signup. Please try again.' });
  }
}
