"use client";

import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{background: 'var(--bg-primary)'}}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" 
           style={{background: 'radial-gradient(circle, rgba(255,107,107,0.1) 0%, transparent 70%)'}}/>
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4" style={{color: 'var(--text-primary)'}}>
          Ready to see what your soul is made of?
        </h2>
        <p className="text-lg mb-8" style={{color: 'var(--text-secondary)'}}>
          66 questions. 8 minutes. A result that might change how you see yourself.
        </p>
        <Link href="/quiz" className="btn-primary text-lg inline-flex">
          Discover Your Virtues — Free
        </Link>
      </div>
    </section>
  );
}
