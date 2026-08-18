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

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Team Composition",
    description: "See every member's virtue profile at a glance. Understand your team's collective strengths and blind spots.",
    color: "#4ECDC4",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFE66D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18 17l-5-5-4 4-3-3" />
      </svg>
    ),
    title: "Team Analytics",
    description: "Get aggregate virtue scores, dominant strengths, and team cohesion metrics powered by real data.",
    color: "#FFE66D",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "AI Team Analysis",
    description: "Generate AI-powered recommendations for better collaboration, role assignments, and conflict resolution.",
    color: "#FF6B6B",
  },
];

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
  const [copied, setCopied] = useState(false);

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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading || creating) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ border: "2px solid rgba(78, 205, 196, 0.3)" }} />
            <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: "rgba(78, 205, 196, 0.2)" }} />
          </div>
          <p className="font-mono text-sm" style={{ color: "var(--text-secondary)" }}>
            {creating ? "Building your team..." : "Loading team data..."}
          </p>
        </div>
      </div>
    );
  }

  // Team view
  if (teamData) {
    const sortedAvg = Object.entries(teamData.stats.avgPercentages).sort(([, a], [, b]) => b - a);

    return (
      <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
        {/* Results Hero */}
        <section className="relative overflow-hidden pt-24 pb-12 bg-grid">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(78, 205, 196, 0.06) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <div className="mb-6">
              <a href="/" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:gap-3" style={{ color: "var(--color-accent)", background: "rgba(78, 205, 196, 0.08)", border: "1px solid rgba(78, 205, 196, 0.15)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Home
              </a>
            </div>

            <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(78, 205, 196, 0.12)", border: "1px solid rgba(78, 205, 196, 0.2)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: "rgba(78, 205, 196, 0.08)", border: "1px solid rgba(78, 205, 196, 0.15)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-accent)" }} />
              <span className="text-xs font-mono font-medium" style={{ color: "var(--color-accent)" }}>TEAM BUILDING</span>
            </div>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-3" style={{ color: "var(--text-primary)" }}>
              {teamData.teamName}
            </h1>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              {teamData.members.length} team member{teamData.members.length !== 1 ? "s" : ""} · Virtue-powered collaboration
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 pb-20">
          {/* Invite Code */}
          {inviteCode && (
            <div className="p-6 rounded-2xl mb-8 text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>Invite your teammates:</p>
              <div className="flex items-center justify-center gap-3">
                <code className="px-6 py-3 rounded-xl text-xl font-mono font-bold tracking-widest" style={{ background: "var(--bg-secondary)", color: "var(--color-accent)", border: "1px solid rgba(78, 205, 196, 0.2)" }}>
                  {inviteCode}
                </code>
                <button onClick={handleCopyCode} className="p-3 rounded-xl transition-all" style={{ background: copied ? "rgba(78, 205, 196, 0.15)" : "var(--bg-secondary)", border: "1px solid " + (copied ? "rgba(78, 205, 196, 0.4)" : "var(--border-primary)") }}>
                  {copied ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Team Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-6 rounded-2xl text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${virtueColors[teamData.stats.dominantVirtue]}12` }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={virtueColors[teamData.stats.dominantVirtue]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Dominant Virtue</p>
              <h3 className="font-heading font-bold text-lg" style={{ color: virtueColors[teamData.stats.dominantVirtue] }}>
                {virtueNames[teamData.stats.dominantVirtue]}
              </h3>
            </div>
            <div className="p-6 rounded-2xl text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(78, 205, 196, 0.12)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Team Strength</p>
              <h3 className="font-heading font-bold text-lg" style={{ color: "var(--color-accent)" }}>
                {teamData.stats.teamStrength}%
              </h3>
            </div>
            <div className="p-6 rounded-2xl text-center" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(255, 230, 109, 0.12)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Members</p>
              <h3 className="font-heading font-bold text-lg" style={{ color: "var(--color-secondary)" }}>
                {teamData.members.length}
              </h3>
            </div>
          </div>

          {/* Average Virtues */}
          <div className="p-8 rounded-2xl mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(78, 205, 196, 0.12)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="M18 17l-5-5-4 4-3-3" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-xl" style={{ color: "var(--text-primary)" }}>
                Team Average Virtues
              </h3>
            </div>
            <div className="space-y-3">
              {sortedAvg.map(([virtue, pct]) => (
                <div key={virtue} className="flex items-center gap-3">
                  <span className="w-28 text-xs font-medium text-right flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                    {virtueNames[virtue]}
                  </span>
                  <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                    <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700" style={{ width: `${pct}%`, background: virtueColors[virtue], minWidth: "32px" }}>
                      <span className="text-[10px] font-mono font-bold text-black">{pct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            Team Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {teamData.members.map((member, i) => (
              <div key={i} className="p-5 rounded-2xl transition-all hover:-translate-y-1" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(78, 205, 196, 0.12)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl" style={{ color: "var(--text-primary)" }}>
                  AI Team Analysis
                </h3>
              </div>
              {!analysis && (
                <button
                  onClick={fetchAnalysis}
                  disabled={loadingAnalysis}
                  className="px-6 py-3 rounded-xl font-heading font-semibold text-sm transition-all flex items-center gap-2"
                  style={{
                    background: loadingAnalysis ? "var(--bg-secondary)" : "var(--color-accent)",
                    color: "white",
                    opacity: loadingAnalysis ? 0.7 : 1,
                    boxShadow: loadingAnalysis ? "none" : "0 0 20px rgba(78, 205, 196, 0.3), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {loadingAnalysis ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                      Generate Analysis
                    </>
                  )}
                </button>
              )}
            </div>

            {analysis && (
              <div className="p-6 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                <p className="leading-relaxed whitespace-pre-wrap text-sm" style={{ color: "var(--text-secondary)" }}>
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
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 bg-grid">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(78, 205, 196, 0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255, 230, 109, 0.05) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:gap-3" style={{ color: "var(--color-accent)", background: "rgba(78, 205, 196, 0.08)", border: "1px solid rgba(78, 205, 196, 0.15)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </a>
          </div>

          <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(78, 205, 196, 0.12)", border: "1px solid rgba(78, 205, 196, 0.2)" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: "rgba(78, 205, 196, 0.08)", border: "1px solid rgba(78, 205, 196, 0.15)" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-accent)" }} />
            <span className="text-xs font-mono font-medium" style={{ color: "var(--color-accent)" }}>TEAM BUILDING</span>
          </div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-4" style={{ color: "var(--text-primary)" }}>
            Team <span className="neon-text-cyan" style={{ color: "var(--color-accent)" }}>Building</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Analyze your team&apos;s soul virtues for better collaboration. See strengths, uncover blind spots, and build with intention.
          </p>

          <div className="flex flex-wrap items-center gap-4 justify-center text-sm" style={{ color: "var(--text-muted)" }}>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Unlimited members
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              AI team analysis
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Invite with code
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
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-8 p-1.5 rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
            <button
              onClick={() => setMode("create")}
              className="flex-1 py-3 rounded-lg text-sm font-semibold font-heading transition-all"
              style={{ background: mode === "create" ? "var(--color-accent)" : "transparent", color: mode === "create" ? "white" : "var(--text-secondary)", boxShadow: mode === "create" ? "0 0 16px rgba(78, 205, 196, 0.3)" : "none" }}
            >
              Create Team
            </button>
            <button
              onClick={() => setMode("join")}
              className="flex-1 py-3 rounded-lg text-sm font-semibold font-heading transition-all"
              style={{ background: mode === "join" ? "var(--color-primary)" : "transparent", color: mode === "join" ? "white" : "var(--text-secondary)", boxShadow: mode === "join" ? "0 0 16px rgba(255, 107, 107, 0.3)" : "none" }}
            >
              Join Team
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-xl mb-6 flex items-start gap-3" style={{ background: "rgba(255, 107, 107, 0.08)", border: "1px solid rgba(255, 107, 107, 0.2)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" className="shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
              </svg>
              <p className="text-sm" style={{ color: "#FF6B6B" }}>{error}</p>
            </div>
          )}

          {/* Form Card */}
          <div className="p-6 sm:p-8 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
            {mode === "create" ? (
              <form onSubmit={handleCreate} className="space-y-5">
                <div className="text-center mb-6">
                  <h3 className="font-heading font-semibold text-xl mb-1" style={{ color: "var(--text-primary)" }}>Create a Team</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Set up your team and invite members</p>
                </div>

                {!quizId && (
                  <div className="p-5 rounded-xl text-center" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" className="mx-auto mb-3">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
                    </svg>
                    <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>Complete a quiz first to create a team</p>
                    <a href="/quiz" className="btn-primary text-sm !py-2.5 !px-6">
                      Take the Quiz
                    </a>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Team Name</label>
                  <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g., Engineering Team"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(78, 205, 196, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Name</label>
                  <input type="text" value={creatorName} onChange={(e) => setCreatorName(e.target.value)} placeholder="Your display name"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(78, 205, 196, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Role</label>
                  <input type="text" value={creatorRole} onChange={(e) => setCreatorRole(e.target.value)} placeholder="e.g., Team Lead"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(78, 205, 196, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                </div>
                <button
                  type="submit"
                  disabled={!quizId || !teamName || !creatorName || !creatorRole}
                  className="w-full py-4 rounded-xl font-heading font-semibold text-base transition-all flex items-center justify-center gap-2"
                  style={{
                    background: quizId && teamName && creatorName && creatorRole ? "var(--color-accent)" : "var(--bg-secondary)",
                    color: quizId && teamName && creatorName && creatorRole ? "white" : "var(--text-muted)",
                    opacity: quizId && teamName && creatorName && creatorRole ? 1 : 0.5,
                    cursor: quizId && teamName && creatorName && creatorRole ? "pointer" : "not-allowed",
                    boxShadow: quizId && teamName && creatorName && creatorRole ? "0 0 20px rgba(78, 205, 196, 0.3), 0 4px 12px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                  Create Team
                </button>
              </form>
            ) : (
              <form onSubmit={handleJoin} className="space-y-5">
                <div className="text-center mb-6">
                  <h3 className="font-heading font-semibold text-xl mb-1" style={{ color: "var(--text-primary)" }}>Join a Team</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Enter the invite code shared by your team lead</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Invite Code</label>
                  <input type="text" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} placeholder="e.g., ABC123"
                    className="w-full px-4 py-3.5 rounded-xl text-sm font-mono tracking-widest text-center uppercase transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(255, 107, 107, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Name</label>
                  <input type="text" value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="Your display name"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(255, 107, 107, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Role</label>
                  <input type="text" value={memberRole} onChange={(e) => setMemberRole(e.target.value)} placeholder="e.g., Developer"
                    className="w-full px-4 py-3.5 rounded-xl text-sm transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(255, 107, 107, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Your Quiz ID</label>
                  <input type="text" value={joinQuizId} onChange={(e) => setJoinQuizId(e.target.value)} placeholder="From your quiz result"
                    className="w-full px-4 py-3.5 rounded-xl text-sm font-mono transition-all"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none" }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--color-primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(255, 107, 107, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; e.target.style.boxShadow = "none"; }}
                    required />
                  <p className="text-xs mt-2 flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                    </svg>
                    Complete a quiz first to get your quiz ID
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={!joinCode || !memberName || !memberRole || !joinQuizId}
                  className="w-full py-4 rounded-xl font-heading font-semibold text-base transition-all flex items-center justify-center gap-2"
                  style={{
                    background: joinCode && memberName && memberRole && joinQuizId ? "var(--color-primary)" : "var(--bg-secondary)",
                    color: joinCode && memberName && memberRole && joinQuizId ? "white" : "var(--text-muted)",
                    opacity: joinCode && memberName && memberRole && joinQuizId ? 1 : 0.5,
                    cursor: joinCode && memberName && memberRole && joinQuizId ? "pointer" : "not-allowed",
                    boxShadow: joinCode && memberName && memberRole && joinQuizId ? "0 0 20px rgba(255, 107, 107, 0.3), 0 4px 12px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Join Team
                </button>
              </form>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Haven&apos;t taken the quiz yet?</p>
            <a href="/quiz" className="btn-secondary text-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Take the Soul Virtues Quiz
            </a>
            {/* Related Pages */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="/circle" className="text-xs px-3 py-1.5 rounded-full" style={{ color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                Family Circle
              </a>
              <a href="/couple" className="text-xs px-3 py-1.5 rounded-full" style={{ color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                Couple Match
              </a>
              <a href="/virtues" className="text-xs px-3 py-1.5 rounded-full" style={{ color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                Seven Virtues Guide
              </a>
            </div>
          </div>
        </div>
      </section>
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
