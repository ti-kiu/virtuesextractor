"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface CoupleData {
  name1: string;
  name2: string;
  compatibility: number;
  analysis: string;
  percentages1: Record<string, number>;
  percentages2: Record<string, number>;
  primaryVirtue1: string;
  primaryVirtue2: string;
  secondaryVirtue1: string;
  secondaryVirtue2: string;
  createdAt: string;
}

const virtueNames: Record<string, string> = {
  determination: "Determination",
  bravery: "Bravery",
  justice: "Justice",
  kindness: "Kindness",
  patience: "Patience",
  integrity: "Integrity",
  perseverance: "Perseverance",
};

const virtueColors: Record<string, string> = {
  determination: "#FF6B6B",
  bravery: "#FF9F43",
  justice: "#4ECDC4",
  kindness: "#FFE66D",
  patience: "#A8E6CF",
  integrity: "#DDA0DD",
  perseverance: "#87CEEB",
};

const API_BASE = "https://soulvirtues-api.fuyuanzeng520.workers.dev";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "Virtue Alignment",
    description: "See how your seven soul virtues match up against your partner's — strengths, gaps, and complementary powers.",
    color: "#FF6B6B",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "Compatibility Score",
    description: "Get a data-driven compatibility percentage based on all seven virtues — not guesswork, real analysis.",
    color: "#4ECDC4",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFE66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "AI Analysis",
    description: "Receive AI-powered insights on your relationship dynamics, growth areas, and shared strengths.",
    color: "#FFE66D",
  },
];

