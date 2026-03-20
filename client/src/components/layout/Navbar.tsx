import { Link, useLocation } from "wouter";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/product-generator", label: "Productos" },
  { href: "/content-generator", label: "Contenido" },
];

export default function Navbar() {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between py-4">
          <Link href="/">
            <a className="inline-flex items-center">
              <span className="text-primary-500 text-[2rem] font-extrabold tracking-tight leading-none">
                Vende<span className="text-purple-500">Con</span>
                <span className="text-emerald-500">IA</span>
              </span>
            </a>
          </Link>

          <nav className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`text-base font-medium transition ${
                      active
                        ? "text-slate-900 border-b border-slate-300 pb-1"
                        : "text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
