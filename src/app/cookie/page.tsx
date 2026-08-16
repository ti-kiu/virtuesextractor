import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiePage() {
  return (
    <main>
      <Header />
      <div className="pt-24 pb-16 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-bold text-h1 text-text-primary mb-8">
            Cookie Policy
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-text-secondary text-body-lg mb-6">
              Last updated: August 16, 2026
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              1. What Are Cookies
            </h2>
            <p className="text-text-secondary text-body mb-6">
              Cookies are small text files that are placed on your device when
              you visit a website. They are widely used to make websites work
              more efficiently and provide information to website owners.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              2. How We Use Cookies
            </h2>
            <p className="text-text-secondary text-body mb-6">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside text-text-secondary text-body mb-6 space-y-2">
              <li>Essential cookies: Required for the website to function properly</li>
              <li>Analytics cookies: Help us understand how visitors use our website</li>
              <li>Preference cookies: Remember your settings and preferences</li>
              <li>Marketing cookies: Used to deliver relevant advertisements</li>
            </ul>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              3. Types of Cookies We Use
            </h2>

            <h3 className="font-heading font-semibold text-h3 text-text-primary mb-3">
              Essential Cookies
            </h3>
            <p className="text-text-secondary text-body mb-4">
              These cookies are necessary for the website to function. They
              enable basic features like page navigation and access to secure
              areas.
            </p>

            <h3 className="font-heading font-semibold text-h3 text-text-primary mb-3">
              Analytics Cookies
            </h3>
            <p className="text-text-secondary text-body mb-4">
              We use Google Analytics to understand how visitors interact with
              our website. This helps us improve our services.
            </p>

            <h3 className="font-heading font-semibold text-h3 text-text-primary mb-3">
              Preference Cookies
            </h3>
            <p className="text-text-secondary text-body mb-4">
              These cookies allow the website to remember choices you make and
              provide enhanced features.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              4. Managing Cookies
            </h2>
            <p className="text-text-secondary text-body mb-6">
              You can control and manage cookies through your browser settings.
              Please note that disabling certain cookies may affect the
              functionality of our website.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              5. Third-Party Cookies
            </h2>
            <p className="text-text-secondary text-body mb-6">
              Some cookies are placed by third-party services that appear on
              our pages. We do not control these cookies. Please refer to the
              respective third party&apos;s privacy policy for more information.
            </p>

            <h2 className="font-heading font-semibold text-h2 text-text-primary mb-4">
              6. Contact Us
            </h2>
            <p className="text-text-secondary text-body mb-6">
              If you have any questions about our Cookie Policy, please contact
              us at privacy@virtuesextractor.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
