import React from 'react';
import Link from 'next/link';

const lessons = [
  { id: 1, title: 'Volume Eating', description: 'What it is, why it matters, and how it helps you stay full in a calorie deficit.' },
  { id: 2, title: 'Macros', description: 'Understanding protein, fats, and carbohydrates in simple language.' },
  { id: 3, title: 'Calorie Deficit', description: 'How it works, how much is too much, and why extreme deficits backfire.' },
  { id: 4, title: 'Cravings', description: 'Why cravings happen and practical ways to manage them.' },
  { id: 5, title: 'Protein', description: 'Why protein is important, how much you need, and easy ways to add it.' },
  { id: 6, title: 'Fiber', description: 'How fiber supports fullness, digestion, and blood sugar control.' },
  { id: 7, title: 'Glycemic Index & Wholemeal Foods', description: 'What the glycemic index means and why wholemeal foods help with energy and hunger.' },
  { id: 8, title: 'Fats', description: 'Healthy fats vs. unhealthy fats, and how to use fats without going over calories.' },
  { id: 9, title: 'Food Tracking: Why Track', description: 'How tracking builds awareness and helps you stay consistent.' },
  { id: 10, title: 'Food Tracking: How to Stay in a Deficit Without Tracking', description: 'Simple habits and visual cues that help you stay on track without logging every meal.' },
  { id: 11, title: 'Recipes', description: 'Quick, tasty, high‑protein, low‑effort meals that fit into real life.' },
  // Additional Topics
  { id: 12, title: 'Meal Structure', description: 'How to build a balanced plate that keeps you full and satisfied.' },
  { id: 13, title: 'One‑Meal, Different Calories', description: 'How to adjust portions for different family members without cooking twice.' },
  { id: 14, title: 'Smart Grocery Shopping', description: 'How to shop once a week in under 30 minutes and avoid impulse buying.' },
  { id: 15, title: 'Kitchen Setup for Success', description: 'What to keep in your fridge, freezer, and pantry to make cooking easier.' },
  { id: 16, title: 'Quick Cooking Skills', description: 'How to cook fast, simple meals without spending hours in the kitchen.' },
  { id: 17, title: 'Emotional Eating', description: 'How emotions influence food choices and how to respond differently.' },
  { id: 18, title: 'The Reset Cycle', description: 'Why people “start again on Monday” and how to break that pattern.' },
  { id: 19, title: 'Hunger vs. Appetite', description: 'How to tell the difference and how to respond to each one.' },
  { id: 20, title: 'Eating Out & Social Events', description: 'How to stay on track without feeling restricted.' },
  { id: 21, title: 'Weekend Eating', description: 'Why weekends are harder and how to stay consistent.' },
  { id: 22, title: 'High‑Protein Without Meat', description: 'Plant‑based and dairy‑based protein options for people who don’t eat meat.' },
  { id: 23, title: 'Low‑Effort Meal Prep', description: 'How to prep ingredients, not full meals, to save time.' },
  { id: 24, title: 'Mindset for Sustainable Weight Management', description: 'How to stay motivated without perfectionism.' },
  { id: 25, title: 'How to Build a Routine That Fits Your Life', description: 'Daily habits that make healthy eating automatic.' },
];

export default function Lessons() {
  return (
    <main aria-label="Lessons" className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Lessons</h1>
      <ul className="w-full max-w-md">
        {lessons.map((lesson, idx) => (
          <li key={lesson.id} className="mb-4">
            <Link href={`/app/lesson/${lesson.id}`} passHref legacyBehavior>
              <a className={`block p-4 rounded shadow bg-white ${idx > 0 ? 'pointer-events-none opacity-50' : ''}`} aria-disabled={idx > 0} tabIndex={idx > 0 ? -1 : 0}>
                <span className="font-semibold text-lg">{lesson.title}</span>
                <div className="text-gray-600 text-sm mt-1">{lesson.description}</div>
                {idx > 0 && <span className="ml-2 text-xs text-gray-400">(Locked)</span>}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/app/cookbook" passHref legacyBehavior>
          <a className="text-indigo-600 underline font-semibold">Go to Cook Book</a>
        </Link>
      </div>
      <footer className="text-xs text-gray-400 mt-4">&copy; {new Date().getFullYear()} LoveEatKeepFit</footer>
    </main>
  );
}
