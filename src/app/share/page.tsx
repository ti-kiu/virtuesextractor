"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface ShareData {
  name: string;
  percentages: Record<string, number>;
  primaryVirtue: string;
  secondaryVirtue: string;
  primaryColor: string;
  secondaryColor: string;
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

function ShareContent() {
  const searchParams = useSearchParams();
  const shareId = searchParams.get("id");
  const quizId = searchParams.get("quizId");

  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shareId) {
      fetchShareData(shareId);
    } else if (quizId) {
      createShare();
    } else {
      setLoading(false);
    }
  }, [shareId, quizId]);

  async function createShare() {
    try {
      setCreating(true);
      const res = await fetch(`${API_BASE}/api/share/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setShareUrl(data.shareUrl);
      window.history.replaceState(null, "", `/share?id=${data.shareId}`);
      fetchShareData(data.shareId);
    } catch (err) {
      setError("Failed to create share link.");
    } finally {
      setCreating(false);
      setLoading(false);
    }
  }

  async function fetchShareData(id: string) {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/share/${id}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setShareData(data);
      if (!shareUrl) {
        setShareUrl(`${window.location.origin}/share?id=${id}`);
      }
    } catch (err) {
      setError("Failed to load share data.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading || creating) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 rounded-full mx-auto" style={{ background: "var(--color-accent)" }} />
          </div>
          <p style={{ color: "var(--text-secondary)" }}>
            {creating ? "Creating your share link..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
          </svg>
          <p className="text-red-400 mb-4">{error}</p>
          <a href="/quiz" className="px-6 py-3 rounded-full font-semibold inline-block" style={{ background: "var(--color-primary)", color: "white" }}>
            Take the Quiz
          </a>
        </div>
      </div>
    );
  }

  if (!shareData && !quizId) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-center max-w-md mx-auto px-4">
          <svg className="w-20 h-20 mx-auto mb-6" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 className="font-heading font-bold text-3xl mb-4" style={{ color: "var(--text-primary)" }}>
            Share Your Results
          </h1>
          <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
            Take the quiz first, then share your soul virtues profile with friends and family.
          </p>
          <a href="/quiz" className="px-8 py-4 rounded-full font-semibold inline-block" style={{ background: "var(--color-primary)", color: "white" }}>
            Take the Quiz First
          </a>
        </div>
      </div>
    );
  }

  const sortedVirtues = shareData
    ? Object.entries(shareData.percentages).sort(([, a], [, b]) => b - a)
    : [];

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-2xl mx-auto">
        {/* Home Link */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: "var(--color-accent)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </a>
        </div>

        {/* Share Card */}
        <div className="p-8 rounded-2xl mb-8" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(78, 205, 196, 0.15)" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {shareData?.name && (
              <h2 className="font-heading font-bold text-2xl mb-2" style={{ color: "var(--text-primary)" }}>
                {shareData.name}&apos;s Soul Virtues
              </h2>
            )}
            {!shareData?.name && (
              <h2 className="font-heading font-bold text-2xl mb-2" style={{ color: "var(--text-primary)" }}>
                Soul Virtues Profile
              </h2>
            )}
          </div>

          {shareData && (
            <>
              {/* Primary & Secondary */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl text-center" style={{ background: "var(--bg-secondary)", border: `2px solid ${virtueColors[shareData.primaryVirtue]}` }}>
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: virtueColors[shareData.primaryVirtue] }}>Primary</span>
                  <h3 className="font-heading font-bold text-lg mt-1" style={{ color: "var(--text-primary)" }}>
                    {virtueNames[shareData.primaryVirtue]}
                  </h3>
                  <div className="text-2xl font-bold mt-1" style={{ color: virtueColors[shareData.primaryVirtue] }}>
                    {shareData.percentages[shareData.primaryVirtue]}%
                  </div>
                </div>
                <div className="p-4 rounded-xl text-center" style={{ background: "var(--bg-secondary)", border: `2px solid ${virtueColors[shareData.secondaryVirtue]}` }}>
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: virtueColors[shareData.secondaryVirtue] }}>Secondary</span>
                  <h3 className="font-heading font-bold text-lg mt-1" style={{ color: "var(--text-primary)" }}>
                    {virtueNames[shareData.secondaryVirtue]}
                  </h3>
                  <div className="text-2xl font-bold mt-1" style={{ color: virtueColors[shareData.secondaryVirtue] }}>
                    {shareData.percentages[shareData.secondaryVirtue]}%
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="space-y-3">
                {sortedVirtues.map(([virtue, percentage]) => (
                  <div key={virtue} className="flex items-center gap-3">
                    <span className="w-28 text-xs font-medium text-right flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                      {virtueNames[virtue]}
                    </span>
                    <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                      <div
                        className="h-full rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${percentage}%`, background: virtueColors[virtue], minWidth: "32px" }}
                      >
                        <span className="text-[10px] font-mono font-bold text-black">{percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Share Actions */}
        {shareUrl && (
          <div className="p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
            <h3 className="font-heading font-semibold text-lg mb-4" style={{ color: "var(--text-primary)" }}>
              Share This Profile
            </h3>

            {/* URL Display */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-mono"
                style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)", border: "1px solid var(--border-primary)" }}
              />
              <button
                onClick={handleCopy}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ background: copied ? "var(--color-accent)" : "var(--color-primary)", color: "white" }}
              >
                {copied ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
              </button>
            </div>

            {/* Social Share Buttons */}
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=Check out my Soul Virtues profile!&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all"
                style={{ background: "rgba(29, 161, 242, 0.15)", color: "#1DA1F2", border: "1px solid rgba(29, 161, 242, 0.3)" }}
              >
                Twitter
              </a>
              <a
                href={`https://wa.me/?text=Check out my Soul Virtues profile! ${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all"
                style={{ background: "rgba(37, 211, 102, 0.15)", color: "#25D366", border: "1px solid rgba(37, 211, 102, 0.3)" }}
              >
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all"
                style={{ background: "rgba(24, 119, 242, 0.15)", color: "#1877F2", border: "1px solid rgba(24, 119, 242, 0.3)" }}
              >
                Facebook
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SharePage() {
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
      <ShareContent />
    </Suspense>
  );
}
