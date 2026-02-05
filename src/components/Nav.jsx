export default function Nav({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-3 text-xs font-medium text-charcoal md:gap-6 md:text-sm">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="transition-colors hover:text-coral"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
