import { useContext } from "react";
import { CartContext } from "../features/cart/context/cart-context";
import type { CartContextValue } from "../features/cart/context/cart-context";

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}
