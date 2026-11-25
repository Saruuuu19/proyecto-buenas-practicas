import { api } from "./client";
import type { Product } from "../types";

function invalidResponse(): never {
  throw new Error("La respuesta del catálogo no es válida.");
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseProduct(data: unknown): Product {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return invalidResponse();
  }

  const { id, title, price, description, category, image } = data as Record<string, unknown>;
  if (
    typeof id !== "number" || !Number.isSafeInteger(id) || id <= 0 ||
    typeof price !== "number" || !Number.isFinite(price) || price <= 0 ||
    typeof description !== "string" ||
    !isNonEmptyString(title) || !isNonEmptyString(category) || !isNonEmptyString(image)
  ) {
    return invalidResponse();
  }

  return { id, title, price, description, category, image };
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<unknown>("/products/");
  if (!Array.isArray(data)) return invalidResponse();

  const products = data.map(parseProduct);
  if (new Set(products.map(({ id }) => id)).size !== products.length) {
    return invalidResponse();
  }

  return products;
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get<unknown>(`/products/${id}`);
  const product = parseProduct(data);
  return product.id === id ? product : invalidResponse();
}

export async function getCategories(): Promise<string[]> {
  const { data } = await api.get<unknown>("/products/categories");
  if (!Array.isArray(data) || !data.every(isNonEmptyString) || new Set(data).size !== data.length) {
    return invalidResponse();
  }

  return data;
}
