import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategorySelector from "@/components/product-generator/CategorySelector";
import ProductDisplay from "@/components/product-generator/ProductDisplay";
import { UsageLimits } from "@/components/ui/usage-limits";
import type { Product } from "@shared/schema";
import {
  Loader2,
  Search,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Tags,
  Wand2,
} from "lucide-react";

export default function ProductGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(3);
  const [trendingOnly, setTrendingOnly] = useState<boolean>(false);
  const [fastShipping, setFastShipping] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { user } = useAuth();

  const handleGenerateProducts = () => {
    if (!selectedCategory) {
      toast({
        title: "Selecciona una categoría",
        description: "Por favor, selecciona una categoría antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    const currentUsage = (user as any)?.monthlyProductGenerations || 0;
    const userPlan = (user as any)?.subscriptionPlan || "free";
    const limit =
      userPlan === "enterprise" ? 999999 : userPlan === "premium" ? 100 : 10;

    if (currentUsage >= limit) {
      toast({
        title: "Límite alcanzado",
        description: "Mejora tu plan para continuar generando productos.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setProducts([]);

    setTimeout(() => {
      const demoProducts: Product[] = [
        {
          id: 1,
          name: "Soporte ajustable para portátil",
          category: selectedCategory,
          price: 29.99,
          isTrending: true,
          fastShipping: true,
        },
        {
          id: 2,
          name: "Lámpara LED ambiental con control táctil",
          category: selectedCategory,
          price: 24.95,
          isTrending: trendingOnly,
          fastShipping: fastShipping,
        },
        {
          id: 3,
          name: "Organizador de escritorio minimalista",
          category: selectedCategory,
          price: 19.99,
          isTrending: true,
          fastShipping: fastShipping,
        },
      ];

      setProducts(demoProducts);
      setLoading(false);

      toast({
        title: "¡Productos generados!",
        description: "Estas sugerencias son simuladas para la demo actual.",
      });
    }, 1200);
  };

  const usageCurrent = (user as any)?.monthlyProductGenerations || 0;
  const usageLimit =
    (user as any)?.subscriptionPlan === "enterprise"
      ? 999999
      : (user as any)?.subscriptionPlan === "premium"
        ? 100
        : 10;

  return (
    <>
      <Navbar />

      <main className="bg-slate-50">
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_24%)]" />

          <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              <div className="xl:col-span-2">
                <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                  Generador de productos
                </p>

                <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Encuentre ideas de producto con más criterio y menos ruido
                </h1>

                <p className="mt-5 max-w-3xl text-lg text-slate-600 leading-8">
                  Use esta demo para explorar categorías, filtrar oportunidades y
                  generar una primera base útil para afiliación, ecommerce,
                  fichas comerciales o contenido para proyectos como GadgetsMania.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 text-primary-600">
                      <Search className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      Buscar mejor
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Filtre por categoría, tendencia y señales más útiles.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 text-orange-600">
                      <Tags className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      Validar enfoque
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Prepare una base más comercial antes de crear contenido.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      Pasar a acción
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Use la salida como base para copy, review o short.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-slate-200 bg-slate-900 p-7 text-white shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                  Uso recomendado
                </p>

                <h2 className="mt-4 text-2xl font-extrabold leading-tight">
                  Ideal para detectar productos que luego pueda monetizar
                </h2>

                <p className="mt-4 text-sm sm:text-base leading-7 text-slate-300">
                  Esta parte de VendeConIA puede servirle para explorar ideas,
                  encontrar productos con potencial y preparar una base para
                  artículos, vídeos cortos, redes o afiliación Amazon.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      1. Elegir categoría
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Empiece por un nicho o una línea de producto.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      2. Ver oportunidad
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Revise si encaja con afiliación, review o contenido.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      3. Llevarlo al siguiente módulo
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Pase la idea al generador de contenido cuando tenga sentido.
                    </p>
                  </div>
                </div>

                <a
                  href="https://amzn.to/4tibkt2"
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-4 text-sm font-bold text-black shadow-lg transition hover:bg-orange-400"
                >
                  Ver producto recomendado en Amazon
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className="xl:col-span-2">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Exploración guiada
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                    Defina filtros y genere sugerencias de producto
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-7">
                    Esta demo simula cómo se podrían generar ideas de producto con
                    una capa de selección más útil para negocio, afiliación y contenido.
                  </p>
                </div>

                <div className="p-6">
                  <CategorySelector
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    trendingOnly={trendingOnly}
                    onTrendingOnlyChange={setTrendingOnly}
                    fastShipping={fastShipping}
                    onFastShippingChange={setFastShipping}
                  />

                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      Seleccione una categoría y use la demo para probar un flujo
                      más claro de descubrimiento.
                    </div>

                    <button
                      onClick={handleGenerateProducts}
                      disabled={loading}
                      className="inline-flex items-center justify-center rounded-xl px-6 py-4 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generando...
                        </>
                      ) : (
                        <>
                          Generar sugerencias
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-1 space-y-6">
              <UsageLimits
                type="product"
                current={usageCurrent}
                limit={usageLimit}
              />

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 text-primary-600">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Salida aprovechable
                    </p>
                    <p className="text-xs text-slate-500">
                      Base para afiliación y contenido
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Esta salida debería servirle para detectar una idea y después
                  derivarla a una review, un artículo comparativo o un guion corto
                  para redes y vídeos.
                </p>
              </div>

              <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 border border-orange-200 text-orange-600">
                    <Wand2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Siguiente paso lógico
                    </p>
                    <p className="text-xs text-slate-600">
                      Pasar la idea al creador de contenido
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Una vez detectado el producto, el valor real está en convertirlo
                  en copy, CTA, guion o pieza promocional para publicarlo más rápido.
                </p>

                <a
                  href="/content-generator"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Ir al generador de contenido
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {loading && (
            <div className="rounded-3xl border border-slate-200 bg-white py-16 text-center shadow-sm">
              <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary-500" />
              <p className="mt-4 text-lg font-medium text-slate-700">
                Analizando tendencias con IA…
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Preparando sugerencias de producto para la demo.
              </p>
            </div>
          )}

          {products.length > 0 && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                  Resultados simulados
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                  Estas sugerencias ya pueden servir como base comercial
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-7">
                  No piense esta salida como una lista decorativa. Piénsela como el
                  primer paso para validar una oportunidad y llevarla a afiliación,
                  review, short o contenido promocional.
                </p>
              </div>

              <ProductDisplay products={products} />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}