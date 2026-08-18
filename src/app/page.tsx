import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Discover Your Soul Virtues",
  description: "A step-by-step guide to taking the 66-question soul virtues test and getting your personalized AI analysis.",
  step: [
    {
      "@type": "HowToStep",
      name: "Answer 66 Scenarios",
      text: "Real-life situations, not abstract questions. Every answer adjusts all seven virtue scores at once.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "See Your Seven-Virtue Profile",
      text: "A complete percentage breakdown — not a single label. See exactly where you shine and where you have room to grow.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Get AI Deep Analysis",
      text: "Our AI reads your profile, asks follow-up questions, and builds a personalized interpretation based on your actual life.",
      position: 3,
    },
  ],
  totalTime: "PT8M",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Soul Virtues Extractor",
  url: "https://virtuesextractor.com",
  description: "Discover your seven soul virtues with AI-powered deep analysis. Free 66-question personality test.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://virtuesextractor.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Soul Virtues Extractor",
  url: "https://virtuesextractor.com",
  description: "AI-powered personality assessment based on the seven soul virtues framework.",
  sameAs: [],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main>
        <Header />
        <Hero />
        <HowItWorks />
        <UseCases />
        <Features />
        <SocialProof />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
