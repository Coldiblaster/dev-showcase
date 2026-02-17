import { useCallback } from "react";

type GetParams = () => Record<string, string>;
type SetParam = (key: string, value: string) => void;

/**
 * Hook para ler e atualizar parâmetros de query na URL do browser.
 *
 * `getParams` não é reativo — retorna os parâmetros da URL no momento da chamada.
 * `setParam` atualiza a URL via `history.replaceState` sem recarregar a página.
 *
 * @returns Tupla [getParams, setParam]
 *
 * @example
 * ```tsx
 * const [getParams, setParam] = useQueryParams();
 * const { tab } = getParams();
 * setParam("tab", "settings");
 * ```
 */
export function useQueryParams(): readonly [GetParams, SetParam] {
  const getParams: GetParams = useCallback(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    const obj: Record<string, string> = {};
    params.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, []);

  const setParam: SetParam = useCallback((key: string, value: string) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, []);

  return [getParams, setParam] as const;
}
