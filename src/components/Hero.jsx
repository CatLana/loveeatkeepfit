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
          <div className="relative px-6 py-8 md:px-10 md:py-12">
            {/* Image and Intro Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
              {/* Text Content - First on mobile */}
              <div className="flex-1 text-center md:text-left max-w-xl lg:max-w-2xl order-1 md:order-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-charcoal leading-tight">
                  <span className="block">Hi, I'm</span>
                  <span className="block text-coral">Lana,</span>
                  <span className="block text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-charcoal/80 mt-1">
                    creator of Love Eat Keep Fit.
                  </span>
                </h1>
                
                {/* Decorative elements */}
                <div className="mt-6 flex items-center justify-center md:justify-start gap-2">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-coral rounded-full"></div>
                  <div className="w-2 h-2 bg-coral rounded-full"></div>
                  <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-coral rounded-full"></div>
                </div>
              </div>

              {/* Profile Image - Second on mobile, first on desktop */}
              <div className="flex-shrink-0 order-2 md:order-1">
                <div className="w-48 h-60 md:w-56 md:h-72 lg:w-64 lg:h-80 mx-auto md:mx-0">
                  <Image
                    src="/images/profile.jpg"
                    alt="Lana profile"
                    width={256}
                    height={320}
                    className="w-full h-full rounded-xl object-cover object-top shadow-lg"
                    priority
                  />
                </div>
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
