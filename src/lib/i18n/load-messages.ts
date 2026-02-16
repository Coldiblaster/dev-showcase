/**
 * Namespaces usados pelo NextIntl.
 *
 * Arquivos diretos: auth, global, components, errors, welcome
 * Módulos (pastas): admin, consultor, cockpit, auditor, governance, etc
 */
// Atualize os namespaces conforme os arquivos em messages/pt/
const NAMESPACES = [
  "nav",
  "contact",
  "hero",
  "about",
  "projects",
  "experience",
  "ai",
  "footer",
  "i18nPage",
  "tailwindTipsPage",
] as const;

/**
 * Carrega todos os arquivos JSON de namespace para a localidade informada.
 *
 * Para adicionar um novo namespace:
 * 1. Crie os arquivos JSON em messages/{locale}/{namespace}.json
 * 2. Adicione o namespace em NAMESPACES acima
 * 3. Adicione a importação em messages/{locale}/index.ts
 *
 * @param locale Identificador de localidade, ex: 'pt-BR' ou 'en'
 */
export async function loadMessages(
  locale: string,
): Promise<Record<string, unknown>> {
  try {
    // Dynamic import do barrel file por locale
    // Suporta pt, en, etc. (não mais pt-BR)
    const messages = await import(`@/../messages/${locale}/index`);
    return messages.default;
  } catch {
    // Fallback para pt se o locale não existir
    const fallback = await import("@/../messages/pt-BR/index");
    return fallback.default;
  }
}

export { NAMESPACES };
