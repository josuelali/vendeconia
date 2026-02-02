vimport { useMemo } from "react";
import { Star, StarHalf, Share2Icon, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProductDisplayProps {
  products: Product[];
}

export default function ProductDisplay({ products }: ProductDisplayProps) {
  const { toast } = useToast();

  const baseUrl = useMemo(() => {
    try {
      return window.location.origin;
    } catch {
      return "";
    }
  }, []);

  const handleShareProduct = async (product: Product) => {
    const url =
      product.amazonUrl ||
      (baseUrl ? `${baseUrl}` : product.name);

    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Enlace copiado",
        description: "Puedes compartirlo donde quieras.",
      });
    } catch {
      toast({
        title: "No se pudo copiar",
        description: url,
      });
    }
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
        />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="h-4 w-4 text-yellow-400 fill-yellow-400"
        />,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="h-4 w-4 text-yellow-400" />,
      );
    }

    return stars;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Productos sugeridos (Demo)
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Ejemplos de productos que podrían funcionar bien para vender online.
      </p>

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
                  <Badge className="bg-accent-50 text-accent-600">
                    Tendencia
                  </Badge>
                )}
                {product.views && (
                  <span className="text-sm text-gray-500">
                    Vistas: {product.views}
                  </span>
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

              {product.tags?.length > 0 && (
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
                onClick={() => handleShareProduct(product)}
              >
                <Share2Icon className="h-4 w-4 mr-2" />
                Copiar enlace
              </Button>

              {product.amazonUrl && (
                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                >
                  <Button size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver en Amazon
                  </Button>
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
