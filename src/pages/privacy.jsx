/**
 * Privacy Policy — GDPR Art. 13 compliant
 * Data Controller: We Make IT (sole trader), Ashbourne, Co. Meath, Ireland
 */

import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollTopButton from '@/components/ScrollTopButton';
import { useState } from 'react';
import en from '@/i18n/en.json';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
];

export default function PrivacyPolicy() {
  const [locale, setLocale] = useState('en');
  const content = en;

  return (
    <div className="min-h-screen bg-warmwhite">
      <Head>
        <title>Privacy Policy — Love. Eat. Keep Fit.</title>
        <meta name="description" content="How We Make IT collects, uses and protects your personal data under GDPR." />
      </Head>

      <Header navItems={navItems} locale={locale} onLocaleChange={setLocale} />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-charcoal md:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-lg text-charcoal/80">How we collect, use and protect your personal data</p>
            <p className="mt-2 text-sm text-charcoal/60">Last updated: June 2025</p>
          </div>

          <div className="bg-white rounded-2xl border border-beige p-8 shadow-soft space-y-10 text-charcoal/80 leading-relaxed">

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">1. Who we are (Data Controller)</h2>
              <p>
                The data controller is <strong>We Make IT</strong>, a sole trader registered in Ireland, with a
                principal place of business at 32 Millbourne Drive, Ashbourne, Co. Meath, Ireland.
              </p>
              <p className="mt-2">
                Contact us regarding your personal data at any time:{' '}
                <a href="mailto:loveeatkeepfitblog@gmail.com" className="text-leaf underline hover:text-darkgreen">
                  loveeatkeepfitblog@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">2. What data we collect and why</h2>

              <div className="space-y-4">
                <div className="bg-leaf/5 border-l-4 border-leaf p-4 rounded-r-lg">
                  <h3 className="font-semibold text-charcoal mb-1">Account data</h3>
                  <p>
                    When you register we collect your <strong>name</strong>, <strong>email address</strong>, and a
                    bcrypt-hashed password. We also record when your email was verified.
                    Legal basis: <em>Art. 6(1)(b) GDPR</em> — performance of a contract.
                  </p>
                </div>

                <div className="bg-coral/5 border-l-4 border-coral p-4 rounded-r-lg">
                  <h3 className="font-semibold text-charcoal mb-1">Health and nutrition data</h3>
                  <p>
                    The Intake Form and lesson homework may collect <strong>age, weight, height, dietary preferences,
                    medical conditions, activity levels, and health goals</strong>. This is special-category data
                    under Art. 9 GDPR.
                  </p>
                  <p className="mt-2">
                    We process it only on the basis of your <strong>explicit consent</strong> (Art. 9(2)(a) GDPR),
                    given by ticking the consent checkbox on the form. You may withdraw consent at any time —
                    this does not affect prior lawful processing.
                  </p>
                </div>

                <div className="bg-sunset/5 border-l-4 border-sunset p-4 rounded-r-lg">
                  <h3 className="font-semibold text-charcoal mb-1">Contact messages</h3>
                  <p>
                    Your name, email address, and message content submitted via the contact form.
                    Legal basis: <em>Art. 6(1)(b)</em> (responding to your enquiry).
                  </p>
                </div>

                <div className="bg-peach/5 border-l-4 border-peach p-4 rounded-r-lg">
                  <h3 className="font-semibold text-charcoal mb-1">Analytics cookies (optional)</h3>
                  <p>
                    With your <strong>consent</strong>, we use Vercel Analytics to understand how visitors use
                    the site. No personal identifiers are stored. Legal basis: <em>Art. 6(1)(a)</em> — consent,
                    given via the cookie banner. You may withdraw consent at any time via the cookie preference
                    link in the footer.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">3. Minimum age</h2>
              <p>
                This service is directed at adults. In line with Section 31 of the Irish Data Protection
                Act 2018, you must be <strong>at least 16 years old</strong> to create an account. We do not
                knowingly collect data from anyone under 16.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">4. Data processors (third parties)</h2>
              <p className="mb-3">
                All third-party providers act as data processors on our instructions. We do not sell your data.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-2 border border-beige">Processor</th>
                      <th className="text-left p-2 border border-beige">Purpose</th>
                      <th className="text-left p-2 border border-beige">Location</th>
                      <th className="text-left p-2 border border-beige">Transfer safeguard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-beige">Supabase</td>
                      <td className="p-2 border border-beige">Database hosting</td>
                      <td className="p-2 border border-beige">EU (Frankfurt)</td>
                      <td className="p-2 border border-beige">EEA — no transfer</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2 border border-beige">Vercel</td>
                      <td className="p-2 border border-beige">Web hosting &amp; CDN</td>
                      <td className="p-2 border border-beige">US / EU edge</td>
                      <td className="p-2 border border-beige">Standard Contractual Clauses</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-beige">Resend</td>
                      <td className="p-2 border border-beige">Transactional email</td>
                      <td className="p-2 border border-beige">US</td>
                      <td className="p-2 border border-beige">Standard Contractual Clauses</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-2 border border-beige">Vercel Analytics</td>
                      <td className="p-2 border border-beige">Website analytics</td>
                      <td className="p-2 border border-beige">US / EU edge</td>
                      <td className="p-2 border border-beige">Consent-gated; no personal IDs stored</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">5. Retention periods</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Account data</strong> — active account, or up to 3 years after last login.</li>
                <li><strong>Health &amp; nutrition data</strong> — until account deletion or consent withdrawal.</li>
                <li><strong>Contact / homework emails</strong> — up to 2 years in our email inbox.</li>
                <li><strong>Verification tokens</strong> — 24 hours from creation, then auto-deleted.</li>
                <li><strong>Server logs</strong> — deleted by Vercel after 30 days.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">6. Your rights</h2>
              <p>Under GDPR and the Irish Data Protection Act 2018, you have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                <li><strong>Access</strong> — request a copy of the data we hold about you.</li>
                <li><strong>Rectification</strong> — ask us to correct inaccurate data.</li>
                <li><strong>Erasure</strong> — request deletion of your account and data (also available in settings).</li>
                <li><strong>Restriction</strong> — ask us to limit processing in certain circumstances.</li>
                <li><strong>Portability</strong> — receive your data in a machine-readable format.</li>
                <li><strong>Object</strong> — object to processing based on legitimate interests.</li>
                <li><strong>Withdraw consent</strong> — for any consent-based processing, at any time.</li>
              </ul>
              <p className="mt-3">
                To exercise any right, email{' '}
                <a href="mailto:loveeatkeepfitblog@gmail.com" className="text-leaf underline hover:text-darkgreen">
                  loveeatkeepfitblog@gmail.com
                </a>
                . We will respond within one month.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">7. Security measures</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Passwords hashed with bcrypt (work factor 12).</li>
                <li>All connections encrypted via TLS 1.2 / 1.3 (HTTPS enforced).</li>
                <li>Database hosted in the EU (Supabase, Frankfurt).</li>
                <li>Rate limiting, account lockout (10 attempts → 30 min), and CSRF origin checks on all forms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">8. Cookies</h2>
              <p>
                See our{' '}
                <Link href="/cookies" className="text-leaf underline hover:text-darkgreen">
                  Cookie Policy
                </Link>{' '}
                for full details. Strictly necessary cookies operate without consent; analytics cookies require
                your opt-in.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">9. Complaints</h2>
              <p>
                If you are unhappy with how we handle your data, please contact us first. You also have the right
                to lodge a complaint with the Irish supervisory authority:
              </p>
              <p className="mt-2">
                <strong>Data Protection Commission (DPC)</strong><br />
                21 Fitzwilliam Square South, Dublin 2, D02 RD28, Ireland<br />
                <a
                  href="https://www.dataprotection.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-leaf underline hover:text-darkgreen"
                >
                  www.dataprotection.ie
                </a>
              </p>
            </section>

            <section className="bg-darkgreen/5 border border-darkgreen/20 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">10. Changes to this policy</h2>
              <p>
                We may update this policy periodically. Material changes will be notified by email or a
                prominent in-app notice. The &ldquo;Last updated&rdquo; date at the top of this page reflects
                the most recent revision.
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