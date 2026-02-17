import { Book, Home, Lightbulb, Wrench } from "lucide-react";

import type { SearchResultType } from "./types";

export function getTypeConfig(labels: Record<SearchResultType, string>) {
  return {
    page: {
      icon: Home,
      label: labels.page,
      color: "bg-primary/10 text-primary",
    },
    section: {
      icon: Home,
      label: labels.section,
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
    tool: {
      icon: Wrench,
      label: labels.tool,
      color: "bg-chart-2/10 text-chart-2",
    },
  } as const;
}

export type TypeConfigMap = ReturnType<typeof getTypeConfig>;
