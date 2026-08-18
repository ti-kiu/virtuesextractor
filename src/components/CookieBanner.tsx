"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  }

  function handleDecline() {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      style={{ background: "rgba(10, 10, 10, 0.95)", borderTop: "1px solid var(--border-primary)" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            We use cookies and similar technologies for site functionality, analytics, and to improve your experience.
            By clicking &quot;Accept&quot;, you consent to our use of cookies as described in our{" "}
            <a href="/cookie" className="underline" style={{ color: "var(--color-accent)" }}>
              Cookie Policy
            </a>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border-primary)" }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{ background: "var(--color-primary)", color: "white" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
