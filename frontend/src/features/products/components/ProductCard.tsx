import { ShoppingCart } from "lucide-react";
import type { Product } from "../../../types";
import { formatPrice } from "../../../lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card bg-surface rounded-xl overflow-hidden flex flex-col h-full group">
      <div className="relative aspect-4/5 bg-surface-container-low p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col grow">
        <span className="font-label-md text-xs text-on-surface-variant mb-1">
          {product.category}
        </span>
        <h3 className="text-headline-md text-on-surface mb-1">
          {product.title}
        </h3>
        <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4 grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-headline-md text-on-background">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
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
