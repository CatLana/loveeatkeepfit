export default function CoreOffer({ content }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-semibold text-charcoal">
          {content.heading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {content.items.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-beige bg-white p-6 shadow-soft"
            >
              <p className="text-base text-charcoal/80">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
