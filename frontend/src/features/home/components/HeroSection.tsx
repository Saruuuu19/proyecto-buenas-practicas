import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../lib/utils";
import {
  ArrowRight,
  Cpu,
  Headphones,
  Laptop,
  Star,
  Users,
  Package,
} from "lucide-react";

const heroStats = [
  { icon: Star, label: "4.9/5 en reseñas" },
  { icon: Users, label: "+10k clientes" },
  { icon: Package, label: "Envío rápido" },
];

const heroIcons = [
  { label: "Computadora", icon: Laptop, size: "w-20 h-20", iconSize: "h-8 w-8" },
  { label: "Audífonos", icon: Headphones, size: "w-24 h-24", iconSize: "h-10 w-10" },
  { label: "Chip", icon: Cpu, size: "w-20 h-20", iconSize: "h-8 w-8" },
];

// Easing suave (aceleración y desaceleración graduales) para un movimiento premium.
const cardTransition =
  "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Posición de cada tarjeta según cuál esté activa:
 * - la activa avanza hacia el centro del grupo y se eleva;
 * - las demás ceden el centro (se corren apenas y se reducen);
 * - sin activa, todas vuelven a su posición original.
 */
function cardTransform(index: number, activeIndex: number | null): string {
  const baseY = index === 1 ? "-translate-y-4" : ""; // el centro va elevado por defecto
  if (activeIndex === null) return baseY;
  if (activeIndex === index) {
    if (index === 1) return "-translate-y-7 scale-110";
    return `${index === 0 ? "translate-x-4" : "-translate-x-4"} -translate-y-6 scale-110`;
  }
  const drift = index > activeIndex ? "translate-x-1" : "-translate-x-1";
  return `${drift} ${baseY} scale-95`;
}

export function HeroSection() {
  const [active, setActive] = useState<number | null>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  // En táctiles no hay "salir el cursor": al tocar fuera del grupo se restablece.
  useEffect(() => {
    if (active === null) return;
    function handlePointerDown(event: PointerEvent) {
      if (
        groupRef.current &&
        !groupRef.current.contains(event.target as Node)
      ) {
        setActive(null);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [active]);

  // Pequeño círculo de luz que sigue exactamente la posición del cursor.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    function onMove(event: PointerEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Guardar coordenadas relativas al hero (0 al izquierdo, ancho al derecho)
      // Usamos Math.max(0, ...) para asegurar que nunca sean negativas
      targetRef.current.x = Math.max(0, event.clientX - rect.left);
      targetRef.current.y = Math.max(0, event.clientY - rect.top);
      setSpotlight((s) => ({ ...s, visible: true }));
    }

    function onLeave() {
      if (!el) return;
      setSpotlight((s) => ({ ...s, visible: false }));
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    // requestAnimationFrame: interpola suavemente la posición del círculo.
    function loop() {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.25;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.25;
      const currentEl = heroRef.current;
      if (currentEl) {
        // Posicionar el círculo: las custom properties son relativas al hero (en px)
        // Usamos translate para centrar el círculo de 24px en la coordenada guardada.
        currentEl.style.setProperty("--spotlight-x", `${currentRef.current.x}px`);
        currentEl.style.setProperty("--spotlight-y", `${currentRef.current.y}px`);
      }
      frameRef.current = requestAnimationFrame(loop);
    }
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-linear-to-br from-[#0a1628] via-[#0d2847] to-primary overflow-hidden min-h-105 flex items-center"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-125 h-125 bg-blue-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-400/10 rounded-full blur-[100px]" />
      </div>

      {/* Pequeño círculo de luz que sigue el cursor (24px de diámetro). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full w-6 h-6 bg-primary/30 shadow-[0_0_12px_rgba(96,165,250,0.6)] opacity-75 transition-opacity duration-400"
        style={{ left: `${spotlight.x}px`, top: `${spotlight.y}px`, opacity: spotlight.visible ? 1 : 0, transition: "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1)" }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-10 py-14 md:py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
            La tecnología que necesitas, aquí
          </h1>
          <div className="flex items-center gap-3 mb-8">
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 hover:shadow-lg hover:shadow-white/10 transition-all no-underline"
            >
              Explorar Productos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-xl border border-white/15 hover:bg-white/20 transition-all no-underline"
            >
              Ver Categorías
            </Link>
          </div>

          <ul className="flex flex-wrap items-center gap-6 text-white/50 text-body-sm">
            {heroStats.map((stat) => (
              <li key={stat.label} className="flex items-center gap-2">
                <stat.icon className="size-4 text-amber-400" />
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={groupRef}
          className="relative hidden md:flex items-center gap-4"
          onPointerLeave={(event) => {
            // Solo el ratón restablece al salir del grupo; en táctiles se limpia al tocar afuera.
            if (event.pointerType === "mouse") setActive(null);
          }}
        >
          {heroIcons.map((item, index) => {
            const isActive = active === index;
            const isSecondary = active !== null && !isActive;
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                onPointerEnter={() => setActive(index)}
                className={`relative ${cardTransition} ${cardTransform(index, active)} ${isActive ? "z-10" : ""}`}
              >
                {/* Luz ambiental azul detrás de la tarjeta activa */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.85),rgba(59,130,246,0.3)_55%,transparent_75%)] blur-xl transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                />
                <div
                  className={`relative flex items-center justify-center rounded-2xl border backdrop-blur-md ${item.size} ${cardTransition} ${
                    isActive
                      ? "border-blue-400/70 bg-white/15 shadow-[0_0_24px_rgba(59,130,246,0.55),0_0_64px_rgba(37,99,235,0.4)]"
                      : "border-white/10 bg-white/10"
                  } ${isSecondary ? "opacity-70" : ""}`}
                >
                  <Icon
                    className={`${item.iconSize} transition-colors duration-500 ${isActive ? "text-white" : "text-white/70"}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}