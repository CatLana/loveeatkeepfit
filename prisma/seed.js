/**
 * Prisma Database Seed Script
 * Populates the database with initial lesson data
 * Run with: npm run seed
 */

require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});

async function main() {
  console.log('🌱 Starting database seed...');

  // Check if lessons already exist
  const existingLessons = await prisma.lesson.count();
  if (existingLessons > 0) {
    console.log(`⚠️  Database already has ${existingLessons} lessons. Skipping seed.`);
    console.log('   To re-seed, delete lessons and run again.');
    return;
  }

  // Seed lessons
  const lessons = [
    {
      title: 'First Steps with the program and Calories target',
      slug: 'first-steps-calories-target',
      order: 1,
      themes: ['Getting Started', 'Goal Setting', 'TDEE', 'Calorie Deficit'],
      description: 'Welcome to your journey! Learn how this program works and discover your personalized calorie target for sustainable fat loss.',
      readTime: '5-7 min',
      isDefaultUnlocked: true,
      fiveWeekOutcome: 'Starting with the right calorie target means 85% higher adherence to your plan vs guessing. You\'ll understand exactly how much to eat for steady, sustainable progress.',
    },
    {
      title: 'Calories In vs Calories Out',
      slug: 'calories-in-out',
      order: 2,
      themes: ['Energy Balance', 'CICO', 'Weight Loss Fundamentals'],
      description: 'Understand the energy balance equation and why calories matter. This is the foundation of every successful fat loss journey.',
      readTime: '5-7 min',
      isDefaultUnlocked: true,
      fiveWeekOutcome: 'Understanding CICO helps 78% of people stay consistent with their goals because they stop vilifying specific foods and focus on balance instead.',
    },
    {
      title: 'Macros Made Simple',
      slug: 'macros-made-simple',
      order: 3,
      themes: ['Macronutrients', 'Protein', 'Carbs', 'Fats', 'Muscle Maintenance'],
      description: 'Demystify protein, carbs, and fats. Learn how to balance your macros for optimal fat loss while maintaining muscle and energy.',
      readTime: '6-8 min',
      isDefaultUnlocked: false,
      fiveWeekOutcome: 'Proper macro balance helps preserve 93% of muscle during fat loss and keeps your metabolism running strong—no restrictive diets needed.',
    },
    {
      title: 'Protein Power',
      slug: 'protein-power',
      order: 4,
      themes: ['Protein', 'Muscle Maintenance', 'Satiety', 'Meal Timing'],
      description: 'Deep dive into the MVP macro. Discover why protein is non-negotiable for fat loss, how much you need, and when to eat it.',
      readTime: '6-8 min',
      isDefaultUnlocked: false,
      fiveWeekOutcome: 'Adequate protein (1.6g/kg bodyweight) reduces hunger by 60% and boosts metabolism by 15-30% via the thermic effect. You\'ll feel fuller and burn more calories naturally.',
    },
    {
      title: 'Carbs & Fats Without Fear',
      slug: 'carbs-fats-without-fear',
      order: 5,
      themes: ['Carbohydrates', 'Healthy Fats', 'Energy', 'Portion Control'],
      description: 'Let go of food fear. Learn how to enjoy carbs and fats strategically for energy, hormones, and satisfaction—without derailing your progress.',
      readTime: '7-9 min',
      isDefaultUnlocked: false,
      fiveWeekOutcome: 'Accurate fat tracking reveals 300-500 hidden calories daily for most people. Mastering portions means you can enjoy your favorite foods and still reach your goals.',
    },
  ];

  console.log('📚 Creating lessons...');
  
  for (const lessonData of lessons) {
    const lesson = await prisma.lesson.create({
      data: lessonData,
    });
    console.log(`   ✓ Created: ${lesson.title}`);
  }

  console.log('✅ Database seed completed successfully!');
  console.log(`   📖 ${lessons.length} lessons created`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
