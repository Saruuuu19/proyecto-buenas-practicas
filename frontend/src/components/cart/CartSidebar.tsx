import { useEffect, useRef, useState, useCallback } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Check,
  Truck,
  CreditCard,
  ArrowLeft,
  CheckCircle,
  Lock,
  MapPin,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

type Step = "cart" | "shipping" | "payment" | "done";

interface Form {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
}

const initialForm: Form = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
  cardName: "",
};

export function CartSidebar() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
    clearCart,
  } = useCart();

  const ref = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState<Form>(initialForm);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeCart();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("cart");
        setForm(initialForm);
        setErrors({});
        setTouched({});
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === "shipping" && isOpen) {
      const timer = setTimeout(() => firstInputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [step, isOpen]);

  const handleRemove = useCallback(
    (id: string) => {
      setRemovingId(id);
      setTimeout(() => {
        removeItem(id);
        setRemovingId(null);
      }, 200);
    },
    [removeItem]
  );

  const updateField = useCallback(
    (field: keyof Form, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  const blurField = useCallback((field: keyof Form) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validateShipping = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Requerido";
    if (!form.email.trim()) {
      newErrors.email = "Requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email invalido";
    }
    if (!form.address.trim()) newErrors.address = "Requerido";
    if (!form.city.trim()) newErrors.city = "Requerido";
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      address: true,
      city: true,
    });
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const validatePayment = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.cardName.trim()) newErrors.cardName = "Requerido";
    const digits = form.cardNumber.replace(/\s/g, "");
    if (digits.length < 13) newErrors.cardNumber = "Numero invalido";
    if (form.cardExpiry.length < 5) newErrors.cardExpiry = " MM/AA";
    if (form.cardCvv.length < 3) newErrors.cardCvv = " CVV";
    setErrors(newErrors);
    setTouched({
      cardName: true,
      cardNumber: true,
      cardExpiry: true,
      cardCvv: true,
    });
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const shipping = totalPrice > 999 ? 0 : 99;
  const total = totalPrice + shipping;
  const freeShippingProgress = Math.min((totalPrice / 999) * 100, 100);

  const handlePay = () => {
    if (!validatePayment()) return;
    clearCart();
    setStep("done");
  };

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="fixed top-14 right-4 md:right-10 w-80 max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-outline-variant flex flex-col overflow-hidden animate-slide-in"
      style={{ zIndex: 9999 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant bg-surface-container-low shrink-0">
        <div className="flex items-center gap-2">
          {step !== "cart" && step !== "done" && (
            <button
              onClick={() => setStep(step === "payment" ? "shipping" : "cart")}
              className="p-1.5 hover:bg-surface-container-high rounded-full transition-colors -ml-1"
              aria-label="Volver"
            >
              <ArrowLeft className="h-4 w-4 text-on-surface-variant" />
            </button>
          )}
          <ShoppingBag className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold text-on-surface">
            {step === "cart" && "Mi Carrito"}
            {step === "shipping" && "Datos de envio"}
            {step === "payment" && "Pago seguro"}
            {step === "done" && "Pedido confirmado"}
          </h2>
          {step === "cart" && totalItems > 0 && (
            <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {totalItems}
            </span>
          )}
        </div>
        <button
          onClick={closeCart}
          className="p-1.5 hover:bg-surface-container-high rounded-full transition-colors"
          aria-label="Cerrar carrito"
        >
          <X className="h-4 w-4 text-on-surface-variant" />
        </button>
      </div>

      {/* Steps indicator */}
      {step !== "done" && items.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-outline-variant/50 bg-surface shrink-0">
          {(["cart", "shipping", "payment"] as const).map((s, i) => {
            const isActive =
              (step === "cart" && i === 0) ||
              (step === "shipping" && i <= 1) ||
              (step === "payment");
            const isComplete =
              (step === "shipping" && i === 0) ||
              (step === "payment" && i <= 1);
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 transition-all duration-300 ${
                    isComplete
                      ? "bg-emerald-500 text-white"
                      : isActive
                        ? "bg-primary text-white"
                        : "bg-surface-container-high text-on-surface-variant/50"
                  }`}
                >
                  {isComplete ? (
                    <Check className="h-2.5 w-2.5" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium hidden sm:block transition-colors ${
                    isActive ? "text-on-surface" : "text-on-surface-variant/40"
                  }`}
                >
                  {i === 0 && "Carrito"}
                  {i === 1 && "Envio"}
                  {i === 2 && "Pago"}
                </span>
                {i < 2 && (
                  <div
                    className={`flex-1 h-px transition-colors duration-300 ${
                      isComplete ? "bg-emerald-400" : "bg-outline-variant/40"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
        {/* STEP: Cart */}
        {step === "cart" && (
          <>
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-3">
                  <ShoppingBag className="h-7 w-7 text-on-surface-variant/25" />
                </div>
                <p className="text-sm font-semibold text-on-surface-variant">
                  Tu carrito esta vacio
                </p>
                <p className="text-xs text-on-surface-variant/50 mt-1 max-w-[200px]">
                  Agrega productos para comenzar a comprar
                </p>
              </div>
            ) : (
              <>
                {shipping > 0 && (
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Truck className="h-3 w-3 text-on-surface-variant/60" />
                        <span className="text-[10px] text-on-surface-variant/70">
                          ${(999 - totalPrice).toLocaleString("es-MX")} mas para envio gratis
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex gap-2.5 p-2.5 bg-surface-container-low rounded-xl transition-all duration-200 ${
                      removingId === item.id
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <div className="w-14 h-14 bg-surface rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-outline-variant/30">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xs font-semibold text-on-surface truncate pr-1 leading-tight">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-1 text-on-surface-variant/30 hover:text-red-500 transition-colors shrink-0 rounded-md hover:bg-red-50"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-[10px] text-on-surface-variant/50 mt-0.5">
                        {item.category}
                      </p>
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center bg-surface rounded-lg border border-outline-variant/40 overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-surface-container-high transition-colors active:bg-surface-container-high"
                            aria-label="Reducir cantidad"
                          >
                            <Minus className="h-2.5 w-2.5 text-on-surface-variant" />
                          </button>
                          <span className="text-xs font-bold w-7 text-center text-on-surface tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-surface-container-high transition-colors active:bg-surface-container-high"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="h-2.5 w-2.5 text-on-surface-variant" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-on-surface tabular-nums">
                          ${(item.price * item.quantity).toLocaleString("es-MX")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {/* STEP: Shipping */}
        {step === "shipping" && (
          <div className="space-y-3 py-1">
            <FormField
              ref={firstInputRef}
              label="Nombre completo"
              value={form.name}
              onChange={(v) => updateField("name", v)}
              onBlur={() => blurField("name")}
              placeholder="Juan Perez"
              error={touched.name ? errors.name : undefined}
            />
            <FormField
              label="Correo electronico"
              type="email"
              value={form.email}
              onChange={(v) => updateField("email", v)}
              onBlur={() => blurField("email")}
              placeholder="juan@email.com"
              error={touched.email ? errors.email : undefined}
            />
            <FormField
              label="Telefono"
              type="tel"
              value={form.phone}
              onChange={(v) => updateField("phone", v)}
              placeholder="555 123 4567"
            />
            <FormField
              label="Direccion"
              value={form.address}
              onChange={(v) => updateField("address", v)}
              onBlur={() => blurField("address")}
              placeholder="Calle 123 #45-67"
              error={touched.address ? errors.address : undefined}
              icon={<MapPin className="h-3 w-3 text-on-surface-variant/30" />}
            />
            <div className="grid grid-cols-2 gap-2.5">
              <FormField
                label="Ciudad"
                value={form.city}
                onChange={(v) => updateField("city", v)}
                onBlur={() => blurField("city")}
                placeholder="Bogota"
                error={touched.city ? errors.city : undefined}
              />
              <FormField
                label="Codigo postal"
                value={form.postalCode}
                onChange={(v) => updateField("postalCode", v)}
                placeholder="110111"
              />
            </div>
          </div>
        )}

        {/* STEP: Payment */}
        {step === "payment" && (
          <div className="space-y-3 py-1">
            <div className="bg-surface-container-low rounded-xl p-3 flex items-start gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-on-surface-variant/50 mb-0.5">
                  Enviar a
                </p>
                <p className="text-xs font-medium text-on-surface leading-tight">
                  {form.name}
                </p>
                <p className="text-[10px] text-on-surface-variant leading-tight mt-0.5">
                  {form.address}, {form.city}
                  {form.postalCode ? ` ${form.postalCode}` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant/50">
              <Lock className="h-3 w-3" />
              <span>Pago encriptado y seguro</span>
            </div>

            <FormField
              ref={firstInputRef}
              label="Nombre en la tarjeta"
              value={form.cardName}
              onChange={(v) => updateField("cardName", v.toUpperCase())}
              onBlur={() => blurField("cardName")}
              placeholder="JUAN PEREZ"
              error={touched.cardName ? errors.cardName : undefined}
            />
            <FormField
              label="Numero de tarjeta"
              value={form.cardNumber}
              onChange={(v) => {
                const raw = v.replace(/\s/g, "").replace(/\D/g, "");
                const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
                updateField("cardNumber", formatted.slice(0, 19));
              }}
              onBlur={() => blurField("cardNumber")}
              placeholder="0000 0000 0000 0000"
              error={touched.cardNumber ? errors.cardNumber : undefined}
              maxLength={19}
              inputMode="numeric"
            />
            <div className="grid grid-cols-2 gap-2.5">
              <FormField
                label="Vencimiento"
                value={form.cardExpiry}
                onChange={(v) => {
                  const raw = v.replace(/\D/g, "").slice(0, 4);
                  const formatted =
                    raw.length >= 3
                      ? `${raw.slice(0, 2)}/${raw.slice(2)}`
                      : raw;
                  updateField("cardExpiry", formatted);
                }}
                onBlur={() => blurField("cardExpiry")}
                placeholder="MM/AA"
                error={touched.cardExpiry ? errors.cardExpiry : undefined}
                maxLength={5}
                inputMode="numeric"
              />
              <FormField
                label="CVV"
                value={form.cardCvv}
                onChange={(v) =>
                  updateField("cardCvv", v.replace(/\D/g, "").slice(0, 4))
                }
                onBlur={() => blurField("cardCvv")}
                placeholder="123"
                error={touched.cardCvv ? errors.cardCvv : undefined}
                maxLength={4}
                inputMode="numeric"
                type="password"
              />
            </div>
          </div>
        )}

        {/* STEP: Done */}
        {step === "done" && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 animate-scale-in">
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
            <p className="text-sm font-bold text-on-surface mb-1">
              Pedido confirmado
            </p>
            <p className="text-xs text-on-surface-variant mb-0.5">
              Gracias por tu compra, {form.name}
            </p>
            <p className="text-[10px] text-on-surface-variant/50">
              Recibiras un correo de confirmacion en {form.email}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {step === "done" ? (
        <div className="border-t border-outline-variant px-4 py-3 bg-surface shrink-0">
          <button
            onClick={closeCart}
            className="w-full bg-primary text-white text-center py-2.5 rounded-xl font-semibold text-xs hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            Cerrar
          </button>
        </div>
      ) : items.length > 0 ? (
        <div className="border-t border-outline-variant px-4 py-3 space-y-2.5 bg-surface shrink-0">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="font-medium tabular-nums">
                ${totalPrice.toLocaleString("es-MX")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Envio</span>
              <span className="font-medium tabular-nums">
                {shipping === 0 ? (
                  <span className="text-emerald-500 font-semibold">Gratis</span>
                ) : (
                  `$${shipping.toLocaleString("es-MX")}`
                )}
              </span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-outline-variant/50">
              <span className="font-bold text-on-surface">Total</span>
              <span className="font-bold text-on-surface tabular-nums">
                ${total.toLocaleString("es-MX")}
              </span>
            </div>
          </div>

          {step === "cart" && (
            <button
              onClick={() => setStep("shipping")}
              className="w-full bg-primary text-white text-center py-2.5 rounded-xl font-semibold text-xs hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              Continuar al envio
              <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            </button>
          )}

          {step === "shipping" && (
            <button
              onClick={() => {
                if (validateShipping()) setStep("payment");
              }}
              className="w-full bg-primary text-white text-center py-2.5 rounded-xl font-semibold text-xs hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <CreditCard className="h-3.5 w-3.5" />
              Ir a pagar
            </button>
          )}

          {step === "payment" && (
            <button
              onClick={handlePay}
              className="w-full bg-primary text-white text-center py-2.5 rounded-xl font-semibold text-xs hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <Lock className="h-3.5 w-3.5" />
              Pagar ${total.toLocaleString("es-MX")}
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

import { forwardRef } from "react";

const FormField = forwardRef<
  HTMLInputElement,
  {
    label: string;
    value: string;
    onChange: (v: string) => void;
    onBlur?: () => void;
    placeholder: string;
    type?: string;
    maxLength?: number;
    error?: string;
    icon?: React.ReactNode;
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  }
>(function FormField(
  {
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    type = "text",
    maxLength,
    error,
    icon,
    inputMode,
  },
  ref
) {
  return (
    <div>
      <label className="block text-[10px] font-medium text-on-surface-variant/60 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={type === "email" ? "email" : undefined}
          inputMode={inputMode}
          className={`w-full bg-surface rounded-lg px-2.5 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-1 transition-all ${
            icon ? "pl-7" : ""
          } ${
            error
              ? "border border-red-300 focus:border-red-400 focus:ring-red-200"
              : "border border-outline-variant/40 focus:border-primary focus:ring-primary/20"
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        />
      </div>
      {error && (
        <p
          id={`${label}-error`}
          className="text-[10px] text-red-500 mt-0.5 font-medium"
        >
          {error}
        </p>
      )}
    </div>
  );
});
