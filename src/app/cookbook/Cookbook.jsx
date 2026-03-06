import Link from 'next/link';
import { recipes } from './recipes';

export default function Cookbook() {
  return (
    <main aria-label="Cookbook" className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookbook</h1>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            Simple, high-protein recipes that fit your calorie target. Every dish below also has a
            full post on our Instagram with video and tips.
          </p>
        </div>

        {/* Instagram CTA */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-shrink-0">
            {/* Instagram icon */}
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="7" fill="url(#ig-grad)" />
              <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.7" fill="none" />
              <circle cx="17.2" cy="6.8" r="1" fill="white" />
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.5" fill="none" />
              <defs>
                <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f9ce34" />
                  <stop offset="0.35" stopColor="#ee2a7b" />
                  <stop offset="1" stopColor="#6228d7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-gray-900">Follow us on Instagram for daily recipes and tips</p>
            <p className="text-sm text-gray-600">@loveeatkeepfit &mdash; new healthy recipes posted every week</p>
          </div>
          <a
            href="https://www.instagram.com/loveeatkeepfit/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-5 py-2.5 bg-white border border-pink-200 text-pink-700 font-semibold rounded-lg text-sm hover:bg-pink-50 transition-colors"
          >
            View profile
          </a>
        </div>

        {/* Recipe cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/app/cookbook/${recipe.id}`}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer overflow-hidden">
                {/* Macro strip */}
                <div className="bg-indigo-600 text-white text-xs font-semibold flex justify-around py-2 px-4">
                  <span>{recipe.macros.calories} kcal</span>
                  <span>{recipe.macros.protein}g protein</span>
                  <span>{recipe.macros.carbs}g carbs</span>
                  <span>{recipe.macros.fat}g fat</span>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">{recipe.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">{recipe.caption}</p>
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-10">
          More recipes coming soon. Follow{' '}
          <a href="https://www.instagram.com/loveeatkeepfit/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">@loveeatkeepfit</a>
          {' '}for the latest.
        </p>
      </div>

      <footer className="text-xs text-gray-400 text-center mt-12">
        &copy; {new Date().getFullYear()} LoveEatKeepFit
      </footer>
    </main>
  );
}
