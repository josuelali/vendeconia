export default function ContentGeneratorDemo() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-500 tracking-wide uppercase font-heading">
            Creador de contenido
          </h2>
          <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl font-heading">
            De la idea al reel en minutos
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Crea guiones y vídeos optimizados para vender productos con enlaces de afiliado.
          </p>
        </div>

        <div className="mt-12 lg:flex lg:items-center lg:gap-8">
          {/* REAL VIDEO DEMO */}
          <div className="lg:w-1/2">
            <div className="bg-black rounded-xl overflow-hidden shadow-xl">
              <video
                src="/demo.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>
          </div>

          {/* CONTROLS (DEMO UI) */}
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Editor de contenido (Demo)
            </h3>

            <div className="space-y-6 opacity-90">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Título del vídeo
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  defaultValue="¡ORGANIZADOR QUE NECESITAS YA! 😍"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  defaultValue="Mantén todos tus cables organizados. Oferta limitada 🔥"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Música
                </label>
                <input
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value="Upbeat – Tendencia"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estilo
                </label>
                <input
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value="Zoom"
                  readOnly
                />
              </div>

              {/* CTA REAL */}
              <a
                href="/guias"
                className="block w-full text-center bg-primary-500 text-white py-3 rounded-md font-medium hover:bg-primary-600 transition"
              >
                Ver cómo crear vídeos que venden →
              </a>

              <a
                href="/guias"
                className="block w-full text-center bg-secondary-500 text-white py-3 rounded-md font-medium hover:bg-secondary-600 transition"
              >
                Guías paso a paso y ejemplos reales
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
