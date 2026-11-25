export const MAX_CART_LINES = 100;
export const MAX_CART_QUANTITY = 100;
// El catálogo guarda precios con 10 dígitos, 2 de ellos decimales.
const MAX_UNIT_PRICE_CENTS = 9_999_999_999;

export interface CartProduct {
  id: number;
  title: string;
  price: number;
}

export interface CartItem {
  productId: number;
  title: string;
  unitPriceCents: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  notice: string;
}

type CartAction =
  | { type: "add"; product: CartProduct }
  | { type: "change"; productId: number; delta: 1 | -1 }
  | { type: "remove"; productId: number }
  | { type: "clearNotice" };

function isProductId(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function isTitle(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isUnitPrice(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value)
    && value >= 0 && value <= MAX_UNIT_PRICE_CENTS;
}

function isQuantity(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value)
    && value >= 1 && value <= MAX_CART_QUANTITY;
}

export function parseCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const entries: unknown = JSON.parse(raw);
    if (!Array.isArray(entries)) return [];

    const items = new Map<number, CartItem>();
    for (const entry of entries) {
      if (typeof entry !== "object" || entry === null) continue;
      const { productId, title, unitPriceCents, quantity } = entry as Partial<CartItem>;
      if (!isProductId(productId) || !isTitle(title) || !isUnitPrice(unitPriceCents)
        || !isQuantity(quantity) || items.has(productId)) continue;

      items.set(productId, { productId, title, unitPriceCents, quantity });
      if (items.size === MAX_CART_LINES) break;
    }
    return [...items.values()];
  } catch {
    return [];
  }
}

export function cartSubtotalCents(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === "clearNotice") return { ...state, notice: "" };

  const { items } = state;
  const productId = action.type === "add" ? action.product.id : action.productId;
  const current = items.find((item) => item.productId === productId);

  if (action.type === "add") {
    const { title, price } = action.product;
    const unitPriceCents = typeof price === "number" && price >= 0
      ? Math.round(price * 100)
      : NaN;
    if (!isProductId(productId) || !isTitle(title) || !isUnitPrice(unitPriceCents)) {
      return { items, notice: "No se pudo agregar este producto al carrito." };
    }

    const quantity = (current?.quantity ?? 0) + 1;
    if (!isQuantity(quantity)) {
      return { items, notice: `El máximo es de ${MAX_CART_QUANTITY} unidades por producto.` };
    }
    if (!current && items.length >= MAX_CART_LINES) {
      return { items, notice: `El carrito admite hasta ${MAX_CART_LINES} productos distintos.` };
    }

    const next = { productId, title, unitPriceCents, quantity };
    return {
      items: current ? items.map((item) => item === current ? next : item) : [...items, next],
      notice: `Se agregó ${title} al carrito. Cantidad: ${quantity}.`,
    };
  }

  if (!current) return state;
  if (action.type === "remove") {
    return {
      items: items.filter((item) => item !== current),
      notice: `Se quitó ${current.title} del carrito.`,
    };
  }

  const quantity = current.quantity + action.delta;
  if (!isQuantity(quantity)) return state;
  return {
    items: items.map((item) => item === current ? { ...item, quantity } : item),
    notice: `${current.title}. Cantidad: ${quantity}.`,
  };
}
