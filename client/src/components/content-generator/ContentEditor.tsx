import { FormEvent } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";

type ContentData = {
  title: string;
  description: string;
  music: string;
  animation: string;
  cta: string;
};

interface ContentEditorProps {
  products: Product[];
  selectedProduct: Product | null;
  onProductSelect: (product: Product) => void;
  contentData: ContentData;
  onContentChange: (data: Partial<ContentData>) => void;
}

export default function ContentEditor({
  products,
  selectedProduct,
  onProductSelect,
  contentData,
  onContentChange
}: ContentEditorProps) {

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Editor de contenido (Demo)
      </h3>

      <p className="text-sm text-gray-500 mb-6">
        Ejemplo de cómo se vería un contenido generado con inteligencia artificial.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Selection */}
        <div>
          <Label className="mb-2 block">Selecciona un producto</Label>
          <Select
            value={selectedProduct?.id?.toString() || ""}
            onValueChange={(value) => {
              const product = products.find(p => p.id.toString() === value);
              if (product) onProductSelect(product);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un producto" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id.toString()}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <div>
          <Label className="mb-2 block">Título del video</Label>
          <Input
            value={contentData.title}
            onChange={(e) => onContentChange({ title: e.target.value })}
            placeholder="🔥 El gadget que está arrasando en TikTok"
            maxLength={60}
          />
        </div>

        {/* Description */}
        <div>
          <Label className="mb-2 block">Descripción</Label>
          <Textarea
            rows={3}
            value={contentData.description}
            onChange={(e) => onContentChange({ description: e.target.value })}
            placeholder="Descubre por qué todo el mundo lo quiere. Envío rápido y oferta limitada."
            maxLength={200}
          />
        </div>

        {/* Music */}
        <div>
          <Label className="mb-2 block">Música de fondo</Label>
          <Select
            value={contentData.music}
            onValueChange={(value) => onContentChange({ music: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un estilo de música" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tendencia - Upbeat">Tendencia - Upbeat</SelectItem>
              <SelectItem value="Electrónica">Electrónica</SelectItem>
              <SelectItem value="Pop">Pop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Animation */}
        <div>
          <Label className="mb-2 block">Estilo de animación</Label>
          <div className="grid grid-cols-3 gap-3">
            {["Zoom", "Deslizar", "Rebote"].map((style) => (
              <Button
                key={style}
                type="button"
                variant={contentData.animation === style ? "secondary" : "outline"}
                onClick={() => onContentChange({ animation: style })}
              >
                {style}
              </Button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div>
          <Label className="mb-2 block">Llamada a la acción</Label>
          <Select
            value={contentData.cta}
            onValueChange={(value) => onContentChange({ cta: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una llamada a la acción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Comprar ahora">Comprar ahora</SelectItem>
              <SelectItem value="Ver más">Ver más</SelectItem>
              <SelectItem value="Oferta limitada">Oferta limitada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Demo Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={!selectedProduct}
            className="w-full bg-gray-300 cursor-not-allowed"
          >
            Ver ejemplo de contenido
          </Button>
        </div>
      </form>
    </div>
  );
}
