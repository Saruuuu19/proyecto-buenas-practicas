import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, CreditCard, Truck, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Carrito() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "info" | "confirm">("cart");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    card: "",
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("confirm");
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  if (items.length === 0 && checkoutStep !== "confirm") {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20 text-center">
        <ShoppingBagEmpty />
        <h1 className="text-2xl font-bold text-on-background mt-4">
          Tu carrito está vacío
        </h1>
        <p className="text-on-surface-variant mt-2 mb-6">
          Agrega productos para comenzar a comprar
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all no-underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la tienda
        </Link>
      </div>
    );
  }

  if (checkoutStep === "confirm") {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-bold text-on-background mb-2">
          ¡Pedido confirmado!
        </h1>
        <p className="text-on-surface-variant mb-2">
          Gracias por tu compra, {form.name}
        </p>
        <p className="text-sm text-on-surface-variant mb-8">
          Recibirás un correo de confirmación en {form.email}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all no-underline"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors no-underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Seguir comprando
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold text-on-background mb-8">
        {checkoutStep === "cart" ? "Mi Carrito" : "Datos de envío"}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {checkoutStep === "cart" && (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-surface rounded-xl border border-outline-variant"
                >
                  <div className="w-24 h-24 bg-surface-container-low rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-on-surface">
                          {item.name}
                        </h3>
                        <p className="text-sm text-on-surface-variant">
                          {item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center hover:bg-primary/10 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center hover:bg-primary/10 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-lg font-bold text-on-surface">
                        ${(item.price * item.quantity).toLocaleString("es-MX")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {checkoutStep === "info" && (
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">
                    Tarjeta de crédito
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="**** **** **** ****"
                    value={form.card}
                    onChange={(e) => setForm({ ...form, card: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                Confirmar pedido — ${total.toLocaleString("es-MX")}
              </button>
            </form>
          )}
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant sticky top-24">
            <h2 className="font-semibold text-on-surface mb-4">
              Resumen del pedido
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-medium">
                  ${subtotal.toLocaleString("es-MX")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Envío</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-emerald-500">Gratis</span>
                  ) : (
                    `$${shipping}`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-on-surface-variant">
                  Envío gratis en compras mayores a $999
                </p>
              )}
              <div className="border-t border-outline-variant pt-3 flex justify-between">
                <span className="font-semibold text-on-surface">Total</span>
                <span className="text-lg font-bold text-on-surface">
                  ${total.toLocaleString("es-MX")}
                </span>
              </div>
            </div>
            {checkoutStep === "cart" && (
              <button
                onClick={() => setCheckoutStep("info")}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold mt-4 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Truck className="h-4 w-4" />
                Continuar al checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingBagEmpty() {
  return (
    <svg
      className="h-24 w-24 text-on-surface-variant/20 mx-auto"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
}
