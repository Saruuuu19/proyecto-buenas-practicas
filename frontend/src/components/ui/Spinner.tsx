export function Spinner() {
  return (
    <div role="status" className="flex justify-center items-center py-12">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="sr-only">Cargando…</span>
    </div>
  );
}