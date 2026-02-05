export default function StoryBlock({ content }) {
  return (
    <section id="about" className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold text-charcoal">
          {content.heading}
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal/80">
          <p>{content.paragraph1}</p>
          <p>{content.paragraph2}</p>
        </div>
      </div>
    </section>
  );
}
