/**
 * Account Deletion Endpoint
 * DELETE /api/account/delete
 *
 * Permanently deletes the authenticated user's account and all
 * associated data (GDPR Art. 17 — right to erasure).
 *
 * Security controls:
 *  - Requires active session (must be logged in)
 *  - Rate limited: 3 attempts / 1 hour per IP
 *  - CSRF origin check
 */

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { rateLimit } from '@/lib/rateLimit';
import { validateOrigin } from '@/lib/validateRequest';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!validateOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { limited } = await rateLimit(req, res, { requests: 3, window: '60 m' });
  if (limited) return;

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'You must be signed in to delete your account' });
  }

  try {
    const email = session.user.email.toLowerCase().trim();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Delete in dependency order (Prisma does not cascade by default without onDelete rules)
    await prisma.$transaction([
      prisma.lessonProgress.deleteMany({ where: { userId: user.id } }),
      prisma.checkin.deleteMany({ where: { userId: user.id } }),
      prisma.homework.deleteMany({ where: { userId: user.id } }),
      prisma.verificationToken.deleteMany({ where: { email } }),
      prisma.user.delete({ where: { id: user.id } }),
    ]);

    // Clear next-auth session cookie
    res.setHeader('Set-Cookie', [
      'next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax',
      '__Secure-next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax',
    ]);

    return res.status(200).json({ message: 'Account deleted successfully' });

  } catch (error) {
    console.error('[account/delete] Error:', error.message);
    return res.status(500).json({ error: 'Failed to delete account. Please try again.' });
  }
}
