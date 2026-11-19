interface ErrorStateProps {
  message?: string;
  /** Acción del botón "Reintentar". Por defecto recarga la página. */
  onRetry?: () => void;
}

export function ErrorState({
  message = "Hubo un error al cargar los datos.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <p className="text-body-md text-on-surface-variant">{message}</p>
      <button
        type="button"
        onClick={onRetry ?? (() => window.location.reload())}
        className="bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}