"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neon-red neon-glow-red" />
            <span className="font-heading font-bold text-lg text-text-primary">
              VirtuesExtractor
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/features"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* CTA */}
          <Link href="/test" className="btn-primary text-sm">
            Start Free Test
          </Link>
        </div>
      </div>
    </header>
  );
}
