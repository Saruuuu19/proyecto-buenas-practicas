import type { Product } from "../types";
import { normalize } from "./utils";

/**
 * Filtra el catálogo por categoría exacta y por texto de búsqueda.
 * La búsqueda compara contra título y categoría, sin distinguir mayúsculas.
 * Ambos parámetros son opcionales: si vienen vacíos, no filtran.
 */
export function filterProducts(
  products: Product[],
  search: string,
  category: string,
): Product[] {
  const normalizedSearch = normalize(search);
  const normalizedCategory = normalize(category);

  return products.filter((product) => {
    const matchesCategory =
      !normalizedCategory || normalize(product.category) === normalizedCategory;
    const matchesSearch =
      !normalizedSearch ||
      normalize(product.title).includes(normalizedSearch) ||
      normalize(product.category).includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });
}
