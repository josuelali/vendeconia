import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContentEditor from "@/components/content-generator/ContentEditor";
import VideoPreview from "@/components/content-generator/VideoPreview";
import { Product } from "@shared/schema";

/**
 * DEMO FRONTEND-ONLY
 * Sin backend, sin APIs, sin generación real.
 * Todo orientado a preview + monetización.
 */

type ContentData = {
  title: string;
  description: string;
  music: string;
  animation: string;
  cta: string;
};

const initialContent: ContentData = {
  title: "¡PRODUCTO INCREÍBLE QUE NECESITAS YA! 😍",
  description:
    "Este producto cambiará tu vida cotidiana. ¡No podrás creer su calidad y precio!",
  music: "Upbeat – Tendencia",
  animation: "Zoom",
  cta: "Comprar ahora",
};

// MOCK DE PRODUCTOS (frontend-only)
const demoProducts: Product[] = [
  {
    id: 1,
    name: "Organizador de cables premium",
    imageUrl:
      "https://images.unsplash.com/photo-1585386959984-a41552262b45?auto=format&fit=crop&w=600&h=900",
    affiliateUrl: "https://amzn.to/TU_ENLACE",
  },
];

export default function ContentGenerator() {
  const [products] = useState<Product[]>(demoProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    demoProducts[0]
  );
  const [contentData, setContentData] =
    useState<ContentData>(initialContent);

  useEffect(() => {
    document.title = "Generador de Contenido | VendeConIA";
  }, []);

  const handleContentChange = (newContent: Partial<ContentData>) => {
    setContentData((prev) => ({ ...prev, ...newContent }));
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-heading">
            Generador de Contenido
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Crea guiones y vistas previas para vender productos con afiliados.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <VideoPreview
            product={selectedProduct}
            contentData={contentData}
          />

          <ContentEditor
            products={products}
            selectedProduct={selectedProduct}
            onProductSelect={setSelectedProduct}
            contentData={contentData}
            onContentChange={handleContentChange}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
