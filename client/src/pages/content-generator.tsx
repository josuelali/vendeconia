export default function ContentGeneratorDemo() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TITULO */}
        <div className="text-center mb-14">
          <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wide">
            Creador de contenido
          </h2>
          <h3 className="mt-2 text-4xl font-extrabold text-gray-900">
            De la idea al reel en minutos
          </h3>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Incluso si empiezas desde cero, puedes crear vídeos que venden
            productos con enlaces de afiliado en cuestión de minutos.
          </p>
        </div>

        {/* CONTENIDO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* VIDEO REAL */}
          <div className="rounded-xl overflow-hidden shadow-xl">
            <video
              src="/demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXTO */}
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              Un ejemplo real, hecho en minutos
            </h4>

            <p className="text-lg text-gray-600 mb-6">
              Este vídeo es un ejemplo real creado por mí para demostrar que no
              necesitas experiencia previa ni herramientas complejas.
            </p>

            <p className="text-lg text-gray-600 mb-8">
              Con una buena idea, un guion claro y el enfoque correcto, puedes
              empezar hoy mismo a crear contenido que atrae visitas y genera
              ingresos.
            </p>

            <a
              href="/guias"
              className="inline-block bg-primary-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-600 transition"
            >
              Ver cómo hacerlo paso a paso →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
