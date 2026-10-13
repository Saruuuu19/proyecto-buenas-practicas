import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Zap } from "lucide-react";
import { SearchBar } from "../components/ui/SearchBar";

const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "Productos", to: "/productos" },
];

const iconButtonClass =
  "relative size-11 inline-flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="bg-surface border-b border-outline-variant sticky top-0 z-50"
    >
      <div className="flex items-center gap-3 md:gap-4 w-full max-w-[1280px] mx-auto px-4 md:px-10 h-16">
        <Link
          to="/"
          aria-label="TechFlow - Inicio"
          className="flex items-center gap-2.5 shrink-0 no-underline"
        >
          <span className="size-9 rounded-xl bg-primary text-on-primary grid place-items-center shrink-0">
            <Zap className="h-5 w-5" />
          </span>
          <span className="text-headline-md font-bold text-primary leading-none">
            TechFlow
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="hidden md:flex items-center gap-1 flex-1 justify-center min-w-0 px-2"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-4 py-2 text-body-sm font-medium whitespace-nowrap no-underline transition-colors cursor-pointer after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-0.5 after:h-0.5 after:w-6 after:rounded-full after:bg-primary after:transition-opacity ${
                  isActive
                    ? "text-primary after:opacity-100"
                    : "text-on-surface-variant hover:text-primary after:opacity-0"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block w-56 xl:w-64 shrink-0">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1 md:gap-1.5 shrink-0">
          <button type="button" aria-label="Carrito" className={iconButtonClass}>
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Mi cuenta" className={iconButtonClass}>
            <User className="h-5 w-5" />
          </button>
          <button
            type="button"
            ref={toggleRef}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={`${iconButtonClass} md:hidden`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`md:hidden border-t border-outline-variant bg-surface transition-all duration-200 ease-out motion-reduce:transition-none ${
          mobileOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-2 opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          <SearchBar />
          <nav aria-label="Principal" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center rounded-lg px-4 py-3 text-body-md font-medium no-underline transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary-container/40 text-primary"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
