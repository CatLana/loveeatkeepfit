/**
 * Email Verification Endpoint
 * GET /api/auth/verify-email?token=TOKEN
 *
 * Validates the verification token, marks the user as verified,
 * deletes the token, then redirects to the sign-in page.
 */

import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token || typeof token !== 'string' || token.length > 200) {
    return res.redirect('/auth/signin?error=invalid_token');
  }

  try {
    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return res.redirect('/auth/signin?error=invalid_token');
    }

    if (new Date() > record.expiresAt) {
      await prisma.verificationToken.delete({ where: { token } });
      return res.redirect('/auth/signin?error=token_expired');
    }

    // Mark user as verified
    await prisma.user.update({
      where: { email: record.email },
      data: { emailVerified: new Date() },
    });

    // Remove the used token
    await prisma.verificationToken.delete({ where: { token } });

    return res.redirect('/auth/signin?verified=true');

  } catch (error) {
    console.error('[verify-email] Error:', error.message);
    return res.redirect('/auth/signin?error=server_error');
  }
}
