"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Member {
  name: string;
  percentages: Record<string, number>;
  primaryVirtue: string;
  secondaryVirtue: string;
}

interface CircleData {
  name: string;
  members: Member[];
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

function CircleContent() {
  const searchParams = useSearchParams();
  const circleId = searchParams.get("id");
  const quizId = searchParams.get("quizId");

  const [circleData, setCircleData] = useState<CircleData | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const [mode, setMode] = useState<"view" | "create" | "join">(circleId ? "view" : quizId ? "create" : "view");
  const [loading, setLoading] = useState(!!circleId);
  const [error, setError] = useState<string | null>(null);

  // Create form
  const [circleName, setCircleName] = useState("");
  const [creatorName, setCreatorName] = useState("");

  // Join form
  const [joinCode, setJoinCode] = useState("");
  const [memberName, setMemberName] = useState("");
  const [joinQuizId, setJoinQuizId] = useState("");

  useEffect(() => {
    if (circleId) {
      fetchCircleData(circleId);
    }
  }, [circleId]);

  async function fetchCircleData(id: string) {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/circle/${id}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setCircleData(data);
    } catch (err) {
      setError("Failed to load circle data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!quizId || !circleName || !creatorName) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/circle/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, name: circleName, creatorName }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setInviteCode(data.inviteCode);
      window.history.replaceState(null, "", `/circle?id=${data.circleId}`);
      fetchCircleData(data.circleId);
    } catch (err) {
      setError("Failed to create circle.");
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!joinCode || !joinQuizId || !memberName) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/circle/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode: joinCode, quizId: joinQuizId, memberName }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      window.location.href = `/circle?id=${data.circleId}`;
    } catch (err) {
      setError("Failed to join circle.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopyCode() {
    navigator.clipboard.writeText(inviteCode);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 rounded-full mx-auto" style={{ background: "var(--color-secondary)" }} />
          </div>
          <p style={{ color: "var(--text-secondary)" }}>Loading circle...</p>
        </div>
      </div>
    );
  }

