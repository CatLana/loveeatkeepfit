/**
 * Community Forum — Coming Soon
 *
 * Scaffold: language-based structure, extensible to Italian, Russian, etc.
 * Forum functionality is not yet live.
 */

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Languages supported now and in future.
// To add a new language: add an entry here. No other structural changes needed.
const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧', available: true },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', available: false },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', available: false },
];

// Forum topic categories (shown per language when live)
const TOPICS = [
  { id: 'general', icon: '💬', title: 'General chat', description: 'Introductions, questions, anything goes' },
  { id: 'wins', icon: '🏆', title: 'Wins & celebrations', description: 'Share your progress, big or small' },
  { id: 'recipes', icon: '🍳', title: 'Recipes & food ideas', description: "What are you cooking? Share your favourites" },
  { id: 'questions', icon: '❓', title: 'Questions & support', description: 'Ask the community for help or advice' },
  { id: 'motivation', icon: '🌱', title: 'Motivation', description: 'When you need a push — and when you can give one' },
];

export default function CommunityPage() {
  const [activeLang, setActiveLang] = useState('en');

  return (
    <>
      <Head>
        <title>Community — Love. Eat. Keep Fit.</title>
        <meta name="description" content="A supportive community for Love. Eat. Keep Fit. members. Coming soon." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/app" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <Link
              href="/app/chat"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Chat with Coach
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 text-4xl mb-4">
              🌍
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Community</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
              A space for encouragement, shared recipes, honest conversations, and celebrating every small win together.
            </p>
          </div>

          {/* Coming Soon Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-12 shadow-lg">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
              Coming Soon
            </div>
            <h2 className="text-2xl font-bold mb-3">We're building this for you</h2>
            <p className="text-indigo-100 max-w-lg mx-auto leading-relaxed">
              The community forum is on its way. Soon you'll be able to connect with other members,
              share your journey, swap recipe ideas, and cheer each other on — all in one place.
            </p>
            <p className="text-indigo-200 text-sm mt-4">
              In the meantime, your coach is always available via the chat.
            </p>
          </div>

          {/* Language switcher — structure ready for when forum goes live */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 text-center">
              Language / Lingua / Язык
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLang(lang.code)}
                  disabled={!lang.available}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    activeLang === lang.code && lang.available
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : lang.available
                      ? 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300'
                      : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                  {!lang.available && (
                    <span className="text-xs bg-gray-200 text-gray-500 rounded-full px-1.5 py-0.5">soon</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Topic boards preview — greyed out until live */}
          <div className="grid sm:grid-cols-2 gap-4">
            {TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="relative bg-white rounded-xl border border-gray-100 p-5 shadow-sm opacity-60 select-none"
              >
                {/* Coming soon overlay */}
                <div className="absolute inset-0 rounded-xl flex items-center justify-center">
                  <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-500 border border-gray-200">
                    Coming soon
                  </span>
                </div>

                <div className="text-3xl mb-3">{topic.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{topic.title}</h3>
                <p className="text-sm text-gray-500">{topic.description}</p>
              </div>
            ))}
          </div>

          {/* Get notified */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm">
              Want to be notified when the community launches?{' '}
              <Link href="/app/chat" className="text-indigo-600 hover:text-indigo-700 font-medium underline">
                Drop your coach a message
              </Link>{' '}
              and we'll let you know.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
