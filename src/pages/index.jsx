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
    about: "About",
    method: "Method",
    join: "Join",
    contact: "Contact",
    howItWorks: "How it works"
  },
  it: {
    home: "Home",
    about: "Chi sono",
    method: "Metodo",
    join: "Partecipa",
    contact: "Contatti",
    howItWorks: "Come funziona"
  },
  ru: {
    home: "Главная",
    about: "Обо мне",
    method: "Метод",
    join: "Записаться",
    contact: "Контакты",
    howItWorks: "Как это работает"
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
      { label: labels.about, href: "#about" },
      { label: labels.method, href: "#method" },
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

        <section id="method" className="bg-beige/40">
          <CoreOffer content={content.coreOffer} />
          <HowItWorks
            heading={labels.howItWorks}
            items={content.whatWeDo.items.slice(0, 4)}
          />
        </section>

        <WhatWeDo content={content.whatWeDo} />
        <section className="py-10">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-3xl border border-beige bg-white p-8 shadow-soft">
              <p className="text-base text-charcoal/80">{content.story.neuro}</p>
              <p className="mt-4 text-base text-charcoal/80">{content.story.mission}</p>
            </div>
          </div>
        </section>
        <FormSignup content={content.signup} social={content.social} />
      </main>

      <Footer footer={content.footer} social={content.social} />
      <ScrollTopButton />
    </div>
  );
}
