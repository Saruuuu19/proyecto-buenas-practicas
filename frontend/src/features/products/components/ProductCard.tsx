import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Product } from "../../../types";
import { formatPrice } from "../../../lib/utils";
import { AddToCartButton } from "../../cart/components/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const { search } = useLocation();

  return (
    <div className="product-card bg-surface rounded-xl overflow-hidden flex flex-col h-full group motion-safe:transition-[border-color,box-shadow]">
      <div className="relative aspect-4/5 bg-surface-container-low p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full rounded-xl motion-safe:group-hover:scale-105 motion-safe:transition-transform duration-500"
        />

        <button
          type="button"
          aria-label="Favorito"
          aria-pressed={wishlisted}
          onClick={() => setWishlisted((w) => !w)}
          className={`absolute top-3 right-3 size-11 rounded-full flex items-center justify-center cursor-pointer motion-safe:transition-colors shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            wishlisted
              ? "bg-error text-on-error"
              : "bg-surface-container-lowest text-on-surface-variant hover:bg-error-container hover:text-on-error-container"
          }`}
        >
          <Heart aria-hidden="true" className={`size-4 ${wishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-4 flex flex-col grow">
        <span className="font-label-md text-xs text-on-surface-variant mb-1">
          {product.category}
        </span>
        <h3 className="text-headline-md mb-1 min-w-0 wrap-break-word">
          <Link
            to={{ pathname: `/productos/${product.id}`, search }}
            className="inline-flex items-center min-h-11 rounded-sm text-primary underline underline-offset-4 hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {product.title}
          </Link>
        </h3>

        <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4 grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-headline-md text-on-background">
            {formatPrice(product.price)}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
