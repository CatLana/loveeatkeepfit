export default function CoreOffer({ content }) {
  const icons = [
    (
      <svg
        key="coaching"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="7" r="3" />
        <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
        <path d="M16 5h6v6" />
      </svg>
    ),
    (
      <svg
        key="growth"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4 18l6-6 4 4 6-8" />
        <path d="M4 6h6" />
      </svg>
    ),
    (
      <svg
        key="success"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-sunset"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M7 12l3 3 7-7" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    )
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-semibold text-charcoal md:text-4xl">
          {content.heading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {content.items.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-beige bg-white p-6 shadow-soft"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warmwhite">
                  {icons[index % icons.length]}
                </div>
                <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
