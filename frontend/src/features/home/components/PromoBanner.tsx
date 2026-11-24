import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export function PromoBanner() {
  return (
    <section
      aria-label="Ofertas de temporada"
      className="max-w-[1280px] mx-auto px-4 md:px-10 py-8"
    >
      <div className="relative bg-gradient-to-r from-primary via-primary-container to-primary rounded-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-[60px]" />
        </div>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Zap className="size-7 text-white" />
            </div>
            <div>
              <h3 className="text-headline-md md:text-headline-lg font-bold text-white">
                Ofertas de temporada
              </h3>
              <p className="text-white/70 text-body-sm md:text-body-md">
                Hasta{" "}
                <span className="font-bold text-white">40% de descuento</span>{" "}
                en productos seleccionados
              </p>
            </div>
          </div>
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all no-underline shrink-0"
          >
            Ver ofertas
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}