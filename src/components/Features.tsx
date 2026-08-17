"use client";

const features = [
  {
    title: "Seven-Virtue Scoring",
    description: "Not a single label. A full percentage spread across all seven soul virtues — see your complete profile at a glance.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="14" width="4" height="12" rx="2" fill="#ff2d55"/>
        <rect x="8" y="10" width="4" height="16" rx="2" fill="#ff9500"/>
        <rect x="14" y="6" width="4" height="20" rx="2" fill="#ffcc00"/>
        <rect x="20" y="2" width="4" height="24" rx="2" fill="#34c759"/>
      </svg>
    ),
  },
  {
    title: "AI Deep Analysis",
    description: "Other tests stop at the score. We start there. Our AI asks follow-up questions and builds an interpretation that fits your life.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="6" stroke="#00d4aa" strokeWidth="2" fill="none"/>
        <path d="M14 16v4M10 22h8" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="14" cy="10" r="2" fill="#00d4aa" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: "30-Day Growth Plan",
    description: "Your lowest virtue isn't a flaw — it's your next frontier. Get a custom daily plan built around your real schedule.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
        <path d="M4 22L10 14L15 18L24 6" stroke="#ffcc00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="6" r="2.5" fill="#ffcc00"/>
      </svg>
    ),
  },
  {
    title: "Family Circles",
    description: "Invite your family, partner, or closest friends. See how your virtues connect, complement, and challenge each other.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="8" r="3.5" stroke="#ff2d55" strokeWidth="1.8" fill="none"/>
        <circle cx="18" cy="8" r="3.5" stroke="#00d4aa" strokeWidth="1.8" fill="none"/>
        <circle cx="14" cy="17" r="3.5" stroke="#ffcc00" strokeWidth="1.8" fill="none"/>
        <path d="M12 13l-1 2M16 13l1 2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Share Results",
    description: "Generate beautiful result cards for Instagram, Twitter, or TikTok. Show the world your soul virtues.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="18" rx="3" stroke="#007aff" strokeWidth="1.8" fill="none"/>
        <path d="M3 18l6-5 4 3 5-6 7 8" stroke="#007aff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="9" cy="11" r="2" fill="#ff2d55"/>
      </svg>
    ),
  },
  {
    title: "100% Private",
    description: "Start immediately. No account needed. Your results stay on your device until you choose to share.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
        <rect x="7" y="12" width="14" height="12" rx="2" stroke="#ffcc00" strokeWidth="1.8" fill="none"/>
        <path d="M10 12V9a4 4 0 018 0v3" stroke="#ffcc00" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <circle cx="14" cy="18" r="1.5" fill="#ffcc00"/>
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section>
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">FEATURES</span>
          <h2>More than a personality test</h2>
          <p className="section-sub">A tool for understanding yourself — and growing from it</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Souls Analyzed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.8/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">66</div>
            <div className="stat-label">Questions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">7</div>
            <div className="stat-label">Virtues Measured</div>
          </div>
        </div>
      </div>
    </section>
  );
}
