import {
  Star,
  StarHalf,
  Share2Icon,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  rating?: number;
  reviews?: number;
  trending?: boolean;
  tags?: string[];
  amazonUrl?: string;
}

interface ProductDisplayProps {
  products: Product[];
}

export default function ProductDisplay({ products }: ProductDisplayProps) {
  const { toast } = useToast();

  const handleCopyIdea = async (product: Product) => {
    const text = `Idea de producto:\n\n${product.name}\n${product.description}\nPrecio objetivo: ${product.price}`;
    await navigator.clipboard.writeText(text);
    toast({
      title: "Idea copiada",
      description: "Puedes pegarla donde quieras.",
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="h-4 w-4 text-yellow-400 fill-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="h-4 w-4 text-yellow-400 fill-yellow-400"
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-4 w-4 text-yellow-400" />
      );
    }

    return stars;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Productos recomendados
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {product.imageUrl && (
              <div className="h-60 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-3">
                {product.trending && (
                  <Badge className="bg-orange-100 text-orange-600">
                    Tendencia
                  </Badge>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {product.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-secondary-500">
                  {product.price}
                </span>

                {product.rating && (
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                )}
              </div>

              {product.tags && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-blue-50 text-blue-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyIdea(product)}
              >
                <Share2Icon className="h-4 w-4 mr-2" />
                Copiar idea
              </Button>

              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() =>
                  window.open(
                    product.amazonUrl || "https://www.amazon.es",
                    "_blank"
                  )
                }
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ver en Amazon
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
