export default function Nav({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-3 text-xs font-medium text-charcoal md:gap-6 md:text-sm">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={
            item.highlight
              ? "rounded-full bg-peach/40 px-3 py-1 text-charcoal transition-colors hover:text-coral"
              : "transition-colors hover:text-coral"
          }
        >
          <span className="inline-flex items-center gap-2">
            {item.label}
            {item.highlight && (
              <span className="h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
            )}
          </span>
        </a>
      ))}
    </nav>
  );
}
