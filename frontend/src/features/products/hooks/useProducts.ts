import { useApi } from "../../../hooks/useApi";
import { getProducts } from "../../../api/products";
import type { Product } from "../../../types";

export function useProducts() {
  return useApi<Product[]>(getProducts);
}