import { api } from "./client";
import type { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products/");
  return data;
}

export async function getProduct(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function getCategories(): Promise<string[]> {
  const { data } = await api.get<string[]>("/products/categories");
  return data;
}

export interface NewProduct {
  title: string;
  price: number;
  category: string;
  image: string;
  /** El esquema ProductCreate del backend lo exige; el formulario no lo pide. */
  description?: string;
}

export async function createProduct(payload: NewProduct): Promise<Product> {
  const { data } = await api.post<Product>("/products", {
    description: "",
    ...payload,
  });
  return data;
}