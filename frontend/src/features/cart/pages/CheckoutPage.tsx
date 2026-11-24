import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../../hooks/useCart";
import { formatPrice } from "../../../lib/utils";
import { ROUTES } from "../../lib/utils";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState<"datos" | "pago" | "confirmado">("datos");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    tarjeta: "",
    cvv: "",
  });
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    navigate("/carrito");
    return null;
  }

  if (step === "confirmado") {
    return (
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10">
          <div className="text-center py-20">
            <CheckCircle2 className="mx-auto mb-6 size-16 text-emerald-500" />
            <h2 className="text-headline-lg font-semibold text-on-background mb-3">
              ¡Compra realizada!
            </h2>
            <p className="text-body-md text-on-surface-variant mb-8">
              Tu pedido ha sido confirmado. Te hemos enviado un correo con los detalles.
            </p>
            <div className="bg-surface rounded-xl border border-outline-variant p-6 inline-block">
              <p className="text-body-sm text-on-surface-variant mb-2">
                Total pagado:{formatPrice(subtotal)}
              </p>
              <p className="text-body-sm text-on-surface-variant">
                Productos: {items.reduce((sum, i) => sum + i.quantity, 0)}
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                to={ROUTES.PRODUCTS}
                className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all no-underline"
              >
                Seguir comprando
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-on-surface-variant font-medium hover:text-primary transition-colors no-underline"
              >
                Volver al inicio
                <ArrowLeft className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isDatosStep = step === "datos";
  const isPagoStep = step === "pago";

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        {/* Barra de progreso */}
        <div className="flex items-center gap-3 mb-10">
          {[1, 2].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className={`size-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === "datos" && n === 1
                    ? "bg-primary text-on-primary"
                    : step === "pago" && n === 2
                      ? "bg-emerald-500 text-on-emerald-container"
                      : "bg-surface-container-low text-on-surface-variant"
                }`}
              >
                {n}
              </div>
              {n < 2 && <div className="h-px w-4 bg-outline-variant" />}
              <span className={`text-body-sm ${
                (step === "datos" && n === 1) || (step === "pago" && n === 2)
                  ? "font-semibold text-primary"
                  : "text-on-surface-variant"
              }`}>
                {n === 1 ? "Datos de envío" : "Pago"}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-7 space-y-6">
            {isDatosStep && (
              <div className="bg-surface rounded-2xl border border-outline-variant p-6">
                <h3 className="text-body-md font-semibold text-on-surface mb-5">
                  Datos de envío
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep("pago");
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-body-sm font-medium text-on-surface mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full h-10 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-body-sm font-medium text-on-surface mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-10 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-body-sm font-medium text-on-surface mb-1">
                      Dirección de envío
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.direccion}
                      onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                      className="w-full h-10 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Av. Siempre Viva 123"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary font-semibold py-3 rounded-xl hover:bg-primary/90 transition-all"
                  >
                    Continuar al pago
                  </button>
                </form>
              </div>
            )}

            {isPagoStep && (
              <div className="bg-surface rounded-2xl border border-outline-variant p-6">
                <h3 className="text-body-md font-semibold text-on-surface mb-5">
                  Pago con tarjeta
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setProcessing(true);
                    setTimeout(() => {
                      clear();
                      setStep("confirmado");
                    }, 1500);
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-body-sm font-medium text-on-surface mb-1">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={formData.tarjeta}
                      onChange={(e) =>
                        setFormData({ ...formData, tarjeta: e.target.value.replace(/\D/g, "") })
                      }
                      className="w-full h-10 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-body-sm font-medium text-on-surface mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full h-10 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="size-5 text-emerald-500" />
                    <span className="text-body-sm text-on-surface-variant">
                      Pago seguro con encriptación SSL
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-emerald-500 text-on-emerald-container font-semibold py-3 rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? "Procesando pago…" : "Pagar ahora"}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Resumen lateral */}
          <div className="lg:col-span-5">
            <div className="bg-surface rounded-2xl border border-outline-variant p-6 sticky top-24">
              <h3 className="text-body-md font-semibold text-on-surface mb-4">Resumen del pedido</h3>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start gap-3">
                    <div>
                      <p className="text-body-sm font-medium text-on-surface">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        ×{item.quantity}
                      </p>
                    </div>
                    <span className="text-body-sm font-medium text-on-surface">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-outline-variant my-4" />
              <div className="flex justify-between mb-6">
                <span className="text-body-md font-semibold text-on-surface">Total</span>
                <span className="text-body-lg font-bold text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep("datos")}
                className="w-full bg-white text-on-surface font-semibold py-3 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all"
              >
                Volver a datos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
