import { useState } from "react";
import type { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Copy, Info, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductDisplayProps {
  products: Product[];
}

export default function ProductDisplay({ products }: ProductDisplayProps) {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCopyIdea = (product: Product) => {
    navigator.clipboard.writeText(
      `${product.name} - Precio aproximado: ${product.price}€`
    );

    toast({
      title: "Idea copiada",
      description: "Puedes usar esta idea para crear contenido o vender online.",
    });
  };

  return (
    <>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Productos recomendados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>

                <p className="text-gray-700 font-medium mb-4">
                  {product.price} €
                </p>

                {product.isTrending && (
                  <span className="inline-block text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4">
                    En tendencia
                  </span>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => handleCopyIdea(product)}
                >
                  <Copy className="h-4 w-4" />
                  Copiar idea
                </Button>

                <Button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Info className="h-4 w-4" />
                  Ver detalles (demo)
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DEMO */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {selectedProduct.name}
            </h3>

            <p className="text-gray-700 mb-2">
              <strong>Precio estimado:</strong> {selectedProduct.price} €
            </p>

            {selectedProduct.isTrending && (
              <p className="text-green-700 font-semibold mb-2">
                Producto en tendencia
              </p>
            )}

            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
              Esta es una <strong>demostración</strong>.  
              Próximamente podrás ver análisis completos, enlaces reales y
              recomendaciones avanzadas con IA.
            </div>

            <div className="mt-6 text-right">
              <Button onClick={() => setSelectedProduct(null)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
