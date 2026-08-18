import type { Metadata } from "next";
import VirtuesGrid from "@/components/VirtuesGrid";

export const metadata: Metadata = {
  title: "The Seven Soul Virtues — Complete Guide | Soul Virtues Extractor",
  description:
    "Discover the seven soul virtues: Determination, Bravery, Justice, Kindness, Patience, Integrity, and Perseverance. Learn what each virtue means and how it shapes your personality.",
  keywords: [
    "seven soul virtues",
    "soul virtues meaning",
    "determination virtue",
    "bravery virtue",
    "justice virtue",
    "kindness virtue",
    "patience virtue",
    "integrity virtue",
    "perseverance virtue",
    "personality virtues",
  ],
  openGraph: {
    title: "The Seven Soul Virtues — Complete Guide",
    description:
      "A deep dive into the seven soul virtues that define your personality profile.",
    url: "https://virtuesextractor.com/virtues",
    type: "website",
  },
};

const virtues = [
  {
    slug: "determination",
    name: "Determination",
    description:
      "Determination is the unwavering commitment to your goals, even when the path gets difficult. It's the voice inside that says 'keep going' when everything else says 'stop.'",
  },
  {
    slug: "bravery",
    name: "Bravery",
    description:
      "Bravery is the willingness to face danger, difficulty, or pain despite fear. It's not about being fearless — it's about acting despite the fear.",
  },
  {
    slug: "justice",
    name: "Justice",
    description:
      "Justice is the deep commitment to fairness, equality, and doing what's right — even when it's unpopular. It's the virtue that holds society together.",
  },
  {
    slug: "kindness",
    name: "Kindness",
    description:
      "Kindness is the genuine desire to help others and make the world better. It's not weakness — it's the strength to care deeply and act on it.",
  },
  {
    slug: "patience",
    name: "Patience",
    description:
      "Patience is the ability to endure difficulty, delay, or frustration without becoming anxious or angry. It's the quiet strength that allows growth to happen naturally.",
  },
  {
    slug: "integrity",
    name: "Integrity",
    description:
      "Integrity is the commitment to honesty, strong moral principles, and consistency between your words and actions. It's the foundation of trust.",
  },
  {
    slug: "perseverance",
    name: "Perseverance",
    description:
      "Perseverance is the sustained effort to achieve long-term goals despite obstacles, failures, and discouragement. It's the virtue that turns dreams into reality.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "The Seven Soul Virtues — Complete Guide",
  description:
    "Discover the seven soul virtues that define your personality: Determination, Bravery, Justice, Kindness, Patience, Integrity, and Perseverance.",
  url: "https://virtuesextractor.com/virtues",
  hasPart: virtues.map((v) => ({
    "@type": "Article",
    name: `${v.name} Virtue`,
    url: `https://virtuesextractor.com/virtues/${v.slug}`,
    description: v.description,
  })),
};

export default function VirtuesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className="min-h-screen py-20 px-4"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-6"
              style={{
                background: "rgba(78, 205, 196, 0.15)",
                color: "var(--color-accent)",
              }}
            >
              Complete Guide
            </span>
            <h1
              className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              The Seven Soul Virtues
            </h1>
            <p
              className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Every soul has seven signals. Each virtue represents a different
              aspect of who you are — your strengths, your challenges, and your
              potential for growth.
            </p>
          </div>

          {/* Virtue Cards Grid — client component with hover effects */}
          <VirtuesGrid />

          {/* CTA */}
          <div
            className="text-center p-12 rounded-2xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <h2
              className="font-heading font-bold text-2xl sm:text-3xl mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Which virtue defines you?
            </h2>
            <p
              className="text-base mb-8 max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Take the 66-question soul virtues test and discover your complete
              seven-virtue profile — with AI-powered deep analysis.
            </p>
            <a
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all"
              style={{
                background: "var(--color-primary)",
                color: "white",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 1v14M1 8h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Take the Free Test
            </a>
            {/* Authority Statement */}
            <p className="mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
              Our assessment is grounded in Aristotelian virtue ethics and validated through modern positive psychology research.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
