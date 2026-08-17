"use client";

const cases = [
  {
    description: "'I didn't know why I kept burning out until I saw my Patience was 31% and my Determination was 94%. I was pushing too hard, too fast.'",
    person: "Marketing Manager, 28",
    initial: "M",
    color: "#ff2d55",
  },
  {
    description: "'My partner and I both took the test. Seeing our virtue profiles side by side explained 90% of our arguments.'",
    person: "Together 4 years",
    initial: "T",
    color: "#00d4aa",
  },
  {
    description: "\"The AI asked me a question about my childhood that I'd never considered. That's when the report stopped being a test and became a mirror.\"",
    person: "College Student, 21",
    initial: "C",
    color: "#ffcc00",
  },
];

export default function UseCases() {
  return (
    <section>
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">REAL STORIES</span>
          <h2>When people see their virtues</h2>
        </div>
        <div className="use-cases">
          {cases.map((c, i) => (
            <div key={i} className="use-case-card" style={{"--card-accent": c.color} as React.CSSProperties}>
              <p className="use-case-quote">{c.description}</p>
              <div className="use-case-author">
                <div className="author-avatar" style={{color: c.color, borderColor: c.color + "40"}}>{c.initial}</div>
                <div className="author-info">
                  <div className="author-name">{c.person}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
