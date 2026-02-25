import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StoryBlock from "@/components/StoryBlock";
import CoreOffer from "@/components/CoreOffer";
import HowItWorks from "@/components/HowItWorks";
import WhatWeDo from "@/components/WhatWeDo";
import FormSignup from "@/components/FormSignup";
import ScrollTopButton from "@/components/ScrollTopButton";
import Footer from "@/components/Footer";
import en from "@/i18n/en.json";
import it from "@/i18n/it.json";
import ru from "@/i18n/ru.json";

const localeMap = { en, it, ru };

const navLabels = {
  en: {
    home: "Home",
    method: "Coaching",
    coachingGroup: "Group Coaching",
    coachingIndividual: "1:1 Coaching",
    coachingPremium: "Premium In-Person",
    coachingDigital: "Digital Product",
    join: "Join",
    contact: "Contact",
    howItWorks: "How coaching works"
  },
  it: {
    home: "Home",
    method: "Coaching",
    coachingGroup: "Coaching di gruppo",
    coachingIndividual: "Coaching 1:1",
    coachingPremium: "Premium in presenza",
    coachingDigital: "Prodotto digitale",
    join: "Partecipa",
    contact: "Contatti",
    howItWorks: "Come funziona il coaching"
  },
  ru: {
    home: "Главная",
    method: "Коучинг",
    coachingGroup: "Групповой",
    coachingIndividual: "1:1",
    coachingPremium: "Премиум вживую",
    coachingDigital: "Цифровой продукт",
    join: "Записаться",
    contact: "Контакты",
    howItWorks: "Как проходит коучинг"
  }
};

export default function HomePage() {
  const [locale, setLocale] = useState("en");

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

  const navItems = useMemo(
    () => [
      { label: labels.home, href: "#home" },
      {
        label: labels.method,
        href: "/coaching/group",
        highlight: true,
        children: [
          { label: labels.coachingGroup, href: "/coaching/group" },
          { label: labels.coachingIndividual, href: "/coaching/individual" },
          { label: labels.coachingPremium, href: "/coaching/premium" },
          { label: labels.coachingDigital, href: "/coaching/digital" }
        ]
      },
      { label: labels.join, href: "#join" },
      { label: labels.contact, href: "#contact" }
    ],
    [labels]
  );

  return (
    <div className="min-h-screen bg-warmwhite">
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
        <meta property="og:title" content={content.meta.title} />
        <meta property="og:description" content={content.meta.description} />
        <meta property="og:type" content="website" />
        <link rel="alternate" hrefLang="en" href="https://loveeatkeepfit.ie/?lang=en" />
        <link rel="alternate" hrefLang="it" href="https://loveeatkeepfit.ie/?lang=it" />
        <link rel="alternate" hrefLang="ru" href="https://loveeatkeepfit.ie/?lang=ru" />
      </Head>

      <Header navItems={navItems} locale={locale} onLocaleChange={setLocale} />

      <main className="pt-10">
        {/* Opening Headline */}
        <section className="pt-20 pb-12 md:pb-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-leaf">
                {content.hero.eyebrow}
              </p>
              <h1 className="mt-6 text-4xl font-semibold text-charcoal md:text-5xl lg:text-6xl">
                Trying to lose weight but it never works?
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-charcoal max-w-3xl mx-auto" dangerouslySetInnerHTML={{ 
                __html: "Here at <span class='highlight highlight-leaf'>Love Eat Keep Fit</span> we have a solution for you. <span class='highlight highlight-coral'>Follow the program</span> to learn how to make food work for you and not against your body goals."
              }}>
              </p>
            </div>
          </div>
        </section>

        {/* Story Section with Pain Points List */}
        <StoryBlock content={content.story} />

        {/* Pain Points Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-coral/5 to-sunset/5">
          <div className="mx-auto max-w-4xl px-4">
            <div className="space-y-6">
              {content.hero.painPoints && content.hero.painPoints.map((point, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-coral/20 shadow-soft">
                    <div className="flex-shrink-0 w-8 h-8 bg-coral/10 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
                      </svg>
                    </div>
                    <p className="text-lg leading-relaxed text-charcoal font-medium">
                      {point}
                    </p>
                  </div>
                  {/* Problem indicator */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-coral rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">!</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Banner with Profile */}
        <Hero
          content={content.hero}
          primaryCtaHref="#join"
        />

        <section id="approach" className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-semibold text-charcoal md:text-4xl">
              {content.approach.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/80" dangerouslySetInnerHTML={{ __html: content.approach.intro }}></p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {content.approach.points.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-beige bg-white p-6 shadow-soft"
                >
                  <p className="text-base font-semibold text-charcoal">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="coaching" className="bg-beige/40">
          <CoreOffer content={content.coreOffer} />
          <HowItWorks
            heading={labels.howItWorks}
            items={content.coachingFlow.items}
          />
        </section>

        <WhatWeDo content={content.whatWeDo} />
        <FormSignup content={content.signup} social={content.social} />
      </main>

      <Footer footer={content.footer} social={content.social} />
      <ScrollTopButton />
    </div>
  );
}
