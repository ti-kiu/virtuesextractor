import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main>
      <Header />
      <div className="pt-24 pb-16 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-h1 text-text-primary mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-text-secondary text-body-lg mb-6">
              Last updated: August 16, 2026
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-text-secondary text-body mb-6">
              By accessing or using VirtuesExtractor.com, you agree to be bound
              by these Terms of Service. If you do not agree to these terms,
              please do not use our services.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              2. Description of Service
            </h2>
            <p className="text-text-secondary text-body mb-6">
              VirtuesExtractor.com provides personality testing services,
              including the Soul Virtues Extractor, AI-powered analysis, and
              related features. Our services are designed for entertainment and
              self-reflection purposes only.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              3. User Responsibilities
            </h2>
            <p className="text-text-secondary text-body mb-6">
              You are responsible for maintaining the confidentiality of your
              account and for all activities that occur under your account. You
              agree not to use our services for any illegal or unauthorized
              purpose.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              4. Payment Terms
            </h2>
            <p className="text-text-secondary text-body mb-6">
              Some features require payment. All fees are non-refundable unless
              otherwise stated. We reserve the right to change our pricing at
              any time.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              5. Refund Policy
            </h2>
            <p className="text-text-secondary text-body mb-6">
              We offer a 30-day money-back guarantee for subscription plans.
              One-time purchases are non-refundable after the service has been
              delivered.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              6. Disclaimer
            </h2>
            <p className="text-text-secondary text-body mb-6">
              Our services are provided &ldquo;as is&rdquo; without warranties
              of any kind. We do not guarantee the accuracy of test results or
              AI analyses. Our services are not a substitute for professional
              advice.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-text-secondary text-body mb-6">
              We shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of or relating to
              your use of our services.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              8. Contact Us
            </h2>
            <p className="text-text-secondary text-body mb-6">
              If you have any questions about these Terms of Service, please
              contact us at legal@virtuesextractor.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
