"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface TeamMember {
  name: string;
  role: string;
  percentages: Record<string, number>;
  primaryVirtue: string;
  secondaryVirtue: string;
}

interface TeamData {
  teamName: string;
  members: TeamMember[];
  stats: {
    avgPercentages: Record<string, number>;
    dominantVirtue: string;
    teamStrength: number;
  };
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

function TeamContent() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  const quizId = searchParams.get("quizId");

  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(!!teamId);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Create form
  const [teamName, setTeamName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorRole, setCreatorRole] = useState("");

  // Join form
  const [joinCode, setJoinCode] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [joinQuizId, setJoinQuizId] = useState("");
  const [mode, setMode] = useState<"view" | "create" | "join">(teamId ? "view" : quizId ? "create" : "view");

  useEffect(() => {
    if (teamId) {
      fetchTeamData(teamId);
    }
  }, [teamId]);

  async function fetchTeamData(id: string) {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/team/${id}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setTeamData(data);
    } catch (err) {
      setError("Failed to load team data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!quizId || !teamName || !creatorName || !creatorRole) return;

    try {
      setCreating(true);
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/team/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, name: creatorName, teamName, role: creatorRole }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setInviteCode(data.inviteCode);
      window.history.replaceState(null, "", `/team?id=${data.teamId}`);
      fetchTeamData(data.teamId);
    } catch (err) {
      setError("Failed to create team.");
    } finally {
      setCreating(false);
    }
  }

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!joinCode || !joinQuizId || !memberName || !memberRole) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/team/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode: joinCode, quizId: joinQuizId, name: memberName, role: memberRole }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      window.location.href = `/team?id=${data.teamId}`;
    } catch (err) {
      setError("Failed to join team.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchAnalysis() {
    if (!teamId) return;
    try {
      setLoadingAnalysis(true);
      const res = await fetch(`${API_BASE}/api/team/${teamId}/analysis`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setAnalysis(data.analysis);
    } catch (err) {
      setError("Failed to generate team analysis.");
    } finally {
      setLoadingAnalysis(false);
    }
  }

  function handleCopyCode() {
    navigator.clipboard.writeText(inviteCode);
  }

  if (loading || creating) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 rounded-full mx-auto" style={{ background: "var(--color-accent)" }} />
          </div>
          <p style={{ color: "var(--text-secondary)" }}>
            {creating ? "Building your team..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // Team view
  if (teamData) {
    const sortedAvg = Object.entries(teamData.stats.avgPercentages).sort(([, a], [, b]) => b - a);

    return (
      <div className="min-h-screen py-12 px-4" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-5xl mx-auto">
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
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(78, 205, 196, 0.15)" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="font-heading font-bold text-3xl mb-2" style={{ color: "var(--text-primary)" }}>
              {teamData.teamName}
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              {teamData.members.length} team member{teamData.members.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Invite Code */}
          {inviteCode && (
            <div className="p-6 rounded-2xl mb-8 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>Invite your teammates:</p>
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

          {/* Team Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Dominant Virtue</p>
              <h3 className="font-heading font-bold text-xl" style={{ color: virtueColors[teamData.stats.dominantVirtue] }}>
                {virtueNames[teamData.stats.dominantVirtue]}
              </h3>
            </div>
            <div className="p-5 rounded-2xl text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Team Strength</p>
              <h3 className="font-heading font-bold text-xl" style={{ color: "var(--color-accent)" }}>
                {teamData.stats.teamStrength}%
              </h3>
            </div>
            <div className="p-5 rounded-2xl text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Members</p>
              <h3 className="font-heading font-bold text-xl" style={{ color: "var(--color-secondary)" }}>
                {teamData.members.length}
              </h3>
            </div>
          </div>

          {/* Average Virtues */}
          <div className="p-8 rounded-2xl mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
            <h3 className="font-heading font-semibold text-xl mb-6" style={{ color: "var(--text-primary)" }}>
              Team Average Virtues
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

          {/* Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {teamData.members.map((member, i) => (
              <div key={i} className="p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: virtueColors[member.primaryVirtue], color: "black" }}>
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{member.name}</h4>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: `${virtueColors[member.primaryVirtue]}20`, color: virtueColors[member.primaryVirtue] }}>
                    {virtueNames[member.primaryVirtue]}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: `${virtueColors[member.secondaryVirtue]}20`, color: virtueColors[member.secondaryVirtue] }}>
                    {virtueNames[member.secondaryVirtue]}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {Object.entries(member.percentages).sort(([, a], [, b]) => b - a).slice(0, 3).map(([v, p]) => (
                    <div key={v} className="flex items-center gap-1.5">
                      <span className="text-[9px] w-16 text-right" style={{ color: "var(--text-muted)" }}>{virtueNames[v]}</span>
                      <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                        <div className="h-full rounded-full" style={{ width: `${p}%`, background: virtueColors[v] }} />
                      </div>
                      <span className="text-[9px] font-mono w-6" style={{ color: "var(--text-muted)" }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* AI Analysis */}
          <div className="p-8 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="font-heading font-semibold text-xl" style={{ color: "var(--text-primary)" }}>
                  AI Team Analysis
                </h3>
              </div>
              {!analysis && (
                <button
                  onClick={fetchAnalysis}
                  disabled={loadingAnalysis}
                  className="px-6 py-3 rounded-full font-semibold text-sm transition-all"
                  style={{
                    background: loadingAnalysis ? "var(--bg-secondary)" : "var(--color-accent)",
                    color: "white",
                    opacity: loadingAnalysis ? 0.7 : 1,
                  }}
                >
                  {loadingAnalysis ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    "Generate Analysis"
                  )}
                </button>
              )}
            </div>

            {analysis && (
              <div className="p-6 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                <p className="leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-primary)" }}>
                  {analysis}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // No team data - show create/join forms
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
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(78, 205, 196, 0.15)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-heading font-bold text-3xl mb-2" style={{ color: "var(--text-primary)" }}>Team Building</h1>
          <p style={{ color: "var(--text-secondary)" }}>Analyze your team&apos;s soul virtues for better collaboration</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-8 p-1 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
          <button
            onClick={() => setMode("create")}
            className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all"
            style={{ background: mode === "create" ? "var(--color-accent)" : "transparent", color: mode === "create" ? "white" : "var(--text-secondary)" }}
          >
            Create Team
          </button>
          <button
            onClick={() => setMode("join")}
            className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all"
            style={{ background: mode === "join" ? "var(--color-primary)" : "transparent", color: mode === "join" ? "white" : "var(--text-secondary)" }}
          >
            Join Team
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
                <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>Complete a quiz first to create a team</p>
                <a href="/quiz" className="px-6 py-3 rounded-full font-semibold text-sm inline-block" style={{ background: "var(--color-accent)", color: "white" }}>
                  Take the Quiz
                </a>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Team Name</label>
              <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g., Engineering Team"
                className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Name</label>
              <input type="text" value={creatorName} onChange={(e) => setCreatorName(e.target.value)} placeholder="Your display name"
                className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Role</label>
              <input type="text" value={creatorRole} onChange={(e) => setCreatorRole(e.target.value)} placeholder="e.g., Team Lead"
                className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
            </div>
            <button
              type="submit"
              disabled={!quizId || !teamName || !creatorName || !creatorRole}
              className="w-full py-4 rounded-full font-semibold transition-all"
              style={{
                background: quizId && teamName && creatorName && creatorRole ? "var(--color-accent)" : "var(--bg-secondary)",
                color: quizId && teamName && creatorName && creatorRole ? "white" : "var(--text-muted)",
                opacity: quizId && teamName && creatorName && creatorRole ? 1 : 0.5,
                cursor: quizId && teamName && creatorName && creatorRole ? "pointer" : "not-allowed",
              }}
            >
              Create Team
            </button>
          </form>
        ) : (
          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Invite Code</label>
              <input type="text" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} placeholder="e.g., ABC123"
                className="w-full px-4 py-3 rounded-xl text-sm font-mono tracking-widest text-center uppercase"
                style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Name</label>
              <input type="text" value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="Your display name"
                className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Role</label>
              <input type="text" value={memberRole} onChange={(e) => setMemberRole(e.target.value)} placeholder="e.g., Developer"
                className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Quiz ID</label>
              <input type="text" value={joinQuizId} onChange={(e) => setJoinQuizId(e.target.value)} placeholder="From your quiz result"
                className="w-full px-4 py-3 rounded-xl text-sm font-mono" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.15)" }} required />
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                Complete a quiz first to get your quiz ID
              </p>
            </div>
            <button
              type="submit"
              disabled={!joinCode || !memberName || !memberRole || !joinQuizId}
              className="w-full py-4 rounded-full font-semibold transition-all"
              style={{
                background: joinCode && memberName && memberRole && joinQuizId ? "var(--color-primary)" : "var(--bg-secondary)",
                color: joinCode && memberName && memberRole && joinQuizId ? "white" : "var(--text-muted)",
                opacity: joinCode && memberName && memberRole && joinQuizId ? 1 : 0.5,
                cursor: joinCode && memberName && memberRole && joinQuizId ? "pointer" : "not-allowed",
              }}
            >
              Join Team
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <div className="w-16 h-16 rounded-full mx-auto" style={{ background: "var(--color-accent)" }} />
            </div>
            <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
          </div>
        </div>
      }
    >
      <TeamContent />
    </Suspense>
  );
}
