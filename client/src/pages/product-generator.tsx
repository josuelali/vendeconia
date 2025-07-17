import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategorySelector from "@/components/product-generator/CategorySelector";
import ProductDisplay from "@/components/product-generator/ProductDisplay";
import { UsageLimits } from "@/components/ui/usage-limits";
import { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function ProductGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(3); // 1-5 scale
  const [trendingOnly, setTrendingOnly] = useState<boolean>(false);
  const [fastShipping, setFastShipping] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  
  const { toast } = useToast();
  const { user } = useAuth();
  
  const generateProductsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/products/generate", {
        category: selectedCategory,
        priceRange,
        trendingOnly,
        fastShipping
      });
      return response.json();
    },
    onSuccess: (data) => {
      setProducts(data.products);
      toast({
        title: "¡Productos generados!",
        description: "Hemos encontrado algunos productos virales para ti.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error al generar productos",
        description: error.message || "Hubo un problema al generar productos. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  });

  const handleGenerateProducts = () => {
    if (!selectedCategory) {
      toast({
        title: "Selecciona una categoría",
        description: "Por favor, selecciona una categoría antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    // Check usage limits
    const currentUsage = user?.monthlyProductGenerations || 0;
    const limits = {
      free: 10,
      premium: 100,
      enterprise: 999999
    };
    
    const userPlan = user?.subscriptionPlan || 'free';
    const limit = limits[userPlan as keyof typeof limits];
    
    if (currentUsage >= limit) {
      toast({
        title: "Límite de generaciones alcanzado",
        description: "Mejora tu plan para continuar generando productos.",
        variant: "destructive",
      });
      return;
    }
    
    generateProductsMutation.mutate();
  };

  return (
    <>
      <Helmet>
        <title>Generador de Productos | VendeConIA</title>
        <meta name="description" content="Encuentra productos virales para vender online con nuestra herramienta de IA. Selecciona tus intereses y genera sugerencias en segundos." />
      </Helmet>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Generador de Productos</h1>
          <p className="mt-2 text-lg text-gray-600">
            Selecciona tus intereses y preferencias para generar sugerencias de productos virales.
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
                  disabled={generateProductsMutation.isPending}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {generateProductsMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 1.9.6 2.7" /><path d="M19 21c1.3-1.3 1.5-2.7.5-4-1.1-1.4-2.4-2-4-2-1.7 0-2.9.6-4 2-1 1.3-.8 2.7.5 4 .5.5 1 .7 1.5.7s1.2-.3 2-.7c.8.4 1.5.7 2 .7s1-.2 1.5-.7Z" /></svg>
                      Generar sugerencias
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <UsageLimits
              type="product"
              current={user?.monthlyProductGenerations || 0}
              limit={user?.subscriptionPlan === 'enterprise' ? 999999 : user?.subscriptionPlan === 'premium' ? 100 : 10}
            />
          </div>
        </div>
        
        {generateProductsMutation.isPending && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary-500" />
            <p className="mt-4 text-lg text-gray-600">Buscando los mejores productos para ti...</p>
          </div>
        )}
        
        {products.length > 0 && (
          <ProductDisplay products={products} />
        )}
      </main>
      
      <Footer />
    </>
  );
}
