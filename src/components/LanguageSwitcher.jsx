const languageOptions = [
  { code: "en", label: "English", flag: "🇮🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "ru", label: "Русский", flag: "🇷🇺" }
];

export default function LanguageSwitcher({ locale, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {languageOptions.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => onChange(option.code)}
          aria-label={option.label}
          className={`flex h-9 w-9 items-center justify-center rounded-full border text-base leading-none transition ${
            locale === option.code
              ? "border-coral bg-peach/40"
              : "border-beige bg-white hover:border-coral"
          }`}
        >
          <span aria-hidden className="text-base leading-none">
            {option.flag}
          </span>
        </button>
      ))}
    </div>
  );
}
