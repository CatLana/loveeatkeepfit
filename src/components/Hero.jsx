import Image from "next/image";

export default function Hero({ content, primaryCtaHref }) {
  return (
    <section id="home" className="pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">
            Love Eat Keep Fit
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-charcoal md:text-6xl">
            {content.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/80 md:text-xl">
            {content.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={primaryCtaHref}
              className="rounded-full bg-darkgreen px-8 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-coral"
            >
              {content.ctaPrimary}
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute -inset-6 rounded-3xl bg-peach/30" />
          <Image
            src="/images/profile.jpg"
            alt="Lana profile"
            width={360}
            height={460}
            className="relative rounded-3xl object-cover shadow-soft"
            priority
          />
        </div>
      </div>
    </section>
  );
}
