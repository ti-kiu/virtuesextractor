"use client";

import Link from "next/link";

function SoulScanner() {
  const virtues = [
    { name: "DET", color: "#FF6B6B", angle: 0 },
    { name: "BRA", color: "#FF9F43", angle: 51 },
    { name: "JUS", color: "#FFE66D", angle: 103 },
    { name: "KIN", color: "#4ECDC4", angle: 154 },
    { name: "PAT", color: "#45B7D1", angle: 206 },
    { name: "INT", color: "#6C5CE7", angle: 257 },
    { name: "PER", color: "#A55EEA", angle: 309 },
  ];

  return (
    <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
      {/* Outer rotating ring */}
      <div className="absolute inset-0 animate-spin" style={{animationDuration: '20s'}}>
        <svg viewBox="0 0 320 320" className="w-full h-full">
          <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(78,205,196,0.08)" strokeWidth="1" strokeDasharray="8 4"/>
        </svg>
      </div>

      {/* Middle ring */}
      <div className="absolute inset-4 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}>
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(255,107,107,0.06)" strokeWidth="1" strokeDasharray="4 8"/>
        </svg>
      </div>

      {/* 7 virtue dots on orbit */}
      {virtues.map((v, i) => {
        const radius = 120;
        const cx = 160 + radius * Math.cos((v.angle * Math.PI) / 180);
        const cy = 160 + radius * Math.sin((v.angle * Math.PI) / 180);
        return (
          <div key={i} className="absolute" style={{
            left: `${(cx / 320) * 100}%`,
            top: `${(cy / 320) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}>
            <div className="relative">
              <div className="w-3 h-3 rounded-full animate-glow-breathe" style={{backgroundColor: v.color, color: v.color}}/>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold whitespace-nowrap" style={{color: v.color}}>
                {v.name}
              </span>
            </div>
          </div>
        );
      })}

      {/* Center heart */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full animate-pulse-ring" style={{border: '1px solid rgba(255,107,107,0.3)'}}/>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full animate-pulse-ring" style={{border: '1px solid rgba(255,107,107,0.2)', animationDelay: '0.5s'}}/>
          </div>
          
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="animate-float">
            <path d="M32 52C32 52 12 40 12 26C12 20 16 16 22 16C26 16 30 18.5 32 22C34 18.5 38 16 42 16C48 16 52 20 52 26C52 40 32 52 32 52Z"
                  fill="url(#hero-heart)" stroke="rgba(255,107,107,0.6)" strokeWidth="1"/>
            <defs>
              <linearGradient id="hero-heart" x1="12" y1="16" x2="52" y2="52">
                <stop offset="0%" stopColor="#FF6B6B"/>
                <stop offset="100%" stopColor="#FF5252"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Scan line */}
      <div className="absolute left-1/2 top-0 w-px h-full overflow-hidden" style={{transform: 'translateX(-50%)'}}>
        <div className="w-full h-1/3 animate-scan" style={{
          background: 'linear-gradient(to bottom, transparent, rgba(78,205,196,0.4), transparent)',
        }}/>
      </div>

      {/* Terminal text */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
        <div className="font-mono text-[11px] px-3 py-1 rounded-md" style={{color: 'var(--color-accent)', background: 'rgba(78,205,196,0.08)', border: '1px solid rgba(78,205,196,0.15)'}}>
          <span className="animate-blink">_</span> SYSTEM READY
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-grid" style={{paddingTop: '80px'}}>
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" 
           style={{background: 'radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)'}}/>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full" 
           style={{background: 'radial-gradient(circle, rgba(78,205,196,0.05) 0%, transparent 70%)'}}/>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" 
                 style={{background: 'rgba(78,205,196,0.08)', border: '1px solid rgba(78,205,196,0.15)'}}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background: 'var(--color-accent)'}}/>
              <span className="text-xs font-medium" style={{color: 'var(--color-accent)'}}>66 Questions · 7 Virtues · 8 Minutes</span>
            </div>

            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6" style={{color: 'var(--text-primary)'}}>
              Your soul has a{" "}
              <span className="neon-text-red" style={{color: 'var(--color-primary)'}}>signal</span>.
              <br/>
              <span style={{color: 'var(--text-secondary)'}}>Let&apos;s read it.</span>
            </h1>

            <p className="text-lg sm:text-xl mb-8 max-w-xl mx-auto lg:mx-0" style={{color: 'var(--text-secondary)', lineHeight: '1.7'}}>
              Not a label. Not a type. A full seven-virtue profile — with an AI that 
              actually talks with you about what your results mean in real life.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Link href="/test" className="btn-primary text-base">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                Discover Your Virtues — Free
              </Link>
              <Link href="/features" className="btn-secondary text-base">
                See How It Works
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm" style={{color: 'var(--text-muted)'}}>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                No sign-up
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                AI report included
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                100% private
              </span>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex justify-center lg:justify-end">
            <SoulScanner />
          </div>
        </div>
      </div>
    </section>
  );
}
