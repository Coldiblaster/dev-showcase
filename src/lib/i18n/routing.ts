import { DEFAULT_LOCALE, type Locale, SUPPORTED_LOCALES } from "./config";

/**
 * Configuração de roteamento para next-intl.
 * Define os locales suportados e o locale padrão.
 */
export const routing = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
} as const;

export type { Locale };
