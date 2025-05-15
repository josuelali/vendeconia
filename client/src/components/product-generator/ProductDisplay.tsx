import { useState } from "react";
import { Star, StarHalf, DownloadIcon, Share2Icon, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ProductDisplayProps {
  products: Product[];
}

export default function ProductDisplay({ products }: ProductDisplayProps) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const { toast } = useToast();
  
  const saveProductMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("POST", `/api/products/${productId}/save`, {});
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Producto guardado",
        description: "El producto ha sido guardado en tu lista.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error al guardar",
        description: error.message || "No se pudo guardar el producto. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  });
  
  const handleSaveProduct = (productId: number) => {
    setSelectedProductId(productId);
    saveProductMutation.mutate(productId);
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-yellow-400" />);
    }
    
    return stars;
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos sugeridos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                {product.trending && <Badge variant="outline" className="bg-accent-50 text-accent-500 hover:bg-accent-50">Tendencia</Badge>}
                {product.views && <span className="text-sm text-gray-500">Vistas: {product.views}</span>}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-secondary-500">{product.price}</span>
                {product.rating && (
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                )}
              </div>
              
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-50">
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
                onClick={() => handleSaveProduct(product.id)}
                disabled={saveProductMutation.isPending && selectedProductId === product.id}
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-accent-600 border-accent-200 hover:bg-accent-50"
                >
                  <Share2Icon className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
                
                <Button size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Añadir
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
