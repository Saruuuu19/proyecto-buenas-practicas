import { ShoppingCart } from "lucide-react";
import type { CartProduct } from "../cartState";
import { useCart } from "../hooks/useCart";

export function AddToCartButton({ product, className }: { product: CartProduct; className?: string }) {
  const { addProduct } = useCart();

  return (
    <button
      type="button"
      aria-label={`Agregar al carrito: ${product.title}`}
      onClick={() => addProduct(product)}
      className={`inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-primary text-on-primary hover:bg-primary-container active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className ?? ""}`}
    >
      <ShoppingCart aria-hidden="true" className="size-4" />
    </button>
  );
}
