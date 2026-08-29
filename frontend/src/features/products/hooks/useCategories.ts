import { useApi } from "../../../hooks/useApi";
import { getCategories } from "../../../api/products";

export function useCategories() {
  return useApi<string[]>(getCategories);
}