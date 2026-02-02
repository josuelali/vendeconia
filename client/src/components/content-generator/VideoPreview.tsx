import { ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Product } from "@shared/schema";

interface VideoPreviewProps {
  product: Product | null;
  contentData: {
    title: string;
    description: string;
    cta: string;
  };
}

export default function VideoPreview({
  product,
  contentData
}: VideoPreviewProps) {
  if (!product) {
    return (
      <Card className="bg-gray-100 rounded-xl aspect-[9/16] flex items-center justify-center">
        <p className="text-gray-500 text-center p-4">
          Selecciona un producto para ver la vista previa
        </p>
      </Card>
    );
  }

  const link =
    product.affiliateUrl || "https://vendeconia.org/guias";

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Vista previa (simulada)
      </h3>

      <div className="bg-black rounded-xl overflow-hidden shadow-xl relative aspect-[9/16]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="text-white font-bold text-xl drop-shadow">
            {contentData.title}
          </div>

          <div className="space-y-4">
            <div className="bg-black bg-opacity-60 p-3 rounded">
              <p className="text-white text-sm">
                {contentData.description}
              </p>
            </div>

            {/* CTA REAL */}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {contentData.cta}
            </a>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        Vista previa visual. El resultado final se genera con el editor.
      </p>
    </div>
  );
}
