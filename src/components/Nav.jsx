export default function Nav({ items }) {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-charcoal md:gap-6 md:text-sm">
      {items.map((item) => {
        const linkClass = item.highlight
          ? "inline-flex items-center rounded-full bg-peach/40 px-4 py-1.5 leading-none text-charcoal transition-colors hover:text-coral"
          : "transition-colors hover:text-coral";

        if (item.children && item.children.length > 0) {
          return (
            <div key={item.href} className="relative group pt-2 -mt-2">
              <a href={item.href} className={linkClass}>
                <span className="inline-flex items-center gap-2">
                  {item.highlight && (
                    <span className="accent-dot h-2 w-2 rounded-full" aria-hidden="true" />
                  )}
                  {item.label}
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3 w-3 text-charcoal/70"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.5 7.5l4.5 4.5 4.5-4.5" />
                  </svg>
                </span>
              </a>
              <div className="absolute left-0 top-full z-20 hidden w-56 rounded-2xl border border-beige bg-white p-2 shadow-soft group-hover:block group-focus-within:block">
                {item.children.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    className="block rounded-xl px-3 py-2 text-sm text-charcoal transition hover:bg-warmwhite hover:text-coral"
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          );
        }

        return (
          <a key={item.href} href={item.href} className={linkClass}>
            <span className="inline-flex items-center gap-2">
              {item.highlight && (
                <span className="accent-dot h-2 w-2 rounded-full" aria-hidden="true" />
              )}
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
