/**
 * LessonTemplate Component
 * Reusable template for rendering lesson content with consistent structure
 */

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useGuest } from '@/lib/guestSession';
import AuthRequiredModal from '@/components/AuthRequiredModal';

export default function LessonTemplate({ 
  lesson,
  children,
  onHomeworkSubmit,
  isSubmitting = false,
  submitSuccess = false
}) {
  const { data: session } = useSession();
  const { guestName } = useGuest();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Real user name takes priority; fall back to guest name
  const userName = session?.user?.name || guestName || null;

  // Theme tag color mapping
  const getThemeColor = (theme) => {
    const colorMap = {
      'Getting Started': 'bg-green-100 text-green-800',
      'Goal Setting': 'bg-green-100 text-green-800',
      'TDEE': 'bg-blue-100 text-blue-800',
      'Calorie Deficit': 'bg-blue-100 text-blue-800',
      'Energy Balance': 'bg-blue-100 text-blue-800',
      'CICO': 'bg-blue-100 text-blue-800',
      'Weight Loss Fundamentals': 'bg-blue-100 text-blue-800',
      'Macronutrients': 'bg-purple-100 text-purple-800',
      'Protein': 'bg-orange-100 text-orange-800',
      'Carbs': 'bg-yellow-100 text-yellow-800',
      'Fats': 'bg-yellow-100 text-yellow-800',
      'Carbohydrates': 'bg-yellow-100 text-yellow-800',
      'Healthy Fats': 'bg-yellow-100 text-yellow-800',
      'Muscle Maintenance': 'bg-red-100 text-red-800',
      'Satiety': 'bg-pink-100 text-pink-800',
      'Meal Timing': 'bg-indigo-100 text-indigo-800',
      'Energy': 'bg-amber-100 text-amber-800',
      'Portion Control': 'bg-teal-100 text-teal-800',
    };
    return colorMap[theme] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmwhite via-white to-beige/20">
      <AuthRequiredModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Left: Back + greeting */}
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href="/app/lessons"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-sm whitespace-nowrap"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Lessons
            </Link>
            {userName && (
              <span className="text-sm text-gray-500 truncate hidden sm:block">
                Hi, <span className="font-medium text-gray-700">{userName}</span>
              </span>
            )}
          </div>

          {/* Right: Chat (prominent) + FAQ (subtle) */}
          <div className="flex items-center gap-3">
            <Link
              href="/app/faq"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors hidden sm:block"
            >
              FAQ
            </Link>
            <Link
              href="/app/chat"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Chat with Coach
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Lesson Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
          {/* Theme Tags */}
          {lesson.themes && lesson.themes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {lesson.themes.map((theme, index) => (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getThemeColor(theme)}`}
                >
                  {theme}
                </span>
              ))}
            </div>
          )}

          {/* Title and Meta */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {lesson.readTime}
            </span>
            <span>•</span>
            <span>Lesson {lesson.order} of 5</span>
          </div>
          
          {/* Description */}
          {lesson.description && (
            <p className="mt-4 text-gray-700 text-lg leading-relaxed">
              {lesson.description}
            </p>
          )}
        </div>

        {/* Main Content - passed as children */}
        <div className="space-y-6">
          {children}
        </div>

        {/* 5-Week Outcome Box */}
        {lesson.fiveWeekOutcome && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mt-8 border-2 border-indigo-100 shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your 5-Week Outcome
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {lesson.fiveWeekOutcome}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link 
            href="/app" 
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors font-medium"
          >
            Dashboard
          </Link>
          <Link 
            href="/app/faq" 
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors font-medium"
          >
            FAQ
          </Link>
          <Link 
            href="/app/cookbook" 
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors font-medium"
          >
            Cookbook
          </Link>
        </div>
      </div>
    </div>
  );
}
