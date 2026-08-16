import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function FAQPage() {
  return (
    <main>
      <Header />
      <div className="pt-24">
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
