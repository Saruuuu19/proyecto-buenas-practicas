import { useState } from "react";
import { ShoppingCart, Star, Heart, Eye } from "lucide-react";
import type { Product, ProductBadge } from "../../../types";
import { formatPrice } from "../../../lib/utils";

interface ProductCardProps {
  product: Product;
}

const badgeStyles: Record<ProductBadge, string> = {
  Nuevo: "bg-blue-500 text-white",
  "Más vendido": "bg-amber-500 text-white",
  Disponible: "bg-emerald-500 text-white",
  Oferta: "bg-red-500 text-white",
};

function RatingStars({ product }: { product: Product }) {
  if (product.rating === undefined) return null;

  const filled = Math.floor(product.rating);

  return (
    <div className="flex items-center gap-1 mb-2">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`size-3.5 ${
            i < filled ? "text-amber-400 fill-amber-400" : "text-gray-300"
          }`}
        />
      ))}
      {product.reviews !== undefined && (
        <span className="text-xs text-on-surface-variant ml-1">
          ({product.reviews})
        </span>
      )}
    </div>
  );
}

function DiscountBadge({ product }: { product: Product }) {
  if (!product.originalPrice) return null;

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <span className="absolute top-3 right-3 text-[10px] font-bold bg-red-500 text-white px-2 py-1 rounded-full">
      -{discount}%
    </span>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="product-card bg-surface rounded-xl overflow-hidden flex flex-col h-full group">
      <div className="relative aspect-4/5 bg-surface-container-low p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
              badgeStyles[product.badge]
            }`}
          >
            {product.badge}
          </span>
        )}

        <DiscountBadge product={product} />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            type="button"
            aria-label={wishlisted ? "Quitar de favoritos" : "Agregar a favoritos"}
            aria-pressed={wishlisted}
            onClick={() => setWishlisted((w) => !w)}
            className={`size-9 rounded-full flex items-center justify-center transition-all shadow-md ${
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-white text-on-surface-variant hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart className={`size-4 ${wishlisted ? "fill-current" : ""}`} />
          </button>
          <button
            type="button"
            aria-label="Ver detalle del producto"
            className="size-9 rounded-full bg-white text-on-surface-variant hover:bg-primary hover:text-white flex items-center justify-center transition-all shadow-md"
          >
            <Eye className="size-4" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col grow">
        <span className="font-label-md text-xs text-on-surface-variant mb-1">
          {product.category}
        </span>
        <h3 className="text-headline-md text-on-surface mb-1">{product.title}</h3>

        <RatingStars product={product} />

        <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-4 grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-headline-md text-on-background">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-body-sm text-on-surface-variant line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label="Agregar al carrito"
            className="btn-primary bg-primary text-on-primary p-2 rounded-lg flex items-center justify-center"
          >
            <ShoppingCart className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}