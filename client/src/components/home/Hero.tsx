import { Link } from "wouter";
import { ArrowRight, Sparkles, ShoppingBag, Video } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.10),transparent_28%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
              <Sparkles className="h-4 w-4" />
              Descubrimiento de productos + contenido con IA
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.05]">
              Encuentra productos con potencial y conviértalos en contenido que vende
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl">
              VendeConIA le ayuda a detectar oportunidades, validar ideas y crear
              contenido promocional para redes y ecommerce sin depender de procesos complejos.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/product-generator">
                <a className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-primary-600">
                  Explorar productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Link>

              <Link href="/content-generator">
                <a className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-4 text-base font-bold text-gray-900 transition hover:bg-gray-50">
                  Crear contenido
                </a>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-primary-600">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="text-sm font-semibold">Producto</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Descubra productos con potencial de venta y ejemplos reales.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-orange-600">
                  <Video className="h-5 w-5" />
                  <span className="text-sm font-semibold">Contenido</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Genere reels, textos y piezas promocionales de forma visual.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-semibold">Monetización</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Integre afiliación, pruebas de producto y futuras funciones premium.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[28px] border border-gray-200 bg-white shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4 bg-gray-50">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-sm font-medium text-gray-500">
                  vendeconia.app
                </span>
              </div>

              <img
                className="w-full h-[420px] object-cover"
                src="/oficina-ia-vendeconia.png"
                alt="Panel visual de productos, contenido y análisis con inteligencia artificial"
              />
            </div>

            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur border border-gray-200 shadow-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-500">
                Ruta principal
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-gray-50 p-3 border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">Buscar ideas</p>
                  <p className="mt-1 text-xs text-gray-600">Detecte nichos y tendencias.</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">Validar producto</p>
                  <p className="mt-1 text-xs text-gray-600">Vea ejemplos y enfoque comercial.</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">Crear promoción</p>
                  <p className="mt-1 text-xs text-gray-600">Genere contenido listo para publicar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}