import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AuthUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImageUrl?: string;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const auth = useAuth() as unknown as {
    user?: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  };

  const user = auth.user ?? null;
  const isAuthenticated = auth.isAuthenticated;
  const isLoading = auth.isLoading;

  const showAuthUI = !isLoading && isAuthenticated;
  const isActive = (path: string) => location === path;

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const desktopLinkClass = (path: string) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      isActive(path)
        ? "border-blue-500 text-gray-900"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }`;

  const mobileLinkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive(path)
        ? "bg-blue-50 text-blue-600"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  const initials = (user?.firstName?.trim()?.[0] || "U").toUpperCase();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-blue-600 text-2xl font-bold">
                Vende<span className="text-purple-600">Con</span>
                <span className="text-green-600">IA</span>
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className={desktopLinkClass("/")}>
              Inicio
            </Link>
          </div>

          {/* Right */}
          <div className="hidden sm:flex sm:items-center">
            {showAuthUI ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.profileImageUrl || ""}
                        alt={user?.firstName || ""}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {(user?.firstName || "").trim()}{" "}
                        {(user?.lastName || "").trim()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email || ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Iniciar sesión
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <Link href="/" className={mobileLinkClass("/")}>
            Inicio
          </Link>

          <div className="border-t mt-2 pt-2 px-4">
            {showAuthUI ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full"
              >
                Cerrar sesión
              </Button>
            ) : (
              <Button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Iniciar sesión
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
