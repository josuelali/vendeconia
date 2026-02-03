import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategorySelector from "@/components/product-generator/CategorySelector";
import ProductDisplay from "@/components/product-generator/ProductDisplay";
import { UsageLimits } from "@/components/ui/usage-limits";
import type { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";

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

    // 👉 DEMO: simulamos carga
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
        description: "Estos son productos simulados para la demo.",
      });
    }, 1200);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-heading">
            Generador de Productos (Demo)
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Selecciona tus intereses y preferencias para generar sugerencias de
            productos en modo demostración.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
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

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleGenerateProducts}
                  disabled={loading}
                  className="px-5 py-3 rounded-lg shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>Generar sugerencias</>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <UsageLimits
              type="product"
              current={(user as any)?.monthlyProductGenerations || 0}
              limit={
                (user as any)?.subscriptionPlan === "enterprise"
                  ? 999999
                  : (user as any)?.subscriptionPlan === "premium"
                    ? 100
                    : 10
              }
            />
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary-500" />
            <p className="mt-4 text-lg text-gray-600">
              Analizando tendencias con IA…
            </p>
          </div>
        )}

        {products.length > 0 && <ProductDisplay products={products} />}
      </main>

      <Footer />
    </>
  );
}
