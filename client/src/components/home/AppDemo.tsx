import {
  CheckIcon,
  HomeIcon,
  CompassIcon,
  ShoppingBagIcon,
  FilmIcon,
  StoreIcon,
  SettingsIcon,
  ArrowRight,
  PanelLeft,
} from "lucide-react";

const featureList = [
  {
    title: "Exploración guiada",
    text: "Detecte nichos, categorías y productos con una interfaz más ordenada y accionable.",
  },
  {
    title: "Validación rápida",
    text: "Revise ideas de producto con más contexto antes de pasar a contenido o monetización.",
  },
  {
    title: "Editor conectado",
    text: "Lleve una idea detectada al siguiente módulo sin romper el flujo de trabajo.",
  },
  {
    title: "Vista previa útil",
    text: "Entienda mejor cómo puede verse una salida antes de publicarla o reutilizarla.",
  },
];

export default function AppDemo() {
  return (
    <section className="relative overflow-hidden bg-slate-50 border-y border-slate-200">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08),transparent_24%)]" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
          {/* BLOQUE IZQUIERDO */}
          <div>
            <p className="inline-flex items-center rounded-full border border-primary-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-600 shadow-sm">
              Vista del producto
            </p>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Una interfaz más clara para convertir ideas en acciones reales
            </h2>

            <p className="mt-5 text-lg text-slate-600 leading-8">
              Esta parte de VendeConIA no debe parecer solo una maqueta bonita.
              Debe transmitir que la herramienta organiza mejor el flujo: detectar,
              validar, crear y avanzar con menos fricción.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureList.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 text-primary-600">
                  <PanelLeft className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Qué debe transmitir esta sección
                  </p>
                  <p className="text-xs text-slate-500">
                    Menos demo vacía, más sensación de sistema
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                <li className="flex items-start">
                  <CheckIcon className="mt-0.5 h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <p className="ml-3 text-sm leading-7 text-slate-600">
                    Flujo simple para detectar productos y categorías.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="mt-0.5 h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <p className="ml-3 text-sm leading-7 text-slate-600">
                    Interfaz más clara para pasar de producto a contenido.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="mt-0.5 h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <p className="ml-3 text-sm leading-7 text-slate-600">
                    Mejor encaje visual con afiliación, ecommerce y publicaciones.
                  </p>
                </li>
              </ul>

              <a
                href="/product-generator"
                className="mt-6 inline-flex items-center text-sm font-bold text-primary-600 hover:text-primary-700"
              >
                Ver flujo completo del generador
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* BLOQUE DERECHO */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-primary-500/15 to-orange-400/15 blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
              <div className="bg-slate-900 py-4 px-5 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 flex-1 flex justify-center">
                  <div className="rounded-md bg-white/10 px-3 py-1 text-sm text-slate-300">
                    vendeconia.app/dashboard
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 min-h-[500px]">
                {/* sidebar */}
                <div className="col-span-1 border-r border-slate-200 bg-slate-50 p-4">
                  <div className="mb-6 flex items-center">
                    <span className="text-primary-500 text-lg font-bold">
                      Vende<span className="text-purple-500">Con</span>
                      <span className="text-emerald-500">IA</span>
                    </span>
                  </div>

                  <nav className="space-y-2">
                    <a
                      href="#"
                      className="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-100"
                    >
                      <HomeIcon className="mr-3 h-4 w-4 text-primary-500" />
                      Inicio
                    </a>

                    <a
                      href="#"
                      className="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white"
                    >
                      <CompassIcon className="mr-3 h-4 w-4 text-slate-400" />
                      Nichos
                    </a>

                    <a
                      href="#"
                      className="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white"
                    >
                      <ShoppingBagIcon className="mr-3 h-4 w-4 text-slate-400" />
                      Productos
                    </a>

                    <a
                      href="#"
                      className="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white"
                    >
                      <FilmIcon className="mr-3 h-4 w-4 text-slate-400" />
                      Contenido
                    </a>

                    <a
                      href="#"
                      className="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white"
                    >
                      <StoreIcon className="mr-3 h-4 w-4 text-slate-400" />
                      Tienda
                    </a>

                    <a
                      href="#"
                      className="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white"
                    >
                      <SettingsIcon className="mr-3 h-4 w-4 text-slate-400" />
                      Ajustes
                    </a>
                  </nav>
                </div>

                {/* contenido */}
                <div className="col-span-4 p-6 bg-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                        Panel principal
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold text-slate-900">
                        ¿Qué le interesa vender?
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        Seleccione una categoría y construya una base útil para
                        producto, contenido o monetización.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Estado
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        Demo activa
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <button className="rounded-2xl border-2 border-primary-500 bg-primary-50 p-4 flex flex-col items-center justify-center transition hover:bg-primary-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-slate-900">
                        Ropa y Moda
                      </span>
                    </button>

                    <button className="rounded-2xl border-2 border-slate-200 bg-white p-4 flex flex-col items-center justify-center transition hover:bg-slate-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-slate-900">
                        Hogar y Decoración
                      </span>
                    </button>

                    <button className="rounded-2xl border-2 border-slate-200 bg-white p-4 flex flex-col items-center justify-center transition hover:bg-slate-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                        <line x1="12" y1="18" x2="12.01" y2="18"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-slate-900">
                        Tecnología
                      </span>
                    </button>

                    <button className="rounded-2xl border-2 border-slate-200 bg-white p-4 flex flex-col items-center justify-center transition hover:bg-slate-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2"/>
                        <path d="M6 12h4"/>
                        <path d="M14 12h4"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-slate-900">
                        Videojuegos
                      </span>
                    </button>

                    <button className="rounded-2xl border-2 border-slate-200 bg-white p-4 flex flex-col items-center justify-center transition hover:bg-slate-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-slate-900">
                        Salud y Bienestar
                      </span>
                    </button>

                    <button className="rounded-2xl border-2 border-slate-200 bg-white p-4 flex flex-col items-center justify-center transition hover:bg-slate-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="16"/>
                        <line x1="8" y1="12" x2="16" y2="12"/>
                      </svg>
                      <span className="mt-2 text-sm font-medium text-slate-900">
                        Más categorías
                      </span>
                    </button>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Preferencias simuladas
                    </h4>

                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span>Rango de precio</span>
                          <span>Precio medio</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          defaultValue="3"
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          id="trend-checkbox-demo"
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-400"
                        />
                        <label
                          htmlFor="trend-checkbox-demo"
                          className="ml-2 block text-sm text-slate-600"
                        >
                          Simular productos en tendencia
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="shipping-checkbox-demo"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-400"
                        />
                        <label
                          htmlFor="shipping-checkbox-demo"
                          className="ml-2 block text-sm text-slate-600"
                        >
                          Simular envío rápido
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between gap-4">
                    <button className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Cancelar
                    </button>

                    <button className="inline-flex items-center rounded-xl bg-primary-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary-700">
                      Generar sugerencias
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Esta vista puede evolucionar a dashboard real
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Detectar producto, validar enfoque y derivarlo a contenido o
                afiliación desde una sola interfaz ya es una dirección útil para
                VendeConIA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}