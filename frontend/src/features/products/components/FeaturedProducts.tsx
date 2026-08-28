import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Spinner } from "../../../components/ui/Spinner";
import { ErrorState } from "../../../components/ui/ErrorState";

export function FeaturedProducts() {
  const { data, loading, error } = useProducts();
  const featured = data?.slice(0, 6) ?? [];

  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h2 className="text-headline-lg md:text-headline-lg font-semibold text-on-background mb-6">
          Featured Products
        </h2>
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}