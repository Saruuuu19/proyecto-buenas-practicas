interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Hubo un error al cargar los datos.",
  onRetry = () => window.location.reload(),
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <p role="alert" className="text-body-md text-on-surface-variant">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="min-h-11 bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/90 motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Reintentar
      </button>
    </div>
  );
}
