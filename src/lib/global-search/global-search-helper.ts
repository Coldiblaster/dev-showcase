import Fuse from "fuse.js";
import { Book, FileCode, Lightbulb } from "lucide-react";

import type searchI18n from "@/../messages/pt-BR/search.json";

import { GlobalSearchResult } from "../../components/global-search";

type SearchI18n = typeof searchI18n;

export type SearchItem = {
  id: string;
  i18nKey: keyof SearchI18n;
  type: "project" | "implementation" | "guide";
  url: string;
  tags?: string[];
  category?: string;
  relevance?: number;
};

export type SearchTexts = {
  [i18nKey: string]: {
    title: string;
    description: string;
  };
};

export const typeConfig = (labels: {
  project: string;
  implementation: string;
  guide: string;
}) => ({
  project: {
    icon: FileCode,
    label: labels.project,
    color: "bg-primary/10 text-primary",
  },
  implementation: {
    icon: Lightbulb,
    label: labels.implementation,
    color: "bg-chart-4/10 text-chart-4",
  },
  guide: {
    icon: Book,
    label: labels.guide,
    color: "bg-accent/10 text-accent",
  },
});

export function createFuse(
  searchItems: SearchItem[],
  searchTexts: SearchTexts,
) {
  // Monta os resultados com textos traduzidos
  const results = searchItems.map((item) => ({
    ...item,
    title: searchTexts[item.i18nKey]?.title || String(item.i18nKey),
    description: searchTexts[item.i18nKey]?.description || "",
  }));

  // Configuração do Fuse.js
  const fuse = new Fuse(results, {
    keys: ["title", "description", "tags", "category"],
    threshold: 0.3,
    ignoreLocation: true,
  });

  // Função de busca
  function search(query: string): GlobalSearchResult[] {
    if (!query.trim()) return [];
    return fuse.search(query).map((result) => result.item);
  }

  return { search, results };
}

// Exemplo de uso:
// import { createFuse } from "./global-search-helper";
// const { search, results } = createFuse(searchItems, searchTexts, locale);
// const filtered = search(query);
