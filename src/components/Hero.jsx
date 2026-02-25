import Image from "next/image";

export default function Hero({ content, primaryCtaHref }) {
  return (
    <section id="home" className="py-12 md:py-16 bg-gradient-to-br from-peach/10 to-sunset/10">
      <span id="about" className="sr-only">
        About
      </span>
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-soft">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-leaf/5 via-coral/5 to-sunset/5"></div>
          
          {/* Content */}
          <div className="relative px-8 py-12 md:px-12 md:py-16">
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 mx-auto">
                  <Image
                    src="/images/profile.jpg"
                    alt="Lana profile"
                    width={128}
                    height={128}
                    className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-peach/30"
                    priority
                  />
                </div>
              </div>
              
              <h2 className="mt-6 text-3xl md:text-4xl font-semibold text-charcoal">
                {content.title}
              </h2>
              
              {/* Decorative elements */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-coral rounded-full"></div>
                <div className="w-2 h-2 bg-coral rounded-full"></div>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-coral rounded-full"></div>
              </div>
            </div>

            <div className="mt-12 space-y-6 max-w-3xl mx-auto text-center">
              {content.solution && (
                <p className="text-lg leading-relaxed text-charcoal font-medium" dangerouslySetInnerHTML={{ __html: content.solution }}>
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

              <div className="mt-10">
                <a
                  href={primaryCtaHref}
                  className="inline-block rounded-full bg-darkgreen px-10 py-4 text-lg font-semibold text-white shadow-soft transition hover:bg-coral"
                >
                  {content.ctaPrimary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
