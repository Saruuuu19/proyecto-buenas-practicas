import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="py-24 flex flex-col items-center justify-center text-center px-4">
      <p className="text-headline-lg font-semibold text-on-background mb-2">
        404
      </p>
      <p className="text-body-md text-on-surface-variant mb-6">
        La página que buscas no existe.
      </p>
      <Link
        to="/"
        className="bg-primary text-on-primary font-semibold px-6 py-3 rounded-xl no-underline hover:bg-primary/90 transition-colors"
      >
        Volver al inicio
      </Link>
    </section>
  );
}