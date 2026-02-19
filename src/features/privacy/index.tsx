"use client";

import { useTranslations } from "next-intl";

import { PrivacyContent } from "./privacy-content";
import { PrivacyHero } from "./privacy-hero";

/** Página de política de privacidade e cookies. */
export function PrivacyPage() {
  const t = useTranslations("privacyPage.hero");
  return (
    <main id="main" className="min-h-screen" aria-label={t("title")}>
      <PrivacyHero />
      <PrivacyContent />
    </main>
  );
}