  // View mode with circle data
  if (circleData) {
    const allVirtues = Object.keys(virtueNames);
    const avgPercentages: Record<string, number> = {};
    allVirtues.forEach((v) => {
      const sum = circleData.members.reduce((acc, m) => acc + (m.percentages[v] || 0), 0);
      avgPercentages[v] = Math.round(sum / circleData.members.length);
    });
    const sortedAvg = Object.entries(avgPercentages).sort(([, a], [, b]) => b - a);

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

          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(255, 230, 109, 0.15)" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="font-heading font-bold text-3xl mb-2" style={{ color: "var(--text-primary)" }}>
              {circleData.name}
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              {circleData.members.length} member{circleData.members.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Invite Code */}
          {inviteCode && (
            <div className="p-6 rounded-2xl mb-8 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>Share this invite code:</p>
              <div className="flex items-center justify-center gap-3">
                <code className="px-6 py-3 rounded-xl text-xl font-mono font-bold tracking-widest" style={{ background: "var(--bg-secondary)", color: "var(--color-accent)" }}>
                  {inviteCode}
                </code>
                <button onClick={handleCopyCode} className="p-3 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Average Virtues */}
          <div className="p-8 rounded-2xl mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
            <h3 className="font-heading font-semibold text-xl mb-6" style={{ color: "var(--text-primary)" }}>
              Circle Average Virtues
            </h3>
            <div className="space-y-3">
              {sortedAvg.map(([virtue, pct]) => (
                <div key={virtue} className="flex items-center gap-3">
                  <span className="w-28 text-xs font-medium text-right flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                    {virtueNames[virtue]}
                  </span>
                  <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                    <div className="h-full rounded-full flex items-center justify-end pr-2" style={{ width: `${pct}%`, background: virtueColors[virtue], minWidth: "32px" }}>
                      <span className="text-[10px] font-mono font-bold text-black">{pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {circleData.members.map((member, i) => (
              <div key={i} className="p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: virtueColors[member.primaryVirtue], color: "black" }}>
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold" style={{ color: "var(--text-primary)" }}>{member.name}</h4>
                    <p className="text-xs" style={{ color: virtueColors[member.primaryVirtue] }}>
                      {virtueNames[member.primaryVirtue]} • {virtueNames[member.secondaryVirtue]}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {Object.entries(member.percentages).sort(([, a], [, b]) => b - a).slice(0, 3).map(([v, p]) => (
                    <div key={v} className="flex items-center gap-2">
                      <span className="text-[10px] w-20 text-right" style={{ color: "var(--text-muted)" }}>{virtueNames[v]}</span>
                      <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                        <div className="h-full rounded-full" style={{ width: `${p}%`, background: virtueColors[v] }} />
                      </div>
                      <span className="text-[10px] font-mono w-8" style={{ color: "var(--text-muted)" }}>{p}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // No circle data - show create/join forms
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
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(255, 230, 109, 0.15)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-3xl mb-2" style={{ color: "var(--text-primary)" }}>Family Circle</h1>
          <p style={{ color: "var(--text-secondary)" }}>Compare soul virtues with your family</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-8 p-1 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
          <button
            onClick={() => setMode("create")}
            className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all"
            style={{ background: mode === "create" ? "var(--color-primary)" : "transparent", color: mode === "create" ? "white" : "var(--text-secondary)" }}
          >
            Create Circle
          </button>
          <button
            onClick={() => setMode("join")}
            className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all"
            style={{ background: mode === "join" ? "var(--color-accent)" : "transparent", color: mode === "join" ? "white" : "var(--text-secondary)" }}
          >
            Join Circle
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl mb-6" style={{ background: "rgba(255, 107, 107, 0.1)", border: "1px solid rgba(255, 107, 107, 0.3)" }}>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {mode === "create" ? (
          <form onSubmit={handleCreate} className="space-y-4">
            {!quizId && (
              <div className="p-4 rounded-xl text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>You need to complete a quiz first</p>
                <a href="/quiz" className="px-6 py-3 rounded-full font-semibold text-sm inline-block" style={{ background: "var(--color-primary)", color: "white" }}>
                  Take the Quiz
                </a>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Circle Name</label>
              <input
                type="text"
                value={circleName}
                onChange={(e) => setCircleName(e.target.value)}
                placeholder="e.g., The Smith Family"
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Name</label>
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                placeholder="Your display name"
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }}
                required
              />
            </div>
            <button
              type="submit"
              disabled={!quizId || !circleName || !creatorName}
              className="w-full py-4 rounded-full font-semibold transition-all"
              style={{
                background: quizId && circleName && creatorName ? "var(--color-primary)" : "var(--bg-secondary)",
                color: quizId && circleName && creatorName ? "white" : "var(--text-muted)",
                opacity: quizId && circleName && creatorName ? 1 : 0.5,
                cursor: quizId && circleName && creatorName ? "pointer" : "not-allowed",
              }}
            >
              Create Family Circle
            </button>
          </form>
        ) : (
          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Invite Code</label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="e.g., ABC123"
                className="w-full px-4 py-3 rounded-xl text-sm font-mono tracking-widest text-center uppercase"
                style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Name</label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Your display name"
                className="w-full px-4 py-3 rounded-xl text-sm"
                style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Quiz ID</label>
              <input
                type="text"
                value={joinQuizId}
                onChange={(e) => setJoinQuizId(e.target.value)}
                placeholder="From your quiz result"
                className="w-full px-4 py-3 rounded-xl text-sm font-mono"
                style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }}
                required
              />
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                Complete a quiz first to get your quiz ID
              </p>
            </div>
            <button
              type="submit"
              disabled={!joinCode || !memberName || !joinQuizId}
              className="w-full py-4 rounded-full font-semibold transition-all"
              style={{
                background: joinCode && memberName && joinQuizId ? "var(--color-accent)" : "var(--bg-secondary)",
                color: joinCode && memberName && joinQuizId ? "white" : "var(--text-muted)",
                opacity: joinCode && memberName && joinQuizId ? 1 : 0.5,
                cursor: joinCode && memberName && joinQuizId ? "pointer" : "not-allowed",
              }}
            >
              Join Circle
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function CirclePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <div className="w-16 h-16 rounded-full mx-auto" style={{ background: "var(--color-secondary)" }} />
            </div>
            <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
          </div>
        </div>
      }
    >
      <CircleContent />
    </Suspense>
  );
}
