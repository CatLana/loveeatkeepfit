import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import IntakeForm from "@/components/IntakeForm";
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
    coachingGroup: "Group Coaching",
    coachingIndividual: "1:1 Coaching",
    coachingPremium: "Premium In-Person",
    coachingDigital: "Digital Product",
    join: "Join",
    contact: "Contact"
  },
  it: {
    home: "Home",
    method: "Coaching",
    coachingGroup: "Coaching di gruppo",
    coachingIndividual: "Coaching Individuale",
    coachingPremium: "Premium in presenza",
    coachingDigital: "Prodotto digitale",
    join: "Partecipa",
    contact: "Contatti"
  },
  ru: {
    home: "Главная",
    method: "Коучинг",
    coachingGroup: "Групповой",
    coachingIndividual: "Индивидуальный коучинг",
    coachingPremium: "Премиум вживую",
    coachingDigital: "Цифровой продукт",
    join: "Записаться",
    contact: "Контакты"
  }
};

export default function IntakePage() {
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
      { label: labels.home, href: "/" },
      {
        label: labels.method,
        href: "/coaching/group",
        children: [
          { label: labels.coachingGroup, href: "/coaching/group" },
          { label: labels.coachingIndividual, href: "/coaching/individual" },
          { label: labels.coachingPremium, href: "/coaching/premium" },
          { label: labels.coachingDigital, href: "/coaching/digital" }
        ]
      },
      { label: labels.join, href: "/#join" },
      { label: labels.contact, href: "/#contact" }
    ],
    [labels]
  );

  return (
    <div className="min-h-screen bg-warmwhite">
      <Head>
        <title>Client Intake Form — Love Eat Keep Fit</title>
        <meta
          name="description"
          content="Complete your detailed intake form to receive personalized macro and calorie calculations for your coaching plan."
        />
        <meta property="og:title" content="Client Intake Form — Love Eat Keep Fit" />
        <meta
          property="og:description"
          content="Complete your detailed intake form to receive personalized macro and calorie calculations for your coaching plan."
        />
        <meta property="og:type" content="website" />
      </Head>

      <Header navItems={navItems} locale={locale} onLocaleChange={setLocale} />

      <main className="pt-10">
        <IntakeForm content={content} />
      </main>

      <Footer footer={content.footer} social={content.social} />
      <ScrollTopButton />
    </div>
  );
}
