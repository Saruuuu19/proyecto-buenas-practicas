import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { ProductCard } from "../components/ui/ProductCard";
import { Search } from "lucide-react";

export function Productos() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filtered = query
    ? products.filter(
        (p) =>
          normalize(p.name).includes(normalize(query)) ||
          normalize(p.category).includes(normalize(query)) ||
          normalize(p.description).includes(normalize(query))
      )
    : products;

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10">
      <div className="mb-8">
        {query ? (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-on-background mb-2">
              Resultados para "{query}"
            </h1>
            <p className="text-on-surface-variant">
              {filtered.length} {filtered.length === 1 ? "producto encontrado" : "productos encontrados"}
            </p>
          </>
        ) : (
          <h1 className="text-2xl md:text-3xl font-bold text-on-background mb-2">
            Todos los Productos
          </h1>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="h-12 w-12 text-on-surface-variant/30 mb-4" />
          <h2 className="text-lg font-semibold text-on-surface mb-2">
            No se encontraron productos
          </h2>
          <p className="text-sm text-on-surface-variant">
            Intenta con otro término de búsqueda
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
