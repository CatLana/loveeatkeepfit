/**
 * Lesson Progress API
 * GET /api/lessons/progress - Fetch user's lesson progress
 */

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      // Fetch user's lesson progress
      const progress = await prisma.lessonProgress.findMany({
        where: { userId: session.user.id },
        include: {
          lesson: {
            select: {
              id: true,
              title: true,
              order: true,
            },
          },
        },
        orderBy: {
          lesson: {
            order: 'asc',
          },
        },
      });

      return res.status(200).json({ progress });
    } catch (error) {
      console.error('Error fetching lesson progress:', error);
      return res.status(500).json({ error: 'Failed to fetch lesson progress' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
