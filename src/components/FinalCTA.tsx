"use client";

import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-red/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading font-bold text-h1 text-text-primary mb-6">
          Ready to Meet All Seven of Your Virtues?
        </h2>

        <p className="text-text-secondary text-body-lg mb-10">
          Free to start. No account needed. AI report unlocks after your result.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link href="/test" className="btn-primary text-lg">
            Take the Soul Virtues Extractor
          </Link>
        </div>

        <p className="text-text-muted text-sm">
          66 questions · ~8 minutes · Trusted by 10,000+ souls worldwide
        </p>
      </div>
    </section>
  );
}
