import { useState } from "react";
import type { FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  }

  return (
    <section
      aria-label="Suscripción al boletín"
      className="bg-surface-container-low border-t border-outline-variant"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-headline-md md:text-headline-lg font-bold text-on-background mb-2">
              No te pierdas ninguna oferta
            </h2>
            <p className="text-body-sm text-on-surface-variant">
              Suscríbete y recibe descuentos exclusivos, novedades y ofertas
              flash directo en tu correo.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              required
              className="flex-1 md:w-64 bg-surface border border-outline-variant rounded-xl px-4 py-3 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-body-sm hover:bg-primary/90 transition-all flex items-center gap-2 shrink-0"
            >
              {subscribed ? (
                <>
                  <CheckCircle className="size-4" />
                  ¡Suscrito!
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Suscribir
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}