import { useCallback } from "react";

/**
 * Hook para ler e atualizar parâmetros de query na URL do browser.
 * Uso: const [params, setParam] = useQueryParams();
 */
export function useQueryParams() {
  const getParams = useCallback(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    const obj: Record<string, string> = {};
    params.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, []);

  const setParam = useCallback((key: string, value: string) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, []);

  return [getParams, setParam] as const;
}
