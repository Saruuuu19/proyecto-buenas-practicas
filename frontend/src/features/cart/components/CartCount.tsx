import { useCart } from "../hooks/useCart";

export function CartCount() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <span className="sr-only">Carrito: {count} {count === 1 ? "unidad" : "unidades"}</span>
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold tabular-nums text-on-primary"
      >
        {count}
      </span>
    </>
  );
}
