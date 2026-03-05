/**
 * Cookie Policy
 * ePrivacy Directive 2009/136/EC & GDPR Art. 13 compliant
 */

import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollTopButton from '@/components/ScrollTopButton';
import { useState } from 'react';
import { useCookieConsent } from '@/lib/cookieConsent';
import en from '@/i18n/en.json';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
];

export default function CookiesPage() {
  const [locale, setLocale] = useState('en');
  const content = en;
  const { consent, acceptAll, rejectAnalytics } = useCookieConsent();

  return (
    <div className="min-h-screen bg-warmwhite">
      <Head>
        <title>Cookie Policy — Love. Eat. Keep Fit.</title>
        <meta name="description" content="How Love. Eat. Keep Fit. uses cookies and how to manage your preferences." />
      </Head>

      <Header navItems={navItems} locale={locale} onLocaleChange={setLocale} />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-charcoal md:text-5xl">Cookie Policy</h1>
            <p className="mt-4 text-lg text-charcoal/80">What cookies we use and how to manage your preferences</p>
            <p className="mt-2 text-sm text-charcoal/60">Last updated: June 2025</p>
          </div>

          {/* Live preference panel */}
          <div className="bg-white rounded-2xl border border-beige p-6 shadow-soft mb-8">
            <h2 className="text-xl font-semibold text-darkgreen mb-4">Your current cookie preferences</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal">Strictly Necessary</p>
                  <p className="text-sm text-charcoal/60">Required for the site to function. Cannot be disabled.</p>
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Always on</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal">Analytics</p>
                  <p className="text-sm text-charcoal/60">Helps us understand how visitors use the site (Vercel Analytics).</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${consent.analytics ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-100'}`}>
                    {consent.analytics ? 'Accepted' : 'Declined'}
                  </span>
                  {consent.analytics ? (
                    <button onClick={rejectAnalytics} className="text-xs text-red-500 underline hover:text-red-700">
                      Opt out
                    </button>
                  ) : (
                    <button onClick={acceptAll} className="text-xs text-indigo-600 underline hover:text-indigo-800">
                      Accept
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-beige p-8 shadow-soft space-y-10 text-charcoal/80 leading-relaxed">

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">1. What are cookies?</h2>
              <p>
                Cookies are small text files placed on your device by a website. They are widely used to make
                websites work efficiently and to provide information to site owners. We also use browser
                <strong> localStorage</strong> to store your cookie preferences — this is not a cookie, but serves
                a similar purpose and is governed by the same legal framework.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">2. Strictly necessary cookies</h2>
              <p className="mb-4">
                These cookies are essential for the website to function correctly. They do not require your
                consent under the ePrivacy Directive 2009/136/EC.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-2 border border-beige">Name</th>
                      <th className="text-left p-2 border border-beige">Purpose</th>
                      <th className="text-left p-2 border border-beige">Duration</th>
                      <th className="text-left p-2 border border-beige">Provider</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-beige font-mono text-xs">next-auth.session-token</td>
                      <td className="p-2 border border-beige">Keeps you logged in between page loads</td>
                      <td className="p-2 border border-beige">7 days</td>
                      <td className="p-2 border border-beige">loveeatkeepfit.ie</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2 border border-beige font-mono text-xs">next-auth.csrf-token</td>
                      <td className="p-2 border border-beige">Prevents cross-site request forgery attacks</td>
                      <td className="p-2 border border-beige">Session</td>
                      <td className="p-2 border border-beige">loveeatkeepfit.ie</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-beige font-mono text-xs">next-auth.callback-url</td>
                      <td className="p-2 border border-beige">Stores the page to redirect to after sign-in</td>
                      <td className="p-2 border border-beige">Session</td>
                      <td className="p-2 border border-beige">loveeatkeepfit.ie</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2 border border-beige font-mono text-xs">lekf_cookie_consent</td>
                      <td className="p-2 border border-beige">Stores your cookie consent preferences (localStorage)</td>
                      <td className="p-2 border border-beige">1 year</td>
                      <td className="p-2 border border-beige">loveeatkeepfit.ie</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">3. Analytics cookies (optional — requires consent)</h2>
              <p className="mb-4">
                We use <strong>Vercel Analytics</strong> to understand how visitors use the site. These cookies
                are only set <strong>after you have given consent</strong> via the cookie banner.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-2 border border-beige">Name</th>
                      <th className="text-left p-2 border border-beige">Purpose</th>
                      <th className="text-left p-2 border border-beige">Duration</th>
                      <th className="text-left p-2 border border-beige">Provider</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-beige font-mono text-xs">_vcrcs</td>
                      <td className="p-2 border border-beige">Vercel Analytics — anonymous page-view tracking (no personal identifiers)</td>
                      <td className="p-2 border border-beige">Session</td>
                      <td className="p-2 border border-beige">vercel.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-charcoal/70">
                Vercel Analytics does not use personally identifiable information, does not set persistent
                third-party cookies, and is designed to be privacy-friendly. See{' '}
                <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-leaf underline hover:text-darkgreen">
                  Vercel Analytics Privacy Policy
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">4. How to manage cookies</h2>
              <p className="mb-3">
                You can manage your analytics consent at any time using the panel at the top of this page.
                You can also control cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-leaf underline hover:text-darkgreen">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-leaf underline hover:text-darkgreen">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-leaf underline hover:text-darkgreen">Apple Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-leaf underline hover:text-darkgreen">Microsoft Edge</a></li>
              </ul>
              <p className="mt-3 text-sm text-charcoal/70">
                Disabling strictly necessary cookies may prevent the site from working correctly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">5. More information</h2>
              <p>
                For more information about how we handle your personal data, see our{' '}
                <Link href="/privacy" className="text-leaf underline hover:text-darkgreen">Privacy Policy</Link>.
                To contact us: <a href="mailto:loveeatkeepfitblog@gmail.com" className="text-leaf underline hover:text-darkgreen">loveeatkeepfitblog@gmail.com</a>
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer footer={content.footer} social={content.social} />
      <ScrollTopButton />
    </div>
  );
}
