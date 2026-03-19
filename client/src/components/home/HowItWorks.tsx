import { Search, BarChart3, Megaphone, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Detecte una oportunidad",
    description:
      "Empiece por una idea, una categoría o una tendencia. El objetivo es filtrar rápido qué producto o nicho merece atención comercial.",
    points: [
      "Explore nichos y categorías",
      "Encuentre productos con potencial",
      "Evite crear contenido sin foco",
    ],
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    alt: "Persona analizando ideas de producto en un portátil",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Valide el enfoque",
    description:
      "No basta con encontrar un producto. Hay que entender cómo presentarlo, qué ángulo usar y qué señal comercial tiene más sentido.",
    points: [
      "Revise ejemplos y contexto visual",
      "Defina mejor el posicionamiento",
      "Prepare una base útil para vender",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    alt: "Panel de datos y análisis de producto",
  },
  {
    number: "03",
    icon: Megaphone,
    title: "Conviértalo en contenido",
    description:
      "Una vez validado el producto, el siguiente paso es transformarlo en piezas promocionales: copy, guion, visual o CTA orientado a conversión.",
    points: [
      "Genere hooks y textos comerciales",
      "Prepare reels, shorts o publicaciones",
      "Conecte contenido con monetización",
    ],
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80",
    alt: "Aplicaciones y redes sociales para publicar contenido promocional",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_24%)]" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
            Flujo de trabajo
          </p>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Cómo funciona la ruta completa dentro de VendeConIA
          </h2>

          <p className="mt-5 text-lg text-slate-300">
            La herramienta no debe quedarse en enseñar productos. Debe ayudarle
            a recorrer una secuencia clara: detectar, validar y convertir una idea
            en contenido publicable con intención comercial.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const reverse = index % 2 === 1;

            return (
              <article
                key={step.number}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 shadow-2xl ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/10 text-amber-300">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                        Paso {step.number}
                      </p>
                      <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-6 text-base sm:text-lg leading-8 text-slate-300">
                    {step.description}
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {step.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                      >
                        <p className="text-sm font-medium text-slate-200">{point}</p>
                      </div>
                    ))}
                  </div>

                  {index < steps.length - 1 && (
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
                      Siguiente paso
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-primary-500/20 to-orange-400/20 blur-2xl" />

                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-2xl">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="h-[320px] w-full object-cover"
                    />

                    <div className="border-t border-white/10 bg-slate-950/90 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                        Resultado esperado
                      </p>
                      <p className="mt-2 text-sm sm:text-base text-slate-200 leading-7">
                        Pase de una idea suelta a una pieza más accionable dentro de
                        su flujo comercial: producto validado, narrativa clara y base
                        lista para promoción.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-primary-500/10 p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                Clave estratégica
              </p>

              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                El valor no está en generar más cosas. Está en generar lo correcto, en el orden correcto.
              </h3>

              <p className="mt-5 text-slate-300 text-base sm:text-lg leading-8">
                Si la home y las demos explican bien esta ruta, VendeConIA pasa de ser
                una app “curiosa” a una herramienta que sí encaja con afiliación,
                ecommerce, contenidos y producción real para proyectos como GadgetsMania.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <p className="text-sm font-semibold text-white">Ruta recomendada</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>• Buscar producto o nicho</li>
                <li>• Revisar enfoque comercial</li>
                <li>• Crear pieza promocional</li>
                <li>• Publicar o monetizar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}