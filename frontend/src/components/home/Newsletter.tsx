import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-on-background mb-2">
              No te pierdas ninguna oferta
            </h2>
            <p className="text-sm text-on-surface-variant">
              Suscríbete y recibe descuentos exclusivos, novedades y ofertas flash directo en tu correo.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              required
              className="flex-1 md:w-64 bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all flex items-center gap-2 shrink-0"
            >
              {subscribed ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  ¡Suscrito!
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
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
