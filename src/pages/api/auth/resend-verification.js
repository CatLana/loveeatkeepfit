/**
 * Resend Verification Email
 * POST /api/auth/resend-verification
 * Body: { email }
 *
 * Security controls:
 *  - Rate limited: 3 requests / 30 minutes per IP
 *  - Always returns 200 to prevent email enumeration
 */

import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { rateLimit } from '@/lib/rateLimit';
import { validateOrigin } from '@/lib/validateRequest';

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.CONTACT_SENDER || 'LoveEatKeepFit <no-reply@loveeatkeepfit.ie>';
const APP_URL = process.env.NEXTAUTH_URL || 'https://www.loveeatkeepfit.ie';
const GENERIC_OK = { message: 'If that email exists and is unverified, a new link has been sent.' };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!validateOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { limited } = await rateLimit(req, res, { requests: 3, window: '30 m' });
  if (limited) return;

  const { email } = req.body;

  if (!email || typeof email !== 'string' || email.length > 254) {
    return res.status(200).json(GENERIC_OK);
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Silently succeed if user not found or already verified (prevents enumeration)
    if (!user || user.emailVerified) {
      return res.status(200).json(GENERIC_OK);
    }

    // Delete any outstanding verification tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { email: normalizedEmail, type: 'email_verification' },
    });

    // Create new token
    const token = require('crypto').randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        email: normalizedEmail,
        token,
        type: 'email_verification',
        expiresAt,
      },
    });

    const verifyUrl = `${APP_URL}/api/auth/verify-email?token=${token}`;

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: sender,
        to: normalizedEmail,
        subject: 'Verify your LoveEatKeepFit account',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
            <h2 style="color:#2d5a3d;">Verify your email</h2>
            <p>You requested a new verification link. Click below to verify your email address:</p>
            <p style="text-align:center;margin:30px 0;">
              <a href="${verifyUrl}"
                 style="background:#4f46e5;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
                Verify my email
              </a>
            </p>
            <p style="color:#666;font-size:13px;">This link expires in 24 hours.</p>
            <hr style="border:none;border-top:1px solid #eee;margin:30px 0;">
            <p style="color:#999;font-size:12px;text-align:center;">Love. Eat. Keep Fit. &bull; Ashbourne, Co. Meath, Ireland</p>
          </div>
        `,
      });
    } else {
      console.log(`[resend-verification] Link for ${normalizedEmail}: ${verifyUrl}`);
    }

    return res.status(200).json(GENERIC_OK);

  } catch (error) {
    console.error('[resend-verification] Error:', error.message);
    return res.status(200).json(GENERIC_OK);
  }
}
