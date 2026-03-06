/**
 * RecipeCard Component
 * Displays a lesson recipe with video placeholder, macros calculator, and portion selector.
 *
 * Props:
 *   recipe: {
 *     title: string
 *     intro: string        — one sentence max
 *     videoUrl?: string    — YouTube or Instagram embed URL (optional)
 *     ingredients: Array<{ name: string, qty: string }>
 *     steps: string[]
 *     macrosPerPortion: { calories: number, protein: number, carbs: number, fat: number }
 *   }
 */

import { useState } from 'react';

const PORTION_OPTIONS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8];

function formatPortions(val) {
  const whole = Math.floor(val);
  const half = val % 1 !== 0;
  if (whole === 0) return '½';
  if (half) return `${whole}½`;
  return `${whole}`;
}

function VideoEmbed({ url }) {
  if (!url) {
    return (
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-400 text-sm font-medium">Video coming soon</p>
      </div>
    );
  }

  // Convert YouTube watch URL to embed
  let embedUrl = url;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&/?]+)/);
  if (ytMatch) {
    embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  return (
    <div className="aspect-video rounded-xl overflow-hidden">
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Recipe video"
      />
    </div>
  );
}

export default function RecipeCard({ recipe }) {
  const [portions, setPortions] = useState(1);

  if (!recipe) return null;

  const m = recipe.macrosPerPortion;
  const calc = (val) => Math.round(val * portions);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-5 border-b border-amber-100">
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Recipe</p>
        <h3 className="text-xl font-bold text-gray-900">{recipe.title}</h3>
        {recipe.intro && (
          <p className="text-sm text-gray-600 mt-1">{recipe.intro}</p>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Video */}
        <VideoEmbed url={recipe.videoUrl} />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Ingredients */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Ingredients</h4>
            <ul className="space-y-1.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="text-gray-800">{ing.name}</span>
                  <span className="text-gray-500 whitespace-nowrap font-medium">{ing.qty}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">How to make it</h4>
            <ol className="space-y-2">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Macros Calculator */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Macros breakdown</h4>

            {/* Portion selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Portions:</span>
              <button
                onClick={() => setPortions(p => {
                  const idx = PORTION_OPTIONS.indexOf(p);
                  return idx > 0 ? PORTION_OPTIONS[idx - 1] : p;
                })}
                disabled={portions === 0.5}
                className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease portions"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="w-8 text-center font-semibold text-gray-900 text-lg leading-none">
                {formatPortions(portions)}
              </span>
              <button
                onClick={() => setPortions(p => {
                  const idx = PORTION_OPTIONS.indexOf(p);
                  return idx < PORTION_OPTIONS.length - 1 ? PORTION_OPTIONS[idx + 1] : p;
                })}
                disabled={portions === 8}
                className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase portions"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Calories', value: calc(m.calories), unit: 'kcal', color: 'bg-orange-100 text-orange-800' },
              { label: 'Protein', value: calc(m.protein), unit: 'g', color: 'bg-blue-100 text-blue-800' },
              { label: 'Carbs', value: calc(m.carbs), unit: 'g', color: 'bg-yellow-100 text-yellow-800' },
              { label: 'Fat', value: calc(m.fat), unit: 'g', color: 'bg-green-100 text-green-800' },
            ].map(({ label, value, unit, color }) => (
              <div key={label} className={`${color} rounded-lg p-3 text-center`}>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">{label}</p>
                <p className="text-xl font-bold leading-none">{value}</p>
                <p className="text-xs mt-0.5 opacity-70">{unit}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Values are approximate and calculated for {formatPortions(portions)} portion{portions !== 1 ? 's' : ''}.
          </p>
        </div>
      </div>
    </div>
  );
}
