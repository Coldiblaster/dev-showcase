import dynamic from "next/dynamic";

/**
 * Mapeamento de componentes com lazy loading.
 * Cada rota carrega apenas o bundle do seu componente.
 *
 * Ao adicionar nova página: registre em data/content.ts e adicione aqui.
 * Convenção: componente PascalCase, path kebab-case.
 */
export const COMPONENT_MAP: Record<string, React.ComponentType<unknown>> = {
  I18nShowcase: dynamic(() =>
    import("@/features/implementations/i18n-showcase").then(
      (m) => m.I18nShowcase,
    ),
  ),
  SeoShowcase: dynamic(() =>
    import("@/features/implementations/seo-showcase").then(
      (m) => m.SeoShowcase,
    ),
  ),
  AiChatbotShowcase: dynamic(() =>
    import("@/features/implementations/ai-chatbot-showcase").then(
      (m) => m.AiChatbotShowcase,
    ),
  ),
  AnalyticsShowcase: dynamic(() =>
    import("@/features/implementations/analytics-showcase").then(
      (m) => m.AnalyticsShowcase,
    ),
  ),
  TestingShowcase: dynamic(() =>
    import("@/features/implementations/testing-showcase").then(
      (m) => m.TestingShowcase,
    ),
  ),
  CodeReviewShowcase: dynamic(() =>
    import("@/features/implementations/code-review").then(
      (m) => m.CodeReviewShowcase,
    ),
  ),
  AITips: dynamic(() =>
    import("@/features/guides/ai-tips").then((m) => m.AITips),
  ),
  TailwindTips: dynamic(() =>
    import("@/features/guides/tailwind-tips").then((m) => m.TailwindTips),
  ),
  ReactQueryTips: dynamic(() =>
    import("@/features/guides/react-query-tips").then((m) => m.ReactQueryTips),
  ),
  DevResourcesPage: dynamic(() =>
    import("@/features/guides/dev-resources").then((m) => m.DevResourcesPage),
  ),
  SecurityTips: dynamic(() =>
    import("@/features/guides/security-tips").then((m) => m.SecurityTips),
  ),
  PrivacyTips: dynamic(() =>
    import("@/features/guides/privacy-tips").then((m) => m.PrivacyTips),
  ),
  RegexPlayground: dynamic(() =>
    import("@/features/implementations/regex-playground").then(
      (m) => m.RegexPlayground,
    ),
  ),
  TsPatterns: dynamic(() =>
    import("@/features/guides/ts-patterns").then((m) => m.TsPatterns),
  ),
  GitWorkflow: dynamic(() =>
    import("@/features/guides/git-workflow").then((m) => m.GitWorkflow),
  ),
  ReactPatterns: dynamic(() =>
    import("@/features/guides/react-patterns").then((m) => m.ReactPatterns),
  ),
  NextjsAppRouter: dynamic(() =>
    import("@/features/guides/nextjs-app-router").then(
      (m) => m.NextjsAppRouter,
    ),
  ),
  JsonTool: dynamic(() =>
    import("@/features/implementations/json-tool").then((m) => m.JsonTool),
  ),
  CodeEvolution: dynamic(() =>
    import("@/features/guides/code-evolution").then((m) => m.CodeEvolution),
  ),
  ArchMap: dynamic(() =>
    import("@/features/guides/arch-map").then((m) => m.ArchMap),
  ),
  StateManagement: dynamic(() =>
    import("@/features/guides/state-management").then((m) => m.StateManagement),
  ),
  ContactFormShowcase: dynamic(() =>
    import("@/features/implementations/contact-showcase").then(
      (m) => m.ContactFormShowcase,
    ),
  ),
  ApiSecurityGuide: dynamic(() =>
    import("@/features/guides/api-security").then((m) => m.ApiSecurityGuide),
  ),
  DesignPatternsGuide: dynamic(() =>
    import("@/features/guides/design-patterns").then(
      (m) => m.DesignPatternsGuide,
    ),
  ),
  A11yGuide: dynamic(() =>
    import("@/features/guides/a11y-guide").then((m) => m.A11yGuide),
  ),
  PRGenerator: dynamic(() =>
    import("@/features/implementations/pr-generator").then(
      (m) => m.PRGenerator,
    ),
  ),
  GithubAnalyzer: dynamic(() =>
    import("@/features/implementations/github-analyzer").then(
      (m) => m.GithubAnalyzer,
    ),
  ),
};
