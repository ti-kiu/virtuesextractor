"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is this the same as the Undertale quiz?",
    a: "Our test is inspired by Undertale's seven soul trait framework, but it's built from scratch with 66 original scenario-based questions and AI-powered analysis. It goes far beyond any existing fan quiz.",
  },
  {
    q: "How is this different from MBTI or 16Personalities?",
    a: "MBTI sorts you into 16 types. We give you a full percentage spread across seven virtues — and then our AI talks with you about what those numbers actually mean in your life. It's a conversation, not a label.",
  },
  {
    q: "Is my data private?",
    a: "Your test answers are processed in real-time and not stored. Your results live on your device. We only save data if you create an account to use Family Circles or the 30-day plan.",
  },
  {
    q: "How long does the test take?",
    a: "About 8 minutes for the 66 questions. The AI analysis adds another 3-5 minutes depending on how deep you go.",
  },
  {
    q: "What do I get for free?",
    a: "The complete 66-question test, your full seven-virtue percentage profile, basic interpretation text, and a downloadable result image. No credit card needed.",
  },
  {
    q: "Can I retake the test?",
    a: "Yes, as many times as you want. Each time you'll get a fresh AI analysis based on your new answers.",
  },
];

function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="card-dark overflow-hidden">
      <button className="w-full flex items-center justify-between p-5 text-left" onClick={onClick}>
        <span className="font-heading font-semibold text-base pr-4" style={{color: 'var(--text-primary)'}}>{q}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 transition-transform duration-200" style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0)'}}>
          <path d="M5 7.5l5 5 5-5" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5" style={{borderTop: '1px solid var(--border-primary)'}}>
          <p className="text-sm leading-relaxed pt-4" style={{color: 'var(--text-secondary)'}}>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 relative" style={{background: 'var(--bg-secondary)'}}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.15)'}}>
            <span className="text-xs font-mono font-medium" style={{color: 'var(--color-primary)'}}>FAQ</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" style={{color: 'var(--text-primary)'}}>
            Common questions
          </h2>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} isOpen={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
