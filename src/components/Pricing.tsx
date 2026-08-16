"use client";

import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "66-question soul virtues test",
      "Seven-virtue profile",
      "Basic result interpretation",
      "Shareable result card",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$2.9",
    period: "one-time",
    description: "For deeper insights",
    features: [
      "Everything in Free",
      "AI deep analysis report",
      "Personalized follow-up questions",
      "Downloadable PDF report",
    ],
    cta: "Get Pro",
    popular: true,
  },
  {
    name: "Premium",
    price: "$4.9",
    period: "/month",
    description: "For continuous growth",
    features: [
      "Everything in Pro",
      "30-day growth plan",
      "AI virtue journal",
      "Quarterly evolution report",
    ],
    cta: "Start Premium",
    popular: false,
  },
  {
    name: "Family",
    price: "$9.9",
    period: "/month",
    description: "For families & teams",
    features: [
      "Everything in Premium",
      "Family circles (up to 8)",
      "AI compatibility analysis",
      "Family virtue challenges",
    ],
    cta: "Start Family",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-h2 text-text-primary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-secondary text-body-lg max-w-2xl mx-auto">
            Start free, upgrade when you&apos;re ready
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card-dark p-8 relative ${
                plan.popular ? "border-neon-red" : ""
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-red rounded-full text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <h3 className="font-heading font-semibold text-h3 text-text-primary mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="font-heading font-bold text-hero text-neon-red">
                  {plan.price}
                </span>
                <span className="text-text-secondary text-body">
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-body mb-6">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-2 text-text-secondary text-body"
                  >
                    <span className="text-neon-cyan mt-1">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/test"
                className={`block text-center py-3 rounded-button font-heading font-semibold transition-all duration-300 ${
                  plan.popular ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
