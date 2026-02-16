export default function WhatWeDo({ content }) {
  const icons = [
    (
      <svg
        key="goal"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
    (
      <svg
        key="calculator"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M8 8h8" />
        <path d="M8 12h3" />
        <path d="M13 12h3" />
        <path d="M8 16h3" />
        <path d="M13 16h3" />
      </svg>
    ),
    (
      <svg
        key="macros"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-sunset"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
      </svg>
    ),
    (
      <svg
        key="muscle"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M6 14c0 3 2 5 5 5h2c3 0 5-2 5-5" />
        <path d="M8 10c0-2 2-4 4-4s4 2 4 4" />
      </svg>
    ),
    (
      <svg
        key="brain"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M8 8a3 3 0 0 1 6 0" />
        <path d="M6 12a3 3 0 0 0 3 3h1" />
        <path d="M18 12a3 3 0 0 1-3 3h-1" />
        <path d="M9 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3" />
        <path d="M15 5a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3" />
      </svg>
    ),
    (
      <svg
        key="meal"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-sunset"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="13" r="5" />
        <path d="M4 13h16" />
      </svg>
    ),
    (
      <svg
        key="list"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M8 9h8" />
        <path d="M8 13h8" />
      </svg>
    ),
    (
      <svg
        key="checkin"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M7 12l2 2 4-4" />
      </svg>
    ),
    (
      <svg
        key="workout"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-sunset"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4 10v4" />
        <path d="M20 10v4" />
        <path d="M7 8v8" />
        <path d="M17 8v8" />
        <path d="M7 12h10" />
      </svg>
    ),
    (
      <svg
        key="walk"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7l-2 5 3 2-1 5" />
        <path d="M10 12H6" />
        <path d="M13 14l4 2" />
      </svg>
    ),
    (
      <svg
        key="metabolism"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M12 3c3 3 4 5 4 7a4 4 0 0 1-8 0c0-2 1-4 4-7z" />
        <path d="M8 17a4 4 0 0 0 8 0" />
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
            <li key={item} className="flex rounded-2xl border border-beige bg-white p-5">
              <div className="flex w-full flex-col items-center justify-center text-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warmwhite">
                  {icons[index]}
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
