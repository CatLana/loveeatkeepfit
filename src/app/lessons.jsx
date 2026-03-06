/**
 * Lessons List Page
 * Displays all lessons with progressive unlock based on user progress
 */

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import lessonsData from '@/data/lessons.json';

export default function Lessons() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [lessonProgress, setLessonProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchLessonProgress();
    }
  }, [status]);

  const fetchLessonProgress = async () => {
    try {
      const response = await fetch('/api/lessons/progress');
      if (response.ok) {
        const data = await response.json();
        setLessonProgress(data.progress);
      }
    } catch (error) {
      console.error('Error fetching lesson progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLessonStatus = (lessonId) => {
    // Lesson 1 is always unlocked — every new user must be able to access it
    const lesson = lessonsData.lessons.find(l => l.id === lessonId);
    if (lesson?.order === 1 || lesson?.isDefaultUnlocked) {
      const progress = lessonProgress.find(p => p.lessonId === lessonId);
      return progress?.status || 'unlocked';
    }
    const progress = lessonProgress.find(p => p.lessonId === lessonId);
    return progress?.status || 'locked';
  };

  const getCompletionCount = () => {
    return lessonProgress.filter(p => p.status === 'completed').length;
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warmwhite via-white to-beige/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-warmwhite via-white to-beige/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Your Learning Journey</h1>
          <p className="text-gray-600 text-lg">
            Welcome, {session?.user?.name || 'there'}! Complete each lesson to unlock the next one.
          </p>
          
          {/* Progress Indicator */}
          <div className="mt-6 inline-flex items-center bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
            <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-gray-900">
              {getCompletionCount()} of {lessonsData.lessons.length} lessons completed
            </span>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="space-y-4">
          {lessonsData.lessons.map((lesson, idx) => {
            const status = getLessonStatus(lesson.id);
            const isLocked = status === 'locked';
            const isCompleted = status === 'completed';
            const isUnlocked = status === 'unlocked' || isCompleted;

            return (
              <div
                key={lesson.id}
                className={`bg-white rounded-xl shadow-md border-2 transition-all duration-200 ${
                  isLocked 
                    ? 'border-gray-200 opacity-60' 
                    : isCompleted
                    ? 'border-green-300 hover:shadow-lg'
                    : 'border-indigo-200 hover:shadow-lg hover:border-indigo-300'
                }`}
              >
                {isUnlocked ? (
                  <Link href={`/app/lesson/${lesson.id}`}>
                    <div className="p-6 cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {/* Lesson number & title */}
                          <div className="flex items-center mb-2">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                              isCompleted 
                                ? 'bg-green-500 text-white' 
                                : 'bg-indigo-500 text-white'
                            }`}>
                              {isCompleted ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                lesson.order
                              )}
                            </span>
                            <h2 className="text-xl font-semibold text-gray-900">
                              {lesson.title}
                            </h2>
                          </div>
                          
                          {/* Description */}
                          <p className="text-gray-600 ml-11 mb-3">
                            {lesson.description}
                          </p>
                          
                          {/* Meta info */}
                          <div className="flex items-center gap-4 ml-11 text-sm text-gray-500">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {lesson.readTime}
                            </span>
                            {lesson.themes && lesson.themes.length > 0 && (
                              <>
                                <span>•</span>
                                <span>{lesson.themes.slice(0, 2).join(', ')}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Arrow icon */}
                        <div className="ml-4">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="p-6 cursor-not-allowed">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Lesson number & title */}
                        <div className="flex items-center mb-2">
                          <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 bg-gray-300 text-gray-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <h2 className="text-xl font-semibold text-gray-500">
                            {lesson.title}
                          </h2>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-400 ml-11 mb-3">
                          {lesson.description}
                        </p>
                        
                        {/* Lock message */}
                        <div className="ml-11 text-sm text-gray-500 italic">
                          Complete Lesson {lesson.order - 1} to unlock
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link 
            href="/app" 
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors font-medium"
          >
            ← Dashboard
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
    </main>
  );
}
