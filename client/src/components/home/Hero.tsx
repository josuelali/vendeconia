import { Link } from "wouter";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Video,
} from "lucide-react";

const integrations = [
  { name: "Amazon", logo: "/logos/amazon.png" },
  { name: "Hostinger", logo: "/logos/hostinger.png" },
  { name: "Pictory", logo: "/logos/pictory.png" },
  { name: "SistemaMaestroIA", logo: "/logos/sistemamaestroia.png" },
  { name: "Systeme.io", logo: "/logos/systeme.png" },
  { name: "Writesonic", logo: "/logos/writesonic.png" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-[linear-gradient(180deg,#08111f_0%,#0b1730_45%,#101827_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.12),transparent_24%),radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_38%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* COLUMNA IZQUIERDA */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-400/20 bg-white/5 px-4 py-2 text-sm font-semibold text-primary-200 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Descubrimiento de productos + contenido con IA
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
              Encuentra productos con potencial y conviértalos en contenido que vende
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl leading-8">
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
                <a className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:bg-white/10">
                  Crear contenido
                </a>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center gap-2 text-primary-300">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="text-sm font-semibold">Producto</span>
                </div>
                <p className="mt-2 text-sm text-slate-300 leading-6">
                  Descubra productos con potencial de venta y ejemplos reales.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center gap-2 text-orange-300">
                  <Video className="h-5 w-5" />
                  <span className="text-sm font-semibold">Contenido</span>
                </div>
                <p className="mt-2 text-sm text-slate-300 leading-6">
                  Genere reels, textos y piezas promocionales de forma visual.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-semibold">Monetización</span>
                </div>
                <p className="mt-2 text-sm text-slate-300 leading-6">
                  Integre afiliación, validación y futuras funciones premium.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="relative space-y-5">
            {/* BANDA SUPERIOR CON LOGOS REALES */}
            <div className="rounded-2xl border border-white/10 bg-white/5 shadow-sm px-4 py-4 backdrop-blur">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">
                  Compatible con publicación, monetización y sistemas conectados
                </p>

                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  Ecosistema activo
                </div>
              </div>

              <div className="relative overflow-hidden">
                <div className="flex gap-3 min-w-max animate-[marquee_22s_linear_infinite]">
                  {[...integrations, ...integrations].map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-100 shadow-sm"
                    >
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="h-6 w-6 rounded object-contain bg-white"
                      />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MOCKUP CENTRAL */}
            <div className="rounded-[28px] border border-white/10 bg-slate-900/60 shadow-2xl overflow-hidden backdrop-blur">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4 bg-slate-900/80">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-sm font-medium text-slate-300">
                  vendeconia.app
                </span>
              </div>

              <img
                className="w-full h-[420px] object-cover"
                src="/oficina-ia-vendeconia.png"
                alt="Panel visual de productos, contenido y análisis con inteligencia artificial"
              />
            </div>

            {/* BLOQUE INFERIOR */}
            <div className="rounded-2xl border border-white/10 bg-white/5 shadow-xl p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">
                Ruta principal
              </p>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-900/70 p-4 border border-white/10">
                  <p className="text-sm font-semibold text-white">Buscar ideas</p>
                  <p className="mt-1 text-xs text-slate-300 leading-5">
                    Detecte nichos, productos y tendencias con mejor criterio.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-900/70 p-4 border border-white/10">
                  <p className="text-sm font-semibold text-white">Validar producto</p>
                  <p className="mt-1 text-xs text-slate-300 leading-5">
                    Revise ejemplos, enfoque comercial y potencial de uso.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-900/70 p-4 border border-white/10">
                  <p className="text-sm font-semibold text-white">Crear promoción</p>
                  <p className="mt-1 text-xs text-slate-300 leading-5">
                    Genere contenido listo para publicar o monetizar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}