import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { SearchBar } from "../ui/SearchBar";

const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "Productos", to: "/productos" },
  { label: "Ofertas", to: "/ofertas" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Contacto", to: "/contacto" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-surface/80 backdrop-blur-lg border-b border-outline-variant shadow-sm w-full sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1280px] mx-auto h-16">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-xl font-bold text-primary no-underline tracking-tight"
          >
            TechFlow
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all no-underline ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block w-64 ml-8">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-primary/10 relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
              3
            </span>
          </button>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-primary/10">
            <User className="h-5 w-5" />
          </button>
          <button
            className="md:hidden p-2.5 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-primary/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-outline-variant bg-surface px-4 py-4 space-y-3">
          <SearchBar />
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all no-underline ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
