"use client";

import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReadingTimeProps {
  minutes: number;
}

/** Badge com tempo estimado de leitura do conteúdo. */
export function ReadingTime({ minutes }: ReadingTimeProps) {
  const t = useTranslations("global");

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
      <Clock className="h-3 w-3 shrink-0" />
      {t("readingTime", { minutes })}
    </span>
  );
}
