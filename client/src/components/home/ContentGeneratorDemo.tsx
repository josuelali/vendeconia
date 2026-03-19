import { Link } from "wouter";
import { ArrowRight, Clapperboard, FileText, Sparkles, Wand2 } from "lucide-react";

const contentOutputs = [
  {
    title: "Hook para short o reel",
    text: "Abra la pieza con una promesa clara, una curiosidad o un problema que el producto resuelve.",
  },
  {
    title: "Copy promocional",
    text: "Prepare un texto breve, orientado a clic, con foco en utilidad, beneficio y llamada a la acción.",
  },
  {
    title: "Guion rápido",
    text: "Convierta una ficha de producto en una estructura de vídeo simple y lista para grabar o editar.",
  },
  {
    title: "CTA de monetización",
    text: "Conecte el contenido con Amazon, afiliación o una ruta comercial sin improvisar al final.",
  },
];

const workflow = [
  "Elegir producto o nicho",
  "Definir ángulo comercial",
  "Generar texto o guion",
  "Convertirlo en contenido publicable",
];

export default function ContentGeneratorDemo() {
  return (
    <section className="relative overflow-hidden bg-slate-50 border-y border-slate-200">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_26%)]" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
          {/* COLUMNA IZQUIERDA */}
          <div>
            <p className="inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-600 shadow-sm">
              Contenido asistido
            </p>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Lleve una idea de producto a copy, guion y pieza promocional en minutos
            </h2>

            <p className="mt-5 text-lg text-slate-600 leading-8">
              Esta parte de VendeConIA debe servir para transformar una oportunidad
              detectada en contenido publicable. No solo texto bonito: material útil
              para vender, probar, promocionar o derivar tráfico afiliado.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contentOutputs.map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-2xl border p-5 shadow-sm ${
                    index % 2 === 0
                      ? "border-slate-200 bg-white"
                      : "border-orange-200 bg-orange-50"
                  }`}
                >
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 text-primary-600">
                  <Wand2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Ruta recomendada</p>
                  <p className="text-xs text-slate-500">Producto → contenido → monetización</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {workflow.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4 bg-slate-900">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-sm font-medium text-slate-400">
                  preview.content-generator
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0">
                <div className="p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-white/10">
                  <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 border border-white/10 p-4">
                    <div className="rounded-[26px] overflow-hidden bg-black shadow-2xl mx-auto max-w-[260px]">
                      <img
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
                        alt="Preview visual para contenido promocional"
                        className="h-[420px] w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                    Ejemplo real
                  </p>

                  <h3 className="mt-4 text-2xl font-extrabold leading-tight text-white">
                    Un producto puede pasar de idea a vídeo o copy sin un flujo caótico
                  </h3>

                  <p className="mt-4 text-sm sm:text-base leading-7 text-slate-300">
                    La utilidad real está en ahorrar tiempo: preparar un texto base,
                    un hook, una llamada a la acción y una estructura promocional lista
                    para editar, publicar o derivar a una herramienta visual.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <Clapperboard className="h-5 w-5 text-amber-300" />
                        <p className="text-sm font-semibold text-white">Guion para reel</p>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">
                        Estructura simple para grabar o montar una pieza rápida.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary-300" />
                        <p className="text-sm font-semibold text-white">Texto promocional</p>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">
                        Copy breve orientado a clic, prueba o conversión.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-emerald-300" />
                        <p className="text-sm font-semibold text-white">CTA final</p>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">
                        Conexión natural con afiliación, producto o siguiente paso comercial.
                      </p>
                    </div>
                  </div>

                  <Link href="/content-generator">
                    <a className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-primary-600">
                      Abrir generador de contenido
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                  Uso interno potente
                </p>
                <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                  Muy útil para alimentar GadgetsMania
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-7 text-slate-600">
                  Una ficha de producto puede convertirse rápidamente en resumen,
                  short, guion o copy promocional para artículos de afiliación,
                  redes sociales o vídeos cortos.
                </p>
              </div>

              <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
                  Siguiente integración lógica
                </p>
                <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                  Conectar esta salida con Pictory
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-7 text-slate-700">
                  Cuando el texto y el guion estén bien, el siguiente salto natural es
                  convertir esa base en vídeo, reel o pieza visual usando una herramienta
                  orientada a producción rápida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}