import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const linkClass = (path: string) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      isActive(path)
        ? "border-primary-500 text-purple-900"
        : "border-transparent text-purple-500 hover:border-gray-300 hover:text-gray-700"
    }`;

  return (
    <nav className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-blue-600">
                Vende<span className="text-purple-600">Con</span>
                <span className="text-green-600">IA</span>
              </a>
            </Link>

            {/* Desktop links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={linkClass("/")}>
                Inicio
              </Link>

              <Link
                href="/product-generator"
                className={linkClass("/product-generator")}
              >
                Productos
              </Link>

              <Link
                href="/content-generator"
                className={linkClass("/content-generator")}
              >
                Contenido
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-green-400 hover:text-purple-600 hover:bg-green-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <a className="block text-purple-700">Inicio</a>
            </Link>

            <Link
              href="/product-generator"
              onClick={() => setIsMenuOpen(false)}
            >
              <a className="block text-green-700">Productos</a>
            </Link>

            <Link
              href="/content-generator"
              onClick={() => setIsMenuOpen(false)}
            >
              <a className="block text-purple-700">Contenido</a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
