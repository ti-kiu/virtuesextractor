"use client";

import Link from "next/link";
import { useState } from "react";

function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring with 7 colored segments */}
      <circle cx="18" cy="18" r="16" stroke="url(#logo-gradient)" strokeWidth="2" opacity="0.6"/>
      {/* Inner heart shape */}
      <path d="M18 28C18 28 8 22 8 15C8 12 10 10 13 10C15 10 17 11.5 18 13C19 11.5 21 10 23 10C26 10 28 12 28 15C28 22 18 28 18 28Z" 
            fill="url(#heart-gradient)" />
      {/* Glow effect */}
      <circle cx="18" cy="18" r="16" stroke="url(#logo-gradient)" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="16;17;16" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite"/>
      </circle>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="50%" stopColor="#4ECDC4"/>
          <stop offset="100%" stopColor="#FFE66D"/>
        </linearGradient>
        <linearGradient id="heart-gradient" x1="8" y1="10" x2="28" y2="28">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="100%" stopColor="#FF5252"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Logo />
            <span className="font-heading font-bold text-base tracking-tight" style={{color: 'var(--text-primary)'}}>
              Virtues<span style={{color: 'var(--color-primary)'}}>Extractor</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/features" className="px-3 py-2 rounded-lg text-sm transition-colors" style={{color: 'var(--text-secondary)'}}>
              Features
            </Link>
            <Link href="/circle" className="px-3 py-2 rounded-lg text-sm transition-colors" style={{color: 'var(--text-secondary)'}}>
              Family Circle
            </Link>
            <Link href="/couple" className="px-3 py-2 rounded-lg text-sm transition-colors" style={{color: 'var(--text-secondary)'}}>
              Couple Match
            </Link>
            <Link href="/team" className="px-3 py-2 rounded-lg text-sm transition-colors" style={{color: 'var(--text-secondary)'}}>
              Team Building
            </Link>
            <Link href="/pricing" className="px-3 py-2 rounded-lg text-sm transition-colors" style={{color: 'var(--text-secondary)'}}>
              Pricing
            </Link>
            <Link href="/faq" className="px-3 py-2 rounded-lg text-sm transition-colors" style={{color: 'var(--text-secondary)'}}>
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/quiz" className="btn-primary text-sm !py-2.5 !px-5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              Start Free
            </Link>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t" style={{borderColor: 'var(--border-primary)'}}>
            <div className="flex flex-col gap-1 pt-3">
              <Link href="/features" className="px-3 py-2.5 rounded-lg text-sm" style={{color: 'var(--text-secondary)'}}>Features</Link>
              <Link href="/circle" className="px-3 py-2.5 rounded-lg text-sm" style={{color: 'var(--text-secondary)'}}>Family Circle</Link>
              <Link href="/couple" className="px-3 py-2.5 rounded-lg text-sm" style={{color: 'var(--text-secondary)'}}>Couple Match</Link>
              <Link href="/team" className="px-3 py-2.5 rounded-lg text-sm" style={{color: 'var(--text-secondary)'}}>Team Building</Link>
              <Link href="/pricing" className="px-3 py-2.5 rounded-lg text-sm" style={{color: 'var(--text-secondary)'}}>Pricing</Link>
              <Link href="/faq" className="px-3 py-2.5 rounded-lg text-sm" style={{color: 'var(--text-secondary)'}}>FAQ</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
