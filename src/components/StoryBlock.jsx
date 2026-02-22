export default function StoryBlock({ content }) {
  return (
    <section id="pain" className="py-12 bg-beige/30 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Problem Recognition Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-charcoal md:text-3xl">
            {content.heading}
          </h2>
          {content.intro && (
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80" dangerouslySetInnerHTML={{ __html: content.intro }}>
            </p>
          )}
        </div>

        {/* Challenges List */}
        {content.challenges && content.challenges.length > 0 && (
          <div className="mt-10 space-y-4">
            {content.challenges.map((challenge, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 rounded-lg ${
                  challenge.type === 'positive' 
                    ? 'bg-leaf/10 border border-leaf/20' 
                    : 'bg-coral/10 border border-coral/20'
                }`}
              >
                <div className={`mt-1 text-lg ${
                  challenge.type === 'positive' ? 'text-leaf' : 'text-coral'
                }`}>
                  {challenge.type === 'positive' ? '✔' : '❌'}
                </div>
                <p className="text-base leading-relaxed text-charcoal" dangerouslySetInnerHTML={{ __html: challenge.text }}>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Empathy Section */}
        {content.empathy && (
          <div className="mt-12 text-center">
            <p className="text-lg font-medium text-charcoal" dangerouslySetInnerHTML={{ __html: content.empathy }}>
            </p>
          </div>
        )}

        {/* Solution Preview */}
        {content.solutionPreview && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow-soft md:p-8">
            <p className="text-base leading-relaxed text-charcoal/80" dangerouslySetInnerHTML={{ __html: content.solutionPreview }}>
            </p>
            {content.secret && (
              <p className="mt-4 text-lg font-semibold text-darkgreen" dangerouslySetInnerHTML={{ __html: content.secret }}>
              </p>
            )}
          </div>
        )}

        {/* What This Creates Section */}
        <div className="mt-16">
          {content.problemHeading && (
            <h3 className="text-xl font-semibold text-charcoal md:text-2xl" dangerouslySetInnerHTML={{ __html: content.problemHeading }}>
            </h3>
          )}
          {content.problemText && (
            <p className="mt-4 text-base leading-relaxed text-charcoal/80" dangerouslySetInnerHTML={{ __html: content.problemText }}>
            </p>
          )}

          {/* Solution Section */}
          {content.solutionHeading && (
            <h3 className="mt-10 text-xl font-semibold text-charcoal md:text-2xl" dangerouslySetInnerHTML={{ __html: content.solutionHeading }}>
            </h3>
          )}
          {content.solution && (
            <p className="mt-4 text-base leading-relaxed text-charcoal/80" dangerouslySetInnerHTML={{ __html: content.solution }}>
            </p>
          )}

          {/* Benefits List */}
          {content.benefits && content.benefits.length > 0 && (
            <ul className="mt-6 space-y-3">
              {content.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 rounded-full bg-darkgreen" />
                  <p className="text-base leading-relaxed text-charcoal/80" dangerouslySetInnerHTML={{ __html: benefit }}>
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* Outcome */}
          {content.outcome && (
            <p className="mt-8 text-base font-medium leading-relaxed text-charcoal" dangerouslySetInnerHTML={{ __html: content.outcome }}>
            </p>
          )}

          {/* CTA */}
          {content.ctaLabel && content.ctaHref && (
            <div className="mt-10 text-center">
              <a
                href={content.ctaHref}
                className="inline-flex rounded-full bg-darkgreen px-8 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-coral"
              >
                {content.ctaLabel}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
