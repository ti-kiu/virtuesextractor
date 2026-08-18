import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "Is this the same as the Undertale quiz?",
    a: "Our test is inspired by Undertale's seven soul trait framework, but it's built from scratch with 66 original scenario-based questions and AI-powered analysis. It goes far beyond any existing fan quiz.",
  },
  {
    q: "How is this different from MBTI or 16Personalities?",
    a: "MBTI sorts you into 16 types. We give you a full percentage spread across seven virtues — and then our AI talks with you about what those numbers actually mean in your life. It's a conversation, not a label.",
  },
  {
    q: "Is my data private?",
    a: "Your test answers are processed in real-time and not stored. Your results live on your device. We only save data if you create an account to use Family Circles or the 30-day plan.",
  },
  {
    q: "How long does the test take?",
    a: "About 8 minutes for the 66 questions. The AI analysis adds another 3-5 minutes depending on how deep you go.",
  },
  {
    q: "What do I get for free?",
    a: "The complete 66-question test, your full seven-virtue percentage profile, basic interpretation text, and a downloadable result image. No credit card needed.",
  },
  {
    q: "Can I retake the test?",
    a: "Yes, as many times as you want. Each time you'll get a fresh AI analysis based on your new answers.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Header />
        <div className="pt-24">
          <FAQ />
        </div>
        <Footer />
      </main>
    </>
  );
}
