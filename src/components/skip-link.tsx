"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("global");

  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-200 -translate-y-[200%] rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
    >
      {t("skipToContent")}
    </a>
  );
}
