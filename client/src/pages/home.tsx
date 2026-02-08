import { useEffect } from "react";

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
import AdBanner from "@/components/AdBanner";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.fourvenues.com/assets/iframe/joshue-cabello-rosa/events/viernes-prohibido-20-02-2026-0PY6";
    script.async = true;

    const container = document.getElementById("fourvenues-iframe");
    if (container && container.children.length === 0) {
      container.appendChild(script);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <AdBanner />
        <Hero />

        {/* ===== ENTRADAS – VIERNES PROHIBIDO ===== */}
        <section
          style={{
            background: "linear-gradient(135deg, #0a0f2c, #1b2cff)",
            padding: "70px 20px",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          <h2 style={{ fontSize: "2.6rem", marginBottom: "12px" }}>
            🎟 Entradas – Viernes Prohibido
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "0 auto 35px",
              opacity: 0.9,
              fontSize: "1.05rem",
            }}
          >
            Compra tu entrada anticipada y asegura tu sitio para la noche
            electrónica del <strong>20 de febrero</strong> en New Destino
            Electronic Club.
          </p>

          <div
            id="fourvenues-iframe"
            style={{ maxWidth: "900px", margin: "0 auto" }}
          ></div>
        </section>
        {/* ===== FIN ENTRADAS ===== */}

        <Features />
        <HowItWorks />

        {/* 🔽 BLOQUE SEO HOME */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Descubre productos en tendencia y crea contenido viral con IA
            </h2>

            <p className="text-gray-600 mb-4">
              En <strong>VendeConIA</strong> te ayudamos a descubrir
              <strong> productos en tendencia</strong> que se están vendiendo
              ahora mismo en Amazon y otras plataformas online.
            </p>

            {/* 🔽 BOTÓN AMAZON */}
            <div className="mt-6">
              <a
                href="https://amzn.to/4tibkt2"
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-block px-6 py-3 bg-orange-500 text-black font-bold rounded-xl shadow-lg hover:bg-orange-400 transition"
              >
                Producto recomendado en Amazon
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
