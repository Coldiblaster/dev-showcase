import { CONTENT_ITEMS } from "@/data/content";

import type { SearchResult } from "./types";

const CATEGORY_TO_TYPE = {
  implementation: "implementation",
  guide: "guide",
  tool: "tool",
} as const;

const CATEGORY_TO_PATH = {
  implementation: "/implementacoes",
  guide: "/dicas",
  tool: "/ferramentas",
} as const;

function buildContentSearchItems(): SearchResult[] {
  return CONTENT_ITEMS.map((item) => ({
    id: `content-${item.slug}`,
    titleKey: `items.${item.slug}.title`,
    descriptionKey: `items.${item.slug}.description`,
    type: CATEGORY_TO_TYPE[item.category],
    url: `${CATEGORY_TO_PATH[item.category]}/${item.slug}`,
    tags: buildTags(item.slug),
  }));
}

function buildTags(slug: string): string[] {
  const tagMap: Record<string, string[]> = {
    i18n: ["i18n", "next-intl", "internacionalização", "tradução", "deepl"],
    seo: ["seo", "meta tags", "open graph", "json-ld", "sitemap", "robots"],
    "ai-chatbot": [
      "ai",
      "chatbot",
      "openai",
      "gpt",
      "streaming",
      "assistente",
      "ia",
    ],
    "ai-tips": ["ia", "ai", "copilot", "chatgpt", "v0", "prompts"],
    "tailwind-tips": ["tailwind", "shadcn", "css", "ui", "componentes"],
    "react-query-tips": [
      "react query",
      "tanstack",
      "cache",
      "mutations",
      "estado",
    ],
    "dev-resources": [
      "recursos",
      "snippets",
      "componentes",
      "playground",
      "junior",
      "pleno",
      "senior",
    ],
    "security-tips": [
      "segurança",
      "security",
      "rate limiting",
      "recaptcha",
      "honeypot",
      "headers",
      "zod",
      "validação",
      "xss",
      "csrf",
    ],
    "code-review": [
      "code review",
      "ai",
      "ia",
      "análise",
      "bugs",
      "openai",
      "gpt",
      "reviewer",
      "qualidade",
    ],
  };
  return tagMap[slug] ?? [slug];
}

const HOME_SECTIONS: SearchResult[] = [
  {
    id: "home-about",
    titleKey: "items.about.title",
    descriptionKey: "items.about.description",
    type: "section",
    url: "/#about",
    tags: ["sobre", "about", "experiência", "frontend", "senior", "vinicius"],
  },
  {
    id: "home-projects",
    titleKey: "items.projects.title",
    descriptionKey: "items.projects.description",
    type: "section",
    url: "/#projects",
    tags: ["projetos", "github", "open source", "portfolio"],
  },
  {
    id: "home-experience",
    titleKey: "items.experience.title",
    descriptionKey: "items.experience.description",
    type: "section",
    url: "/#experience",
    tags: ["experiência", "carreira", "timeline", "empresas", "trabalho"],
  },
  {
    id: "home-contact",
    titleKey: "items.contact.title",
    descriptionKey: "items.contact.description",
    type: "section",
    url: "/#contact",
    tags: ["contato", "email", "whatsapp", "formulário"],
  },
];

export const SEARCH_ITEMS: SearchResult[] = [
  ...HOME_SECTIONS,
  ...buildContentSearchItems(),
];
