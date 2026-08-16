import Header from "@/components/Header";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function PricingPage() {
  return (
    <main>
      <Header />
      <div className="pt-24">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
}
