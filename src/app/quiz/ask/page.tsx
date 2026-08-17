"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_BASE = "https://soulvirtues-api.fuyuanzeng520.workers.dev";

function AskContent() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading || !quizId) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/ai/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId,
          question: userMessage,
          history: messages,
        }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err) {
      setError("Failed to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-4 py-4"
        style={{
          background: "var(--bg-primary)",
          borderBottom: "1px solid var(--border-primary)",
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-sm"
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
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
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
          <div className="flex items-center gap-2">
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
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <h2
                className="font-heading font-bold text-2xl mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Ask About Your Results
              </h2>
              <p
                className="text-lg mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                Our AI analyst can answer any questions about your soul virtues
                profile
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {[
                  "Why is my Determination so high?",
                  "How can I improve my Patience?",
                  "What does my profile say about relationships?",
                  "Give me a daily practice for my lowest virtue",
                ].map((question, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(question)}
                    className="p-3 rounded-xl text-left text-sm transition-all"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === "user" ? "rounded-tr-md" : "rounded-tl-md"
                }`}
                style={{
                  background:
                    msg.role === "user"
                      ? "var(--color-primary)"
                      : "var(--bg-card)",
                  border:
                    msg.role === "user"
                      ? "none"
                      : "1px solid var(--border-primary)",
                }}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{
                        background: "rgba(78, 205, 196, 0.2)",
                        color: "var(--color-accent)",
                      }}
                    >
                      AI ANALYST
                    </span>
                  </div>
                )}
                <p
                  className="text-sm leading-relaxed whitespace-pre-wrap"
                  style={{
                    color:
                      msg.role === "user"
                        ? "white"
                        : "var(--text-primary)",
                  }}
                >
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="max-w-[80%] p-4 rounded-2xl rounded-tl-md"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-mono"
                    style={{
                      background: "rgba(78, 205, 196, 0.2)",
                      color: "var(--color-accent)",
                    }}
                  >
                    AI ANALYST
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: "var(--color-accent)",
                      animationDelay: "0ms",
                    }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: "var(--color-accent)",
                      animationDelay: "150ms",
                    }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: "var(--color-accent)",
                      animationDelay: "300ms",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <footer
        className="sticky bottom-0 px-4 py-4"
        style={{
          background: "var(--bg-primary)",
          borderTop: "1px solid var(--border-primary)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your results..."
            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
              color: "var(--text-primary)",
            }}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{
              background:
                !input.trim() || loading
                  ? "var(--bg-secondary)"
                  : "var(--color-primary)",
              color: "white",
              opacity: !input.trim() || loading ? 0.5 : 1,
            }}
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}

export default function AskPage() {
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
      <AskContent />
    </Suspense>
  );
}
