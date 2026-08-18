"use client";

import { useState, useEffect } from "react";

interface Question {
  id: number;
  scenario: string;
  options: { text: string }[];
}

interface QuizState {
  quizId: string;
  currentQuestion: Question | null;
  answeredQuestions: number;
  totalQuestions: number;
  isComplete: boolean;
  answers: Record<number, number>;
}

const API_BASE = "https://soulvirtues-api.fuyuanzeng520.workers.dev";

export default function QuizPage() {
  const [state, setState] = useState<QuizState>({
    quizId: "",
    currentQuestion: null,
    answeredQuestions: 0,
    totalQuestions: 66,
    isComplete: false,
    answers: {},
  });
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Start quiz on mount
  useEffect(() => {
    startQuiz();
  }, []);

  async function startQuiz() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/quiz/start`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      // Get first question
      const firstQuestion = data.questions[0];

      setState({
        quizId: data.quizId,
        currentQuestion: firstQuestion,
        answeredQuestions: 0,
        totalQuestions: data.totalQuestions,
        isComplete: false,
        answers: {},
      });
    } catch (err) {
      setError("Failed to start quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function selectAnswer(questionId: number, answerIndex: number) {
    if (selecting) return;

    try {
      setSelecting(true);
      const res = await fetch(`${API_BASE}/api/quiz/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: state.quizId,
          questionId,
          answerIndex,
        }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      const newAnswers = { ...state.answers, [questionId]: answerIndex };

      setState((prev) => ({
        ...prev,
        currentQuestion: data.nextQuestion,
        answeredQuestions: data.answeredQuestions,
        isComplete: data.isComplete,
        answers: newAnswers,
      }));
    } catch (err) {
      setError("Failed to submit answer. Please try again.");
    } finally {
      setSelecting(false);
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
            Preparing your soul virtues test...
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
          <button
            onClick={startQuiz}
            className="px-6 py-3 rounded-full font-semibold"
            style={{
              background: "var(--color-primary)",
              color: "white",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state.isComplete) {
    // Redirect to result page
    if (typeof window !== "undefined") {
      window.location.href = `/quiz/result?quizId=${state.quizId}`;
    }
    return null;
  }

  if (!state.currentQuestion) {
    return null;
  }

  const progress =
    (state.answeredQuestions / state.totalQuestions) * 100;

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-50"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: "var(--color-primary)",
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-1 left-0 right-0 z-40 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="text-sm font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              {state.answeredQuestions}/{state.totalQuestions}
            </span>
            <div
              className="w-32 h-2 rounded-full overflow-hidden"
              style={{ background: "var(--bg-card)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: "var(--color-primary)",
                }}
              />
            </div>
          </div>
          <span
            className="text-sm font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            Question {state.currentQuestion.id}
          </span>
        </div>
      </header>

      {/* Question */}
      <main className="pt-20 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Scenario badge */}
          <div className="mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium"
              style={{
                background: "rgba(78, 205, 196, 0.08)",
                border: "1px solid rgba(78, 205, 196, 0.15)",
                color: "var(--color-accent)",
              }}
            >
              SCENARIO
            </span>
          </div>

          {/* Question text */}
          <h1
            className="font-heading font-bold text-2xl sm:text-3xl mb-8 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {state.currentQuestion.scenario}
          </h1>

          {/* Options */}
          <div className="space-y-3">
            {state.currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  selectAnswer(state.currentQuestion!.id, index)
                }
                disabled={selecting}
                className="w-full text-left p-5 rounded-xl transition-all duration-200 group"
                style={{
                  background: "var(--bg-card)",
                  border: "1.5px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-card-hover)";
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                  e.currentTarget.style.transform = "translateX(4px)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(255, 107, 107, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bg-card)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)";
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono font-semibold"
                    style={{
                      background: "rgba(255, 107, 107, 0.1)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span
                    className="text-base leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Help text */}
          <p
            className="mt-6 text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Choose the response that feels most natural to you
          </p>
        </div>
      </main>
    </div>
  );
}
