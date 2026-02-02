import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, ShoppingCart } from "lucide-react";
import { Product } from "@shared/schema";

interface VideoPreviewProps {
  product: Product | null;
  contentData: {
    title: string;
    description: string;
    music: string;
    animation: string;
    cta: string;
  };
}

export default function VideoPreview({
  product,
  contentData
}: VideoPreviewProps) {
  if (!product) {
    return (
      <Card className="relative bg-gray-100 rounded-xl overflow-hidden aspect-[9/16] flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-gray-500 mb-4">
            Selecciona un producto para ver un ejemplo de contenido
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Vista previa del contenido (Demo)
      </h3>

      <p className="text-sm text-gray-500 mb-6">
        Ejemplo visual de cómo se mostraría un vídeo promocional en redes sociales.
      </p>

      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
        <div className="relative pb-[177.78%]">
          <div className="absolute inset-0">
            {/* Imagen del producto */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover opacity-90"
            />

            <div className="absolute inset-0 flex flex-col justify-between p-4">
              {/* Título */}
              <div className="text-white font-bold text-xl drop-shadow-lg">
                {contentData.title || "🔥 Producto viral del momento"}
              </div>

              {/* Descripción + CTA */}
              <div className="space-y-4">
                <div className="bg-black bg-opacity-50 p-3 rounded-lg">
                  <p className="text-white text-sm">
                    {contentData.description ||
                      "Descubre por qué este producto está arrasando en redes sociales."}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  {/* Acciones fake tipo Instagram */}
                  <div className="flex space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white bg-opacity-20 text-white rounded-full h-10 w-10"
                      disabled
                    >
                      <Heart className="h-5 w-5 text-red-500 fill-current" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white bg-opacity-20 text-white rounded-full h-10 w-10"
                      disabled
                    >
                      <MessageCircle className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white bg-opacity-20 text-white rounded-full h-10 w-10"
                      disabled
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {contentData.cta || "Comprar ahora"}
                  </div>
                </div>
              </div>
            </div>

            {/* Usuario fake */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">VC</span>
              </div>
              <span className="text-white text-sm font-medium">vendeconia</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Este contenido es solo un ejemplo visual. No se genera ni descarga ningún vídeo real.
      </div>
    </div>
  );
}
