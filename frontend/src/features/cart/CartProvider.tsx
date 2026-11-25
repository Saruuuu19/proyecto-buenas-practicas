import { useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { cartReducer, parseCart } from "./cartState";
import { CartContext } from "./hooks/useCart";

const STORAGE_KEY = "techflow:cart";

function loadCart() {
  try {
    return parseCart(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [{ items, notice }, dispatch] = useReducer(cartReducer, undefined, () => ({
    items: loadCart(),
    notice: "",
  }));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // El carrito sigue disponible en memoria si el almacenamiento falla.
    }
  }, [items]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => dispatch({ type: "clearNotice" }), 5000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  return (
    <CartContext.Provider value={{
      items,
      addProduct: (product) => dispatch({ type: "add", product }),
      changeQuantity: (productId, delta) => dispatch({ type: "change", productId, delta }),
      removeProduct: (productId) => dispatch({ type: "remove", productId }),
    }}>
      {children}
      <div role="status" aria-atomic="true" className="pointer-events-none fixed inset-x-4 bottom-4 z-40 mx-auto max-w-md">
        {notice && (
          <p className="rounded-xl bg-inverse-surface px-4 py-3 text-body-sm text-inverse-on-surface wrap-anywhere shadow-md">
            {notice}
          </p>
        )}
      </div>
    </CartContext.Provider>
  );
}
