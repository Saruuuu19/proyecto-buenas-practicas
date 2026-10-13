interface ErrorStateProps {
  message?: string;
}

export function ErrorState({
  message = "Hubo un error al cargar los datos.",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <p className="text-body-md text-on-surface-variant">{message}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="bg-primary text-on-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}