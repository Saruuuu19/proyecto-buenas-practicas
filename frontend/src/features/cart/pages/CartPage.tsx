import { Minus, Plus } from "lucide-react";
import { useRef } from "react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../lib/utils";
import { cartSubtotalCents, MAX_CART_QUANTITY } from "../cartState";
import { useCart } from "../hooks/useCart";

const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const linkClass = `inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 font-semibold no-underline ${focusClass}`;
const quantityClass = `grid size-11 place-items-center rounded-lg border border-outline text-primary hover:bg-surface-container-high aria-disabled:cursor-default aria-disabled:opacity-50 aria-disabled:hover:bg-transparent cursor-pointer ${focusClass}`;

export function CartPage({ reviewHref }: { reviewHref?: string }) {
  const { items, changeQuantity, removeProduct } = useCart();
  const headingRef = useRef<HTMLHeadingElement>(null);

  function handleRemove(event: MouseEvent<HTMLButtonElement>, productId: number) {
    const button = event.currentTarget;
    if (document.activeElement === button) {
      const row = button.closest("li");
      const neighbor = row?.nextElementSibling ?? row?.previousElementSibling;
      (neighbor?.querySelector<HTMLButtonElement>("[data-cart-remove]") ?? headingRef.current)?.focus();
    }
    removeProduct(productId);
  }

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-10">
      <h1 ref={headingRef} tabIndex={-1} className={`mb-6 scroll-mt-24 text-headline-lg font-semibold text-on-background ${focusClass}`}>
        Carrito
      </h1>
      {items.length === 0 ? (
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
          <h2 className="text-headline-sm font-semibold">Tu carrito está vacío</h2>
          <p className="mt-2 text-on-surface-variant">Agrega productos del catálogo para verlos aquí.</p>
          <Link to="/productos" className={`${linkClass} mt-4 bg-primary text-on-primary hover:bg-primary-container`}>
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <ul className="divide-y divide-outline-variant rounded-xl border border-outline-variant bg-surface-container-lowest">
            {items.map(({ productId, title, unitPriceCents, quantity }) => (
              <li key={productId} className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6">
                <div className="min-w-0 flex-1 basis-full sm:basis-auto">
                  <h2 className="font-semibold wrap-anywhere">{title}</h2>
                  <p className="text-body-sm text-on-surface-variant">{formatPrice(unitPriceCents / 100)} por unidad</p>
                </div>
                <div role="group" aria-label={`Cantidad de ${title}`} className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Disminuir cantidad de ${title}`}
                    aria-disabled={quantity === 1}
                    onClick={() => changeQuantity(productId, -1)}
                    className={quantityClass}
                  >
                    <Minus aria-hidden="true" className="size-4" />
                  </button>
                  <span className="min-w-7 text-center tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    aria-label={`Aumentar cantidad de ${title}`}
                    aria-disabled={quantity === MAX_CART_QUANTITY}
                    onClick={() => changeQuantity(productId, 1)}
                    className={quantityClass}
                  >
                    <Plus aria-hidden="true" className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  aria-label={`Quitar ${title} del carrito`}
                  data-cart-remove
                  onClick={(event) => handleRemove(event, productId)}
                  className={`min-h-11 scroll-mt-24 cursor-pointer rounded-lg px-3 font-medium text-error hover:bg-error-container ${focusClass}`}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <div className="self-start rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
            <h2 className="text-headline-sm font-semibold">Subtotal estimado</h2>
            <p className="mt-2 text-headline-md font-semibold tabular-nums">{formatPrice(cartSubtotalCents(items) / 100)}</p>
            <p className="mt-2 text-body-sm text-on-surface-variant">
              Se basa en los precios guardados en el carrito. Los precios pueden cambiar y este no es el total final.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {reviewHref && (
                <Link to={reviewHref} className={`${linkClass} bg-primary text-on-primary hover:bg-primary-container`}>
                  Revisar carrito
                </Link>
              )}
              <Link to="/productos" className={`${linkClass} text-primary hover:bg-surface-container-high`}>
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
