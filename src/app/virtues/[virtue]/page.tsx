import type { Metadata } from "next";

const virtueData: Record<
  string,
  {
    name: string;
    color: string;
    tagline: string;
    meaning: string;
    inAction: string;
    strengths: string[];
    challenges: string[];
    growth: string[];
    shadow: string;
    confusedWith: string;
    dailyPractice: string;
    seoDescription: string;
  }
> = {
  determination: {
    name: "Determination",
    color: "#FF6B6B",
    tagline: "The fire that refuses to go out",
    meaning:
      "Determination is the unwavering commitment to your goals and values, even when faced with significant obstacles. It's the inner drive that keeps you moving forward when others would give up. People with high determination don't just set goals — they pursue them with a relentless focus that transforms dreams into reality.",
    inAction:
      "You see determination in the entrepreneur who works through the night, the student who studies despite repeated failures, and the parent who sacrifices personal comfort for their children's future. It manifests as a quiet refusal to accept 'impossible' as an answer.",
    strengths: [
      "Achieving long-term goals others consider impossible",
      "Maintaining focus and discipline under pressure",
      "Inspiring others through unwavering commitment",
      "Building resilience through repeated challenges",
      "Creating lasting change in your life and community",
    ],
    challenges: [
      "Becoming stubborn when flexibility is needed",
      "Risking burnout from relentless pursuit",
      "Difficulty knowing when to pivot or let go",
      "Neglecting relationships in pursuit of goals",
      "Measuring self-worth only by achievement",
    ],
    growth: [
      "Practice distinguishing determination from stubbornness",
      "Build in regular rest and recovery periods",
      "Learn to celebrate small wins along the way",
      "Develop the ability to adapt your approach while keeping your goal",
      "Ask for help — determination doesn't mean doing everything alone",
    ],
    shadow:
      "When determination becomes unbalanced, it transforms into obsession. You might push people away, ignore your health, or pursue goals that no longer serve you simply because you can't admit it's time to change direction.",
    confusedWith:
      "Determination is often confused with Perseverance. The key difference: Determination is about the intensity of your commitment to a goal, while Perseverance is about your ability to endure over time. You can be determined without being patient, and persevering without being intensely focused.",
    dailyPractice:
      "Each morning, write down your single most important goal for the day. Before bed, reflect: Did my actions today move me closer to this goal? If not, what pulled me away?",
    seoDescription:
      "Discover what Determination virtue means, how it manifests in your personality, its strengths and challenges, and how to develop it. Take the free soul virtues test.",
  },
  bravery: {
    name: "Bravery",
    color: "#FF9F43",
    tagline: "Courage isn't the absence of fear — it's acting despite it",
    meaning:
      "Bravery is the willingness to face danger, difficulty, uncertainty, or pain despite feeling fear. True bravery isn't about being fearless — it's about recognizing the fear and choosing to act anyway. It's the virtue that allows you to stand up for what's right, take calculated risks, and step outside your comfort zone.",
    inAction:
      "You see bravery in the whistleblower who speaks truth to power, the shy person who introduces themselves at a party, and the leader who makes tough decisions with incomplete information. Bravery shows up in both dramatic moments and quiet daily choices.",
    strengths: [
      "Taking initiative when others hesitate",
      "Standing up for yourself and others",
      "Embracing new challenges and experiences",
      "Speaking truth even when it's unpopular",
      "Leading by example in difficult situations",
    ],
    challenges: [
      "Taking unnecessary risks without thinking",
      "Ignoring valid warnings or concerns",
      "Difficulty knowing when caution is wise",
      "Coming across as reckless to others",
      "Feeling restless in calm or stable periods",
    ],
    growth: [
      "Practice small acts of courage daily",
      "Learn to distinguish bravery from recklessness",
      "Develop the ability to assess risk before acting",
      "Build courage by facing smaller fears first",
      "Support others in their brave moments",
    ],
    shadow:
      "Unbalanced bravery becomes recklessness or martyrdom. You might take unnecessary risks, refuse to ask for help, or put yourself in danger to prove your courage. True bravery includes knowing when NOT to act.",
    confusedWith:
      "Bravery is often confused with Determination. The difference: Bravery is about facing fear and danger, while Determination is about maintaining commitment to goals. You can be determined without facing danger, and brave without having a specific goal.",
    dailyPractice:
      "Identify one small thing you've been avoiding out of fear. Do it today. It could be a difficult conversation, trying something new, or admitting a mistake.",
    seoDescription:
      "Learn what Bravery virtue means for your personality. Explore its strengths, challenges, shadow aspects, and daily practices. Take the free soul virtues test.",
  },
  justice: {
    name: "Justice",
    color: "#4ECDC4",
    tagline: "The compass that points to what's right",
    meaning:
      "Justice is the deep commitment to fairness, equality, and moral rightness. It's the virtue that drives you to treat others equitably, stand against injustice, and hold yourself and others to ethical standards. People with strong justice see the world through the lens of right and wrong, and feel compelled to act when they witness unfairness.",
    inAction:
      "You see justice in the judge who weighs evidence impartially, the activist who fights for the marginalized, and the friend who calls out unfair treatment. Justice manifests as a consistent application of principles, regardless of who is involved.",
    strengths: [
      "Making fair and balanced decisions",
      "Standing up against injustice and inequality",
      "Building trust through consistent principles",
      "Protecting those who cannot protect themselves",
      "Creating systems and structures that treat people fairly",
    ],
    challenges: [
      "Being too rigid in applying rules",
      "Difficulty with nuance and gray areas",
      "Judging others too harshly",
      "Struggling to forgive mistakes",
      "Becoming cynical about the world's unfairness",
    ],
    growth: [
      "Practice seeing situations from multiple perspectives",
      "Learn to distinguish between justice and revenge",
      "Develop compassion alongside your sense of fairness",
      "Accept that perfect justice isn't always achievable",
      "Focus on what you can control rather than all injustice",
    ],
    shadow:
      "Unbalanced justice becomes self-righteousness. You might judge others harshly, refuse to forgive, or become so focused on what's 'right' that you lose compassion. True justice includes mercy and understanding.",
    confusedWith:
      "Justice is often confused with Integrity. The difference: Justice focuses on fairness and how you treat others, while Integrity focuses on consistency between your words and actions. You can have integrity without being concerned with fairness, and pursue justice without personal integrity.",
    dailyPractice:
      "When you feel someone has wronged you, pause before reacting. Ask: 'What might their perspective be? What would a fair response look like?'",
    seoDescription:
      "Explore Justice virtue — what it means, how it shapes your personality, its strengths and challenges. Discover your virtue profile with the free soul virtues test.",
  },
  kindness: {
    name: "Kindness",
    color: "#FFE66D",
    tagline: "The light that warms everyone around it",
    meaning:
      "Kindness is the genuine desire to help others and contribute to their well-being, without expecting anything in return. It's the virtue that creates connection, builds trust, and makes the world more bearable. True kindness comes from strength, not weakness — it's a choice to bring warmth into every interaction.",
    inAction:
      "You see kindness in the stranger who helps someone carry groceries, the listener who gives their full attention, and the person who chooses understanding over judgment. Kindness shows up in small gestures that ripple outward in ways you may never see.",
    strengths: [
      "Building deep, trusting relationships",
      "Creating safe spaces for others to be vulnerable",
      "Reducing conflict through empathy and understanding",
      "Making others feel valued and seen",
      "Contributing to a more compassionate community",
    ],
    challenges: [
      "People-pleasing at the expense of your own needs",
      "Difficulty setting boundaries",
      "Being taken advantage of by others",
      "Neglecting self-care while caring for others",
      "Avoiding necessary conflict to keep peace",
    ],
    growth: [
      "Practice saying 'no' without guilt",
      "Learn that self-care enables you to care for others better",
      "Set boundaries that protect your energy",
      "Distinguish between kindness and people-pleasing",
      "Give yourself the same compassion you give others",
    ],
    shadow:
      "Unbalanced kindness becomes self-sacrifice. You might neglect your own needs, enable harmful behavior in others, or use kindness as a way to avoid confrontation. True kindness includes being kind to yourself.",
    confusedWith:
      "Kindness is often confused with Patience. The difference: Kindness is about actively helping and caring for others, while Patience is about enduring difficulty calmly. You can be kind without being patient, and patient without being particularly caring.",
    dailyPractice:
      "Perform one unexpected act of kindness today — but make sure it doesn't come at the expense of your own well-being. Notice how it feels.",
    seoDescription:
      "What does Kindness virtue mean for your personality? Learn about its strengths, challenges, and how to develop it. Free soul virtues personality test.",
  },
  patience: {
    name: "Patience",
    color: "#A8E6CF",
    tagline: "The calm in the center of the storm",
    meaning:
      "Patience is the ability to endure difficulty, delay, provocation, or frustration without becoming anxious, angry, or upset. It's the quiet strength that allows growth to happen naturally, relationships to deepen, and wisdom to develop. Patient people understand that some things can't be rushed.",
    inAction:
      "You see patience in the teacher who explains the concept for the tenth time, the gardener who tends their plants daily without seeing immediate results, and the mediator who listens to all sides before responding. Patience creates space for understanding and growth.",
    strengths: [
      "Making better decisions by not rushing",
      "Building deeper, more meaningful relationships",
      "Remaining calm and effective under pressure",
      "Allowing others the space to grow and learn",
      "Seeing long-term results that others miss",
    ],
    challenges: [
      "Being perceived as passive or unmotivated",
      "Missing opportunities that require quick action",
      "Being taken advantage of by impatient people",
      "Suppressing valid frustration or anger",
      "Accepting situations that deserve action, not patience",
    ],
    growth: [
      "Learn to distinguish patience from passivity",
      "Practice expressing your needs while remaining calm",
      "Set limits on how long you'll wait for change",
      "Use waiting time productively",
      "Recognize when patience becomes avoidance",
    ],
    shadow:
      "Unbalanced patience becomes passivity or avoidance. You might tolerate mistreatment, miss opportunities, or use patience as an excuse to avoid difficult decisions. True patience includes knowing when to act.",
    confusedWith:
      "Patience is often confused with Kindness. The difference: Patience is about enduring calmly, while Kindness is about actively caring. You can be patient without being warm, and kind without being particularly calm under pressure.",
    dailyPractice:
      "When you feel frustration rising today, pause for 10 seconds before responding. Notice what happens in that space between stimulus and response.",
    seoDescription:
      "Discover what Patience virtue means and how it influences your personality. Explore strengths, challenges, and growth practices. Take the free soul virtues test.",
  },
  integrity: {
    name: "Integrity",
    color: "#DDA0DD",
    tagline: "Who you are when no one is watching",
    meaning:
      "Integrity is the quality of being honest and having strong moral principles. It's the consistent alignment between your values, words, and actions — doing the right thing even when no one is watching. People with high integrity are trusted because their behavior is predictable in the best sense: you know they'll do what they say.",
    inAction:
      "You see integrity in the employee who admits their mistake instead of covering it up, the friend who tells you the truth even when it's uncomfortable, and the leader who holds themselves to the same standards they expect from others. Integrity creates trust.",
    strengths: [
      "Being deeply trusted by others",
      "Maintaining self-respect and inner peace",
      "Building authentic relationships based on honesty",
      "Making decisions aligned with your values",
      "Being a reliable and consistent presence",
    ],
    challenges: [
      "Being too hard on yourself when you fall short",
      "Difficulty forgiving yourself and others for mistakes",
      "Perfectionism that paralyzes action",
      "Judging others by your high standards",
      "Rigidity when flexibility is needed",
    ],
    growth: [
      "Practice self-compassion when you make mistakes",
      "Learn that integrity includes being honest about your limitations",
      "Distinguish between integrity and perfectionism",
      "Allow others to have different values without judgment",
      "Forgive yourself — integrity includes grace",
    ],
    shadow:
      "Unbalanced integrity becomes self-righteousness or perfectionism. You might hold yourself and others to impossible standards, refuse to forgive mistakes, or become rigid in your principles. True integrity includes humility and grace.",
    confusedWith:
      "Integrity is often confused with Justice. The difference: Integrity is about consistency between your words and actions, while Justice is about fairness in how you treat others. You can have personal integrity without being concerned with fairness, and pursue justice without personal consistency.",
    dailyPractice:
      "Identify one area where your actions don't align with your stated values. Make one small change today to close that gap.",
    seoDescription:
      "What is Integrity virtue and how does it shape your personality? Learn about its meaning, strengths, challenges, and daily practices. Free soul virtues test.",
  },
  perseverance: {
    name: "Perseverance",
    color: "#87CEEB",
    tagline: "The marathon, not the sprint",
    meaning:
      "Perseverance is the continued effort to achieve something despite difficulties, failure, or opposition. It's the virtue that turns dreams into reality over time. While Determination is about intensity of commitment, Perseverance is about duration — the ability to keep going when progress is slow and results are uncertain.",
    inAction:
      "You see perseverance in the writer who works on their novel for years, the athlete who trains through injuries and setbacks, and the entrepreneur who fails repeatedly before succeeding. Perseverance is the long game — it's about showing up consistently, not just intensely.",
    strengths: [
      "Achieving long-term goals that require sustained effort",
      "Learning from failure instead of being defeated by it",
      "Building expertise through years of practice",
      "Inspiring others through your endurance",
      "Creating something meaningful over time",
    ],
    challenges: [
      "Continuing when you should quit (sunk cost fallacy)",
      "Neglecting rest and recovery",
      "Ignoring signals that it's time to change direction",
      "Feeling frustrated by slow progress",
      "Defining yourself entirely by your long-term pursuit",
    ],
    growth: [
      "Learn to distinguish perseverance from stubbornness",
      "Build regular rest and reflection into your journey",
      "Celebrate milestones along the way",
      "Develop the wisdom to know when to pivot",
      "Find joy in the process, not just the destination",
    ],
    shadow:
      "Unbalanced perseverance becomes stubbornness or obsession. You might continue pursuing something long after it's stopped being valuable, neglect your health and relationships, or refuse to adapt to changing circumstances. True perseverance includes knowing when to rest and when to pivot.",
    confusedWith:
      "Perseverance is often confused with Determination. The key difference: Perseverance is about enduring over time (the marathon), while Determination is about the intensity of your commitment (the fire). You can be determined without persevering, and persevering without intense focus.",
    dailyPractice:
      "Review your long-term goal. Ask yourself: 'Am I still on the right path, or am I just refusing to change direction?' Adjust one small thing if needed.",
    seoDescription:
      "Explore Perseverance virtue — its meaning, how it manifests in your personality, strengths, challenges, and growth practices. Free soul virtues personality test.",
  },
};

