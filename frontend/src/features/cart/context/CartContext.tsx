import { useCallback, useEffect, useMemo, useState } from "react";
import type { Cart, CartItem, Product } from "../../../types";
import { CartContext, loadCart, saveCart } from "./cart-context";

/** Provee el carrito de compras a toda la aplicación (persistido en localStorage). */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(loadCart);

  // Sincroniza con localStorage en cada cambio.
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const itemCount = useMemo(() => cart.items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0), [
    cart.items,
  ]);
  const subtotal = useMemo(
    () => cart.items.reduce((sum: number, i: CartItem) => sum + i.product.price * i.quantity, 0),
    [cart.items],
  );

  const addItem = useCallback(
    (product: Product, quantity: number = 1) => {
      setCart((prev: Cart) => {
        const existing = prev.items.find((i: CartItem) => i.product.id === product.id);
        if (existing) {
          return {
            items: prev.items.map((i: CartItem) =>
              i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
            ),
          };
        }
        return { items: [...prev.items, { product, quantity }] };
      });
    },
    [],
  );

  const removeItem = useCallback((productId: number) => {
    setCart((prev: Cart) => ({ items: prev.items.filter((i: CartItem) => i.product.id !== productId) }));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCart((prev: Cart) => ({
      items: prev.items.map((i: CartItem) =>
        i.product.id === productId ? { ...i, quantity } : i,
      ),
    }));
  }, [removeItem]);

  const clear = useCallback(() => {
    setCart({ items: [] });
  }, []);

  const isInCart = useCallback(
    (productId: number) => cart.items.some((i: CartItem) => i.product.id === productId),
    [cart.items],
  );

  const value = useMemo(
    () => ({
      items: cart.items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clear,
      isInCart,
    }),
    [cart.items, itemCount, subtotal, addItem, removeItem, updateQuantity, clear, isInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
