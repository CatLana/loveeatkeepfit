/**
 * AuthRequiredModal
 * Shown to guest users when they try to interact with a feature that requires
 * a registered account (e.g. submitting homework, accessing Lessons 2–5).
 *
 * During the beta period all features are free — the modal emphasises this.
 */

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AuthRequiredModal({ isOpen, onClose, message }) {
  const dialogRef = useRef(null);

  // Focus trap + keyboard close
  useEffect(() => {
    if (!isOpen) return;
    const el = dialogRef.current;
    if (el) el.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="auth-modal-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 outline-none relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mx-auto mb-5">
          <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <h2 id="auth-modal-title" className="text-2xl font-bold text-gray-900 text-center mb-3">
          Create your free account to continue
        </h2>

        {/* Custom message or default */}
        <p className="text-gray-600 text-center leading-relaxed mb-2">
          {message || 'This feature saves your progress and sends it to your coach for personalised feedback.'}
        </p>

        {/* Beta callout */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-center">
          <p className="text-green-800 text-sm font-semibold">
            All features are completely free during beta.
          </p>
          <p className="text-green-700 text-xs mt-1">
            Sign up in seconds — no credit card required.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/auth/signup"
            className="block w-full text-center py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-md"
          >
            Sign up free
          </Link>
          <Link
            href="/auth/signin"
            className="block w-full text-center py-3 px-6 bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 font-semibold rounded-xl transition-colors"
          >
            Sign in to existing account
          </Link>
        </div>
      </div>
    </div>
  );
}
