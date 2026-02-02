import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Marca */}
          <div>
            <Link href="/">
              <a className="text-2xl font-bold text-blue-600">
                Vende<span className="text-purple-600">Con</span>
                <span className="text-green-600">IA</span>
              </a>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Plataforma demo para descubrir productos en tendencia y crear
              contenido viral con ayuda de la inteligencia artificial.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Navegación
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/">
                  <a className="text-sm text-gray-600 hover:text-gray-900">
                    Inicio
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/product-generator">
                  <a className="text-sm text-gray-600 hover:text-gray-900">
                    Productos
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/content-generator">
                  <a className="text-sm text-gray-600 hover:text-gray-900">
                    Contenido
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/privacidad"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Política de cookies
                </a>
              </li>
              <li>
                <a
                  href="/terminos"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer + copyright */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-500">
            Este sitio contiene enlaces de afiliado. Como Afiliado de Amazon,
            VendeConIA puede obtener ingresos por compras adscritas.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            © {new Date().getFullYear()} VendeConIA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
