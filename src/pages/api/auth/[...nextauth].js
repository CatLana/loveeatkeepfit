/**
 * NextAuth API Route Handler
 * Handles all authentication endpoints: /api/auth/*
 *
 * Security controls applied:
 *  - Account lockout: 10 failed attempts → 30-minute lock
 *  - Email verification gate: unverified accounts cannot sign in
 *  - Session maxAge: 7 days (reduced from 30)
 */

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

const LOCKOUT_THRESHOLD = 10;       // failed attempts before lockout
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minutes

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        // Normalise email
        const email = credentials.email.toLowerCase().trim();

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          // Intentional UX trade-off: surface USER_NOT_FOUND so the sign-in
          // page can transparently redirect to the sign-up form with the email
          // and password pre-filled, avoiding dead-end "wrong password" frustration.
          throw new Error('USER_NOT_FOUND');
        }

        // ── Account lockout check ─────────────────────────────────────────
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
          throw new Error(
            `Account temporarily locked due to too many failed login attempts. ` +
            `Try again in ${minutesLeft} minute${minutesLeft === 1 ? '' : 's'}.`
          );
        }

        // ── Password verification ─────────────────────────────────────────
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          // Increment failure counter; lock if threshold reached
          const newCount = (user.failedLoginCount || 0) + 1;
          const shouldLock = newCount >= LOCKOUT_THRESHOLD;
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLoginCount: newCount,
              lockedUntil: shouldLock ? new Date(Date.now() + LOCKOUT_DURATION_MS) : null,
            },
          });
          throw new Error('Invalid email or password');
        }

        // ── Email verification gate ───────────────────────────────────────
        if (!user.emailVerified) {
          throw new Error(
            'EMAIL_NOT_VERIFIED'
          );
        }

        // ── Success — reset failure counter and update lastLogin ──────────
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginCount: 0,
            lockedUntil: null,
            lastLogin: new Date(),
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
