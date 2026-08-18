"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface VirtueScores {
  determination: number;
  bravery: number;
  justice: number;
  kindness: number;
  patience: number;
  integrity: number;
  perseverance: number;
}

interface QuizResult {
  scores: VirtueScores;
  percentages: VirtueScores;
  primaryVirtue: string;
  secondaryVirtue: string;
  totalQuestions: number;
  answeredQuestions: number;
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

function ResultContent() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");

  const [result, setResult] = useState<QuizResult | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (quizId) {
      fetchResult();
    }
  }, [quizId]);

  async function fetchResult() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/quiz/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setResult(data.result);
    } catch (err) {
      setError("Failed to load result. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function generateReport() {
    if (!quizId) return;

    try {
      setLoadingReport(true);
      const res = await fetch(`${API_BASE}/api/ai/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setReport(data.report);
    } catch (err) {
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoadingReport(false);
    }
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div
              className="w-16 h-16 rounded-full mx-auto"
              style={{ background: "var(--color-primary)" }}
            />
          </div>
          <p style={{ color: "var(--text-secondary)" }}>
            Calculating your soul virtues...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <a
            href="/quiz"
            className="px-6 py-3 rounded-full font-semibold inline-block"
            style={{
              background: "var(--color-primary)",
              color: "white",
            }}
          >
            Take Quiz Again
          </a>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const sortedVirtues = Object.entries(result.percentages).sort(
    ([, a], [, b]) => b - a
  );

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Home Link */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:gap-3"
            style={{
              color: "var(--color-accent)",
              background: "rgba(78, 205, 196, 0.08)",
              border: "1px solid rgba(78, 205, 196, 0.15)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8.5L8 3L14 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 7.5V13H6.5V10H9.5V13H12.5V7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="font-heading font-bold text-3xl sm:text-4xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Your Soul Virtues Profile
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            A complete breakdown of your seven soul virtues
          </p>
        </div>

        {/* Primary & Secondary Virtue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div
            className="p-6 rounded-2xl text-center"
            style={{
              background: "var(--bg-card)",
              border: `2px solid ${virtueColors[result.primaryVirtue]}`,
            }}
          >
            <span
              className="text-xs font-mono uppercase tracking-wider"
              style={{ color: virtueColors[result.primaryVirtue] }}
            >
              Primary Virtue
            </span>
            <h2
              className="font-heading font-bold text-2xl mt-2"
              style={{ color: "var(--text-primary)" }}
            >
              {virtueNames[result.primaryVirtue]}
            </h2>
            <div
              className="text-4xl font-bold mt-2"
              style={{ color: virtueColors[result.primaryVirtue] }}
            >
              {result.percentages[result.primaryVirtue as keyof VirtueScores]}%
            </div>
          </div>
          <div
            className="p-6 rounded-2xl text-center"
            style={{
              background: "var(--bg-card)",
              border: `2px solid ${virtueColors[result.secondaryVirtue]}`,
            }}
          >
            <span
              className="text-xs font-mono uppercase tracking-wider"
              style={{ color: virtueColors[result.secondaryVirtue] }}
            >
              Secondary Virtue
            </span>
            <h2
              className="font-heading font-bold text-2xl mt-2"
              style={{ color: "var(--text-primary)" }}
            >
              {virtueNames[result.secondaryVirtue]}
            </h2>
            <div
              className="text-4xl font-bold mt-2"
              style={{ color: virtueColors[result.secondaryVirtue] }}
            >
              {result.percentages[result.secondaryVirtue as keyof VirtueScores]}%
            </div>
          </div>
        </div>

        {/* All Virtues Chart */}
        <div
          className="p-8 rounded-2xl mb-12"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <h3
            className="font-heading font-semibold text-xl mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Complete Virtue Breakdown
          </h3>
          <div className="space-y-4">
            {sortedVirtues.map(([virtue, percentage]) => (
              <div key={virtue} className="flex items-center gap-4">
                <span
                  className="w-32 text-sm font-medium text-right flex-shrink-0"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {virtueNames[virtue]}
                </span>
                <div className="flex-1 h-8 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
                    style={{
                      width: `${percentage}%`,
                      background: virtueColors[virtue],
                      minWidth: "40px",
                    }}
                  >
                    <span className="text-xs font-mono font-bold text-black">
                      {percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Report Section */}
        <div
          className="p-8 rounded-2xl mb-12"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="font-heading font-semibold text-xl"
                style={{ color: "var(--text-primary)" }}
              >
                AI Deep Analysis
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--text-secondary)" }}
              >
                Get personalized insights from our AI analyst
              </p>
            </div>
            {!report && (
              <button
                onClick={generateReport}
                disabled={loadingReport}
                className="px-6 py-3 rounded-full font-semibold transition-all"
                style={{
                  background: loadingReport
                    ? "var(--bg-secondary)"
                    : "var(--color-primary)",
                  color: "white",
                  opacity: loadingReport ? 0.7 : 1,
                }}
              >
                {loadingReport ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Generating...
                  </span>
                ) : (
                  "Generate Report"
                )}
              </button>
            )}
          </div>

          {report && (
            <div
              className="p-6 rounded-xl"
              style={{ background: "var(--bg-secondary)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-2 py-1 rounded text-xs font-mono"
                  style={{
                    background: "rgba(78, 205, 196, 0.2)",
                    color: "var(--color-accent)",
                  }}
                >
                  AI ANALYST
                </span>
                <span
                  className="px-2 py-1 rounded text-xs font-mono animate-pulse"
                  style={{
                    background: "rgba(255, 107, 107, 0.2)",
                    color: "var(--color-primary)",
                  }}
                >
                  LIVE
                </span>
              </div>
              <p
                className="text-base leading-relaxed whitespace-pre-wrap"
                style={{ color: "var(--text-primary)" }}
              >
                {report}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a
            href={`/quiz/ask?quizId=${quizId}`}
            className="btn-primary px-8 py-4 text-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            Ask AI a Question
          </a>
          <a
            href={`/quiz/growth-plan?quizId=${quizId}`}
            className="btn-secondary px-8 py-4 text-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            30-Day Growth Plan
          </a>
          <a
            href="/quiz"
            className="btn-ghost px-8 py-4 text-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
            </svg>
            Retake Quiz
          </a>
        </div>

        {/* Social / Comparison Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`/share?quizId=${quizId}`}
            className="px-6 py-3 rounded-full font-semibold text-sm text-center transition-all flex items-center justify-center gap-2"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Share Results
          </a>
          <a
            href={`/circle?quizId=${quizId}`}
            className="px-6 py-3 rounded-full font-semibold text-sm text-center transition-all flex items-center justify-center gap-2"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Family Circle
          </a>
          <a
            href={`/couple?quizId1=${quizId}`}
            className="px-6 py-3 rounded-full font-semibold text-sm text-center transition-all flex items-center justify-center gap-2"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Couple Match
          </a>
          <a
            href={`/team?quizId=${quizId}`}
            className="px-6 py-3 rounded-full font-semibold text-sm text-center transition-all flex items-center justify-center gap-2"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Team Building
          </a>
        </div>

        {/* Direct Social Share */}
        <div className="mt-8 text-center">
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Share your results:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just discovered my Soul Virtues profile! Take the free test:")}&url=${encodeURIComponent("https://virtuesextractor.com/quiz")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              style={{ background: "rgba(29, 161, 242, 0.15)", color: "#1DA1F2", border: "1px solid rgba(29, 161, 242, 0.3)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://virtuesextractor.com/quiz")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              style={{ background: "rgba(24, 119, 242, 0.15)", color: "#1877F2", border: "1px solid rgba(24, 119, 242, 0.3)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent("I just discovered my Soul Virtues profile! Take the free test: https://virtuesextractor.com/quiz")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              style={{ background: "rgba(37, 211, 102, 0.15)", color: "#25D366", border: "1px solid rgba(37, 211, 102, 0.3)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText("https://virtuesextractor.com/quiz");
                alert("Link copied!");
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border-primary)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "var(--bg-primary)" }}
        >
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <div
                className="w-16 h-16 rounded-full mx-auto"
                style={{ background: "var(--color-primary)" }}
              />
            </div>
            <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
