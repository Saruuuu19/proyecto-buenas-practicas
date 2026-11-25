import { createContext, useContext } from "react";
import type { CartItem, CartProduct } from "../cartState";

interface CartContextValue {
  items: CartItem[];
  addProduct: (product: CartProduct) => void;
  changeQuantity: (productId: number, delta: 1 | -1) => void;
  removeProduct: (productId: number) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart requiere CartProvider.");
  return cart;
}
