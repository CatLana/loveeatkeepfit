export default function HowItWorks({ heading, items }) {
  return (
    <section className="pb-12 md:pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <h3 className="text-2xl font-semibold text-charcoal md:text-3xl">
          {heading}
        </h3>
        <div className="mt-6 grid gap-4">
          {items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex gap-4 rounded-2xl border border-beige bg-warmwhite p-5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sunset text-sm font-semibold text-charcoal">
                {index + 1}
              </div>
              <p className="text-base leading-relaxed text-charcoal/80">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
