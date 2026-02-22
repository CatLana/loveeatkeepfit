import Image from "next/image";

export default function Hero({ content, primaryCtaHref }) {
  return (
    <section id="home" className="pt-20">
      <span id="about" className="sr-only">
        About
      </span>
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-leaf">
            {content.eyebrow}
          </p>
          
          {/* Profile Image */}
          <div className="mt-6 relative">
            <div className="w-24 h-24 mx-auto">
              <Image
                src="/images/profile.jpg"
                alt="Lana profile"
                width={96}
                height={96}
                className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-peach/30"
                priority
              />
            </div>
          </div>
          
          <h1 className="mt-6 text-4xl font-semibold text-charcoal md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-charcoal max-w-3xl">
            {content.subtitle}
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {content.painPoints && content.painPoints.map((point, index) => (
            <p key={index} className="text-lg leading-relaxed text-charcoal/80">
              {point}
            </p>
          ))}
        </div>

        {content.solution && (
          <p className="mt-8 text-lg leading-relaxed text-charcoal font-medium" dangerouslySetInnerHTML={{ __html: content.solution }}>
          </p>
        )}

        {content.promise && (
          <p className="mt-6 text-lg leading-relaxed text-charcoal/80" dangerouslySetInnerHTML={{ __html: content.promise }}>
          </p>
        )}

        {content.experience && (
          <p className="mt-6 text-base leading-relaxed text-charcoal/70">
            {content.experience}
          </p>
        )}

        {content.goal && (
          <p className="mt-6 text-base leading-relaxed text-charcoal/70">
            {content.goal}
          </p>
        )}

        <div className="mt-10 text-center">
          <a
            href={primaryCtaHref}
            className="inline-block rounded-full bg-darkgreen px-10 py-4 text-lg font-semibold text-white shadow-soft transition hover:bg-coral"
          >
            {content.ctaPrimary}
          </a>
        </div>
      </div>
    </section>
  );
}
