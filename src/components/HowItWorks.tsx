"use client";

const steps = [
  {
    num: "01",
    title: "Answer 66 Scenarios",
    desc: "Real-life situations, not abstract questions. Every answer adjusts all seven virtue scores at once.",
    mockup: "quiz",
  },
  {
    num: "02",
    title: "See Your Seven-Virtue Profile",
    desc: "A complete percentage breakdown — not a single label. See exactly where you shine and where you have room to grow.",
    mockup: "profile",
  },
  {
    num: "03",
    title: "Get AI Deep Analysis",
    desc: "Our AI reads your profile, asks follow-up questions, and builds a personalized interpretation based on your actual life.",
    mockup: "ai",
  },
];

function QuizMockup() {
  return (
    <div className="mockup-card">
      <div className="mockup-header">
        <span className="mockup-step">Question 23/66</span>
        <span className="mockup-badge">SCENARIO</span>
      </div>
      <p className="mockup-question">
        A friend shares an unpopular opinion. You disagree strongly. What do you do?
      </p>
      <div className="mockup-options">
        <div className="mockup-option selected">
          <span className="option-letter">A</span>
          <span>Listen fully, then share your view</span>
        </div>
        <div className="mockup-option">
          <span className="option-letter">B</span>
          <span>Stay quiet to avoid conflict</span>
        </div>
        <div className="mockup-option">
          <span className="option-letter">C</span>
          <span>Challenge them directly</span>
        </div>
      </div>
    </div>
  );
}

function ProfileMockup() {
  const virtues = [
    { name: "Determination", score: 89, color: "#ff2d55" },
    { name: "Bravery", score: 72, color: "#ff9500" },
    { name: "Justice", score: 68, color: "#ffcc00" },
    { name: "Kindness", score: 85, color: "#34c759" },
    { name: "Patience", score: 45, color: "#00d4aa" },
    { name: "Integrity", score: 91, color: "#007aff" },
    { name: "Perseverance", score: 63, color: "#af52de" },
  ];

  return (
    <div className="mockup-card mockup-profile">
      <div className="mockup-header">
        <span className="mockup-step">Your Virtue Profile</span>
        <span className="mockup-badge live">COMPLETE</span>
      </div>
      <div className="virtue-bars">
        {virtues.map((v) => (
          <div key={v.name} className="virtue-bar-row">
            <span className="virtue-name">{v.name}</span>
            <div className="virtue-bar-track">
              <div
                className="virtue-bar-fill"
                style={{ width: `${v.score}%`, background: v.color, boxShadow: `0 0 8px ${v.color}66` }}
              ></div>
            </div>
            <span className="virtue-score" style={{ color: v.color }}>{v.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIMockup() {
  return (
    <div className="mockup-card mockup-ai">
      <div className="mockup-header">
        <span className="mockup-step">AI Deep Analysis</span>
        <span className="mockup-badge live">LIVE</span>
      </div>
      <div className="ai-chat">
        <div className="ai-msg">
          <div className="ai-avatar">AI</div>
          <div className="ai-bubble">
            Your Integrity score (91%) is exceptionally high. Combined with your Determination (89%), 
            this suggests you hold strong internal standards and rarely compromise — even when it costs you. 
            Your lowest virtue, Patience (45%), tells me you act fast and expect others to keep up...
          </div>
        </div>
        <div className="ai-msg followup">
          <div className="ai-avatar q">Q</div>
          <div className="ai-bubble">
            When was the last time your patience was truly tested? What happened?
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const mockups = { quiz: QuizMockup, profile: ProfileMockup, ai: AIMockup };

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">HOW IT WORKS</span>
          <h2>From question to insight in 8 minutes</h2>
          <p className="section-sub">Three steps. No sign-up. A result you&apos;ll actually think about.</p>
        </div>
        <div className="steps-grid">
          {steps.map((step) => {
            const MockupComponent = mockups[step.mockup as keyof typeof mockups];
            return (
              <div key={step.num} className="step-card">
                <div className="step-left">
                  <span className="step-num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                <div className="step-right">
                  <MockupComponent />
                </div>
              </div>
            );
          })}
        </div>
        <div className="section-cta">
          <a href="#pricing" className="btn-primary btn-lg">Start Your Soul Journey</a>
        </div>
      </div>
    </section>
  );
}