function CoupleContent() {
  const searchParams = useSearchParams();
  const coupleId = searchParams.get("id");
  const quizId1 = searchParams.get("quizId1");
  const quizId2 = searchParams.get("quizId2");

  const [coupleData, setCoupleData] = useState<CoupleData | null>(null);
  const [loading, setLoading] = useState(!!coupleId);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create form
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [inputQuizId1, setInputQuizId1] = useState(quizId1 || "");
  const [inputQuizId2, setInputQuizId2] = useState(quizId2 || "");

  useEffect(() => {
    if (coupleId) {
      fetchCoupleData(coupleId);
    } else if (quizId1 && quizId2) {
      setCreating(true);
    }
  }, [coupleId]);

  async function fetchCoupleData(id: string) {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/couple/${id}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setCoupleData(data);
    } catch (err) {
      setError("Failed to load couple data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!inputQuizId1 || !inputQuizId2 || !name1 || !name2) return;

    try {
      setCreating(true);
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/couple/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId1: inputQuizId1, name1, quizId2: inputQuizId2, name2 }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      window.history.replaceState(null, "", `/couple?id=${data.coupleId}`);
      fetchCoupleData(data.coupleId);
    } catch (err) {
      setError("Failed to create couple match.");
    } finally {
      setCreating(false);
    }
  }

  function getCompatibilityColor(score: number): string {
    if (score >= 80) return "#4ECDC4";
    if (score >= 60) return "#FFE66D";
    if (score >= 40) return "#FF9F43";
    return "#FF6B6B";
  }

  function getCompatibilityLabel(score: number): string {
    if (score >= 90) return "Soul Mates";
    if (score >= 80) return "Highly Compatible";
    if (score >= 70) return "Great Match";
    if (score >= 60) return "Good Chemistry";
    if (score >= 50) return "Complementary";
    return "Growth Opportunity";
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ border: "2px solid rgba(255, 107, 107, 0.3)" }} />
            <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: "rgba(255, 107, 107, 0.2)" }} />
          </div>
          <p className="font-mono text-sm" style={{ color: "var(--text-secondary)" }}>
            {creating ? "Analyzing compatibility..." : "Loading data..."}
          </p>
        </div>
      </div>
    );
  }

  // Show couple results
  if (coupleData) {
    const sortedVirtues1 = Object.entries(coupleData.percentages1).sort(([, a], [, b]) => b - a);
    const sortedVirtues2 = Object.entries(coupleData.percentages2).sort(([, a], [, b]) => b - a);
    const compColor = getCompatibilityColor(coupleData.compatibility);

    return (
      <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
        {/* Results Hero */}
        <section className="relative overflow-hidden pt-24 pb-12 bg-grid">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full" style={{ background: `radial-gradient(circle, ${compColor}10 0%, transparent 70%)` }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="mb-6">
              <a href="/" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:gap-3" style={{ color: "var(--color-accent)", background: "rgba(78, 205, 196, 0.08)", border: "1px solid rgba(78, 205, 196, 0.15)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Home
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: "rgba(255, 107, 107, 0.08)", border: "1px solid rgba(255, 107, 107, 0.15)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-primary)" }} />
              <span className="text-xs font-mono font-medium" style={{ color: "var(--color-primary)" }}>COUPLE MATCH</span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
              {coupleData.name1} <span style={{ color: compColor }}>&</span> {coupleData.name2}
            </h1>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              Soul Virtue Compatibility Report
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 pb-20">
          {/* Compatibility Score */}
          <div className="p-8 sm:p-10 rounded-2xl mb-8 text-center relative overflow-hidden" style={{ background: "var(--bg-card)", border: `2px solid ${compColor}` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full" style={{ background: `radial-gradient(circle, ${compColor}15 0%, transparent 70%)` }} />
            <div className="relative z-10">
              <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: compColor }}>Compatibility Score</p>
              <div className="text-7xl sm:text-8xl font-bold font-heading mb-3" style={{ color: compColor, textShadow: `0 0 40px ${compColor}40` }}>
                {coupleData.compatibility}%
              </div>
              <p className="text-xl font-heading font-semibold" style={{ color: "var(--text-primary)" }}>
                {getCompatibilityLabel(coupleData.compatibility)}
              </p>
            </div>
          </div>

          {/* Side by Side Virtues */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Person 1 */}
            <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold" style={{ background: virtueColors[coupleData.primaryVirtue1], color: "black" }}>
                  {coupleData.name1.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg" style={{ color: "var(--text-primary)" }}>{coupleData.name1}</h3>
                  <p className="text-xs" style={{ color: virtueColors[coupleData.primaryVirtue1] }}>
                    {virtueNames[coupleData.primaryVirtue1]}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {sortedVirtues1.map(([virtue, pct]) => (
                  <div key={virtue} className="flex items-center gap-2">
                    <span className="w-24 text-[10px] text-right flex-shrink-0" style={{ color: "var(--text-muted)" }}>{virtueNames[virtue]}</span>
                    <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                      <div className="h-full rounded-full flex items-center justify-end pr-1.5" style={{ width: `${pct}%`, background: virtueColors[virtue], minWidth: "28px" }}>
                        <span className="text-[9px] font-mono font-bold text-black">{pct}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Person 2 */}
            <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold" style={{ background: virtueColors[coupleData.primaryVirtue2], color: "black" }}>
                  {coupleData.name2.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg" style={{ color: "var(--text-primary)" }}>{coupleData.name2}</h3>
                  <p className="text-xs" style={{ color: virtueColors[coupleData.primaryVirtue2] }}>
                    {virtueNames[coupleData.primaryVirtue2]}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {sortedVirtues2.map(([virtue, pct]) => (
                  <div key={virtue} className="flex items-center gap-2">
                    <span className="w-24 text-[10px] text-right flex-shrink-0" style={{ color: "var(--text-muted)" }}>{virtueNames[virtue]}</span>
                    <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                      <div className="h-full rounded-full flex items-center justify-end pr-1.5" style={{ width: `${pct}%`, background: virtueColors[virtue], minWidth: "28px" }}>
                        <span className="text-[9px] font-mono font-bold text-black">{pct}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          {coupleData.analysis && (
            <div className="p-8 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(78, 205, 196, 0.12)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl" style={{ color: "var(--text-primary)" }}>
                  AI Compatibility Analysis
                </h3>
              </div>
              <div className="p-6 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                <p className="leading-relaxed whitespace-pre-wrap text-sm" style={{ color: "var(--text-secondary)" }}>
                  {coupleData.analysis}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show create form
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 bg-grid">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(78, 205, 196, 0.05) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:gap-3" style={{ color: "var(--color-accent)", background: "rgba(78, 205, 196, 0.08)", border: "1px solid rgba(78, 205, 196, 0.15)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </a>
          </div>

          <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center relative" style={{ background: "rgba(255, 107, 107, 0.12)", border: "1px solid rgba(255, 107, 107, 0.2)" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: "rgba(255, 107, 107, 0.08)", border: "1px solid rgba(255, 107, 107, 0.15)" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-primary)" }} />
            <span className="text-xs font-mono font-medium" style={{ color: "var(--color-primary)" }}>COUPLE MATCH</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-4" style={{ color: "var(--text-primary)" }}>
            Couple <span className="neon-text-red" style={{ color: "var(--color-primary)" }}>Match</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Discover your soul virtue compatibility. Compare seven virtues between two people with AI-powered insights.
          </p>

          <div className="flex flex-wrap items-center gap-4 justify-center text-sm" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Two quiz results needed
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              AI compatibility report
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              100% free
            </span>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
            {features.map((f, i) => (
              <div key={i} className="card-dark p-6 text-center group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110" style={{ background: `${f.color}12` }}>
                  {f.icon}
                </div>
                <h3 className="font-heading font-semibold text-base mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 px-4">
        <div className="max-w-lg mx-auto">
          {error && (
            <div className="p-4 rounded-xl mb-6 flex items-start gap-3" style={{ background: "rgba(255, 107, 107, 0.08)", border: "1px solid rgba(255, 107, 107, 0.2)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" className="shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
              </svg>
              <p className="text-sm" style={{ color: "#FF6B6B" }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-5">
            {/* Person 1 Card */}
            <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <h3 className="font-heading font-semibold text-sm mb-5 flex items-center gap-2" style={{ color: "var(--color-primary)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255, 107, 107, 0.12)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                Person 1
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Name</label>
                  <input type="text" value={name1} onChange={(e) => setName1(e.target.value)} placeholder="First person's name"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(255, 107, 107, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Quiz ID</label>
                  <input type="text" value={inputQuizId1} onChange={(e) => setInputQuizId1(e.target.value)} placeholder="From quiz result"
                    className="w-full px-4 py-3.5 rounded-xl text-sm font-mono transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(255, 107, 107, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px" style={{ background: "var(--border-primary)" }} />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              <div className="flex-1 h-px" style={{ background: "var(--border-primary)" }} />
            </div>

            {/* Person 2 Card */}
            <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <h3 className="font-heading font-semibold text-sm mb-5 flex items-center gap-2" style={{ color: "var(--color-accent)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(78, 205, 196, 0.12)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                Person 2
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Name</label>
                  <input type="text" value={name2} onChange={(e) => setName2(e.target.value)} placeholder="Second person's name"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(78, 205, 196, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Quiz ID</label>
                  <input type="text" value={inputQuizId2} onChange={(e) => setInputQuizId2(e.target.value)} placeholder="From quiz result"
                    className="w-full px-4 py-3.5 rounded-xl text-sm font-mono transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(78, 205, 196, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!inputQuizId1 || !inputQuizId2 || !name1 || !name2}
              className="w-full py-4 rounded-xl font-heading font-semibold text-base transition-all flex items-center justify-center gap-2"
              style={{
                background: inputQuizId1 && inputQuizId2 && name1 && name2 ? "var(--color-primary)" : "var(--bg-secondary)",
                color: inputQuizId1 && inputQuizId2 && name1 && name2 ? "white" : "var(--text-muted)",
                opacity: inputQuizId1 && inputQuizId2 && name1 && name2 ? 1 : 0.5,
                cursor: inputQuizId1 && inputQuizId2 && name1 && name2 ? "pointer" : "not-allowed",
                boxShadow: inputQuizId1 && inputQuizId2 && name1 && name2 ? "0 0 20px rgba(255, 107, 107, 0.3), 0 4px 12px rgba(0,0,0,0.3)" : "none",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              Analyze Compatibility
            </button>

            <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
              Both people need to complete the quiz first
            </p>
          </form>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Haven&apos;t taken the quiz yet?</p>
            <a href="/quiz" className="btn-secondary text-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Take the Soul Virtues Quiz
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CouplePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <div className="w-16 h-16 rounded-full mx-auto" style={{ background: "#FF6B6B" }} />
            </div>
            <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
          </div>
        </div>
      }
    >
      <CoupleContent />
    </Suspense>
  );
}
