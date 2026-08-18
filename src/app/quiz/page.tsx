import type { Metadata } from "next";
import QuizContent from "@/components/QuizContent";

export const metadata: Metadata = {
  title: "Soul Virtues Test — Free 66-Question Personality Quiz | Soul Virtues Extractor",
  description: "Take the free 66-question soul virtues test. Discover your seven-virtue personality profile with AI-powered deep analysis. No sign-up required.",
  alternates: {
    canonical: "https://virtuesextractor.com/quiz",
  },
  openGraph: {
    title: "Soul Virtues Test — Free 66-Question Personality Quiz",
    description: "Discover your seven-virtue personality profile with AI-powered deep analysis. No sign-up required.",
    url: "https://virtuesextractor.com/quiz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul Virtues Test — Free 66-Question Personality Quiz",
    description: "Discover your seven-virtue personality profile with AI-powered deep analysis.",
  },
};

export default function QuizPage() {
  return <QuizContent />;
}
