import { createContext } from "react";
import type { Cart, CartItem, Product } from "../../../types";

const STORAGE_KEY = "techflow_cart";

function loadCart(): Cart {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as Cart;
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

function saveCart(cart: Cart): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // ignore quota errors
  }
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
  isInCart: (productId: number) => boolean;
}

export const CartContext = createContext<CartContextValue | null>(null);

export type { CartContextValue };
export { loadCart, saveCart };
