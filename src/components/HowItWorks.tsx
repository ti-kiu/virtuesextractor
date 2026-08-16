"use client";

import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Answer 66 Statements",
      description:
        "Rate how much you agree with each statement. Every answer adjusts all seven virtues at once.",
      icon: "📝",
      screenshot: "/screenshots/quiz-question.png",
    },
    {
      number: "02",
      title: "Get Your Seven-Virtue Profile",
      description:
        "See your full percentage spread across Determination, Bravery, Justice, Kindness, Patience, Integrity, and Perseverance.",
      icon: "📊",
      screenshot: "/screenshots/quiz-result.png",
    },
    {
      number: "03",
      title: "Receive AI Deep Analysis",
      description:
        "Our AI asks follow-up questions and generates a personalized reading based on your life — not just your score.",
      icon: "🤖",
      screenshot: "/screenshots/ai-report.png",
    },
  ];

  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-h2 text-text-primary mb-4">
            How It Works — 3 Simple Steps
          </h2>
          <p className="text-text-secondary text-body-lg max-w-2xl mx-auto">
            From question to insight in under 8 minutes
          </p>
        </div>

        {/* Steps with screenshots */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 items-center`}
            >
              {/* Text */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-red/10 text-neon-red text-sm font-semibold mb-4">
                  Step {step.number}
                </div>
                <h3 className="font-heading font-semibold text-h3 text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-body-lg">
                  {step.description}
                </p>
              </div>

              {/* Screenshot placeholder */}
              <div className="flex-1">
                <div className="card-dark p-4 rounded-card overflow-hidden">
                  <div className="bg-bg-secondary rounded-lg aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{step.icon}</div>
                      <p className="text-text-muted text-sm">
                        {step.screenshot}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/test" className="btn-primary text-lg">
            Start Your Soul Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
