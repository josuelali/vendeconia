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

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        <Hero />
        <Features />
        <HowItWorks />

        {/* BLOQUE DE POSICIONAMIENTO */}
        <section className="max-w-7xl mx-auto px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-500">
                Plataforma visual para vender online
              </p>

              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Descubre productos con potencial y crea contenido que los vende
              </h2>

              <p className="mt-5 text-lg text-gray-600 max-w-3xl">
                VendeConIA combina descubrimiento de productos, ideas de contenido
                y demos prácticas para ayudarte a encontrar oportunidades,
                validar nichos y publicar piezas que convierten.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Productos con potencial
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Ejemplos visuales de productos en tendencia con enfoque de venta.
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Contenido en minutos
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Reels, copies y piezas promocionales creadas con ayuda de IA.
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Monetización integrada
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Amazon, afiliados SaaS y futuras funciones premium en una sola ruta.
                  </p>
                </div>
              </div>
            </div>

            {/* MONETIZACIÓN PREMIUM */}
            <aside className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 shadow-sm p-8 flex flex-col justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">
                  Recomendado
                </p>

                <h3 className="mt-3 text-2xl font-extrabold text-gray-900">
                  Producto recomendado en Amazon
                </h3>

                <p className="mt-4 text-base text-gray-700">
                  Mejor integrado aquí que como bloque suelto arriba. Este espacio
                  debe monetizar sin romper el diseño ni parecer un hueco vacío.
                </p>

                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  <li>• Encaja con el objetivo comercial de la home</li>
                  <li>• No rompe la experiencia visual</li>
                  <li>• Puede rotarse por producto destacado</li>
                </ul>
              </div>

              <div className="mt-8">
                <a
                  href="https://amzn.to/4tibkt2"
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-6 py-4 text-base font-bold text-black shadow-lg transition hover:bg-orange-400"
                >
                  Ver producto recomendado en Amazon
                </a>
              </div>
            </aside>
          </div>
        </section>

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