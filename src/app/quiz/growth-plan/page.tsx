"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const virtueNames: Record<string, string> = {
  determination: "Determination",
  bravery: "Bravery",
  justice: "Justice",
  kindness: "Kindness",
  patience: "Patience",
  integrity: "Integrity",
  perseverance: "Perseverance",
};

const API_BASE = "https://soulvirtues-api.fuyuanzeng520.workers.dev";

function GrowthPlanContent() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");

  const [plan, setPlan] = useState<string | null>(null);
  const [lowestVirtue, setLowestVirtue] = useState<string | null>(null);
  const [lowestPercentage, setLowestPercentage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (quizId) {
      generatePlan();
    }
  }, [quizId]);

  async function generatePlan() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/ai/growth-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setPlan(data.growthPlan);
      setLowestVirtue(data.lowestVirtue);
      setLowestPercentage(data.lowestPercentage);
    } catch (err) {
      setError("Failed to generate growth plan. Please try again.");
    } finally {
      setLoading(false);
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
              style={{ background: "var(--color-accent)" }}
            />
          </div>
          <p style={{ color: "var(--text-secondary)" }}>
            Creating your personalized growth plan...
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
            href={`/quiz/result?quizId=${quizId}`}
            className="px-6 py-3 rounded-full font-semibold inline-block"
            style={{
              background: "var(--color-primary)",
              color: "white",
            }}
          >
            Back to Results
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8.5L8 3L14 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 7.5V13H6.5V10H9.5V13H12.5V7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Home
            </a>
            <span style={{ color: "var(--border-primary)" }}>|</span>
            <a
              href={`/quiz/result?quizId=${quizId}`}
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Results
            </a>
          </div>
          <h1
            className="font-heading font-bold text-3xl sm:text-4xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            30-Day Growth Plan
          </h1>
          {lowestVirtue && lowestPercentage !== null && (
            <p
              className="text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              Focused on your lowest virtue:{" "}
              <span style={{ color: "var(--color-primary)" }}>
                {virtueNames[lowestVirtue]} ({lowestPercentage}%)
              </span>
            </p>
          )}
        </div>

        {/* Plan */}
        {plan && (
          <div
            className="p-8 rounded-2xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono"
                style={{
                  background: "rgba(78, 205, 196, 0.2)",
                  color: "var(--color-accent)",
                }}
              >
                AI-GENERATED
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-mono"
                style={{
                  background: "rgba(255, 230, 109, 0.2)",
                  color: "var(--color-secondary)",
                }}
              >
                PERSONALIZED
              </span>
            </div>
            <div
              className="prose prose-invert max-w-none"
              style={{ color: "var(--text-primary)" }}
            >
              {plan.split("\n").map((line, i) => {
                if (line.startsWith("# ")) {
                  return (
                    <h2
                      key={i}
                      className="font-heading font-bold text-2xl mt-8 mb-4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {line.replace("# ", "")}
                    </h2>
                  );
                }
                if (line.startsWith("## ")) {
                  return (
                    <h3
                      key={i}
                      className="font-heading font-semibold text-xl mt-6 mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {line.replace("## ", "")}
                    </h3>
                  );
                }
                if (line.startsWith("### ")) {
                  return (
                    <h4
                      key={i}
                      className="font-heading font-semibold text-lg mt-4 mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {line.replace("### ", "")}
                    </h4>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <li
                      key={i}
                      className="ml-4 mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {line.replace("- ", "")}
                    </li>
                  );
                }
                if (line.trim() === "") {
                  return <br key={i} />;
                }
                return (
                  <p
                    key={i}
                    className="mb-3 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href={`/quiz/ask?quizId=${quizId}`}
            className="px-8 py-4 rounded-full font-semibold text-center transition-all"
            style={{
              background: "var(--color-primary)",
              color: "white",
            }}
          >
            Ask AI About This Plan
          </a>
          <a
            href={`/quiz/result?quizId=${quizId}`}
            className="px-8 py-4 rounded-full font-semibold text-center transition-all"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
            }}
          >
            View Full Results
          </a>
        </div>
      </div>
    </div>
  );
}

export default function GrowthPlanPage() {
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
                style={{ background: "var(--color-accent)" }}
              />
            </div>
            <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
          </div>
        </div>
      }
    >
      <GrowthPlanContent />
    </Suspense>
  );
}
