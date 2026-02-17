"use client";

import { Github, Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { CTASection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { PERSONAL } from "@/lib/constants";

export function SeoCta() {
  const t = useTranslations("seoPage");

  return (
    <CTASection
      icon={Search}
      title={t("cta.title")}
      description={t("cta.description")}
      buttonText={t("cta.back")}
      secondaryButton={
        <Button asChild variant="outline" size="lg" className="gap-2">
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            {t("cta.github")}
          </a>
        </Button>
      }
    />
  );
}
