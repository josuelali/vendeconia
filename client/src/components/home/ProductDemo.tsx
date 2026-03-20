import { Link } from "wouter";
import { ArrowRight, Search, Sparkles, ShoppingBag, Tags } from "lucide-react";

const demoProducts = [
  {
    title: "Organizador multifuncional para coche",
    subtitle: "Tendencia",
    price: "€18,99",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    badge: "Amazon",
    visits: "Visitas: 12k+",
  },
  {
    title: "Botella motivacional con indicador de tiempo",
    subtitle: "Tendencia",
    price: "€24,90",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    badge: "Lifestyle",
    visits: "Visitas: 9k+",
  },
  {
    title: "Luz LED inteligente multifunción",
    subtitle: "Popular",
    price: "€29,99",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    badge: "Tecnología",
    visits: "Visitas: 20k+",
  },
];

const featureItems = [
  {
    icon: Search,
    title: "Exploración más útil",
    text: "Encuentre ideas de producto con mejor criterio y menos ruido.",
  },
  {
    icon: Tags,
    title: "Contexto comercial",
    text: "Revise categoría, ángulo y señales para decidir más rápido.",
  },
  {
    icon: Sparkles,
    title: "Base para contenido",
    text: "Use la ficha generada como arranque para copy, short o review.",
  },
];

export default function ProductDemo() {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* BLOQUE PRINCIPAL */}
          <div className="xl:col-span-2">
            <div className="max-w-3xl">
              <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                Descubrimiento de productos
              </p>

              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Así se ven las sugerencias de productos dentro de VendeConIA
              </h2>

              <p className="mt-5 text-lg text-slate-600 leading-8">
                Esta demo debe transmitir que aquí empieza un flujo útil: detectar
                una oportunidad, validarla y convertirla en contenido o monetización.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {demoProducts.map((product) => (
                <article
                  key={product.title}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-56 w-full object-cover"
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700 shadow">
                      {product.subtitle}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {product.badge}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {product.visits}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold leading-snug text-slate-900">
                      {product.title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-extrabold text-slate-900">
                        {product.price}
                      </p>

                      <div className="flex items-center gap-1 text-amber-500">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span className="text-slate-300">★</span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                        Ecommerce
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        Copy
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        Afiliación
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* BLOQUE DE APOYO */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {featureItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-slate-200 text-primary-600 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="xl:sticky xl:top-24 space-y-5">
            {/* DEMO PRINCIPAL */}
            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-7 text-white shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                Demo principal
              </p>

              <h3 className="mt-4 text-2xl font-extrabold leading-tight">
                Abra el generador y convierta una idea en ficha de producto útil
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-7 text-slate-300">
                El objetivo no es mostrar tarjetas bonitas, sino preparar una base
                aprovechable para afiliación, ecommerce, review o creación de contenido.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Buscar producto</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Elija una categoría o una idea inicial.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Validar enfoque</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Revise contexto, señales y ángulo comercial.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">Pasar a contenido</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Lleve esa ficha al generador de copies o guiones.
                  </p>
                </div>
              </div>

              <Link href="/product-generator">
                <a className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-primary-600">
                  Abrir generador de productos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Link>
            </div>

            {/* AMAZON - SOLO UNO */}
            <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-700">
                Recomendado
              </p>

              <h3 className="mt-4 text-2xl font-extrabold leading-tight text-slate-900">
                Producto recomendado en Amazon
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-7 text-slate-700">
                Un bloque contextual para conectar descubrimiento de producto con
                afiliación real, sin romper la narrativa de la sección.
              </p>

              <ul className="mt-5 space-y-2 text-sm text-slate-700">
                <li>• Encaja con el flujo comercial</li>
                <li>• Puede rotarse por nicho o categoría</li>
                <li>• Útil para GadgetsMania y afiliación</li>
              </ul>

              <a
                href="https://amzn.to/4tibkt2"
                target="_blank"
                rel="nofollow sponsored noopener"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-4 text-sm font-bold text-black shadow-lg transition hover:bg-orange-400"
              >
                Ver producto recomendado en Amazon
              </a>
            </div>

            {/* USO DEL ECOSISTEMA */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 text-primary-600">
                  <ShoppingBag className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Uso ideal para su ecosistema
                  </p>
                  <p className="text-xs text-slate-500">
                    GadgetsMania + redes + contenido afiliado
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Esta parte debe servir como antesala para detectar productos,
                sacar ideas comerciales y alimentar fichas, shorts y artículos
                de afiliación.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}