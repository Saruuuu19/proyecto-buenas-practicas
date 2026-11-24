import { Link } from "react-router-dom";
import { ROUTES } from "../../lib/utils";
import {
  ArrowRight,
  HeadphonesIcon,
  Lock,
  Shield,
  Star,
  Tag,
  Truck,
} from "lucide-react";

const reasons = [
  {
    icon: Tag,
    title: "Precios que sí convienen",
    description:
      "Compramos directo a proveedores y sin intermediarios de más, así te ofrecemos precio justo y descuentos de hasta 40% durante todo el año.",
  },
  {
    icon: Truck,
    title: "Envío rápido y gratis",
    description:
      "Tu pedido sale rápido y con seguimiento en cada paso. Además, el envío es gratis en compras mayores a $999.",
  },
  {
    icon: Shield,
    title: "Garantía de 2 años",
    description:
      "Todos los productos incluyen 2 años de garantía. Si algo falla, no te quedas solo: lo resolvemos contigo.",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte 24/7 real",
    description:
      "¿Dudas antes o después de comprar? Nuestro equipo está disponible todos los días para ayudarte a elegir bien.",
  },
  {
    icon: Lock,
    title: "Pago 100% seguro",
    description:
      "Tu información viaja cifrada con SSL y nunca compartimos tus datos. Pagas tranquilo, como prefieras.",
  },
  {
    icon: Star,
    title: "Miles de clientes confían",
    description:
      "4.9/5 en reseñas y más de 10,000 clientes contentos. Cada compra se respalda con atención cercana.",
  },
];

export function WhyTechFlow() {
  return (
    <section
      aria-label="Por qué comprar en TechFlow"
      className="relative overflow-hidden py-14 md:py-16"
    >
      {/* Resplandor azul sutil de fondo, en sintonía con el hero */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[280px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="max-w-[42rem] mx-auto text-center mb-10">
          <p className="text-body-sm font-semibold text-primary uppercase tracking-wide mb-2">
            Tu compra, con respaldo
          </p>
          <h2 className="text-headline-lg font-semibold text-on-background mb-4">
            ¿Por qué comprar en TechFlow?
          </h2>
          <p className="text-body-md text-on-surface-variant">
            No vendemos solo productos: te damos una compra clara, segura y con
            alguien detrás que responde. Esto es lo que hacemos por ti en cada
            pedido.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason) => (
            <li
              key={reason.title}
              className="group bg-surface rounded-2xl border border-outline-variant p-6 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(37,99,235,0.12)] transition-all duration-300"
            >
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <reason.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-body-md font-semibold text-on-surface mb-2">
                {reason.title}
              </h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                {reason.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            to={ROUTES.PRODUCTS}
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all no-underline"
          >
            Explorar productos
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
