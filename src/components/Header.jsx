import Nav from "@/components/Nav";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header({ navItems, locale, onLocaleChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warmwhite/90 backdrop-blur border-b border-beige">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="font-heading text-lg font-semibold text-charcoal">
          Love Eat Keep Fit
        </div>
        <Nav items={navItems} />
        <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
      </div>
    </header>
  );
}
