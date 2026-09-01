import { useState } from "react";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import type { Product } from "../../data/products";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem } = useCart();

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="product-card bg-surface rounded-xl overflow-hidden flex flex-col h-full group">
      <div className="relative aspect-[4/3] bg-surface-container-low p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
        />

        {product.badge === "Oferta" && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-500 text-white">
            Oferta
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-3 right-3 text-[10px] font-bold bg-red-500 text-white px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-white text-on-surface-variant hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
          </button>
          <button className="w-9 h-9 rounded-full bg-white text-on-surface-variant hover:bg-primary hover:text-white flex items-center justify-center transition-all shadow-md">
            <Eye className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => addItem(product)}
          className="absolute bottom-3 left-3 right-3 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg bg-primary text-white hover:bg-primary/90"
        >
          <ShoppingCart className="h-4 w-4" />
          Agregar al carrito
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-medium text-on-surface-variant mb-1">
          {product.category}
        </span>
        <h3 className="text-base font-semibold text-on-surface mb-2 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < Math.floor(product.rating)
                  ? "text-amber-400 fill-amber-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-on-surface-variant ml-1">
            ({product.reviews})
          </span>
        </div>

        <p className="text-sm text-on-surface-variant line-clamp-2 mb-3 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mt-auto">
          <span className="text-lg font-bold text-on-background">
            ${product.price.toLocaleString("es-MX")}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-on-surface-variant line-through">
              ${product.originalPrice.toLocaleString("es-MX")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
