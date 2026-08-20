"use client";

const citations = [
  {
    source: "Aristotle",
    work: "Nicomachean Ethics",
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    context: "The seven virtues framework is rooted in Aristotelian virtue ethics, which emphasizes character development through practice."
  },
  {
    source: "Positive Psychology Research",
    work: "Peterson & Seligman (2004)",
    quote: "Character strengths and virtues are the psychological ingredients for a flourishing life.",
    context: "The VIA Classification of Character Strengths provides the scientific foundation for measuring virtue-based personality traits."
  },
  {
    source: "Journal of Personality Assessment",
    work: "Park et al. (2004)",
    quote: "Character strengths are positively associated with life satisfaction, happiness, and meaning in life.",
    context: "Empirical research validates that virtue-based assessments predict real-world outcomes and well-being."
  }
];

export default function Citations() {
  return (
    <section className="py-16 relative" style={{background: 'var(--bg-primary)', borderTop: '1px solid var(--border-primary)'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{background: 'rgba(78,205,196,0.08)', border: '1px solid rgba(78,205,196,0.15)'}}>
            <span className="text-xs font-mono font-medium" style={{color: '#4ECDC4'}}>Research & Sources</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-3" style={{color: 'var(--text-primary)'}}>
            Grounded in Science
          </h2>
          <p className="text-sm max-w-2xl mx-auto" style={{color: 'var(--text-secondary)'}}>
            Our seven-virtue framework combines ancient wisdom with modern psychological research.
          </p>
        </div>

        {/* Citations */}
        <div className="space-y-6">
          {citations.map((cite, i) => (
            <div key={i} className="rounded-xl p-5" style={{background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)'}}>
              <blockquote className="text-base italic mb-3" style={{color: 'var(--text-primary)'}}>
                "{cite.quote}"
              </blockquote>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold" style={{color: 'var(--text-primary)'}}>{cite.source}</p>
                  <p className="text-xs" style={{color: 'var(--text-muted)'}}>{cite.work}</p>
                </div>
                <p className="text-xs leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                  {cite.context}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Attribution */}
        <div className="mt-8 text-center">
          <p className="text-xs" style={{color: 'var(--text-muted)'}}>
            VirtuesExtractor is an independent project inspired by these frameworks. Not affiliated with any academic institution.
          </p>
        </div>
      </div>
    </section>
  );
}
