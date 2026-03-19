import {
  Search,
  Sparkles,
  Megaphone,
  ImagePlus,
  Store,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Generador de ideas de nicho",
    description:
      "Detecte oportunidades, categorías y líneas de producto con más claridad antes de perder tiempo creando contenido sin dirección.",
  },
  {
    icon: Sparkles,
    title: "Buscador de productos virales",
    description:
      "Visualice ejemplos de productos con potencial comercial para validar más rápido qué merece la pena testear o promocionar.",
  },
  {
    icon: Megaphone,
    title: "Creador de reels y textos",
    description:
      "Genere copies, hooks, descripciones y estructuras promocionales orientadas a conversión para redes, ecommerce y afiliación.",
  },
  {
    icon: ImagePlus,
    title: "Editor de mockups y portadas",
    description:
      "Prepare piezas visuales y creatividades más atractivas para presentar productos de forma más profesional y persuasiva.",
  },
  {
    icon: Store,
    title: "Integración con Shopify",
    description:
      "Organice mejor el flujo entre producto, escaparate y publicación para reducir trabajo manual y ganar velocidad operativa.",
  },
  {
    icon: BarChart3,
    title: "Publicación en redes sociales",
    description:
      "Convierta ideas de producto en piezas publicables para Instagram, TikTok o shorts sin depender de un proceso improvisado.",
  },
];

export default function Features() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08),transparent_24%)]" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-flex items-center rounded-full border border-primary-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-600 shadow-sm">
            Características principales
          </p>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Todo lo que necesita para detectar productos y convertirlos en contenido de venta
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            VendeConIA está pensada para ayudarle a pasar de una idea o tendencia
            a un activo comercial más claro: producto, copy, creatividad y publicación.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-primary-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 text-primary-600 group-hover:bg-primary-100 transition">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Feature
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 leading-snug">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base leading-7 text-slate-600">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary-600">
                  <span className="h-2 w-2 rounded-full bg-primary-500" />
                  Preparado para flujo comercial
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-2 p-8 sm:p-10 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                Enfoque recomendado
              </p>

              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight">
                No piense en VendeConIA como una landing más. Piénsela como una herramienta para producir mejor.
              </h3>

              <p className="mt-5 max-w-3xl text-slate-300 text-base sm:text-lg leading-8">
                La ventaja real no está solo en enseñar productos, sino en unir una
                ruta operativa clara: descubrir, validar, crear contenido y monetizar
                con menos fricción.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">1. Detectar</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Encontrar productos o nichos con sentido comercial.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">2. Crear</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Generar copies, hooks, guiones y materiales promocionales.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">3. Monetizar</p>
                  <p className="mt-2 text-sm text-slate-300">
                    Llevar ese contenido a afiliación, ecommerce o redes.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-white/10 bg-gradient-to-br from-orange-400 to-amber-500 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-black/70">
                  Recomendación táctica
                </p>

                <h4 className="mt-4 text-2xl font-extrabold text-black leading-tight">
                  Empiece por una sola ruta clara
                </h4>

                <p className="mt-4 text-sm sm:text-base leading-7 text-black/80">
                  Producto ganador + copy + visual + CTA. Esa combinación vale más
                  que tener muchas secciones bonitas sin un flujo comercial real.
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-black/10 p-5 border border-black/10">
                <p className="text-sm font-semibold text-black">
                  Prioridad recomendada
                </p>
                <ul className="mt-3 space-y-2 text-sm text-black/80">
                  <li>• Buscar producto</li>
                  <li>• Validar enfoque</li>
                  <li>• Crear contenido</li>
                  <li>• Llevarlo a monetización</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}