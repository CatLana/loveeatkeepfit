/**
 * CookieBanner
 * GDPR / ePrivacy Directive 2009/136/EC compliant cookie consent banner.
 *
 * Shows until the user makes a choice. The choice persists in localStorage.
 * Offers "Accept all" and "Strictly necessary only" on the banner surface,
 * with a link to the full Cookie Policy for granular details.
 */

import Link from 'next/link';
import { useCookieConsent } from '@/lib/cookieConsent';

export default function CookieBanner() {
  const { consent, acceptAll, rejectAnalytics } = useCookieConsent();

  // Don't render until the user has NOT yet decided
  if (consent.decided) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Text */}
          <div className="flex-1 text-sm text-gray-700">
            <p className="font-semibold text-gray-900 mb-1">We use cookies</p>
            <p>
              We use strictly necessary cookies to make our site work. We would also like to set
              optional analytics cookies to help us understand how visitors use the site — these
              are only set with your consent.{' '}
              <Link href="/cookies" className="underline text-indigo-600 hover:text-indigo-800">
                Cookie Policy
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={rejectAnalytics}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-300"
            >
              Strictly necessary only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Accept all cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
