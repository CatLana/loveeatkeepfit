export default function WhatWeDo({ content }) {
  const icons = [
    (
      <svg
        key="plan"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M8 6h8" />
        <path d="M8 10h8" />
        <path d="M8 14h5" />
        <rect x="5" y="4" width="14" height="16" rx="2" />
      </svg>
    ),
    (
      <svg
        key="cook"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4 8h16" />
        <path d="M6 8v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
        <path d="M9 4h6v4H9z" />
      </svg>
    ),
    (
      <svg
        key="support"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-sunset"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    )
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-semibold text-charcoal md:text-4xl">
          {content.heading}
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {content.items.map((item, index) => (
            <li key={item} className="rounded-2xl border border-beige bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-warmwhite">
                  {icons[index % icons.length]}
                </div>
                <p className="text-base leading-relaxed text-charcoal/80">
                  {item}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
