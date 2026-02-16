import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header({ navItems, locale, onLocaleChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warmwhite/90 backdrop-blur border-b border-beige">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between md:justify-start md:gap-6">
          <Link href="/#home" className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="Love Eat Keep Fit"
              width={44}
              height={44}
              className="rounded-full object-cover"
              priority
            />
            <span className="font-heading text-lg font-semibold text-charcoal">
              Love Eat Keep Fit
            </span>
          </Link>
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />
        </div>
        <Nav items={navItems} />
      </div>
    </header>
  );
}
