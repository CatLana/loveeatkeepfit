import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import en from "@/i18n/en.json";
import it from "@/i18n/it.json";
import ru from "@/i18n/ru.json";

const localeMap = { en, it, ru };

const navLabels = {
  en: {
    home: "Home",
    method: "Coaching",
    coachingIndividual: "1:1 Coaching",
    coachingPremium: "Premium In-Person",
    coachingDigital: "Digital Product",
    join: "Join",
    contact: "Contact"
  },
  it: {
    home: "Home",
    method: "Coaching",
    coachingIndividual: "Coaching 1:1",
    coachingPremium: "Premium in presenza",
    coachingDigital: "Prodotto digitale",
    join: "Partecipa",
    contact: "Contatti"
  },
  ru: {
    home: "Главная",
    method: "Коучинг",
    coachingIndividual: "1:1",
    coachingPremium: "Премиум вживую",
    coachingDigital: "Цифровой продукт",
    join: "Записаться",
    contact: "Контакты"
  }
};

export default function ContactPage() {
  const [locale, setLocale] = useState("en");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lekf-lang") : null;
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get("lang");
    const initial = paramLang || stored || "en";
    if (localeMap[initial]) {
      setLocale(initial);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("lekf-lang", locale);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", locale);
      window.history.replaceState({}, "", url.toString());
    }
  }, [locale]);

  const content = localeMap[locale] || en;
  const labels = navLabels[locale];
  const contactContent = content.contact;

  const navItems = useMemo(
    () => [
      { label: labels.home, href: "/#home" },
      {
        label: labels.method,
        href: "/coaching/individual",
        highlight: true,
        children: [
          { label: labels.coachingIndividual, href: "/coaching/individual", disabled: true },
          { label: labels.coachingPremium, href: "/coaching/premium", disabled: true },
          { label: labels.coachingDigital, href: "/coaching/digital", disabled: true }
        ]
      },
      { label: labels.join, href: "/#join" },
      { label: labels.contact, href: "/contact" }
    ],
    [labels]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warmwhite">
      <Head>
        <title>{contactContent?.metaTitle || "Contact — Love. Eat. Keep Fit."}</title>
        <meta name="description" content={contactContent?.metaDescription || "Get in touch with Love. Eat. Keep Fit. for questions about coaching and nutrition guidance."} />
        <meta property="og:title" content={contactContent?.metaTitle || "Contact — Love. Eat. Keep Fit."} />
        <meta property="og:description" content={contactContent?.metaDescription || "Get in touch with Love. Eat. Keep Fit. for questions about coaching and nutrition guidance."} />
        <meta property="og:type" content="website" />
      </Head>

      <Header navItems={navItems} locale={locale} onLocaleChange={setLocale} />

      <main className="pt-24">
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-charcoal md:text-5xl">
                {contactContent?.title || "Get in Touch"}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/80 md:text-xl">
                {contactContent?.subtitle || "Have questions about coaching or nutrition? I'd love to hear from you."}
              </p>
            </div>

            <div className="mt-12">
              <form onSubmit={handleSubmit} className="rounded-3xl border border-beige bg-white p-8 shadow-soft">
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
                        {contactContent?.form?.name || "Name"} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-xl border border-beige px-4 py-3 text-charcoal placeholder-charcoal/50 transition focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
                        placeholder={contactContent?.form?.namePlaceholder || "Your name"}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                        {contactContent?.form?.email || "Email"} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-xl border border-beige px-4 py-3 text-charcoal placeholder-charcoal/50 transition focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
                        placeholder={contactContent?.form?.emailPlaceholder || "your@email.com"}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-charcoal mb-2">
                      {contactContent?.form?.subject || "Subject"} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-beige px-4 py-3 text-charcoal placeholder-charcoal/50 transition focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
                      placeholder={contactContent?.form?.subjectPlaceholder || "What's this about?"}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
                      {contactContent?.form?.message || "Message"} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full rounded-xl border border-beige px-4 py-3 text-charcoal placeholder-charcoal/50 transition focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 resize-none"
                      placeholder={contactContent?.form?.messagePlaceholder || "Tell me about your question or how I can help..."}
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="rounded-xl bg-leaf/10 border border-leaf/20 p-4 text-leaf">
                      <p className="text-sm font-semibold">
                        {contactContent?.form?.successMessage || "Thank you! Your message has been sent successfully."}
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="rounded-xl bg-coral/10 border border-coral/20 p-4 text-coral">
                      <p className="text-sm font-semibold">
                        {contactContent?.form?.errorMessage || "Sorry, there was an error sending your message. Please try again."}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-darkgreen px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-coral disabled:bg-charcoal/50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting 
                      ? (contactContent?.form?.submitting || "Sending...")
                      : (contactContent?.form?.submit || "Send Message")
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer footer={content.footer} social={content.social} />
      <ScrollTopButton />
    </div>
  );
}