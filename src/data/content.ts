export type ContentCategory = "implementation" | "guide" | "tool";

export type ContentItem = {
  slug: string;
  title: string;
  description: string;
  component: string;
  category: ContentCategory;
};

export const CONTENT_ITEMS: ContentItem[] = [
  {
    slug: "i18n",
    title: "i18n Showcase — Internacionalização com Next.js",
    description:
      "Implementação real de internacionalização (i18n) com next-intl e DeepL. Demo ao vivo com 4 idiomas, traduções tipadas, formatação de datas e moedas.",
    component: "I18nShowcase",
    category: "implementation",
  },
  {
    slug: "seo",
    title: "SEO Showcase — Otimização para Next.js",
    description:
      "Guia completo de SEO com Next.js: Meta tags, Open Graph dinâmico, JSON-LD estruturado, Sitemap, Robots e comparativo Next.js vs React+Vite.",
    component: "SeoShowcase",
    category: "implementation",
  },
  {
    slug: "ai-chatbot",
    title: "AI Chatbot com OpenAI e Vercel AI SDK",
    description:
      "Como criar um chatbot IA com streaming usando OpenAI, Vercel AI SDK e Next.js App Router. System prompt, pricing e arquitetura completa.",
    component: "AiChatbotShowcase",
    category: "implementation",
  },
  {
    slug: "analytics",
    title: "Analytics com Upstash Redis — Métricas ao vivo",
    description:
      "Como implementar contagem de page views e visitantes únicos com Upstash Redis, HyperLogLog, rate limiting e filtro de bots. Passo a passo para o dev.",
    component: "AnalyticsShowcase",
    category: "implementation",
  },
  {
    slug: "testing",
    title: "Testing Showcase — Vitest e Testing Library",
    description:
      "Como este projeto estrutura testes: pastas, exemplos de componente e hook, mocks e checklist do que testar primeiro. Para devs que querem replicar no próprio projeto.",
    component: "TestingShowcase",
    category: "implementation",
  },
  {
    slug: "code-review",
    title: "AI Code Reviewer — Análise de Código com IA",
    description:
      "Cole seu código e receba análise profissional com GPT-4o Mini: bugs, performance, segurança, boas práticas e score de qualidade.",
    component: "CodeReviewShowcase",
    category: "tool",
  },
  {
    slug: "regex",
    title: "Regex Playground — Editor Interativo de Regex",
    description:
      "Editor de expressões regulares com highlight em tempo real, biblioteca de patterns prontos e cheat sheet completo.",
    component: "RegexPlayground",
    category: "tool",
  },
  {
    slug: "ai-tips",
    title: "Dicas de IA para Desenvolvedores",
    description:
      "Guia prático de ferramentas IA, uso consciente de tokens e modelos: v0, Copilot, prompt engineering, boas práticas e ferramentas para produtividade dev.",
    component: "AITips",
    category: "guide",
  },
  {
    slug: "tailwind-tips",
    title: "Tailwind CSS + shadcn/ui — Guia Prático",
    description:
      "Setup completo, componentes reutilizáveis, padrões de código e boas práticas com Tailwind CSS e shadcn/ui para projetos React e Next.js.",
    component: "TailwindTips",
    category: "guide",
  },
  {
    slug: "react-query-tips",
    title: "React Query Essencial — Cache e Mutations",
    description:
      "Guia completo de TanStack Query (React Query): cache inteligente, mutations, invalidação, otimistic updates e boas práticas para apps React.",
    component: "ReactQueryTips",
    category: "guide",
  },
  {
    slug: "dev-resources",
    title: "Recursos para Desenvolvedores — Jr, Pleno e Senior",
    description:
      "Snippets, comparações before/after, padrões de código e playground interativo filtrado por nível: junior, pleno e senior.",
    component: "DevResourcesPage",
    category: "guide",
  },
  {
    slug: "security-tips",
    title: "Segurança Frontend & Backend — Guia Completo",
    description:
      "Proteções reais em produção: Rate Limiting, reCAPTCHA v3, Honeypot, Zod Validation, Security Headers e variáveis de ambiente seguras.",
    component: "SecurityTips",
    category: "guide",
  },
  {
    slug: "privacy-tips",
    title: "Privacidade e Cookies — Guia para Devs",
    description:
      "LGPD, consentimento de cookies, banner no padrão mercado, política de privacidade e boas práticas para proteger o usuário e estar em conformidade.",
    component: "PrivacyTips",
    category: "guide",
  },
  {
    slug: "typescript-patterns",
    title: "TypeScript Patterns — Utility Types, Generics e Mais",
    description:
      "Referência prática com exemplos interativos de Utility Types, Generics, Type Narrowing e patterns avançados de TypeScript.",
    component: "TsPatterns",
    category: "guide",
  },
  {
    slug: "git-workflow",
    title: "Git Workflow & Cheat Sheet",
    description:
      "Guia completo de Git: estratégias de branching, conventional commits, comandos essenciais e fluxos de trabalho profissionais.",
    component: "GitWorkflow",
    category: "guide",
  },
  {
    slug: "react-patterns",
    title: "React Design Patterns — Composição, Hooks e Performance",
    description:
      "Compound Components, Custom Hooks, Render Props, HOCs e patterns de performance com exemplos práticos.",
    component: "ReactPatterns",
    category: "guide",
  },
  {
    slug: "nextjs-app-router",
    title: "Next.js App Router — Routing, Server Components e Data Fetching",
    description:
      "Guia prático do App Router: pastas como rotas, layouts, Server vs Client Components, data fetching e loading/error boundaries. Exemplos replicáveis.",
    component: "NextjsAppRouter",
    category: "guide",
  },
  {
    slug: "json",
    title: "JSON Formatter & Validator",
    description:
      "Formate e valide JSON no navegador: pretty print, minify e mensagens de erro claras por linha. Útil para APIs e configs.",
    component: "JsonTool",
    category: "tool",
  },
  {
    slug: "code-evolution",
    title: "Evolução de Código — De Legado a Best Practice",
    description:
      "Veja como um código evolui da versão inicial até a melhor prática atual, commit por commit. React Lifecycle, State Management e mais exemplos animados.",
    component: "CodeEvolution",
    category: "guide",
  },
  {
    slug: "arch-map",
    title: "Arquitetura de Software — Mapas Interativos",
    description:
      "Explore arquiteturas de projetos reais de forma visual e interativa. E-commerce SaaS, Real-time Dashboard e mais — clique nos nodes para entender cada camada.",
    component: "ArchMap",
    category: "guide",
  },
  {
    slug: "state-management",
    title: "Estado no React — useState, Context e libs",
    description:
      "Quando usar estado local, Context ou Zustand/Redux. Fluxo de dados, prop drilling e exemplos replicáveis para dev júnior e pleno.",
    component: "StateManagement",
    category: "guide",
  },
  {
    slug: "contact-form",
    title: "Formulário de Contato — API, Resend e Validação",
    description:
      "Como este projeto implementa o formulário de contato: API route, validação com Zod, rate limit, reCAPTCHA e envio com Resend. Passo a passo para replicar.",
    component: "ContactFormShowcase",
    category: "implementation",
  },
];

export function getContentBySlug(slug: string) {
  return CONTENT_ITEMS.find((item) => item.slug === slug);
}

export function getContentByCategory(category: ContentCategory) {
  return CONTENT_ITEMS.filter((item) => item.category === category);
}