export function generateStaticParams() {
  return Object.keys(virtueData).map((virtue) => ({ virtue }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ virtue: string }>;
}): Promise<Metadata> {
  const { virtue } = await params;
  const data = virtueData[virtue];
  if (!data) return { title: "Virtue Not Found" };

  return {
    title: `${data.name} Virtue — Meaning, Personality & Growth | Soul Virtues Extractor`,
    description: data.seoDescription,
    keywords: [
      `${data.name.toLowerCase()} virtue`,
      `${data.name.toLowerCase()} personality`,
      `${data.name.toLowerCase()} meaning`,
      `soul virtue ${data.name.toLowerCase()}`,
      "soul virtues test",
    ],
    openGraph: {
      title: `${data.name} Virtue — Meaning, Personality & Growth`,
      description: data.seoDescription,
      url: `https://virtuesextractor.com/virtues/${virtue}`,
      type: "article",
    },
  };
}

export default async function VirtuePage({
  params,
}: {
  params: Promise<{ virtue: string }>;
}) {
  const { virtue } = await params;
  const data = virtueData[virtue];

  if (!data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="text-center">
          <h1
            className="font-heading font-bold text-3xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Virtue Not Found
          </h1>
          <a
            href="/virtues"
            className="px-6 py-3 rounded-full font-semibold inline-block"
            style={{ background: "var(--color-primary)", color: "white" }}
          >
            View All Virtues
          </a>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.name} Virtue — Meaning, Personality & Growth`,
    description: data.seoDescription,
    url: `https://virtuesextractor.com/virtues/${virtue}`,
    author: {
      "@type": "Organization",
      name: "Soul Virtues Extractor",
    },
    publisher: {
      "@type": "Organization",
      name: "Soul Virtues Extractor",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://virtuesextractor.com/virtues/${virtue}`,
    },
  };

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
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <a
                  href="/"
                  style={{ color: "var(--text-secondary)" }}
                  className="hover:underline"
                >
                  Home
                </a>
              </li>
              <li style={{ color: "var(--text-secondary)" }}>/</li>
              <li>
                <a
                  href="/virtues"
                  style={{ color: "var(--text-secondary)" }}
                  className="hover:underline"
                >
                  Virtues
                </a>
              </li>
              <li style={{ color: "var(--text-secondary)" }}>/</li>
              <li style={{ color: data.color }}>{data.name}</li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: `${data.color}20` }}
              >
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ background: data.color }}
                />
              </div>
              <div>
                <span
                  className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: data.color }}
                >
                  Soul Virtue
                </span>
                <h1
                  className="font-heading font-bold text-4xl sm:text-5xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  {data.name}
                </h1>
              </div>
            </div>
            <p
              className="text-xl italic mb-4"
              style={{ color: data.color }}
            >
              {data.tagline}
            </p>
          </div>

          {/* Meaning */}
          <section className="mb-12">
            <h2
              className="font-heading font-bold text-2xl mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              What is {data.name}?
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {data.meaning}
            </p>
          </section>

          {/* In Action */}
          <section className="mb-12">
            <h2
              className="font-heading font-bold text-2xl mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              {data.name} in Action
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {data.inAction}
            </p>
          </section>

          {/* Strengths & Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <h3
                className="font-heading font-semibold text-lg mb-4 flex items-center gap-2"
                style={{ color: "var(--color-accent)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z"
                    fill="currentColor"
                  />
                </svg>
                Strengths
              </h3>
              <ul className="space-y-2">
                {data.strengths.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span style={{ color: "var(--color-accent)" }}>+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <h3
                className="font-heading font-semibold text-lg mb-4 flex items-center gap-2"
                style={{ color: "var(--color-primary)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 6v5M10 13.5v.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Challenges
              </h3>
              <ul className="space-y-2">
                {data.challenges.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span style={{ color: "var(--color-primary)" }}>!</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Shadow & Confused With */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <h3
                className="font-heading font-semibold text-lg mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                The Shadow Side
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {data.shadow}
              </p>
            </div>
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <h3
                className="font-heading font-semibold text-lg mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Often Confused With
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {data.confusedWith}
              </p>
            </div>
          </div>

          {/* Growth */}
          <section className="mb-12">
            <h2
              className="font-heading font-bold text-2xl mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              How to Develop {data.name}
            </h2>
            <div
              className="p-6 rounded-2xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <ul className="space-y-3">
                {data.growth.map((g, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{
                        background: `${data.color}20`,
                        color: data.color,
                      }}
                    >
                      {i + 1}
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Daily Practice */}
          <section className="mb-16">
            <h2
              className="font-heading font-bold text-2xl mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Daily Practice
            </h2>
            <div
              className="p-6 rounded-2xl"
              style={{
                background: `${data.color}10`,
                border: `1px solid ${data.color}30`,
              }}
            >
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--text-primary)" }}
              >
                {data.dailyPractice}
              </p>
            </div>
          </section>

          {/* CTA */}
          <div
            className="text-center p-12 rounded-2xl"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <h2
              className="font-heading font-bold text-2xl mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              How strong is your {data.name}?
            </h2>
            <p
              className="text-base mb-8 max-w-xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Take the 66-question soul virtues test and discover your complete
              seven-virtue profile with AI-powered analysis.
            </p>
            <a
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all"
              style={{ background: data.color, color: "white" }}
            >
              Test Your {data.name} — Free
            </a>
          </div>

          {/* Other Virtues */}
          <div className="mt-12">
            <h3
              className="font-heading font-semibold text-lg mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Explore Other Virtues
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(virtueData)
                .filter(([key]) => key !== virtue)
                .map(([key, v]) => (
                  <a
                    key={key}
                    href={`/virtues/${key}`}
                    className="px-4 py-2 rounded-full text-sm transition-all"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {v.name}
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
