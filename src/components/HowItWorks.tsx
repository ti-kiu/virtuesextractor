"use client";

import Link from "next/link";

function QuizMockup() {
  return (
    <div className="rounded-xl overflow-hidden" style={{background: 'var(--bg-card)', border: '1px solid var(--border-primary)'}}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-primary)'}}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{background: '#FF5F57'}}/>
          <div className="w-2.5 h-2.5 rounded-full" style={{background: '#FFBD2E'}}/>
          <div className="w-2.5 h-2.5 rounded-full" style={{background: '#28CA41'}}/>
        </div>
        <span className="text-xs font-mono ml-2" style={{color: 'var(--text-muted)'}}>Question 23/66</span>
      </div>
      {/* Content */}
      <div className="p-5">
        <div className="text-xs font-mono mb-3" style={{color: 'var(--color-accent)'}}>SCENARIO</div>
        <p className="text-sm mb-5" style={{color: 'var(--text-primary)', lineHeight: '1.6'}}>
          A friend shares an unpopular opinion. You disagree strongly. What do you do?
        </p>
        <div className="space-y-2">
          {["Listen fully, then share your view", "Stay quiet to avoid conflict", "Challenge them directly"].map((opt, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                 style={{
                   background: i === 0 ? 'rgba(78,205,196,0.08)' : 'var(--bg-secondary)',
                   border: i === 0 ? '1px solid rgba(78,205,196,0.3)' : '1px solid var(--border-primary)',
                   color: i === 0 ? 'var(--color-accent)' : 'var(--text-secondary)',
                 }}>
              <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                   style={{borderColor: i === 0 ? 'var(--color-accent)' : 'var(--text-muted)'}}>
                {i === 0 && <div className="w-2 h-2 rounded-full" style={{background: 'var(--color-accent)'}}/>}
              </div>
              {opt}
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="mt-5 h-1 rounded-full overflow-hidden" style={{background: 'var(--bg-secondary)'}}>
          <div className="h-full rounded-full" style={{width: '35%', background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))'}}/>
        </div>
      </div>
    </div>
  );
}

function ResultMockup() {
  const virtues = [
    { name: "Determination", value: 89, color: "#FF6B6B" },
    { name: "Bravery", value: 72, color: "#FF9F43" },
    { name: "Justice", value: 68, color: "#FFE66D" },
    { name: "Kindness", value: 85, color: "#4ECDC4" },
    { name: "Patience", value: 45, color: "#45B7D1" },
    { name: "Integrity", value: 91, color: "#6C5CE7" },
    { name: "Perseverance", value: 63, color: "#A55EEA" },
  ];

  return (
    <div className="rounded-xl overflow-hidden" style={{background: 'var(--bg-card)', border: '1px solid var(--border-primary)'}}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-primary)'}}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{background: '#FF5F57'}}/>
          <div className="w-2.5 h-2.5 rounded-full" style={{background: '#FFBD2E'}}/>
          <div className="w-2.5 h-2.5 rounded-full" style={{background: '#28CA41'}}/>
        </div>
        <span className="text-xs font-mono ml-2" style={{color: 'var(--text-muted)'}}>Your Virtue Profile</span>
      </div>
      <div className="p-5">
        <div className="space-y-3">
          {virtues.map((v, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span style={{color: 'var(--text-secondary)'}}>{v.name}</span>
                <span className="font-mono font-bold" style={{color: v.color}}>{v.value}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{background: 'var(--bg-secondary)'}}>
                <div className="h-full rounded-full transition-all duration-1000" 
                     style={{width: `${v.value}%`, background: v.color, boxShadow: `0 0 8px ${v.color}40`}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIReportMockup() {
  return (
    <div className="rounded-xl overflow-hidden" style={{background: 'var(--bg-card)', border: '1px solid var(--border-primary)'}}>
      <div className="flex items-center gap-2 px-4 py-2.5" style={{background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-primary)'}}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{background: '#FF5F57'}}/>
          <div className="w-2.5 h-2.5 rounded-full" style={{background: '#FFBD2E'}}/>
          <div className="w-2.5 h-2.5 rounded-full" style={{background: '#28CA41'}}/>
        </div>
        <span className="text-xs font-mono ml-2" style={{color: 'var(--text-muted)'}}>AI Deep Analysis</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background: '#28CA41'}}/>
          <span className="text-[10px] font-mono" style={{color: '#28CA41'}}>LIVE</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{background: 'rgba(78,205,196,0.15)'}}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2.5" stroke="#4ECDC4" strokeWidth="1.2"/><path d="M1.5 11C1.5 8.5 3.5 7 6 7s4.5 1.5 4.5 4" stroke="#4ECDC4" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div className="text-xs font-mono mb-1" style={{color: 'var(--color-accent)'}}>AI ANALYST</div>
            <p className="text-xs leading-relaxed" style={{color: 'var(--text-secondary)'}}>
              Your Integrity score (91%) is exceptionally high. Combined with your Determination (89%), this suggests 
              you hold strong internal standards and rarely compromise — even when it costs you. Your lowest virtue, 
              Patience (45%), tells me you act fast and expect others to keep up...
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{background: 'rgba(255,107,107,0.15)'}}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#FF6B6B" strokeWidth="1.2"/><path d="M6 3.5V6.5M6 8.5V8.51" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div className="text-xs font-mono mb-1" style={{color: 'var(--color-primary)'}}>FOLLOW-UP QUESTION</div>
            <p className="text-xs" style={{color: 'var(--text-secondary)'}}>
              When was the last time your patience was truly tested? What happened?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Answer 66 Scenarios",
      description: "Real-life situations, not abstract questions. Every answer adjusts all seven virtue scores at once.",
      mockup: <QuizMockup />,
      color: "var(--color-accent)",
    },
    {
      number: "02",
      title: "See Your Seven-Virtue Profile",
      description: "A complete percentage breakdown — not a single label. See exactly where you shine and where you have room to grow.",
      mockup: <ResultMockup />,
      color: "var(--color-primary)",
    },
    {
      number: "03",
      title: "Get AI Deep Analysis",
      description: "Our AI reads your profile, asks follow-up questions, and builds a personalized interpretation based on your actual life.",
      mockup: <AIReportMockup />,
      color: "var(--color-secondary)",
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative" style={{background: 'var(--bg-secondary)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.15)'}}>
            <span className="text-xs font-mono font-medium" style={{color: 'var(--color-primary)'}}>HOW IT WORKS</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" style={{color: 'var(--text-primary)'}}>
            From question to insight in 8 minutes
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{color: 'var(--text-secondary)'}}>
            Three steps. No sign-up. A result you&apos;ll actually think about.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-md" style={{color: step.color, background: `${step.color}15`}}>
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl mb-4" style={{color: 'var(--text-primary)'}}>
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                  {step.description}
                </p>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                {step.mockup}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/quiz" className="btn-primary text-base">
            Start Your Soul Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
