"use client";

const cases = [
  {
    title: "Career Decisions",
    description: "'I didn\'t know why I kept burning out until I saw my Patience was 31% and my Determination was 94%. I was pushing too hard, too fast.'",
    person: "Marketing Manager, 28",
    color: "#FF6B6B",
  },
  {
    title: "Relationship Clarity",
    description: "'My partner and I both took the test. Seeing our virtue profiles side by side explained 90% of our arguments.'",
    person: "Together 4 years",
    color: "#4ECDC4",
  },
  {
    title: "Self-Understanding",
    description: "\"The AI asked me a question about my childhood that I'd never considered. That's when the report stopped being a test and became a mirror.\"",
    person: "College Student, 21",
    color: "#FFE66D",
  },
];

export default function UseCases() {
  return (
    <section className="py-20 sm:py-28 relative" style={{background: 'var(--bg-primary)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{background: 'rgba(255,230,109,0.08)', border: '1px solid rgba(255,230,109,0.15)'}}>
            <span className="text-xs font-mono font-medium" style={{color: 'var(--color-secondary)'}}>REAL STORIES</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" style={{color: 'var(--text-primary)'}}>
            When people see their virtues
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <div key={i} className="card-dark p-6 flex flex-col">
              <div className="w-8 h-1 rounded-full mb-5" style={{background: c.color}}/>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{color: 'var(--text-secondary)', fontStyle: 'italic'}}>
                {c.description}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{background: `${c.color}20`, color: c.color}}>
                  {c.person.charAt(0)}
                </div>
                <span className="text-xs" style={{color: 'var(--text-muted)'}}>{c.person}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
