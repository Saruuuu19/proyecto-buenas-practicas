import { useCallback, useEffect, useState } from "react";

export function useApi<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await fetcher();
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
  }, [fetcher]);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetcher());
    } catch {
      setError("Error al cargar los datos.");
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  return { data, loading, error, reload };
}