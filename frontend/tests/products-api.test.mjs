import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "vite";

const product = {
  id: 1,
  title: "Teclado",
  price: 19.99,
  description: "",
  category: "Periféricos",
  image: "https://example.com/teclado.png",
};
const invalidResponse = /respuesta del catálogo no es válida/;
let server, api, getProducts, getProduct, getCategories;

before(async () => {
  server = await createServer({
    configFile: false,
    cacheDir: "node_modules/.vite-products-test",
    server: { middlewareMode: true, ws: false },
  });
  ({ api } = await server.ssrLoadModule("/src/api/client.ts"));
  ({ getProducts, getProduct, getCategories } = await server.ssrLoadModule("/src/api/products.ts"));
});

after(() => server?.close());

function respond(path, data) {
  api.defaults.adapter = async (config) => {
    assert.equal(config.url, path);
    return { data };
  };
}

test("el listado conserva solo los campos del backend y rechaza productos inválidos o repetidos", async () => {
  respond("/products/", [{ ...product, rating: 5 }]);
  assert.deepEqual(await getProducts(), [product]);

  for (const data of [null, [product, product], [{ ...product, price: "19.99" }]]) {
    respond("/products/", data);
    await assert.rejects(getProducts, invalidResponse);
  }
});

test("las categorías deben ser una lista de textos no vacíos y únicos", async () => {
  respond("/products/categories", ["Periféricos"]);
  assert.deepEqual(await getCategories(), ["Periféricos"]);

  for (const data of [{ category: "Audio" }, [42], [" "], ["Audio", "Audio"]]) {
    respond("/products/categories", data);
    await assert.rejects(getCategories, invalidResponse);
  }
});

test("el detalle valida el cuerpo y que su ID coincida con el solicitado", async () => {
  respond("/products/1", product);
  assert.deepEqual(await getProduct(1), product);

  for (const data of [{ ...product, id: 2 }, { ...product, image: null }]) {
    respond("/products/1", data);
    await assert.rejects(() => getProduct(1), invalidResponse);
  }
});
