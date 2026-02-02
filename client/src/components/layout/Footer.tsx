import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Logo */}
          <Link href="/">
            <a className="text-primary-500 text-2xl font-heading font-bold">
              Vende
              <span className="text-secondary-500">Con</span>
              <span className="text-accent-500">IA</span>
            </a>
          </Link>

          {/* Descripción */}
          <p className="text-gray-500 max-w-xl">
            Creando tiendas exitosas con el poder de la inteligencia artificial.
          </p>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} VendeConIA. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
