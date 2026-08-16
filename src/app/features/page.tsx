import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FeaturesPage() {
  return (
    <main>
      <Header />
      <div className="pt-24 pb-16 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-h1 text-text-primary mb-4">
            Soul Virtues Extractor Features — AI-Powered Personality Test
          </h1>
          <p className="text-text-secondary text-body-lg max-w-3xl mb-12">
            Explore the features of VirtuesExtractor.com: seven-virtue scoring,
            AI deep analysis, 30-day growth plans, family circles, and more. Free
            to start.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-dark p-8">
              <h2 className="font-heading font-semibold text-h3 text-text-primary mb-4">
                Seven-Virtue Scoring System
              </h2>
              <ul className="space-y-3 text-text-secondary text-body">
                <li>• 66 questions measuring 7 virtues</li>
                <li>• Full percentage spread (not single label)</li>
                <li>• Based on IPIP personality research</li>
                <li>• Direct and reverse-keyed items</li>
              </ul>
            </div>

            <div className="card-dark p-8">
              <h2 className="font-heading font-semibold text-h3 text-text-primary mb-4">
                AI Deep Analysis
              </h2>
              <ul className="space-y-3 text-text-secondary text-body">
                <li>• Personalized follow-up questions</li>
                <li>• Context-aware interpretation</li>
                <li>• Based on your real life</li>
                <li>• Not generic profiles</li>
              </ul>
            </div>

            <div className="card-dark p-8">
              <h2 className="font-heading font-semibold text-h3 text-text-primary mb-4">
                30-Day Growth Plan
              </h2>
              <ul className="space-y-3 text-text-secondary text-body">
                <li>• Custom daily actions</li>
                <li>• Targets your lowest virtue</li>
                <li>• Built around your schedule</li>
                <li>• Track your progress</li>
              </ul>
            </div>

            <div className="card-dark p-8">
              <h2 className="font-heading font-semibold text-h3 text-text-primary mb-4">
                Family Circles
              </h2>
              <ul className="space-y-3 text-text-secondary text-body">
                <li>• Invite up to 8 family members</li>
                <li>• See virtue compatibility</li>
                <li>• AI family insights</li>
                <li>• Shared growth challenges</li>
              </ul>
            </div>

            <div className="card-dark p-8">
              <h2 className="font-heading font-semibold text-h3 text-text-primary mb-4">
                Couple Compatibility
              </h2>
              <ul className="space-y-3 text-text-secondary text-body">
                <li>• Compare with your partner</li>
                <li>• AI relationship analysis</li>
                <li>• Identify friction points</li>
                <li>• Improve communication</li>
              </ul>
            </div>

            <div className="card-dark p-8">
              <h2 className="font-heading font-semibold text-h3 text-text-primary mb-4">
                Team Building
              </h2>
              <ul className="space-y-3 text-text-secondary text-body">
                <li>• Team virtue distribution</li>
                <li>• Identify blind spots</li>
                <li>• Improve hiring decisions</li>
                <li>• Build stronger teams</li>
              </ul>
            </div>

            <div className="card-dark p-8">
              <h2 className="font-heading font-semibold text-h3 text-text-primary mb-4">
                Share Results
              </h2>
              <ul className="space-y-3 text-text-secondary text-body">
                <li>• Beautiful result cards</li>
                <li>• Instagram, Twitter, TikTok</li>
                <li>• One-click sharing</li>
                <li>• Privacy controls</li>
              </ul>
            </div>

            <div className="card-dark p-8">
              <h2 className="font-heading font-semibold text-h3 text-text-primary mb-4">
                No Sign-Up Required
              </h2>
              <ul className="space-y-3 text-text-secondary text-body">
                <li>• Start immediately</li>
                <li>• No account needed</li>
                <li>• Local data storage</li>
                <li>• Full privacy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
