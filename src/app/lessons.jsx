import React from 'react';
import Link from 'next/link';

const lessons = [
  { id: 1, title: 'Volume Eating', description: 'What it is, why it matters, and how it helps you stay full in a calorie deficit.' },
  { id: 2, title: 'Macros', description: 'Understanding protein, fats, and carbohydrates in simple language.' },
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
