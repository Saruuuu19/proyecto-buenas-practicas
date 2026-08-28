import { Link } from "react-router-dom";
import { Cpu, Gem, Shirt, Package } from "lucide-react";
import type { ReactNode } from "react";
import { useCategories } from "../hooks/useCategories";
import { Spinner } from "../../../components/ui/Spinner";
import { ErrorState } from "../../../components/ui/ErrorState";

const iconMap: Record<string, ReactNode> = {
  electronics: <Cpu className="h-8 w-8" />,
  jewelery: <Gem className="h-8 w-8" />,
  "men's clothing": <Shirt className="h-8 w-8" />,
  "women's clothing": <Shirt className="h-8 w-8" />,
};

export function CategoryGrid() {
  const { data: categories, loading, error } = useCategories();

  return (
    <section className="py-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <h2 className="text-headline-lg font-semibold text-on-background mb-6">
          Shop by Category
        </h2>
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories?.map((cat) => (
              <Link
                key={cat}
                to={`/productos?category=${encodeURIComponent(cat)}`}
                aria-label={`Ver productos de ${cat}`}
                className="flex flex-col items-center justify-center gap-3 p-6 bg-surface rounded-xl border border-outline-variant hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer no-underline"
              >
                <div className="text-primary">
                  {iconMap[cat] ?? <Package className="h-8 w-8" />}
                </div>
                <span className="text-body-md font-medium text-on-surface">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}