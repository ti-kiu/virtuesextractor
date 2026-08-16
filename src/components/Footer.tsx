"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-neon-red neon-glow-red" />
              <span className="font-heading font-bold text-lg text-text-primary">
                VirtuesExtractor
              </span>
            </Link>
            <p className="text-text-secondary text-sm">
              Discover your seven soul virtues with AI-powered deep analysis.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com/virtuesextractor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/virtuesextractor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@virtuesextractor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://reddit.com/r/virtuesextractor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                >
                  Reddit
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border-primary">
          <p className="text-text-muted text-sm text-center">
            © 2026 VirtuesExtractor.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
