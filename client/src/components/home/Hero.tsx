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
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-heading">
                <span className="block">Crea tu tienda viral</span>
                <span className="block text-primary-500">
                  con inteligencia artificial
                </span>
              </h1>

              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Genera ideas de negocio, encuentra productos ganadores y crea
                contenido promocional en minutos. Todo impulsado por IA avanzada.
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                {/* BOTÓN PRINCIPAL */}
                <div className="rounded-md shadow">
                  <Link href="/product-generator">
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-10">
                      Empezar ahora <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Link>
                </div>

                {/* BOTÓN AMAZON OPTIMIZADO */}
                <div className="flex flex-col items-start">
                  <a
                    href="https://amzn.to/4rmMNkU"
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="w-full sm:w-auto flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
                  >
                    Ver gadget tecnológico viral en Amazon
                  </a>
                  <p className="mt-1 text-sm text-gray-500">
                    ⭐ Más de 4,5/5 en valoraciones · Envío rápido
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGEN HERO */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/oficina-ia-vendeconia.png"
          alt="Equipo trabajando con inteligencia artificial en oficina"
        />
      </div>
    </div>
  );
}
