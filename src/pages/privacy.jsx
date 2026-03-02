import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import { useState, useEffect } from "react";
import en from "@/i18n/en.json";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" }
];

export default function PrivacyPolicy() {
  const [locale, setLocale] = useState("en");
  const content = en;

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <div className="min-h-screen bg-warmwhite">
      <Head>
        <title>Privacy Policy — Love. Eat. Keep Fit.</title>
        <meta name="description" content="Learn how we collect, use, and protect your personal information when you use our services." />
        <meta property="og:title" content="Privacy Policy — Love. Eat. Keep Fit." />
        <meta property="og:description" content="Learn how we collect, use, and protect your personal information when you use our services." />
        <meta property="og:type" content="website" />
      </Head>

      <Header navItems={navItems} locale={locale} onLocaleChange={setLocale} />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-charcoal md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-charcoal/80">
              How we collect, use, and protect your personal information
            </p>
            <p className="mt-2 text-sm text-charcoal/60">
              Effective Date: March 2, 2026
            </p>
          </div>

          <div className="prose prose-lgmax-w-none">
            <div className="bg-white rounded-2xl border border-beige p-8 shadow-soft space-y-8">
              
              <section>
                <h2 className="text-2xl font-semibold text-darkgreen mb-4">Introduction</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  At Love. Eat. Keep Fit., we respect your privacy and are committed to protecting your personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-darkgreen mb-4">What Information We Collect</h2>
                <div className="space-y-4">
                  <div className="bg-leaf/5 border-l-4 border-leaf p-4 rounded-r-lg">
                    <h3 className="font-semibold text-charcoal mb-2">Personal Information from Forms</h3>
                    <p className="text-charcoal/80">
                      When you fill out our intake or contact forms, we collect information such as your name, email address, 
                      phone number, health and lifestyle data, goals, and any other details you choose to share with us.
                    </p>
                  </div>
                  <div className="bg-coral/5 border-l-4 border-coral p-4 rounded-r-lg">
                    <h3 className="font-semibold text-charcoal mb-2">Browser Storage</h3>
                    <p className="text-charcoal/80">
                      We store your language preference (English, Italian, or Russian) in your browser's localStorage. 
                      This helps us remember your preferred language for a better user experience. We do not use any other 
                      cookies or tracking technologies.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-darkgreen mb-4">How We Use Your Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-sunset/5 border border-sunset/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-charcoal mb-2">Service Delivery</h3>
                    <p className="text-sm text-charcoal/80">
                      To respond to your inquiries and provide personalized coaching services
                    </p>
                  </div>
                  <div className="bg-peach/5 border border-peach/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-charcoal mb-2">Personalization</h3>
                    <p className="text-sm text-charcoal/80">
                      To customize your experience on our website (like remembering your language preference)
                    </p>
                  </div>
                  <div className="bg-leaf/5 border border-leaf/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-charcoal mb-2">Improvement</h3>
                    <p className="text-sm text-charcoal/80">
                      To enhance our services and website based on your feedback and usage patterns
                    </p>
                  </div>
                  <div className="bg-coral/5 border border-coral/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-charcoal mb-2">Communication</h3>
                    <p className="text-sm text-charcoal/80">
                      To send you important updates about our services when necessary
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-darkgreen mb-4">How We Protect Your Data</h2>
                <div className="bg-darkgreen/5 border border-darkgreen/20 p-6 rounded-lg">
                  <p className="text-charcoal/80 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information 
                    from unauthorized access, alteration, disclosure, or destruction. Your data is transmitted securely 
                    and stored with industry-standard protection measures.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-darkgreen mb-4">Data Sharing</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We do not sell or share your personal data with third parties for marketing purposes. We may share 
                  your information only when required by law or as necessary to provide our services (such as using 
                  email delivery providers to send you our responses).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-darkgreen mb-4">Your Rights</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-leaf rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-charcoal/80">Request access to the personal data we hold about you</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-leaf rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-charcoal/80">Request correction of inaccurate or incomplete data</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-leaf rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-charcoal/80">Request deletion of your personal data</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-leaf rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-charcoal/80">Withdraw your consent at any time</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-darkgreen mb-4">Policy Updates</h2>
                <p className="text-charcoal/80 leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
                  When we make significant changes, we will notify you by updating the effective date at the top of this policy.
                </p>
              </section>

              <section className="bg-darkgreen/5 border border-darkgreen/20 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-darkgreen mb-4">Contact Us</h2>
                <p className="text-charcoal/80 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-charcoal/80">
                    <span className="font-semibold">Email:</span> loveeatkeepfitblog@gmail.com
                  </p>
                  <p className="text-charcoal/80">
                    <span className="font-semibold">Response Time:</span> We will respond to your request within 30 days
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer footer={content.footer} social={content.social} />
      <ScrollTopButton />
    </div>
  );
}