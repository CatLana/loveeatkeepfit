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
        <Hero
          content={content.hero}
          primaryCtaHref="#join"
        />
        <StoryBlock content={content.story} />

        <section id="approach" className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-semibold text-charcoal md:text-4xl">
              {content.approach.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/80">
              {content.approach.intro}
            </p>
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
