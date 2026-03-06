import Link from 'next/link';
import { recipes } from './recipes';

export default function RecipePage({ id }) {
  const recipe = recipes.find((r) => r.id === Number(id));
  if (!recipe) {
import prisma from '@/lib/prisma';
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Recipe not found.</p>
          <Link href="/app/cookbook" className="text-indigo-600 underline">Back to cookbook</Link>
        </div>
      </main>
    );
  }

  const hasInstagramPost = Boolean(recipe.instagramPostId);

  return (
    <main aria-label={recipe.title} className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
        <Link href="/app/cookbook" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to cookbook
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">{recipe.caption}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {recipe.tags.map((tag) => (
            <span key={tag} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">{tag}</span>
          ))}
        </div>

        {/* Instagram post embed */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {/* Instagram icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="7" fill="url(#ig2)" />
              <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.7" fill="none" />
              <circle cx="17.2" cy="6.8" r="1" fill="white" />
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.5" fill="none" />
              <defs>
                <linearGradient id="ig2" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f9ce34" />
                  <stop offset="0.35" stopColor="#ee2a7b" />
                  <stop offset="1" stopColor="#6228d7" />
                </linearGradient>
              </defs>
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Instagram post</h2>
          </div>

          {hasInstagramPost ? (
            <div className="rounded-xl overflow-hidden border border-gray-200" style={{ maxWidth: 540, margin: '0 auto' }}>
              <iframe
                src={`https://www.instagram.com/p/${recipe.instagramPostId}/embed/`}
                title={`Instagram post: ${recipe.title}`}
                width="100%"
                height="480"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                className="block"
              />
            </div>
          ) : (
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 rounded-xl p-8 text-center">
              <p className="text-gray-600 text-sm mb-3">
                The Instagram post for this recipe will appear here once it is published on{' '}
                <a
                  href="https://www.instagram.com/loveeatkeepfit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 underline font-medium"
                >
                  @loveeatkeepfit
                </a>
                .
              </p>
              <a
                href="https://www.instagram.com/loveeatkeepfit/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 bg-white border border-pink-200 text-pink-700 font-semibold rounded-lg text-sm hover:bg-pink-50 transition-colors"
              >
                Follow us on Instagram
              </a>
            </div>
          )}
        </section>

        {/* Ingredients */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="mt-1 w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Short cooking instructions */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How to make it</h2>
          <ol className="space-y-3">
            {recipe.steps.map((step, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Macros */}
        <section className="bg-indigo-600 text-white rounded-xl p-5 mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide mb-3 opacity-80">Macros per serving</h2>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[['Calories', `${recipe.macros.calories} kcal`], ['Protein', `${recipe.macros.protein} g`], ['Carbs', `${recipe.macros.carbs} g`], ['Fat', `${recipe.macros.fat} g`]].map(([label, value]) => (
              <div key={label}>
                <p className="text-lg font-bold">{value}</p>
                <p className="text-xs opacity-75">{label}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <footer className="text-xs text-gray-400 text-center mt-8">
        &copy; {new Date().getFullYear()} LoveEatKeepFit
      </footer>
    </main>
  );
}
