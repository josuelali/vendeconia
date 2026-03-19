import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContentEditor from "@/components/content-generator/ContentEditor";
import VideoPreview from "@/components/content-generator/VideoPreview";
import { Product } from "@shared/schema";
import { Clapperboard, FileText, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";

/**
 * DEMO FRONTEND-ONLY
 * Sin backend, sin APIs, sin generación real.
 * Todo orientado a preview + monetización.
 */

type ContentData = {
  title: string;
  description: string;
  music: string;
  animation: string;
  cta: string;
};

const initialContent: ContentData = {
  title: "¡PRODUCTO INCREÍBLE QUE NECESITAS YA! 😍",
  description:
    "Este producto cambiará tu vida cotidiana. ¡No podrás creer su calidad y precio!",
  music: "Upbeat – Tendencia",
  animation: "Zoom",
  cta: "Comprar ahora",
};

// MOCK DE PRODUCTOS (frontend-only)
const demoProducts: Product[] = [
  {
    id: 1,
    name: "Organizador de cables premium",
    imageUrl:
      "https://images.unsplash.com/photo-1585386959984-a41552262b45?auto=format&fit=crop&w=600&h=900",
    affiliateUrl: "https://amzn.to/TU_ENLACE",
  },
];

export default function ContentGenerator() {
  const [products] = useState<Product[]>(demoProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    demoProducts[0]
  );
  const [contentData, setContentData] =
    useState<ContentData>(initialContent);

  useEffect(() => {
    document.title = "Generador de Contenido | VendeConIA";
  }, []);

  const handleContentChange = (newContent: Partial<ContentData>) => {
    setContentData((prev) => ({ ...prev, ...newContent }));
  };

  return (
    <>
      <Navbar />

      <main className="bg-slate-50">
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_26%)]" />

          <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              <div className="xl:col-span-2">
                <p className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                  Generador de contenido
                </p>

                <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Pase de una idea de producto a una pieza promocional más rápido
                </h1>

                <p className="mt-5 max-w-3xl text-lg text-slate-600 leading-8">
                  Esta demo está pensada para convertir una ficha o idea de producto
                  en copy, estructura promocional y preview visual. La meta no es
                  generar texto por generar, sino preparar una base útil para vender,
                  derivar tráfico o alimentar contenido afiliado.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 text-orange-600">
                      <Clapperboard className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      Guion visual
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Prepare una base para reel, short o vídeo promocional.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 text-primary-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      Copy de venta
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Genere títulos, textos y CTAs con más intención comercial.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      Salida reutilizable
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Use el resultado en afiliación, ecommerce o redes sociales.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-slate-200 bg-slate-900 p-7 text-white shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                  Flujo recomendado
                </p>

                <h2 className="mt-4 text-2xl font-extrabold leading-tight">
                  Producto detectado, contenido creado, monetización conectada
                </h2>

                <p className="mt-4 text-sm sm:text-base leading-7 text-slate-300">
                  Este módulo debe servir para transformar una oportunidad detectada
                  en una pieza lista para publicar, testear o derivar a afiliación.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      1. Elegir producto
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Use una ficha o una idea detectada antes.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      2. Ajustar enfoque
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Defina título, descripción, música, animación y CTA.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      3. Pasar a publicación
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Lleve la pieza a vídeo, afiliación o redes.
                    </p>
                  </div>
                </div>

                <a
                  href="https://pictory.ai?ref=josue"
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-4 text-sm font-bold text-black shadow-lg transition hover:bg-orange-400"
                >
                  Ver herramienta recomendada
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                  Preview de contenido
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                  Visualice rápidamente cómo quedaría una pieza promocional
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-7">
                  No piense esta preview como un adorno. Piénsela como una forma
                  rápida de validar si el mensaje, el título y la llamada a la acción
                  tienen suficiente fuerza para pasar a publicación.
                </p>
              </div>

              <VideoPreview
                product={selectedProduct}
                contentData={contentData}
              />

              <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/80 border border-orange-200 text-orange-600">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Muy útil para GadgetsMania
                    </p>
                    <p className="text-xs text-slate-600">
                      Review, short, copy o CTA afiliado
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Esta salida puede convertirse en descripción, guion corto,
                  copy comercial o base de review para publicaciones centradas en
                  afiliación Amazon y productos físicos.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                  Editor guiado
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                  Ajuste la pieza antes de pasarla a producción
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-7">
                  Modifique producto, título, descripción, música, animación y CTA
                  para preparar una pieza que tenga más sentido comercial y visual.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <ContentEditor
                  products={products}
                  selectedProduct={selectedProduct}
                  onProductSelect={setSelectedProduct}
                  contentData={contentData}
                  onContentChange={handleContentChange}
                />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  Siguiente paso lógico
                </p>
                <h3 className="mt-3 text-xl font-extrabold leading-tight">
                  Cuando el mensaje esté bien, conviértalo en vídeo o publicación real
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-7 text-slate-300">
                  Aquí es donde encaja una integración futura con Pictory, shorts,
                  piezas visuales o una salida directa para campañas y redes.
                </p>

                <a
                  href="/product-generator"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-primary-600"
                >
                  Volver al generador de productos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}