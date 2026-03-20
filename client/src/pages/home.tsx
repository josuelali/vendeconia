import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import ProductDemo from "@/components/home/ProductDemo";
import AppDemo from "@/components/home/AppDemo";
import ContentGeneratorDemo from "@/components/home/ContentGeneratorDemo";
import Pricing from "@/components/home/Pricing";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="bg-white">
        <Hero />
        <Features />
        <HowItWorks />
        <ProductDemo />
        <AppDemo />
        <ContentGeneratorDemo />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}