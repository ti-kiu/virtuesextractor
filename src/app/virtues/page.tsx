import type { Metadata } from "next";

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
    color: "#FF6B6B",
    tagline: "The fire that refuses to go out",
    description:
      "Determination is the unwavering commitment to your goals, even when the path gets difficult. It's the voice inside that says 'keep going' when everything else says 'stop.'",
    strengths: ["Goal achievement", "Resilience under pressure", "Long-term focus"],
    challenges: ["Stubbornness", "Burnout risk", "Difficulty adapting"],
  },
  {
    slug: "bravery",
    name: "Bravery",
    color: "#FF9F43",
    tagline: "Courage isn't the absence of fear",
    description:
      "Bravery is the willingness to face danger, difficulty, or pain despite fear. It's not about being fearless — it's about acting despite the fear.",
    strengths: ["Taking initiative", "Standing up for others", "Embracing challenges"],
    challenges: ["Recklessness", "Ignoring valid warnings", "Difficulty with caution"],
  },
  {
    slug: "justice",
    name: "Justice",
    color: "#4ECDC4",
    tagline: "The compass that points to what's right",
    description:
      "Justice is the deep commitment to fairness, equality, and doing what's right — even when it's unpopular. It's the virtue that holds society together.",
    strengths: ["Fair judgment", "Moral clarity", "Protecting the vulnerable"],
    challenges: ["Rigidity", "Difficulty with nuance", "Judging others too harshly"],
  },
  {
    slug: "kindness",
    name: "Kindness",
    color: "#FFE66D",
    tagline: "The light that warms everyone around it",
    description:
      "Kindness is the genuine desire to help others and make the world better. It's not weakness — it's the strength to care deeply and act on it.",
    strengths: ["Empathy", "Building connections", "Creating safe spaces"],
    challenges: ["People-pleasing", "Neglecting self-care", "Difficulty setting boundaries"],
  },
  {
    slug: "patience",
    name: "Patience",
    color: "#A8E6CF",
    tagline: "The calm in the center of the storm",
    description:
      "Patience is the ability to endure difficulty, delay, or frustration without becoming anxious or angry. It's the quiet strength that allows growth to happen naturally.",
    strengths: ["Calm under pressure", "Better decisions", "Deeper relationships"],
    challenges: ["Passivity", "Missing opportunities", "Being taken advantage of"],
  },
  {
    slug: "integrity",
    name: "Integrity",
    color: "#DDA0DD",
    tagline: "Who you are when no one is watching",
    description:
      "Integrity is the commitment to honesty, strong moral principles, and consistency between your words and actions. It's the foundation of trust.",
    strengths: ["Trustworthiness", "Self-respect", "Authentic relationships"],
    challenges: ["Perfectionism", "Difficulty forgiving", "Being too hard on yourself"],
  },
  {
    slug: "perseverance",
    name: "Perseverance",
    color: "#87CEEB",
    tagline: "The marathon, not the sprint",
    description:
      "Perseverance is the sustained effort to achieve long-term goals despite obstacles, failures, and discouragement. It's the virtue that turns dreams into reality.",
    strengths: ["Long-term success", "Learning from failure", "Inspiring others"],
    challenges: ["Sunk cost fallacy", "Ignoring signals to quit", "Neglecting rest"],
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

          {/* Virtue Cards Grid */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {virtues.map((virtue) => (
              <a
                key={virtue.slug}
                href={`/virtues/${virtue.slug}`}
                className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${virtue.color}30`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `${virtue.color}20` }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: virtue.color }}
                    />
                  </div>
                  <h2
                    className="font-heading font-bold text-xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {virtue.name}
                  </h2>
                </div>
                <p
                  className="text-sm italic mb-3"
                  style={{ color: virtue.color }}
                >
                  {virtue.tagline}
                </p>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {virtue.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {virtue.strengths.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        background: "rgba(78, 205, 196, 0.1)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

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
          </div>
        </div>
      </div>
    </>
  );
}
