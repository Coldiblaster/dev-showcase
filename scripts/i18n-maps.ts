import type { ProviderName } from "./translators/translator";

/**
 * Locales de destino utilizados pelo pipeline de tradução.
 * Adicione mais quando for necessário gerar outros idiomas.
 */
export const TARGET_LOCALES = ["de", "en", "es", "pt"] as const;

/**
 * Mapas específicos do DeepL: de idioma lógico para o código esperado pelo DeepL.
 */
export const DEEPL_TARGET_MAP: Record<string, string> = {
  en: "EN-US",
  es: "ES",
  de: "DE",
  pt: "PT",
};

/**
 * Mapas genéricos para outros provedores.
 */
export const GENERIC_TARGET_MAP: Record<string, string> = {
  en: "en",
  es: "es",
  de: "de",
  pt: "pt",
};

/**
 * Converte um idioma lógico para o código específico do provedor.
 * @param provider Nome do provedor (deepl | google)
 * @param target Idioma lógico como 'en' ou 'es'
 */
export function providerTargetCode(
  provider: ProviderName,
  target: string,
): string {
  if (provider === "deepl") return DEEPL_TARGET_MAP[target] ?? target;
  return GENERIC_TARGET_MAP[target] ?? target;
}

/**
 * Converte uma localidade de origem para o formato esperado pelo provedor.
 * Mantenha este mapeamento simples; a maioria dos provedores aceita strings de localidade.
 * @param provider Nome do provedor
 * @param source Localidade de origem (ex: 'pt-BR')
 */
export function providerSourceCode(
  provider: ProviderName,
  source: string,
): string {
  if (provider === "deepl") {
    const DEEPL_SOURCE_MAP: Record<string, string> = {
      "pt-BR": "PT-BR",
      pt: "PT-BR",
    };
    return DEEPL_SOURCE_MAP[source] ?? source;
  }
  return source;
}
