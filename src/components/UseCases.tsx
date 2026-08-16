"use client";

const useCases = [
  {
    title: "Self-Discovery",
    story: "I always thought I was just 'lazy' about my goals. The test showed me my Determination was actually 82% — but my Patience was only 23%. I wasn't lazy, I was impatient. That one insight changed how I approach everything.",
    virtue: "Determination · Patience",
    icon: "🔍",
  },
  {
    title: "Relationship Compatibility",
    story: "My partner and I kept fighting about the same things. When we compared results, the AI showed us exactly where we complement each other — and where the friction comes from. Now we have a shared language for our differences.",
    virtue: "Kindness · Justice",
    icon: "💑",
  },
  {
    title: "Family Growth",
    story: "We don't talk about feelings in my family. The family circle gave us a safe way to understand each other. My dad's Integrity score explained why he's so rigid about rules — and why that's actually a strength.",
    virtue: "Integrity · Perseverance",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    title: "Team Building",
    story: "Our team had blind spots we couldn't see. The team report showed us we were all high in Bravery but low in Patience. We were charging ahead without listening. Now we pause before acting.",
    virtue: "Bravery · Patience",
    icon: "🏢",
  },
];

export default function UseCases() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-h2 text-text-primary mb-4">
            Real Stories, Real Insights
          </h2>
          <p className="text-text-secondary text-body-lg max-w-2xl mx-auto">
            How people are using Soul Virtues Extractor to understand themselves and others
          </p>
        </div>

        {/* Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="card-dark p-8">
              {/* Icon */}
              <div className="text-4xl mb-4">{useCase.icon}</div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-h3 text-text-primary mb-2">
                {useCase.title}
              </h3>

              {/* Virtue */}
              <div className="text-neon-cyan text-sm font-semibold mb-4">
                {useCase.virtue}
              </div>

              {/* Story */}
              <p className="text-text-secondary text-body italic">
                &ldquo;{useCase.story}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
