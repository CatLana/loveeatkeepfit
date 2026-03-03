/**
 * LessonTemplate Component
 * Reusable template for rendering lesson content with consistent structure
 */

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function LessonTemplate({ 
  lesson,
  children,
  onHomeworkSubmit,
  isSubmitting = false,
  submitSuccess = false
}) {
  const { data: session } = useSession();

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
    <div className="min-h-screen bg-gradient-to-br from-warmwhite via-white to-beige/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Link 
          href="/app/lessons" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Lessons
        </Link>

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

        {/* Quick Links */}
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
