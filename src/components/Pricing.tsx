"use client";

import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to discover your virtues",
    features: [
      "66-question soul virtue test",
      "Full seven-virtue percentage profile",
      "Basic interpretation text",
      "Download result as image",
    ],
    cta: "Start Free",
    popular: false,
    color: "var(--color-accent)",
  },
  {
    name: "Pro",
    price: "$2.9",
    period: "one-time",
    description: "Go deeper with AI-powered analysis",
    features: [
      "Everything in Free",
      "AI deep analysis report",
      "Follow-up questions with AI",
      "30-day growth plan",
      "Share to social media",
    ],
    cta: "Get Pro",
    popular: true,
    color: "var(--color-primary)",
  },
  {
    name: "Family",
    price: "$5.9",
    period: "one-time",
    description: "Understand how your virtues connect",
    features: [
      "Everything in Pro",
      "Up to 6 family members",
      "Family virtue comparison",
      "Relationship insights",
      "Shared growth tracking",
    ],
    cta: "Start Family",
    popular: false,
    color: "var(--color-secondary)",
  },
];

export default function Pricing() {
  return (
    <section className="py-20 sm:py-28 relative" style={{background: 'var(--bg-primary)'}}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{background: 'rgba(78,205,196,0.08)', border: '1px solid rgba(78,205,196,0.15)'}}>
            <span className="text-xs font-mono font-medium" style={{color: 'var(--color-accent)'}}>PRICING</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" style={{color: 'var(--text-primary)'}}>
            Simple, honest pricing
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{color: 'var(--text-secondary)'}}>
            Start free. Upgrade only if you want deeper insights.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <div key={i} className="card-dark p-6 relative flex flex-col" 
                 style={plan.popular ? {borderColor: 'rgba(255,107,107,0.3)', boxShadow: '0 0 30px rgba(255,107,107,0.1)'} : {}}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                     style={{background: 'var(--color-primary)', color: 'white'}}>
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-5">
                <h3 className="font-heading font-semibold text-lg mb-2" style={{color: 'var(--text-primary)'}}>{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading font-bold text-4xl" style={{color: plan.color}}>{plan.price}</span>
                  <span className="text-sm" style={{color: 'var(--text-muted)'}}>{plan.period}</span>
                </div>
                <p className="text-sm mt-2" style={{color: 'var(--text-secondary)'}}>{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm" style={{color: 'var(--text-secondary)'}}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                      <path d="M3 8l3.5 3.5L13 5" stroke={plan.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/test" className={plan.popular ? "btn-primary w-full text-center text-sm" : "btn-secondary w-full text-center text-sm"}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
