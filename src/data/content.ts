export type ContentItem = {
  slug: string;
  title: string;
  description: string;
  component: string;
  category: "implementation" | "guide";
};

export const CONTENT_ITEMS: ContentItem[] = [
  {
    slug: "i18n",
    title: "i18n Showcase",
    description: "Internacionalização com next-intl e DeepL",
    component: "I18nShowcase",
    category: "implementation",
  },
  {
    slug: "seo",
    title: "SEO Showcase",
    description: "Meta tags, Open Graph, JSON-LD, Sitemap e mais",
    component: "SeoShowcase",
    category: "implementation",
  },
  {
    slug: "ai-tips",
    title: "Dicas de IA",
    description: "v0, Copilot, Prompts e ferramentas de IA",
    component: "AITips",
    category: "guide",
  },
  {
    slug: "tailwind-tips",
    title: "Tailwind + shadcn/ui",
    description: "Setup, componentes e boas práticas",
    component: "TailwindTips",
    category: "guide",
  },
  {
    slug: "react-query-tips",
    title: "React Query Essencial",
    description: "Cache, mutations, otimização e boas práticas",
    component: "ReactQueryTips",
    category: "guide",
  },
  {
    slug: "dev-resources",
    title: "Recursos para Desenvolvedores",
    description:
      "Componentes ao vivo, snippets, refatoração e playground interativo.",
    component: "DevResourcesPage",
    category: "guide",
  },
];

export function getContentBySlug(slug: string) {
  return CONTENT_ITEMS.find((item) => item.slug === slug);
}

export function getContentByCategory(category: "implementation" | "guide") {
  return CONTENT_ITEMS.filter((item) => item.category === category);
}
