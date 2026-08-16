"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is the Soul Virtues Extractor?",
    answer:
      "The Soul Virtues Extractor is a free 66-question personality test that measures seven soul virtues: Determination, Bravery, Justice, Kindness, Patience, Integrity, and Perseverance. Unlike other tests that give you a single label, we show your full percentage spread across all seven virtues.",
  },
  {
    question: "How many questions does it have?",
    answer:
      "The test has 66 questions. Each statement is rated on a five-point scale. Every answer adjusts all seven virtues at once — which is why the test takes the full 66 to build a reliable spread.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes. The basic soul virtues test is completely free. You get your seven-virtue profile and basic interpretation at no cost. We offer optional paid features like AI deep analysis and 30-day growth plans.",
  },
  {
    question: "How does the AI analysis work?",
    answer:
      "After your test, our AI asks follow-up questions about your life and generates a personalized reading. It's based on your specific virtue distribution and real-life context — not a generic profile.",
  },
  {
    question: "Can I compare with friends?",
    answer:
      'Yes. You can create a "Soul Circle" and invite friends or family. Everyone takes the test, and you see how your virtues complement each other. The basic circle (up to 3 people) is free.',
  },
  {
    question: "Is my data private?",
    answer:
      "Your test answers stay in your browser. We don't store individual answers on our servers. When you share results, only your final percentages are included — not your actual answers.",
  },
  {
    question: "Do I need to play Undertale?",
    answer:
      "No. The test is inspired by Undertale's seven soul virtues, but you don't need any game knowledge. The questions are about your real personality, not the game.",
  },
  {
    question: "Can I retake the test?",
    answer:
      "Yes. You can retake the test as many times as you want. Your results are saved locally, so you can compare over time.",
  },
  {
    question:
      "What's the difference between this and other personality tests?",
    answer:
      "Three things: (1) We measure seven virtues, not one. (2) We use AI to generate personalized readings. (3) We offer tools for growth — not just a label.",
  },
  {
    question: "How accurate is the test?",
    answer:
      "The test is based on established personality research (IPIP) and fan-developed virtue definitions. It's designed for self-reflection and entertainment, not clinical diagnosis.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-h2 text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-body-lg">
            Everything you need to know about the Soul Virtues Extractor
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card-dark overflow-hidden">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-6 py-4 text-left flex items-center justify-between"
              >
                <span className="font-heading font-semibold text-text-primary">
                  {faq.question}
                </span>
                <span
                  className={`text-neon-cyan transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-text-secondary text-body">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
