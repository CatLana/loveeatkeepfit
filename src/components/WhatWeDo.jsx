export default function WhatWeDo({ content }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-semibold text-charcoal">
          {content.heading}
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {content.items.map((item) => (
            <li key={item} className="rounded-2xl border border-beige bg-white p-5">
              <p className="text-sm text-charcoal/80">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
