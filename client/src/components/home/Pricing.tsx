import { Check, X, Sparkles, Crown, Building2, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Explorar",
    description: "Ideal para probar la herramienta y entender el flujo de producto y contenido.",
    price: "€0",
    popular: false,
    icon: <Sparkles className="h-6 w-6" />,
    features: [
      { name: "Hasta 2 productos con vídeo al mes", available: true },
      { name: "5 sugerencias de productos", available: true },
      { name: "Generador básico de textos", available: true },
      { name: "Plantillas estándar", available: true },
      { name: "Sin conexión a Shopify", available: false }
    ],
    cta: "Empezar gratis",
    ctaStyle: "secondary",
    note: "Perfecto para validar si VendeConIA encaja con su forma de trabajar."
  },
  {
    name: "Pro",
    description: "La opción más lógica para quien ya quiere usar VendeConIA con continuidad.",
    price: "€7",
    popular: true,
    icon: <Crown className="h-6 w-6" />,
    features: [
      { name: "Productos ilimitados con vídeo", available: true, highlight: true },
      { name: "20 sugerencias de productos", available: true, highlight: true },
      { name: "Generador avanzado de textos y reels", available: true },
      { name: "Plantillas exclusivas para destacar", available: true, highlight: true },
      { name: "Conexión con Shopify e Instagram", available: true, highlight: true }
    ],
    cta: "Pasar a Pro",
    ctaStyle: "primary",
    note: "Recomendado para afiliación, ecommerce y creación de contenido recurrente."
  },
  {
    name: "Uso profesional",
    description: "Pensado para una fase más seria, más constante y con mayor capacidad operativa.",
    price: "€19",
    popular: false,
    icon: <Building2 className="h-6 w-6" />,
    features: [
      { name: "Todo lo incluido en Pro", available: true, highlight: true },
      { name: "Acceso para 5 usuarios del equipo", available: true, highlight: true },
      { name: "API para integraciones personalizadas", available: true, highlight: true },
      { name: "Análisis avanzados de rendimiento", available: true },
      { name: "Soporte prioritario 24/7", available: true, highlight: true }
    ],
    cta: "Hablar con ventas",
    ctaStyle: "dark",
    note: "Orientado a equipos o producción más intensiva."
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-white border-y border-slate-200">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08),transparent_24%)]" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
            Acceso y crecimiento
          </p>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Elija el nivel que mejor encaje con su ritmo de producción
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-8">
            VendeConIA debe poder probarse, validarse y escalarse de forma lógica.
            No se trata de vender planes por vender, sino de ampliar capacidad cuando
            la herramienta realmente le aporte valor.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative overflow-hidden rounded-3xl border transition duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                plan.popular
                  ? "border-primary-300 bg-slate-900 text-white shadow-2xl"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute right-5 top-5">
                  <span className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-black shadow">
                    Recomendado
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center gap-3">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${
                      plan.popular
                        ? "border-white/10 bg-white/10 text-amber-300"
                        : "border-slate-200 bg-slate-50 text-primary-600"
                    }`}
                  >
                    {plan.icon}
                  </div>

                  <div>
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.18em] ${
                        plan.popular ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      Plan
                    </p>
                    <h3
                      className={`text-2xl font-extrabold ${
                        plan.popular ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                  </div>
                </div>

                <p
                  className={`mt-5 text-sm leading-7 ${
                    plan.popular ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-8 flex items-end gap-2">
                  <span
                    className={`text-5xl font-extrabold tracking-tight ${
                      plan.popular ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`pb-1 text-sm ${
                      plan.popular ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    /mes
                  </span>
                </div>

                <a
                  href="#"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-5 py-4 text-sm font-bold transition ${
                    plan.ctaStyle === "primary"
                      ? "bg-orange-500 text-black hover:bg-orange-400"
                      : plan.ctaStyle === "dark"
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>

                <p
                  className={`mt-4 text-xs leading-6 ${
                    plan.popular ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {plan.note}
                </p>
              </div>

              <div
                className={`border-t px-8 py-8 ${
                  plan.popular
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-[0.2em] ${
                    plan.popular ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  Incluye
                </p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {feature.available ? (
                          <div
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${
                              plan.popular ? "bg-emerald-400/20" : "bg-emerald-50"
                            }`}
                          >
                            <Check
                              className={`h-4 w-4 ${
                                plan.popular ? "text-emerald-300" : "text-emerald-600"
                              }`}
                            />
                          </div>
                        ) : (
                          <div className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-50">
                            <X className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                      </div>

                      <p
                        className={`text-sm leading-7 ${
                          plan.popular ? "text-slate-200" : "text-slate-700"
                        }`}
                      >
                        {feature.highlight ? (
                          <span className="font-bold">{feature.name}</span>
                        ) : (
                          feature.name
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-slate-900 p-8 sm:p-10 text-white shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
              Enfoque correcto
            </p>

            <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight">
              El valor no está en vender planes. Está en escalar cuando la herramienta ya le ayuda de verdad.
            </h3>

            <p className="mt-5 text-slate-300 text-base sm:text-lg leading-8">
              Si VendeConIA le permite detectar productos, preparar mejor contenido y
              convertir ideas en activos útiles para afiliación o ecommerce, entonces
              sí tiene sentido subir de nivel.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Explorar</p>
                <p className="mt-2 text-sm text-slate-300">
                  Probar el flujo general y ver utilidad real.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Validar</p>
                <p className="mt-2 text-sm text-slate-300">
                  Usarlo más a menudo en producto y contenido.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Escalar</p>
                <p className="mt-2 text-sm text-slate-300">
                  Convertirlo en parte real de su sistema de trabajo.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-700">
              Recomendación práctica
            </p>

            <h3 className="mt-4 text-2xl font-extrabold leading-tight text-slate-900">
              Empiece gratis y suba solo cuando vea utilidad real
            </h3>

            <p className="mt-4 text-sm sm:text-base leading-7 text-slate-700">
              Si todavía está validando el flujo, empiece por explorar. Si ya quiere
              usar VendeConIA para afiliación, contenido o producto con más continuidad,
              Pro será el nivel con más sentido.
            </p>

            <div className="mt-6 rounded-2xl border border-orange-200 bg-white/80 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Ideal para usted si…
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>• Quiere probar sin riesgo</li>
                <li>• Ya usa afiliación o ecommerce</li>
                <li>• Quiere crear más contenido</li>
                <li>• Busca una herramienta más seria</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}