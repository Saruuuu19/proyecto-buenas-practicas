import { describe, expect, it } from "vitest";
import type { Product } from "../types";
import { filterProducts } from "./filterProducts";

const catalog: Product[] = [
  {
    id: 1,
    title: "Camiseta Nike",
    price: 29.99,
    description: "Camiseta deportiva",
    category: "Ropa",
    image: "camiseta.webp",
  },
  {
    id: 2,
    title: "Zapatillas Running",
    price: 79.99,
    description: "Zapatillas para correr",
    category: "Deporte",
    image: "zapatillas.webp",
  },
  {
    id: 3,
    title: "Mochila Urbana",
    price: 45,
    description: "Mochila para el día a día",
    category: "Accesorios",
    image: "mochila.webp",
  },
];

describe("filterProducts", () => {
  it("devuelve lista vacía cuando no hay productos", () => {
    expect(filterProducts([], "", "")).toEqual([]);
  });

  it("encuentra el producto por búsqueda exacta del título", () => {
    const result = filterProducts(catalog, "Camiseta Nike", "");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("la búsqueda no distingue mayúsculas ni espacios", () => {
    const result = filterProducts(catalog, "  zapatillas  ", "");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("filtra por categoría exacta", () => {
    const result = filterProducts(catalog, "", "accesorios");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });

  it("combinando categoría y búsqueda vacía devuelve todo", () => {
    expect(filterProducts(catalog, "", "")).toHaveLength(3);
  });

  it("devuelve lista vacía cuando nada coincide", () => {
    expect(filterProducts(catalog, "producto inexistente", "")).toEqual([]);
  });
});
