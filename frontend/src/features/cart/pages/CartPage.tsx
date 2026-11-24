import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowRight, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../../hooks/useCart";
import { formatPrice } from "../../../lib/utils";
import { ROUTES } from "../../lib/utils";

export function CartPage() {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  if (itemCount === 0) {
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="text-center py-20">
            <ShoppingCart className="mx-auto mb-6 size-16 text-outline-variant" />
            <h2 className="text-headline-lg font-semibold text-on-background mb-3">
              Tu carrito está vacío
            </h2>
            <p className="text-body-md text-on-surface-variant mb-8">
              No has agregado productos todavía. Explora nuestra tienda y encuentra lo que necesitas.
            </p>
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all no-underline"
            >
              Explorar productos
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Resumen del carrito */}
          <div className="lg:w-2/3 space-y-6">
            <h2 className="text-headline-lg font-semibold text-on-background">
              Tu carrito ({itemCount} artículo{itemCount > 1 ? "s" : ""})
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col lg:flex-row items-center gap-4 bg-surface rounded-xl border border-outline-variant p-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-body-md font-medium text-on-surface truncate">
                      {item.product.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant truncate">
                      {item.product.category}
                    </p>
                    <p className="text-body-sm font-semibold text-primary mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Disminuir cantidad"
                      className="size-8 rounded-lg border border-outline-variant bg-surface-container-low flex items-center justify-center text-outline-variant hover:bg-outline-variant hover:text-primary transition-colors"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-6 text-center text-body-sm font-medium text-on-surface">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Aumentar cantidad"
                      className="size-8 rounded-lg border border-outline-variant bg-surface-container-low flex items-center justify-center text-outline-variant hover:bg-outline-variant hover:text-primary transition-colors"
                    >
                      <Plus className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      aria-label="Eliminar producto"
                      className="size-8 rounded-lg border border-outline-variant bg-surface-container-low flex items-center justify-center text-error hover:bg-error hover:text-white transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen de precio */}
          <div className="lg:w-1/3">
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sticky top-24">
              <h3 className="text-body-md font-semibold text-on-surface mb-4">Resumen del pedido</h3>
              <div className="flex justify-between mb-2">
                <span className="text-body-sm text-on-surface-variant">Subtotal</span>
                <span className="text-body-sm font-medium text-on-surface">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-body-sm text-on-surface-variant">Envío</span>
                <span className="text-body-sm font-medium text-on-surface">
                  {subtotal >= 999 ? "Gratis" : "$0.00"}
                </span>
              </div>
              <div className="h-px bg-outline-variant my-4" />
              <div className="flex justify-between mb-6">
                <span className="text-body-md font-semibold text-on-surface">Total</span>
                <span className="text-body-lg font-bold text-primary">{formatPrice(subtotal)}</span>
              </div>
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                disabled={itemCount === 0}
                className="w-full bg-primary text-on-primary font-semibold py-3 rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ir al pago
              </button>
              <p className="text-xs text-on-surface-variant text-center mt-4">
                Tus datos se procesan de forma segura con SSL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
