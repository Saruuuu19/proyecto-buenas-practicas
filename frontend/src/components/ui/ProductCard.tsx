import { ShoppingCart } from "lucide-react";
import type { Product } from "../../data/products";

interface ProductCardProps {
  product: Product;
}

const badgeStyles: Record<string, string> = {
  New: "bg-tertiary-container text-on-tertiary",
  Bestseller: "bg-secondary-container text-on-secondary-container",
  "In Stock": "bg-tertiary-container text-on-tertiary",
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card bg-surface rounded-xl overflow-hidden flex flex-col h-full group">
      <div className="relative aspect-[4/5] bg-surface-container-low p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span
            className={`absolute top-4 left-4 font-label-md text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="font-label-md text-xs text-on-surface-variant mb-1">
          {product.category}
        </span>
        <h3 className="text-headline-md text-on-surface mb-1">
          {product.name}
        </h3>
        <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-headline-md text-on-background">
            ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <button
            aria-label="Add to cart"
            className="btn-primary bg-primary text-on-primary p-2 rounded-lg flex items-center justify-center"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
