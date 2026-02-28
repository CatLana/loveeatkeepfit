import React from 'react';
import { recipes } from './recipes';

export default function RecipePage({ id }) {
  const recipe = recipes.find(r => r.id === Number(id));
  if (!recipe) return <div>Recipe not found.</div>;
  return (
    <main aria-label={recipe.title} className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
      <img src={recipe.photo} alt={recipe.title} className="w-64 h-64 object-cover rounded mb-4" />
      <div className="mb-4">
        <span className="font-semibold">Tags: </span>
        {recipe.tags.map(tag => <span key={tag} className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded mr-2 text-xs">{tag}</span>)}
      </div>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5">
          {recipe.ingredients.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p>{recipe.description}</p>
      </section>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Macros Breakdown</h2>
        <ul>
          <li>Protein: {recipe.macros.protein}g</li>
          <li>Carbs: {recipe.macros.carbs}g</li>
          <li>Fat: {recipe.macros.fat}g</li>
          <li>Total Calories: {recipe.macros.calories} kcal</li>
        </ul>
      </section>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Shopping List</h2>
        <ul className="list-disc pl-5">
          {recipe.shoppingList.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </section>
      <section className="w-full max-w-md bg-white rounded shadow p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Video</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe src={recipe.video} title="Recipe Video" width="100%" height="315" frameBorder="0" allowFullScreen></iframe>
        </div>
      </section>
      <footer className="text-xs text-gray-400 mt-8">&copy; {new Date().getFullYear()} LoveEatKeepFit</footer>
    </main>
  );
}
