import { getProducts } from "../../../api/products";
import type { Product } from "../../../types";
import { useEffect, useState, useCallback } from "react";

export function useProducts() {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await getProducts();
        if (active) setData(result);
      } catch {
        if (active) setError("Error al cargar los datos.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [getProducts]);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getProducts());
    } catch {
      setError("Error al cargar los datos.");
    } finally {
      setLoading(false);
    }
  }, [getProducts]);

  return { data, loading, error, reload };
}