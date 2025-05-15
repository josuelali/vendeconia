import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-primary-500 text-2xl font-heading font-bold">Vende<span className="text-secondary-500">Con</span><span className="text-accent-500">IA</span></span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/">
                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/') ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                  Inicio
                </a>
              </Link>
              <Link href="/product-generator">
                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/product-generator') ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                  Productos
                </a>
              </Link>
              <Link href="/content-generator">
                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive('/content-generator') ? 'border-primary-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                  Contenido
                </a>
              </Link>
              <a href="#pricing" className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700">
                Precios
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="bg-primary-500 px-4 py-2 rounded-lg text-white font-medium hover:bg-primary-600 transition duration-150 ease-in-out">
              Iniciar sesión
            </button>
            <button className="ml-3 bg-white px-4 py-2 rounded-lg text-primary-500 font-medium border border-primary-500 hover:bg-primary-50 transition duration-150 ease-in-out">
              Registrarse
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/">
              <a className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-primary-50 text-primary-500' : 'text-gray-700 hover:bg-gray-50'}`}>
                Inicio
              </a>
            </Link>
            <Link href="/product-generator">
              <a className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/product-generator') ? 'bg-primary-50 text-primary-500' : 'text-gray-700 hover:bg-gray-50'}`}>
                Productos
              </a>
            </Link>
            <Link href="/content-generator">
              <a className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/content-generator') ? 'bg-primary-50 text-primary-500' : 'text-gray-700 hover:bg-gray-50'}`}>
                Contenido
              </a>
            </Link>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
              Precios
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-3">
              <button className="flex-1 bg-primary-500 px-4 py-2 rounded-lg text-white font-medium hover:bg-primary-600 transition duration-150 ease-in-out">
                Iniciar sesión
              </button>
              <button className="flex-1 bg-white px-4 py-2 rounded-lg text-primary-500 font-medium border border-primary-500 hover:bg-primary-50 transition duration-150 ease-in-out">
                Registrarse
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
