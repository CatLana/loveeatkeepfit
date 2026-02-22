export default function CoreOffer({ content }) {
  const icons = [
    (
      <svg
        key="accountability"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 4v4" />
      </svg>
    ),
    (
      <svg
        key="community"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M4 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <path d="M14 16c0-2 1.7-3.5 3.8-3.5 1.2 0 2.2.4 2.9 1.1" />
      </svg>
    ),
    (
      <svg
        key="cooking"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-sunset"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4 8h16" />
        <path d="M6 8v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
        <path d="M9 5h6v3H9z" />
      </svg>
    ),
    (
      <svg
        key="shopping"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M6 8h12l-1 11H7L6 8z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    ),
    (
      <svg
        key="sustainable"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-coral"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4 14c6-8 12-8 16-8-1 7-5 13-12 14-2 .2-3-1.5-4-6z" />
        <path d="M9 17c2-2 5-4 7-5" />
      </svg>
    ),
    (
      <svg
        key="insight"
        viewBox="0 0 24 24"
        className="h-8 w-8 text-sunset"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="7" />
        <path d="M12 8v4l2.5 2" />
        <path d="M6 6l-2 2" />
        <path d="M18 6l2 2" />
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
                  {icons[index]}
                </div>
                <p className="text-base leading-relaxed text-charcoal/80 md:text-lg" dangerouslySetInnerHTML={{ __html: item }}></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
