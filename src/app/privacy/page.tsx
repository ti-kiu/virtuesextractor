import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <div className="pt-24 pb-16 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-h1 text-text-primary mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-text-secondary text-body-lg mb-6">
              Last updated: August 16, 2026
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              1. Information We Collect
            </h2>
            <p className="text-text-secondary text-body mb-6">
              We collect minimal data to provide our services. When you take the
              Soul Virtues Extractor, your answers are stored locally in your
              browser. We do not store individual answers on our servers.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-text-secondary text-body mb-6">
              We use your information to provide and improve our services,
              process payments, and communicate with you. We do not sell your
              personal information to third parties.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              3. AI Data Processing
            </h2>
            <p className="text-text-secondary text-body mb-6">
              When you use our AI analysis feature, your virtue scores and
              follow-up responses are processed by DeepSeek AI, a service
              provided by DeepSeek, a company based in China. This data
              processing is necessary to generate your personalized analysis.
              We do not transmit your name, email, or other identifying
              information to DeepSeek.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              4. Cookies
            </h2>
            <p className="text-text-secondary text-body mb-6">
              We use essential cookies to provide our services. We also use
              analytics cookies to understand how visitors interact with our
              website. You can control cookie settings through your browser.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              5. Data Security
            </h2>
            <p className="text-text-secondary text-body mb-6">
              We implement appropriate security measures to protect your personal
              information. However, no method of transmission over the Internet
              is 100% secure.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              6. Your Rights
            </h2>
            <p className="text-text-secondary text-body mb-6">
              You have the right to access, correct, or delete your personal
              data. You can also opt out of marketing communications at any
              time.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              7. Contact Us
            </h2>
            <p className="text-text-secondary text-body mb-6">
              If you have any questions about this Privacy Policy, please
              contact us at privacy@virtuesextractor.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
