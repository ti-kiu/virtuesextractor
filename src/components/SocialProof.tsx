"use client";

const stats = [
  { number: "10,000+", label: "Souls Analyzed", color: "#FF6B6B" },
  { number: "4.8/5", label: "Average Rating", color: "#4ECDC4" },
  { number: "66", label: "Questions", color: "#FFE66D" },
  { number: "7", label: "Virtues Measured", color: "#A55EEA" },
];

export default function SocialProof() {
  return (
    <section className="py-16 relative overflow-hidden" style={{background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-primary)', borderBottom: '1px solid var(--border-primary)'}}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-heading font-bold text-3xl sm:text-4xl mb-1" style={{color: stat.color}}>
                {stat.number}
              </div>
              <div className="text-sm" style={{color: 'var(--text-muted)'}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
