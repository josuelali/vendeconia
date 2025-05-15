import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import ProductDemo from "@/components/home/ProductDemo";
import AppDemo from "@/components/home/AppDemo";
import ContentGeneratorDemo from "@/components/home/ContentGeneratorDemo";
import Pricing from "@/components/home/Pricing";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>VendeConIA - Crea tu tienda de productos virales con IA</title>
        <meta name="description" content="Genera ideas de negocio, encuentra productos ganadores y crea contenido promocional en minutos con inteligencia artificial avanzada para tu tienda online." />
        <meta property="og:title" content="VendeConIA - Crea tu tienda viral con IA" />
        <meta property="og:description" content="Genera ideas de negocio, encuentra productos ganadores y crea contenido promocional en minutos con inteligencia artificial." />
        <meta property="og:url" content="https://vendeconia.com" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ProductDemo />
        <AppDemo />
        <ContentGeneratorDemo />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
