import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <main>
      <Header />
      <div className="pt-24 pb-16 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-h1 text-text-primary mb-8">
            Disclaimer
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-text-secondary text-body-lg mb-6">
              Last updated: August 16, 2026
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              1. Entertainment Purpose
            </h2>
            <p className="text-text-secondary text-body mb-6">
              The Soul Virtues Extractor and all related services provided by
              VirtuesExtractor.com are designed for entertainment and
              self-reflection purposes only. The results should not be
              considered as professional advice or clinical diagnosis.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              2. Not Clinical Diagnosis
            </h2>
            <p className="text-text-secondary text-body mb-6">
              Our personality test is not a clinical assessment or psychological
              evaluation. It is a fan-made, entertainment-focused tool inspired
              by Undertale&apos;s seven soul virtues. If you need professional
              psychological advice, please consult a qualified mental health
              professional.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              3. Undertale Intellectual Property
            </h2>
            <p className="text-text-secondary text-body mb-6">
              VirtuesExtractor.com is an independent, fan-made project. It is
              not affiliated with, endorsed by, or connected to Toby Fox,
              Undertale, Deltarune, or any related entities. All Undertale
              trademarks and intellectual property belong to their respective
              owners.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              4. Fan Project
            </h2>
            <p className="text-text-secondary text-body mb-6">
              This website is a fan project created for entertainment purposes.
              We do not claim ownership of any Undertale-related content. The
              seven soul virtues concept is used as inspiration for our
              personality test.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              5. Accuracy of Results
            </h2>
            <p className="text-text-secondary text-body mb-6">
              While we strive to provide accurate and meaningful results, we
              cannot guarantee the accuracy of personality assessments. Results
              may vary based on individual responses and should be interpreted
              with an open mind.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              6. AI Analysis Limitations
            </h2>
            <p className="text-text-secondary text-body mb-6">
              Our AI-powered analysis is generated algorithmically and should
              not be considered as professional advice. The AI responses are
              based on patterns in the data and may not capture the full
              complexity of individual personalities.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              7. Contact Us
            </h2>
            <p className="text-text-secondary text-body mb-6">
              If you have any questions about this Disclaimer, please contact
              us at legal@virtuesextractor.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
