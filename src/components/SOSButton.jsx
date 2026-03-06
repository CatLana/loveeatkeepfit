/**
 * SOSButton Component
 * Friendly "need help?" button that links to the coach chat page.
 * Warm, approachable — not alarming.
 */

import Link from 'next/link';

export default function SOSButton({ className = '' }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Link
        href="/app/chat"
        className="group inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 border-2 border-rose-200 hover:border-rose-300 text-rose-700 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {/* Life ring icon */}
        <svg
          className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" strokeWidth="2" />
          <path strokeLinecap="round" strokeWidth="2" d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83" />
        </svg>

        <div className="text-left">
          <p className="font-semibold text-sm">Need help or feeling stuck?</p>
          <p className="text-xs text-rose-500">Your coach is here. Message them anytime.</p>
        </div>

        <svg
          className="w-4 h-4 ml-1 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
