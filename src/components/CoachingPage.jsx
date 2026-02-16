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
    coachingIndividual: "Coaching 1:1",
    coachingPremium: "Premium in presenza",
    coachingDigital: "Prodotto digitale",
    join: "Partecipa",
    contact: "Contatti"
  },
  ru: {
    home: "Главная",
    method: "Коучинг",
    coachingGroup: "Групповой",
    coachingIndividual: "1:1",
    coachingPremium: "Премиум вживую",
    coachingDigital: "Цифровой продукт",
    join: "Записаться",
    contact: "Контакты"
  }
};

export default function CoachingPage({ pageKey }) {
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
  const page = content.coachingPages?.[pageKey];

  const navItems = useMemo(
    () => [
      { label: labels.home, href: "/#home" },
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
      { label: labels.join, href: "/#join" },
      { label: labels.contact, href: "/#contact" }
    ],
    [labels]
  );

  if (!page) {
    return null;
  }

  const otherOptions = Object.entries(content.coachingPages)
    .filter(([key]) => key !== pageKey)
    .map(([key, value]) => ({ key, ...value }));

  return (
    <div className="min-h-screen bg-warmwhite">
      <Head>
        <title>{page.metaTitle || page.title}</title>
        <meta name="description" content={page.metaDescription || page.subtitle} />
        <meta property="og:title" content={page.metaTitle || page.title} />
        <meta property="og:description" content={page.metaDescription || page.subtitle} />
        <meta property="og:type" content="website" />
      </Head>

      <Header navItems={navItems} locale={locale} onLocaleChange={setLocale} />

      <main className="pt-24">
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-leaf">
              {content.coachingCommon?.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-charcoal md:text-5xl">
              {page.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/80 md:text-xl">
              {page.subtitle}
            </p>

            {page.freeNote && (
              <div className="mt-6 rounded-2xl border border-peach/50 bg-peach/20 p-5 text-charcoal">
                <p className="text-sm font-semibold uppercase tracking-wide text-coral">
                  {page.freeNote.label}
                </p>
                <p className="mt-2 text-base leading-relaxed text-charcoal/80">
                  {page.freeNote.text}
                </p>
              </div>
            )}

            {page.price && (
              <div className="mt-6 rounded-3xl border border-beige bg-white p-6 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-leaf">
                      {page.price.badge}
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold text-charcoal">
                      {page.price.current}
                    </h2>
                    <p className="mt-1 text-sm text-charcoal/70 line-through">
                      {page.price.original}
                    </p>
                  </div>
                  <a
                    href={page.price.ctaHref || page.ctaHref}
                    className="inline-flex rounded-full bg-darkgreen px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-coral"
                  >
                    {page.price.ctaLabel}
                  </a>
                </div>
                {page.price.note && (
                  <p className="mt-3 text-sm text-charcoal/80">
                    {page.price.note}
                  </p>
                )}
                {page.price.limit && (
                  <p className="mt-2 text-sm font-semibold text-coral">
                    {page.price.limit}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="py-8">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid gap-6">
              {page.sections.map((section) => (
                <div
                  key={section.heading}
                  className="rounded-3xl border border-beige bg-white p-6 shadow-soft"
                >
                  <h2 className="text-2xl font-semibold text-charcoal">
                    {section.heading}
                  </h2>
                  {section.body && (
                    <p className="mt-3 text-base leading-relaxed text-charcoal/80">
                      {section.body}
                    </p>
                  )}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 text-base text-charcoal/80">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="accent-dot mt-2 h-2 w-2 rounded-full" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-3xl border border-beige bg-white p-6 shadow-soft">
              <h3 className="text-2xl font-semibold text-charcoal">
                {page.ctaHeading}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal/80">
                {page.ctaText}
              </p>
              <a
                href={page.ctaHref}
                className="mt-6 inline-flex rounded-full bg-darkgreen px-8 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-coral"
              >
                {page.ctaLabel}
              </a>
            </div>
          </div>
        </section>

        {otherOptions.length > 0 && (
          <section className="pb-16">
            <div className="mx-auto max-w-5xl px-4">
              <h3 className="text-2xl font-semibold text-charcoal">
                {content.coachingCommon?.otherTitle}
              </h3>
              <p className="mt-3 text-base text-charcoal/80">
                {content.coachingCommon?.otherText}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {otherOptions.map((option) => (
                  <a
                    key={option.slug}
                    href={option.slug}
                    className="rounded-2xl border border-beige bg-white p-5 shadow-soft transition hover:-translate-y-0.5"
                  >
                    <p className="text-lg font-semibold text-charcoal">
                      {option.title}
                    </p>
                    <p className="mt-2 text-sm text-charcoal/80">
                      {option.short}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer footer={content.footer} social={content.social} />
      <ScrollTopButton />
    </div>
  );
}
