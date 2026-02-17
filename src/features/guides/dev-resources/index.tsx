"use client";

import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

import { HeroSection } from "@/components/hero-section";

import { BeforeAfterSection } from "./before-after-section";
import { CodeSnippetsSection } from "./code-snippets-section";
import { LiveComponentsSection } from "./live-components-section";

export function DevResourcesPage() {
  const t = useTranslations("devResourcesPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={BookOpen}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
      />

      <LiveComponentsSection />
      <CodeSnippetsSection />
      <BeforeAfterSection />
    </div>
  );
}
