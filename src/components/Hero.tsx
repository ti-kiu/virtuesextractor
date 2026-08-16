"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card border border-border-primary mb-8">
          <div className="w-2 h-2 rounded-full bg-neon-cyan animate-neon-pulse" />
          <span className="text-text-secondary text-sm">
            10,000+ souls discovered
          </span>
        </div>

        {/* Title - 改得更有冲击力 */}
        <h1 className="font-heading font-bold text-hero text-text-primary mb-6 neon-text-red">
          Seven Virtues. One AI.
          <br />
          <span className="text-neon-red">The most honest thing you&apos;ll read about yourself.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-text-secondary text-body-lg max-w-2xl mx-auto mb-10">
          66 questions. Seven soul virtues. One AI that doesn&apos;t just score
          you — it talks with you about what it means.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link href="/test" className="btn-primary text-lg">
            Discover Your Soul Virtues — Free
          </Link>
          <Link href="/features" className="btn-secondary text-lg">
            See How It Works
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-text-muted text-sm">
          <span>✅ Free</span>
          <span>✅ No sign-up</span>
          <span>✅ AI report included</span>
          <span>✅ 8 minutes</span>
        </div>
      </div>
    </section>
  );
}
