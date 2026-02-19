/**
 * Objeto central de configuração de idiomas suportados.
 * Adicione novos idiomas aqui para refletir em toda a aplicação.
 * name: Nome amigável, flag: emoji/bandeira.
 */
export const LOCALES_CONFIG = {
  "pt-BR": { name: "Português (Brasil)", code: "br" },
  en: { name: "English", code: "us" },
  de: { name: "Deutsch", code: "de" },
  es: { name: "Español", code: "es" },
} as const;

/**
 * Lista de locales suportados (ex: ["pt-BR", "en", ...])
 */
export const SUPPORTED_LOCALES = Object.keys(LOCALES_CONFIG) as Array<
  keyof typeof LOCALES_CONFIG
>;

/**
 * Tipo utilitário para locale suportado.
 */
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Nome amigável para cada locale.
 * Ex: localeDisplayName['en'] => 'English'
 */
export const localeDisplayName: Record<Locale, string> = Object.fromEntries(
  Object.entries(LOCALES_CONFIG).map(([k, v]) => [k, v.name]),
) as Record<Locale, string>;

/**
 * Short country/code sigla for each locale (e.g., 'br', 'us')
 */

/**
 * Short country/code sigla for each locale (e.g., 'br', 'us')
 */
export const localeCode: Record<Locale, string> = Object.fromEntries(
  Object.entries(LOCALES_CONFIG).map(([k, v]) => [
    k,
    (v as { code: string }).code,
  ]),
) as Record<Locale, string>;

/**
 * Lista simples de locales (útil para selects, etc)
 */
export const locales: Locale[] = [...SUPPORTED_LOCALES];

/**
 * Locale padrão da aplicação.
 */
export const DEFAULT_LOCALE: Locale = "pt-BR";

/**
 * Nome do cookie usado para persistir o locale escolhido.
 */
export const COOKIE_NAME = "devshowcase_locale";

/**
 * Valida se um valor é um locale suportado pela aplicação.
 * @param v Valor a ser validado
 * @returns true se o valor é um locale suportado, false caso contrário
 */
export function isSupportedLocale(v?: string): v is Locale {
  return SUPPORTED_LOCALES.includes(v as Locale);
}

/**
 * Retorna o nome do cookie usado para persistir o locale escolhido.
 * @returns Nome do cookie (devshowcase_locale)
 */
export function getCookieName(): string {
  return COOKIE_NAME;
}
