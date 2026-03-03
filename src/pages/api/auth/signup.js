/**
 * Sign Up API Endpoint
 * Handles new user registration
 * POST /api/auth/signup
 */

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name || null,
        email: email.toLowerCase(),
        password: hashedPassword,
      }
    });

    // Initialize lesson progress for new user
    // Get lessons 1 and 2 (default unlocked)
    const defaultLessons = await prisma.lesson.findMany({
      where: {
        OR: [
          { isDefaultUnlocked: true },
          { order: { lte: 2 } }
        ]
      }
    });

    // Create unlocked progress for default lessons
    await Promise.all(
      defaultLessons.map(lesson =>
        prisma.lessonProgress.create({
          data: {
            userId: user.id,
            lessonId: lesson.id,
            status: 'unlocked',
            unlockedAt: new Date(),
          }
        })
      )
    );

    // Create locked progress for remaining lessons
    const allLessons = await prisma.lesson.findMany();
    const lockedLessons = allLessons.filter(
      lesson => !defaultLessons.some(dl => dl.id === lesson.id)
    );

    await Promise.all(
      lockedLessons.map(lesson =>
        prisma.lessonProgress.create({
          data: {
            userId: user.id,
            lessonId: lesson.id,
            status: 'locked',
          }
        })
      )
    );

    return res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'An error occurred during signup' });
  }
}
