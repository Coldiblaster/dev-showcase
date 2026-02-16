// Lista de itens de busca (sem textos)
import { SearchItem, SearchTexts } from "./global-search-helper";

export const searchItems: SearchItem[] = [
  {
    id: "1",
    i18nKey: "portfolio",
    type: "project",
    url: "#projects",
  },
  {
    id: "2",
    i18nKey: "authSystem",
    type: "project",
    url: "#projects",
  },
  {
    id: "3",
    i18nKey: "i18nCustom",
    type: "implementation",
    url: "/i18n",
  },
  {
    id: "4",
    i18nKey: "framerMotion",
    type: "implementation",
    url: "#experience",
  },
  {
    id: "5",
    i18nKey: "aiTips",
    type: "guide",
    url: "/tips",
  },
  {
    id: "6",
    i18nKey: "tailwindTips",
    type: "guide",
    url: "/tailwind-tips",
  },
];

// Textos por idioma (exemplo para pt-BR)
export const searchTexts_ptBR: SearchTexts = {
  portfolio: {
    title: "Portfolio com i18n",
    description:
      "Portfolio multilíngue com Next.js 16, TypeScript e Tailwind CSS",
  },
  authSystem: {
    title: "Sistema de Autenticação",
    description:
      "Auth completo com Supabase, proteção de rotas e gestão de sessão",
  },
  i18nCustom: {
    title: "i18n sem bibliotecas",
    description:
      "Sistema de internacionalização customizado usando Context API",
  },
  framerMotion: {
    title: "Animações com Framer Motion",
    description: "Scroll animations, page transitions e micro-interactions",
  },
  aiTips: {
    title: "Dicas de IA",
    description: "Como uso GitHub Copilot, v0 e Vercel AI SDK no dia a dia",
  },
  tailwindTips: {
    title: "Tailwind CSS + shadcn/ui",
    description: "Setup, componentes e boas práticas em projetos Next.js",
  },
};

// Adicione outros idiomas conforme necessário
