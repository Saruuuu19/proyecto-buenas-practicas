import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Headphones, Laptop } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-primary overflow-hidden min-h-[420px] flex items-center">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[1280px] mx-auto px-4 md:px-10 py-14 md:py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
            La tecnología que necesitas, aquí
          </h1>
          <div className="flex items-center gap-3">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 hover:shadow-lg hover:shadow-white/10 transition-all no-underline"
            >
              Explorar Productos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/categorias"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-xl border border-white/15 hover:bg-white/20 transition-all no-underline"
            >
              Ver Categorías
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <Laptop className="h-8 w-8 text-white/70" />
          </div>
          <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center -translate-y-4">
            <Headphones className="h-10 w-10 text-white/70" />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <Cpu className="h-8 w-8 text-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
