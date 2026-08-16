"use client";

const testimonials = [
  {
    quote:
      "I've taken every personality test out there. This is the first one that felt like a real conversation.",
    author: "@username",
    virtues: "Determination · Justice",
  },
  {
    quote:
      "My partner and I compared results. The compatibility report was scary accurate.",
    author: "@username",
    virtues: "Kindness · Patience",
  },
  {
    quote:
      "The 30-day plan actually changed how I handle stress. I'm more patient now.",
    author: "@username",
    virtues: "Patience · Integrity",
  },
];

const stats = [
  { number: "10,000+", label: "Souls discovered" },
  { number: "4.8/5", label: "Average rating" },
  { number: "50+", label: "Countries" },
  { number: "1,000+", label: "AI conversations" },
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-h2 text-text-primary mb-4">
            What People Discovered About Themselves
          </h2>
          <p className="text-text-secondary text-body-lg max-w-2xl mx-auto">
            Join thousands who have found their soul virtues
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-heading font-bold text-h2 text-neon-red mb-2">
                {stat.number}
              </div>
              <div className="text-text-secondary text-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-dark p-8">
              {/* Quote */}
              <p className="text-text-secondary text-body mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div>
                <div className="text-text-primary font-semibold">
                  {testimonial.author}
                </div>
                <div className="text-neon-cyan text-sm">
                  {testimonial.virtues}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
