import React from 'react';
import Link from 'next/link';
import { recipes } from './recipes';

export default function Cookbook() {
  return (
    <main aria-label="Cook book" className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Cook Book</h1>
      <ul className="w-full max-w-md">
        {recipes.map(recipe => (
          <li key={recipe.id} className="mb-4">
            <Link href={`/app/cookbook/${recipe.id}`} passHref legacyBehavior>
              <a className="block p-4 rounded shadow bg-white hover:bg-gray-100">
                <div className="flex items-center">
                  <img src={recipe.photo} alt={recipe.title} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <span className="font-semibold text-lg">{recipe.title}</span>
                    <div className="mt-1 text-xs text-gray-500">{recipe.tags.join(', ')}</div>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <footer className="text-xs text-gray-400 mt-8">&copy; {new Date().getFullYear()} LoveEatKeepFit</footer>
    </main>
  );
}
