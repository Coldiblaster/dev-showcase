"use client";

import { Github, Regex } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { SectionNav } from "@/components/section-nav";
import { Button } from "@/components/ui/button";
import { REPOS } from "@/lib/constants";

import { CheatSheet } from "./cheat-sheet";
import { PatternsLibrary } from "./patterns-library";
import { RegexEditor } from "./regex-editor";

export function RegexPlayground() {
  const t = useTranslations("regexPage");
  const [injection, setInjection] = useState<{
    regex: string;
    test: string;
  } | null>(null);

  const handleSelectPattern = useCallback((regex: string, test: string) => {
    setInjection({ regex, test });
    document.getElementById("editor")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Regex}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/ferramentas"
      />

      <SectionNav
        sections={[
          { id: "editor", label: t("sectionNav.editor") },
          { id: "patterns", label: t("sectionNav.patterns") },
          { id: "cheat-sheet", label: t("sectionNav.cheatSheet") },
        ]}
        triggerId="editor"
      />

      <RegexEditor
        injection={injection}
        onInjectionConsumed={() => setInjection(null)}
      />
      <PatternsLibrary onSelectPattern={handleSelectPattern} />
      <CheatSheet />

      <CTASection
        icon={Regex}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.back")}
        buttonHref="/ferramentas"
        secondaryButton={
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a
              href={REPOS.devShowcase}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        }
      />
    </div>
  );
}
