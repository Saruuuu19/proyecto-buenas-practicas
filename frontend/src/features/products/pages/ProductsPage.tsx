import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { ProductForm } from "../components/ProductForm";
import { Spinner } from "../../../components/ui/Spinner";
import { ErrorState } from "../../../components/ui/ErrorState";
import { filterProducts } from "../../../lib/filterProducts";
import { useAuth } from "../../auth/hooks/useAuth";

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const { data: products, loading, error, reload } = useProducts();
  const { user, isAuthenticated, logout } = useAuth();

  const filtered = filterProducts(products ?? [], search, category);

  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h2 className="text-headline-lg font-semibold text-on-background mb-6">
          Productos
        </h2>
        {isAuthenticated && (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-2">
              <p className="text-body-sm text-on-surface-variant">
                Sesión activa:{" "}
                <span className="font-semibold text-on-surface">{user}</span>
              </p>
              <button
                type="button"
                onClick={logout}
                className="text-body-sm font-semibold text-primary hover:underline"
              >
                Cerrar sesión
              </button>
            </div>
            <ProductForm onCreated={() => void reload()} />
          </>
        )}
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