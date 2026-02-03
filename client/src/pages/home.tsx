import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import ProductDemo from "@/components/home/ProductDemo";
import AppDemo from "@/components/home/AppDemo";
import ContentGeneratorDemo from "@/components/home/ContentGeneratorDemo";
import Pricing from "@/components/home/Pricing";
import CTA from "@/components/home/CTA";
import Footer from "@/components/components/layout/Footer";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <AdBanner />
        <Hero />
        <Features />
        <HowItWorks />

        {/* 🔽 BLOQUE SEO HOME */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Descubre productos en tendencia y crea contenido viral con IA
            </h2>

            <p className="text-gray-600 mb-4">
              En <strong>VendeConIA</strong> te ayudamos a descubrir
              <strong> productos en tendencia</strong> que se están vendiendo
              ahora mismo en Amazon y otras plataformas online. Analizamos el
              mercado para ofrecerte ideas reales y listas para monetizar.
            </p>

            <p className="text-gray-600 mb-4">
              Además, puedes crear <strong>contenido viral</strong> optimizado
              para TikTok, Reels e Instagram Shorts mediante guiones diseñados
              para captar atención, generar clics y aumentar conversiones,
              incluso si no tienes experiencia previa.
            </p>

            <p className="text-gray-600">
              Esta plataforma está pensada para emprendedores digitales,
              creadores de contenido y personas que buscan
              <strong> ganar dinero online</strong> usando inteligencia
              artificial de forma práctica, sencilla y sin complicaciones
              técnicas.
            </p>

            {/* 🔽 BOTÓN AMAZON (JUSTO ARRIBA DE LA IMAGEN) */}
            <div className="mt-8 flex justify-center">
              <a
                href="https://amzn.to/4a5UbtT"
                target="_blank"
                rel="nofollow sponsored"
                className="inline-block px-6 py-3 bg-orange-500 text-black font-bold rounded-xl shadow-lg hover:bg-orange-400 transition"
              >
                Ver soporte recomendado en Amazon
              </a>
            </div>
            {/* 🔼 FIN BOTÓN AMAZON */}
          </div>
        </section>
        {/* 🔼 FIN BLOQUE SEO HOME */}

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
