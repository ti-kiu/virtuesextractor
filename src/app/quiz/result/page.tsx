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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`/quiz/ask?quizId=${quizId}`}
            className="px-8 py-4 rounded-full font-semibold text-center transition-all"
            style={{
              background: "var(--color-primary)",
              color: "white",
            }}
          >
            Ask AI a Question
          </a>
          <a
            href={`/quiz/growth-plan?quizId=${quizId}`}
            className="px-8 py-4 rounded-full font-semibold text-center transition-all"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
            }}
          >
            Get 30-Day Growth Plan
          </a>
          <a
            href="/quiz"
            className="px-8 py-4 rounded-full font-semibold text-center transition-all"
            style={{
              background: "transparent",
              border: "1px solid var(--border-primary)",
              color: "var(--text-secondary)",
            }}
          >
            Take Again
          </a>
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
