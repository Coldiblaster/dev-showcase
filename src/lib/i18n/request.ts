import { cookies, headers } from "next/headers";
import type { Formats } from "next-intl";

import {
  COOKIE_NAME,
  DEFAULT_LOCALE,
  isSupportedLocale,
  type Locale,
  SUPPORTED_LOCALES,
} from "./config";

export {
  COOKIE_NAME,
  DEFAULT_LOCALE,
  isSupportedLocale,
  SUPPORTED_LOCALES,
  type Locale,
};

/**
 * Formatos globais para next-intl.
 * Define formatos reutilizáveis para datas, números e listas.
 */
export const formats = {
  dateTime: {
    short: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
    long: {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    },
    time: {
      hour: "numeric",
      minute: "numeric",
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
    currency: {
      style: "currency",
      currency: "BRL",
    },
  },
  list: {
    enumeration: {
      style: "long",
      type: "conjunction",
    },
  },
} satisfies Formats;

/**
 * Resolve o locale do usuário seguindo a ordem de prioridade:
 * 1. Cookie `safer_locale` (escolha explícita do usuário)
 * 2. Idioma do navegador via header `Accept-Language`
 * 3. Fallback para `pt-BR` (padrão)
 *
 * @returns Promise com o locale resolvido, garantido ser um valor suportado
 */
export async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(COOKIE_NAME)?.value;

  if (isSupportedLocale(cookieValue)) {
    return cookieValue;
  }

  // Detecta idioma do navegador como fallback antes do DEFAULT_LOCALE
  const browserLocale = await detectBrowserLocale();
  if (browserLocale) return browserLocale;

  return DEFAULT_LOCALE;
}

/**
 * Detecta o idioma preferido do navegador via headers Accept-Language.
 *
 * @returns Promise com o primeiro locale suportado encontrado ou null
 *
 * @example
 * // Header: "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
 * // Retorna: "pt-BR" (primeiro locale suportado)
 */
export async function detectBrowserLocale(): Promise<Locale | null> {
  try {
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");

    if (!acceptLanguage) return null;

    // Parse Accept-Language: "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"
    const locales = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim());

    for (const locale of locales) {
      // Match exato com região (ex: "pt-BR")
      if (isSupportedLocale(locale)) return locale;

      // Tenta sem região: "en-US" -> "en"
      const base = locale.split("-")[0];
      const matchedBase = SUPPORTED_LOCALES.find((supported) =>
        supported.startsWith(base),
      );
      if (matchedBase) return matchedBase;
    }
  } catch {
    // Contexto de servidor não disponível ou erro ao ler headers
  }
  return null;
}
