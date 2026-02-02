import { FormEvent } from "react";
import { Copy, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleCopyScript = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const url =
      selectedProduct?.affiliateUrl ||
      "https://vendeconia.org/guias";

    const script = `
🎬 GUION PARA REEL / TIKTOK

Producto: ${selectedProduct.name}

Título:
${contentData.title}

Descripción:
${contentData.description}

Música:
${contentData.music}

Animación:
${contentData.animation}

CTA:
${contentData.cta}

🔗 LINK:
${url}
    `.trim();

    navigator.clipboard.writeText(script);
    toast({
      title: "Guion copiado",
      description: "Incluye CTA y enlace listo para monetizar.",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Editor de contenido
      </h3>

      <form onSubmit={handleCopyScript} className="space-y-6">
        <div>
          <Label className="mb-2 block">Producto</Label>
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

        <div>
          <Label>Título</Label>
          <Input
            value={contentData.title}
            onChange={(e) => onContentChange({ title: e.target.value })}
            maxLength={60}
          />
        </div>

        <div>
          <Label>Descripción</Label>
          <Textarea
            rows={3}
            value={contentData.description}
            onChange={(e) => onContentChange({ description: e.target.value })}
            maxLength={200}
          />
        </div>

        <div>
          <Label>Música</Label>
          <Select
            value={contentData.music}
            onValueChange={(value) => onContentChange({ music: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona música" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Upbeat tendencia">Upbeat tendencia</SelectItem>
              <SelectItem value="Electrónica">Electrónica</SelectItem>
              <SelectItem value="Pop">Pop</SelectItem>
              <SelectItem value="Corporativa">Corporativa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Animación</Label>
          <Select
            value={contentData.animation}
            onValueChange={(value) => onContentChange({ animation: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona animación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Zoom">Zoom</SelectItem>
              <SelectItem value="Deslizar">Deslizar</SelectItem>
              <SelectItem value="Rebote">Rebote</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>CTA</Label>
          <Select
            value={contentData.cta}
            onValueChange={(value) => onContentChange({ cta: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona CTA" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Comprar ahora">Comprar ahora</SelectItem>
              <SelectItem value="Oferta limitada">Oferta limitada</SelectItem>
              <SelectItem value="Lo quiero">Lo quiero</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600"
          disabled={!selectedProduct}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copiar guion monetizable
        </Button>
      </form>
    </div>
  );
}
