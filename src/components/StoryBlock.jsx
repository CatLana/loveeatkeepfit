export default function StoryBlock({ content }) {
  const icons = [
    (
      <svg
        key="time"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    (
      <svg
        key="pause"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 8.5v7" />
        <path d="M14.5 8.5v7" />
      </svg>
    ),
    (
      <svg
        key="taste"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-sunset"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4 5h16" />
        <path d="M6 5l2 14h8l2-14" />
        <path d="M9 9h6" />
      </svg>
    ),
    (
      <svg
        key="cart"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="9" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
        <path d="M3 5h2l2.5 10h10.5l2-7H7" />
      </svg>
    ),
    (
      <svg
        key="list"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 9h8" />
        <path d="M8 13h8" />
      </svg>
    ),
    (
      <svg
        key="reset"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-sunset"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v6h6" />
      </svg>
    ),
    (
      <svg
        key="protein"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M7 8c0 3 2.5 5 5 5s5-2 5-5" />
        <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
      </svg>
    ),
    (
      <svg
        key="no-workout"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8" />
        <path d="M7 7l10 10" />
      </svg>
    )
  ];

  return (
    <section id="pain" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-charcoal md:text-3xl">
          {content.heading}
        </h2>
        {content.short && (
          <p className="mt-4 text-base font-semibold text-charcoal md:text-base">
            {content.short}
          </p>
        )}
        <div className="mt-5 space-y-5 text-base leading-relaxed text-charcoal/80 md:mt-6 md:space-y-6 md:text-base">
          {content.problemHeading && (
            <h3 className="text-base font-semibold text-charcoal md:text-lg">
              {content.problemHeading}
            </h3>
          )}
          {content.problemText && <p>{content.problemText}</p>}
          {content.painHeading && (
            <h3 className="text-base font-semibold text-charcoal md:text-lg">
              {content.painHeading}
            </h3>
          )}
          {content.painPoints && content.painPoints.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {content.painPoints.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="rounded-2xl border border-beige bg-white p-4 shadow-soft md:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-peach/30">
                      {icons[index]}
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-semibold text-charcoal md:text-lg">
                        {item.title}
                      </p>
                      <p className="text-sm leading-relaxed text-charcoal/80 md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {content.empathyHeading && (
            <h3 className="text-base font-semibold text-charcoal md:text-lg">
              {content.empathyHeading}
            </h3>
          )}
          {content.empathyText && <p>{content.empathyText}</p>}
          {content.consequenceHeading && (
            <h3 className="text-base font-semibold text-charcoal md:text-lg">
              {content.consequenceHeading}
            </h3>
          )}
          {content.consequenceText && <p>{content.consequenceText}</p>}
          {content.solutionHeading && (
            <h3 className="text-base font-semibold text-charcoal md:text-lg">
              {content.solutionHeading}
            </h3>
          )}
          {content.solution && <p>{content.solution}</p>}
          {content.bridgeHeading && (
            <h3 className="text-base font-semibold text-charcoal md:text-lg">
              {content.bridgeHeading}
            </h3>
          )}
          {content.bridge && <p>{content.bridge}</p>}
          {content.ctaLabel && content.ctaHref && (
            <a
              href={content.ctaHref}
              className="inline-flex rounded-full bg-darkgreen px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-coral"
            >
              {content.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
