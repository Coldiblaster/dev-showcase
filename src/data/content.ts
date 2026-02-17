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
    slug: "code-review",
    title: "AI Code Reviewer — Análise de Código com IA",
    description:
      "Cole seu código e receba análise profissional com GPT-4o Mini: bugs, performance, segurança, boas práticas e score de qualidade.",
    component: "CodeReviewShowcase",
    category: "tool",
  },
  {
    slug: "ai-tips",
    title: "Dicas de IA para Desenvolvedores",
    description:
      "Guia prático de ferramentas IA: v0 by Vercel, GitHub Copilot, prompt engineering e ferramentas essenciais para produtividade dev.",
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
];

export function getContentBySlug(slug: string) {
  return CONTENT_ITEMS.find((item) => item.slug === slug);
}

export function getContentByCategory(category: ContentCategory) {
  return CONTENT_ITEMS.filter((item) => item.category === category);
}
