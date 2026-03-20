import { useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductResultCard from "@/components/product-generator/ProductResultCard";
import { UsageLimits } from "@/components/ui/usage-limits";
import { parseAmazonInput } from "@/lib/amazon";
import {
  generateProductBase,
  type GeneratedProductBase,
} from "@/lib/product-generator";
import {
  Loader2,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Wand2,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ProductGenerator() {
  const [productInput, setProductInput] = useState("");
  const [result, setResult] = useState<GeneratedProductBase | null>(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const { user } = useAuth();

  const currentUsage = (user as any)?.monthlyProductGenerations || 0;
  const userPlan = (user as any)?.subscriptionPlan || "free";
  const usageLimit =
    userPlan === "enterprise" ? 999999 : userPlan === "premium" ? 100 : 10;

  const parsedPreview = useMemo(() => {
    return parseAmazonInput(productInput);
  }, [productInput]);

  const isPreviewValid = Boolean(
    productInput.trim() &&
      parsedPreview.inputType !== "invalid" &&
      parsedPreview.asin &&
      parsedPreview.normalizedUrl
  );

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: `${label} copiado`,
        description: "Ya lo tiene en el portapapeles.",
      });
    } catch {
      toast({
        title: "No se pudo copiar",
        description: "Inténtelo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleGenerate = () => {
    const rawValue = productInput.trim();

    if (!rawValue) {
      toast({
        title: "Introduzca una URL o ASIN",
        description: "Pegue una URL de Amazon o un ASIN válido antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    if (currentUsage >= usageLimit) {
      toast({
        title: "Límite alcanzado",
        description: "Mejore su plan para seguir generando bases de producto.",
        variant: "destructive",
      });
      return;
    }

    if (parsedPreview.inputType === "invalid") {
      toast({
        title: "Entrada no válida",
        description:
          parsedPreview.errors[0] ||
          "Use una URL válida de Amazon o un ASIN de 10 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    window.setTimeout(() => {
      try {
        const generated = generateProductBase(rawValue);
        setResult(generated);

        toast({
          title: "Base de producto generada",
          description:
            "Ya tiene una salida útil para GadgetsMania, afiliación y contenido.",
        });
      } catch (error) {
        toast({
          title: "No se pudo generar la base",
          description:
            error instanceof Error
              ? error.message
              : "Revise la URL o el ASIN e inténtelo de nuevo.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  return (
    <>
      <Navbar />

      <main className="bg-slate-50">
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_24%)]" />

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 xl:items-start">
              <div className="xl:col-span-2">
                <p className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                  Product generator
                </p>

                <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                  Convierta una URL Amazon o un ASIN en una base útil para GadgetsMania
                </h1>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  Este módulo ya no va de sugerencias decorativas. Va de coger un
                  producto concreto y devolverle una base lista para trabajar:
                  título SEO, meta description, resumen, pros, contras, CTA,
                  guion corto e incluso un bloque afiliado HTML.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary-100 bg-primary-50 text-primary-600">
                      <LinkIcon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      Pegue URL o ASIN
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Parta de un producto real y no de una idea abstracta.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-orange-600">
                      <Wand2 className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      Genere base comercial
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Obtenga una estructura lista para review, SEO y afiliación.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      Pase a ejecución
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Use la salida como base para fichas, comparativas o shorts.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-slate-200 bg-slate-900 p-7 text-white shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                  Flujo recomendado
                </p>

                <h2 className="mt-4 text-2xl font-extrabold leading-tight">
                  Producto detectado, base creada, monetización acelerada
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  Use este módulo cuando ya tenga localizado un producto en Amazon
                  y quiera acelerar el trabajo editorial sin empezar desde cero.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      1. Pegue la URL o el ASIN
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      El sistema detecta la base mínima del producto.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      2. Genere la estructura
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Reciba una salida útil para SEO, afiliación y review rápida.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">
                      3. Pase a contenido
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      Conviértalo en review, comparativa, CTA o pieza para redes.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 grid grid-cols-1 gap-8 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Entrada de producto
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                    Pegue una URL Amazon o un ASIN
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                    Ejemplos válidos: una URL de Amazon con <span className="font-semibold">/dp/ASIN</span> o un ASIN
                    de 10 caracteres. La salida está pensada para ser útil de verdad.
                  </p>
                </div>

                <div className="p-6">
                  <label
                    htmlFor="product-input"
                    className="mb-3 block text-sm font-bold text-slate-900"
                  >
                    URL Amazon o ASIN
                  </label>

                  <textarea
                    id="product-input"
                    value={productInput}
                    onChange={(e) => setProductInput(e.target.value)}
                    placeholder="Pegue aquí una URL de Amazon o un ASIN, por ejemplo: B0C432ZBGW"
                    className="min-h-[140px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
                  />

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    {!productInput.trim() ? (
                      <div className="flex items-start gap-3 text-sm text-slate-600">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        <p>
                          Pegue una URL Amazon o un ASIN para validar la entrada antes de generar.
                        </p>
                      </div>
                    ) : isPreviewValid ? (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 text-sm text-emerald-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <p>
                            Entrada válida detectada. Puede generar la base de producto.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                          <div className="rounded-xl border border-emerald-100 bg-white px-3 py-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                              ASIN
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              {parsedPreview.asin}
                            </p>
                          </div>

                          <div className="rounded-xl border border-emerald-100 bg-white px-3 py-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                              Marketplace
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              {parsedPreview.marketplace}
                            </p>
                          </div>

                          <div className="rounded-xl border border-emerald-100 bg-white px-3 py-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                              Tipo de entrada
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">
                              {parsedPreview.inputType === "asin" ? "ASIN" : "URL Amazon"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 text-sm text-rose-700">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                        <p>
                          {parsedPreview.errors[0] ||
                            "Entrada no válida. Use una URL Amazon real o un ASIN de 10 caracteres."}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-slate-500">
                      Salida pensada para monetización, SEO y reutilización editorial.
                    </div>

                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={loading}
                      className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generando base...
                        </>
                      ) : (
                        <>
                          Generar base de producto
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 xl:col-span-1">
              <UsageLimits type="product" current={currentUsage} limit={usageLimit} />

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary-100 bg-primary-50 text-primary-600">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Salida útil
                    </p>
                    <p className="text-xs text-slate-500">
                      Pensada para GadgetsMania
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Esta salida ya sirve como base para ficha rápida, review, bloque afiliado,
                  comparativa o guion corto para redes.
                </p>
              </div>

              <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-orange-200 bg-white/80 text-orange-600">
                    <Wand2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Lo que genera
                    </p>
                    <p className="text-xs text-slate-600">
                      Base completa y copiable
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                  <li>• Título SEO</li>
                  <li>• Meta description</li>
                  <li>• Intro review</li>
                  <li>• Resumen</li>
                  <li>• Pros y contras</li>
                  <li>• CTA</li>
                  <li>• Guion corto</li>
                  <li>• Bloque afiliado HTML</li>
                </ul>
              </div>
            </div>
          </div>

          {loading && (
            <div className="rounded-3xl border border-slate-200 bg-white py-16 text-center shadow-sm">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-500" />
              <p className="mt-4 text-lg font-medium text-slate-700">
                Preparando base comercial del producto…
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Extrayendo ASIN y generando salida útil para contenido y afiliación.
              </p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                  Resultado generado
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                  Base lista para trabajar producto, SEO y conversión
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  No lo vea como un resultado final. Véalo como una base operativa
                  para acelerar GadgetsMania y cualquier contenido derivado.
                </p>
              </div>

              <ProductResultCard result={result} onCopy={handleCopy} />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}