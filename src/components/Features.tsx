"use client";

const features = [
  {
    title: "Seven-Virtue Scoring System",
    description:
      "Not a single label. A full percentage spread across all seven soul virtues — Determination, Bravery, Justice, Kindness, Patience, Integrity, and Perseverance.",
    icon: "📊",
    color: "red",
  },
  {
    title: "AI Deep Analysis",
    description:
      "Other tests stop at the score. We start there. Our AI asks what's actually happening in your life and builds an interpretation that fits you.",
    icon: "🤖",
    color: "cyan",
  },
  {
    title: "30-Day Growth Plan",
    description:
      "Your lowest virtue isn't a flaw — it's your next frontier. Get a custom daily plan built around your real life.",
    icon: "📈",
    color: "yellow",
  },
  {
    title: "Family Circles",
    description:
      "Invite your family, partner, or closest friends. See how your virtues connect, complement, and challenge each other.",
    icon: "👨‍👩‍👧‍👦",
    color: "red",
  },
  {
    title: "Share Results",
    description:
      "Generate beautiful result cards for Instagram, Twitter, or TikTok. Show the world your soul.",
    icon: "📤",
    color: "cyan",
  },
  {
    title: "No Sign-Up Required",
    description:
      "Start immediately. No account needed. Your results stay private until you choose to share.",
    icon: "🔒",
    color: "yellow",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-h2 text-text-primary mb-4">
            What Makes Us Different
          </h2>
          <p className="text-text-secondary text-body-lg max-w-2xl mx-auto">
            More than a personality test — a tool for growth
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-dark p-8">
              {/* Icon */}
              <div className="text-4xl mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-h3 text-text-primary mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-body">
                {feature.description}
              </p>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-card opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                  feature.color === "red"
                    ? "neon-glow-red"
                    : feature.color === "cyan"
                    ? "neon-glow-cyan"
                    : "neon-glow-yellow"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
