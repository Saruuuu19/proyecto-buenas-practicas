import { Truck, Shield, HeadphonesIcon, CreditCard } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Envío gratis",
    description: "En compras mayores a $999",
  },
  {
    icon: Shield,
    title: "Garantía 2 años",
    description: "En todos los productos",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte 24/7",
    description: "Estamos para ayudarte",
  },
  {
    icon: CreditCard,
    title: "Pago seguro",
    description: "Encriptación SSL",
  },
];

export function BenefitsBar() {
  return (
    <section
      aria-label="Beneficios"
      className="bg-surface-container-low border-b border-outline-variant"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-4">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="flex items-center gap-3 justify-center"
            >
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <benefit.icon className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-body-sm font-semibold text-on-surface">
                  {benefit.title}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {benefit.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}