/**
 * Terms of Service
 * Governing law: Republic of Ireland
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

export default function TermsOfService() {
  const [locale, setLocale] = useState('en');
  const content = en;

  return (
    <div className="min-h-screen bg-warmwhite">
      <Head>
        <title>Terms of Service — Love. Eat. Keep Fit.</title>
        <meta name="description" content="Terms and conditions for using the Love. Eat. Keep Fit. nutrition coaching service." />
      </Head>

      <Header navItems={navItems} locale={locale} onLocaleChange={setLocale} />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-charcoal md:text-5xl">Terms of Service</h1>
            <p className="mt-4 text-lg text-charcoal/80">Please read these terms carefully before using our service.</p>
            <p className="mt-2 text-sm text-charcoal/60">Last updated: June 2025</p>
          </div>

          <div className="bg-white rounded-2xl border border-beige p-8 shadow-soft space-y-10 text-charcoal/80 leading-relaxed">

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">1. About us</h2>
              <p>
                Love. Eat. Keep Fit. is operated by <strong>We Make IT</strong>, a sole trader registered in
                Ireland, with a principal place of business at 32 Millbourne Drive, Ashbourne, Co. Meath, Ireland
                (<strong>&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;</strong>).
              </p>
              <p className="mt-2">
                Contact:{' '}
                <a href="mailto:loveeatkeepfitblog@gmail.com" className="text-leaf underline hover:text-darkgreen">
                  loveeatkeepfitblog@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">2. Acceptance of terms</h2>
              <p>
                By creating an account or using this service, you confirm that you have read, understood and
                agree to be bound by these Terms of Service and our{' '}
                <Link href="/privacy" className="text-leaf underline hover:text-darkgreen">Privacy Policy</Link>.
                If you do not agree, please do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">3. Eligibility</h2>
              <p>
                You must be <strong>at least 16 years old</strong> to use this service, in accordance with
                Section 31 of the Irish Data Protection Act 2018. By registering, you confirm that you meet
                this age requirement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">4. Description of service</h2>
              <p>
                Love. Eat. Keep Fit. provides online nutrition coaching, educational content, and wellness
                resources. The service includes interactive lessons, a recipe library, a food diary tool, and
                personal coaching support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">5. Health disclaimer</h2>
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg">
                <p className="font-semibold text-amber-900 mb-2">Important — please read carefully</p>
                <p className="text-amber-900">
                  The content provided through this service is for <strong>educational and informational
                  purposes only</strong>. It is <strong>not</strong> a substitute for professional medical
                  advice, diagnosis, or treatment. Always seek the advice of your physician or another
                  qualified health provider with any questions you may have regarding a medical condition or
                  dietary change. Never disregard professional medical advice or delay seeking it because of
                  something you have read on this website.
                </p>
                <p className="mt-2 text-amber-900">
                  If you have a medical condition, are pregnant, breastfeeding, or taking medication, please
                  consult your doctor before making any changes to your diet or exercise programme.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">6. Account responsibilities</h2>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>You must notify us immediately of any unauthorised use of your account.</li>
                <li>You must provide accurate, current information when registering.</li>
                <li>You must not share your account with others.</li>
                <li>You must not use the service to upload harmful, offensive, or illegal content.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">7. Intellectual property</h2>
              <p>
                All content on this website — including lesson materials, recipes, text, graphics, and
                branding — is the property of We Make IT and is protected by Irish and EU copyright law.
                You may not reproduce, distribute, or create derivative works without our express written
                permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">8. Limitation of liability</h2>
              <p>
                To the fullest extent permitted by Irish law, We Make IT shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from your use of
                the service or reliance on any content provided. Our total liability to you shall not exceed
                the amount you paid us in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">9. Termination</h2>
              <p>
                You may delete your account at any time from your account settings. We reserve the right to
                suspend or terminate your account if you breach these terms. Upon termination, your personal
                data will be handled in accordance with our{' '}
                <Link href="/privacy" className="text-leaf underline hover:text-darkgreen">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">10. Changes to the service</h2>
              <p>
                We reserve the right to modify or discontinue the service at any time. We will give
                reasonable notice of any material changes via email or in-app notification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">11. Governing law and disputes</h2>
              <p>
                These terms are governed by the laws of the <strong>Republic of Ireland</strong>. Any disputes
                arising from these terms shall be subject to the exclusive jurisdiction of the Irish courts.
                Nothing in these terms affects your statutory rights as a consumer under EU and Irish law.
              </p>
            </section>

            <section className="bg-darkgreen/5 border border-darkgreen/20 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-darkgreen mb-3">12. Contact</h2>
              <p>
                Questions about these terms? Contact us at{' '}
                <a href="mailto:loveeatkeepfitblog@gmail.com" className="text-leaf underline hover:text-darkgreen">
                  loveeatkeepfitblog@gmail.com
                </a>
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
