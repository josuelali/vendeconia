import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
            <div className="sm:text-center lg:text-left px-4 sm:px-8 xl:pl-0">
              {/* H1 SEO */}
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-heading">
                <span className="block">
                  Productos en tendencia para vender online
                </span>
                <span className="block text-primary-500">
                  usando inteligencia artificial
                </span>
              </h1>

              {/* Subtítulo */}
              <p className="mt-4 text-base text-gray-500 sm:text-lg md:text-xl">
                Descubre productos virales, crea contenido para TikTok y Reels
                y monetiza con Amazon sin conocimientos técnicos.
              </p>

              {/* CTA */}
              <div className="mt-6 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                 <a
  href="https://www.fourvenues.com/joshue-cabello-rosa/events/viernes-prohibido-20-02-2026-0PY6"
  target="_blank"
  rel="noopener noreferrer"
  className="w-full flex items-center justify-center rounded-md bg-pink-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-pink-500 transition"
>
  🎟️ Viernes Prohibido · Comprar entradas
</a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Imagen Hero */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/oficina-ia-vendeconia.png"
          alt="Productos en tendencia y creación de contenido con inteligencia artificial"
        />
      </div>
    </div>
  );
}
