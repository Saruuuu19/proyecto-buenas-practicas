import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { Spinner } from "../../../components/ui/Spinner";
import { ErrorState } from "../../../components/ui/ErrorState";
import { normalize } from "../../../lib/utils";

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const search = normalize(searchParams.get("search") ?? "");
  const category = normalize(searchParams.get("category") ?? "");
  const { data: products, loading, error } = useProducts();

  const filtered = (products ?? []).filter((product) => {
    const matchesCategory =
      !category || normalize(product.category) === category;
    const matchesSearch =
      !search ||
      normalize(product.title).includes(search) ||
      normalize(product.category).includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h2 className="text-headline-lg font-semibold text-on-background mb-6">
          Productos
        </h2>
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState message={error} />
        ) : filtered.length === 0 ? (
          <p className="text-body-md text-on-surface-variant">
            No se encontraron productos para tu búsqueda.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}