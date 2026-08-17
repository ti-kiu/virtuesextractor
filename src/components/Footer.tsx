"use client";

import Link from "next/link";

function FooterLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" stroke="url(#footer-grad)" strokeWidth="2" opacity="0.5"/>
      <path d="M18 28C18 28 8 22 8 15C8 12 10 10 13 10C15 10 17 11.5 18 13C19 11.5 21 10 23 10C26 10 28 12 28 15C28 22 18 28 18 28Z" fill="url(#footer-heart)"/>
      <defs>
        <linearGradient id="footer-grad" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0%" stopColor="#FF6B6B"/><stop offset="100%" stopColor="#4ECDC4"/>
        </linearGradient>
        <linearGradient id="footer-heart" x1="8" y1="10" x2="28" y2="28">
          <stop offset="0%" stopColor="#FF6B6B"/><stop offset="100%" stopColor="#FF5252"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-primary)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <FooterLogo />
              <span className="font-heading font-bold text-sm" style={{color: 'var(--text-primary)'}}>
                Virtues<span style={{color: 'var(--color-primary)'}}>Extractor</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed" style={{color: 'var(--text-muted)'}}>
              Discover your seven soul virtues with AI-powered deep analysis.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4" style={{color: 'var(--text-muted)'}}>Product</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/test", label: "Take the Test" },
                { href: "/features", label: "Features" },
                { href: "/virtues", label: "Seven Virtues" },
                { href: "/share", label: "Share Results" },
                { href: "/circle", label: "Family Circle" },
                { href: "/couple", label: "Couple Match" },
                { href: "/team", label: "Team Building" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:underline" style={{color: 'var(--text-secondary)'}}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4" style={{color: 'var(--text-muted)'}}>Legal</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookie", label: "Cookie Policy" },
                { href: "/disclaimer", label: "Disclaimer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:underline" style={{color: 'var(--text-secondary)'}}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4" style={{color: 'var(--text-muted)'}}>Connect</h4>
            <ul className="space-y-2.5">
              {[
                { href: "https://twitter.com/virtuesextractor", label: "Twitter" },
                { href: "https://instagram.com/virtuesextractor", label: "Instagram" },
                { href: "https://tiktok.com/@virtuesextractor", label: "TikTok" },
                { href: "https://reddit.com/r/virtuesextractor", label: "Reddit" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:underline" style={{color: 'var(--text-secondary)'}}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6" style={{borderTop: '1px solid var(--border-primary)'}}>
          <p className="text-xs text-center" style={{color: 'var(--text-muted)'}}>
            © 2026 VirtuesExtractor.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
