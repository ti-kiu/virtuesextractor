"use client";

const features = [
  {
    title: "Seven-Virtue Scoring",
    description: "Not a single label. A full percentage spread across all seven soul virtues — see your complete profile at a glance.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="14" width="4" height="12" rx="2" fill="#FF6B6B"/>
        <rect x="8" y="10" width="4" height="16" rx="2" fill="#FF9F43"/>
        <rect x="14" y="6" width="4" height="20" rx="2" fill="#FFE66D"/>
        <rect x="20" y="2" width="4" height="24" rx="2" fill="#4ECDC4"/>
      </svg>
    ),
    color: "#FF6B6B",
  },
  {
    title: "AI Deep Analysis",
    description: "Other tests stop at the score. We start there. Our AI asks follow-up questions and builds an interpretation that fits your life.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="6" stroke="#4ECDC4" strokeWidth="2" fill="none"/>
        <path d="M14 16v4M10 22h8" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="14" cy="10" r="2" fill="#4ECDC4" opacity="0.5"/>
        <path d="M6 18c0-2 2-4 4-4M22 18c0-2-2-4-4-4" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: "#4ECDC4",
  },
  {
    title: "30-Day Growth Plan",
    description: "Your lowest virtue isn't a flaw — it's your next frontier. Get a custom daily plan built around your real schedule.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22L10 14L15 18L24 6" stroke="#FFE66D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="6" r="2.5" fill="#FFE66D"/>
      </svg>
    ),
    color: "#FFE66D",
  },
  {
    title: "Family Circles",
    description: "Invite your family, partner, or closest friends. See how your virtues connect, complement, and challenge each other.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="8" r="3.5" stroke="#FF6B6B" strokeWidth="1.8" fill="none"/>
        <circle cx="18" cy="8" r="3.5" stroke="#4ECDC4" strokeWidth="1.8" fill="none"/>
        <circle cx="14" cy="17" r="3.5" stroke="#FFE66D" strokeWidth="1.8" fill="none"/>
        <path d="M12 13l-1 2M16 13l1 2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    color: "#FF6B6B",
  },
  {
    title: "Share Results",
    description: "Generate beautiful result cards for Instagram, Twitter, or TikTok. Show the world your soul virtues.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="18" rx="3" stroke="#4ECDC4" strokeWidth="1.8" fill="none"/>
        <path d="M3 18l6-5 4 3 5-6 7 8" stroke="#4ECDC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="9" cy="11" r="2" fill="#FF6B6B"/>
      </svg>
    ),
    color: "#4ECDC4",
  },
  {
    title: "100% Private",
    description: "Start immediately. No account needed. Your results stay on your device until you choose to share.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="7" y="12" width="14" height="12" rx="2" stroke="#FFE66D" strokeWidth="1.8" fill="none"/>
        <path d="M10 12V9a4 4 0 018 0v3" stroke="#FFE66D" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <circle cx="14" cy="18" r="1.5" fill="#FFE66D"/>
      </svg>
    ),
    color: "#FFE66D",
  },
];

export default function Features() {
  return (
    <section className="py-20 sm:py-28 relative" style={{background: 'var(--bg-primary)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{background: 'rgba(78,205,196,0.08)', border: '1px solid rgba(78,205,196,0.15)'}}>
            <span className="text-xs font-mono font-medium" style={{color: 'var(--color-accent)'}}>FEATURES</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" style={{color: 'var(--text-primary)'}}>
            More than a personality test
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{color: 'var(--text-secondary)'}}>
            A tool for understanding yourself — and growing from it
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div key={index} className="card-dark p-6 group cursor-default">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                   style={{background: `${feature.color}12`}}>
                {feature.icon}
              </div>
              {/* Title */}
              <h3 className="font-heading font-semibold text-lg mb-2" style={{color: 'var(--text-primary)'}}>
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-sm leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
