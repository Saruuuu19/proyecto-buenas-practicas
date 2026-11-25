import assert from "node:assert/strict";
import test from "node:test";
import { cartReducer, cartSubtotalCents, parseCart } from "../src/features/cart/cartState.ts";

const item = { productId: 1, title: "Cable", unitPriceCents: 1999, quantity: 2 };
const add = { type: "add", product: { id: 1, title: "Cable", price: 19.99 } };

test("agrega, combina, cambia cantidades y quita; calcula en céntimos", () => {
  const empty = { items: [], notice: "" };
  const added = cartReducer(cartReducer(empty, add), add);
  assert.deepEqual(added.items, [item]);
  assert.match(added.notice, /Cantidad: 2/);
  assert.equal(cartSubtotalCents(added.items), 3998);

  const reduced = cartReducer(added, { type: "change", productId: 1, delta: -1 });
  assert.equal(reduced.items[0].quantity, 1);
  assert.equal(cartReducer(reduced, { type: "change", productId: 1, delta: -1 }), reduced);
  assert.deepEqual(cartReducer(reduced, { type: "remove", productId: 1 }).items, []);
});

test("aplica los límites sin impedir combinar productos ya presentes", () => {
  const full = { items: Array.from({ length: 100 }, (_, index) => ({ ...item, productId: index + 1 })), notice: "" };
  assert.equal(cartReducer(full, { ...add, product: { ...add.product, id: 101 } }).items, full.items);
  assert.equal(cartReducer(full, { ...add, product: { ...add.product, id: 0 } }).items, full.items);
  assert.equal(cartReducer(full, add).items[0].quantity, 3);
  const max = { items: [{ ...item, quantity: 100 }], notice: "" };
  assert.equal(cartReducer(max, add).items, max.items);
  assert.equal(cartReducer(max, { type: "change", productId: 1, delta: 1 }), max);
});

test("descarta almacenamiento corrupto y conserva solo líneas válidas y únicas", () => {
  assert.deepEqual(parseCart("{"), []);
  assert.deepEqual(parseCart("{}"), []);
  const entries = [
    null,
    { ...item, productId: 0 },
    { ...item, quantity: 1.5 },
    { ...item, quantity: 101 },
    { ...item, unitPriceCents: -1 },
    { ...item, extra: "no se conserva" },
    { ...item, quantity: 3 },
  ];
  assert.deepEqual(parseCart(JSON.stringify(entries)), [item]);
  assert.equal(parseCart(JSON.stringify(
    Array.from({ length: 101 }, (_, index) => ({ ...item, productId: index + 1 })),
  )).length, 100);
});
