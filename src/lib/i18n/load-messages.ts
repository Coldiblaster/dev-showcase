/**
 * Namespaces usados pelo NextIntl.
 * Correspondem aos arquivos JSON em messages/pt-BR/.
 */
const NAMESPACES = [
  "about",
  "changelogPage",
  "codeEvolutionPage",
  "ai",
  "analyticsPage",
  "aiChatbotPage",
  "aiInnovation",
  "chat",
  "codeReviewPage",
  "contact",
  "contactFormPage",
  "accessibilityPage",
  "apiDocsPage",
  "architecturePage",
  "contributePage",
  "designSystemPage",
  "devResourcesData",
  "devResourcesPage",
  "experience",
  "footer",
  "githubStats",
  "gitWorkflow",
  "global",
  "hero",
  "homeStack",
  "homeStats",
  "i18nPage",
  "i18nShowcase",
  "implementations",
  "jsonPage",
  "nav",
  "nextjsAppRouterPage",
  "notFound",
  "cookieBanner",
  "portfolio",
  "projects",
  "privacyPage",
  "privacyTipsPage",
  "reactPatterns",
  "reactQueryTipsPage",
  "regexPage",
  "stateManagementPage",
  "search",
  "securityPage",
  "seoPage",
  "tailwindTips",
  "tailwindTipsPage",
  "testingPage",
  "techStackPage",
  "terminal",
  "tips",
  "tipsPage",
  "tsPatterns",
  "viewSource",
] as const;

/**
 * Carrega todos os arquivos JSON de namespace para a localidade informada.
 *
 * Para adicionar um novo namespace:
 * 1. Crie o JSON em messages/pt-BR/{namespace}.json
 * 2. Adicione o namespace em NAMESPACES acima
 * 3. Adicione a importação em messages/{locale}/index.ts
 * 4. Registre em src/lib/i18n/types.d.ts
 *
 * @param locale Identificador de localidade, ex: 'pt-BR' ou 'en'
 */
export async function loadMessages(
  locale: string,
): Promise<Record<string, unknown>> {
  try {
    const messages = await import(`@/../messages/${locale}/index`);
    return messages.default;
  } catch {
    const fallback = await import("@/../messages/pt-BR/index");
    return fallback.default;
  }
}

export { NAMESPACES };
