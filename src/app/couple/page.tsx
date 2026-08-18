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
      // Auto-create if both quiz IDs are provided via URL
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
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 rounded-full mx-auto" style={{ background: "#FF6B6B" }} />
          </div>
          <p style={{ color: "var(--text-secondary)" }}>
            {creating ? "Analyzing your compatibility..." : "Loading..."}
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
      <div className="min-h-screen py-12 px-4" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <a href="/" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: "var(--color-accent)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </a>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(255, 107, 107, 0.15)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="font-heading font-bold text-3xl mb-2" style={{ color: "var(--text-primary)" }}>
              {coupleData.name1} & {coupleData.name2}
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>Couple Virtue Match</p>
          </div>

          {/* Compatibility Score */}
          <div className="p-8 rounded-2xl mb-8 text-center" style={{ background: "var(--bg-card)", border: `2px solid ${compColor}` }}>
            <p className="text-sm font-mono uppercase tracking-wider mb-2" style={{ color: compColor }}>Compatibility Score</p>
            <div className="text-7xl font-bold font-heading mb-2" style={{ color: compColor }}>
              {coupleData.compatibility}%
            </div>
            <p className="text-lg font-heading" style={{ color: "var(--text-primary)" }}>
              {getCompatibilityLabel(coupleData.compatibility)}
            </p>
          </div>

          {/* Side by Side Virtues */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Person 1 */}
            <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: virtueColors[coupleData.primaryVirtue1], color: "black" }}>
                  {coupleData.name1.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-heading font-semibold" style={{ color: "var(--text-primary)" }}>{coupleData.name1}</h3>
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
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: virtueColors[coupleData.primaryVirtue2], color: "black" }}>
                  {coupleData.name2.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-heading font-semibold" style={{ color: "var(--text-primary)" }}>{coupleData.name2}</h3>
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
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="font-heading font-semibold text-xl" style={{ color: "var(--text-primary)" }}>
                  AI Compatibility Analysis
                </h3>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-secondary)" }}>
                {coupleData.analysis}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show create form
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: "var(--color-accent)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </a>
        </div>

        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(255, 107, 107, 0.15)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-3xl mb-2" style={{ color: "var(--text-primary)" }}>Couple Match</h1>
          <p style={{ color: "var(--text-secondary)" }}>Discover your soul virtue compatibility</p>
        </div>

        {error && (
          <div className="p-4 rounded-xl mb-6" style={{ background: "rgba(255, 107, 107, 0.1)", border: "1px solid rgba(255, 107, 107, 0.3)" }}>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-6">
          {/* Person 1 */}
          <div className="p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
            <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--color-primary)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Person 1
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>Name</label>
                <input type="text" value={name1} onChange={(e) => setName1(e.target.value)} placeholder="First person's name"
                  className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>Quiz ID</label>
                <input type="text" value={inputQuizId1} onChange={(e) => setInputQuizId1(e.target.value)} placeholder="From quiz result"
                  className="w-full px-4 py-3 rounded-xl text-sm font-mono" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
              </div>
            </div>
          </div>

          {/* Person 2 */}
          <div className="p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
            <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--color-accent)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Person 2
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>Name</label>
                <input type="text" value={name2} onChange={(e) => setName2(e.target.value)} placeholder="Second person's name"
                  className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>Quiz ID</label>
                <input type="text" value={inputQuizId2} onChange={(e) => setInputQuizId2(e.target.value)} placeholder="From quiz result"
                  className="w-full px-4 py-3 rounded-xl text-sm font-mono" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!inputQuizId1 || !inputQuizId2 || !name1 || !name2}
            className="w-full py-4 rounded-full font-semibold transition-all"
            style={{
              background: inputQuizId1 && inputQuizId2 && name1 && name2 ? "var(--color-primary)" : "var(--bg-secondary)",
              color: inputQuizId1 && inputQuizId2 && name1 && name2 ? "white" : "var(--text-muted)",
              opacity: inputQuizId1 && inputQuizId2 && name1 && name2 ? 1 : 0.5,
              cursor: inputQuizId1 && inputQuizId2 && name1 && name2 ? "pointer" : "not-allowed",
            }}
          >
            Analyze Compatibility
          </button>

          <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
            Both people need to complete the quiz first
          </p>
        </form>
      </div>
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
