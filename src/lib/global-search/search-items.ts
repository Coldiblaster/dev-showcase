// Dados base para busca global (sem textos)
export const searchItems = [
  {
    id: "1",
    i18nKey: "portfolio",
    type: "project",
    url: "#projects",
    tags: ["nextjs", "i18n", "portfolio"],
    category: "portfolio",
    relevance: 10,
  },
  {
    id: "2",
    i18nKey: "authSystem",
    type: "project",
    url: "#projects",
    tags: ["auth", "supabase", "projeto"],
    category: "auth",
    relevance: 8,
  },
  {
    id: "3",
    i18nKey: "i18nCustom",
    type: "implementation",
    url: "/i18n",
    tags: ["i18n", "context", "react"],
    category: "implementation",
    relevance: 7,
  },
  {
    id: "4",
    i18nKey: "framerMotion",
    type: "implementation",
    url: "#experience",
    tags: ["framer-motion", "animation"],
    category: "animation",
    relevance: 6,
  },
  {
    id: "5",
    i18nKey: "aiTips",
    type: "guide",
    url: "/tips",
    tags: ["ai", "copilot", "vercel"],
    category: "guide",
    relevance: 9,
  },
  {
    id: "6",
    i18nKey: "tailwindTips",
    type: "guide",
    url: "/tailwind-tips",
    tags: ["tailwind", "shadcn", "nextjs"],
    category: "guide",
    relevance: 8,
  },
] as const;

export type SearchItemI18nKey = (typeof searchItems)[number]["i18nKey"];
