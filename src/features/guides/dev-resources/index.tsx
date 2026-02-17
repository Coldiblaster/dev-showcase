"use client";

import { BookOpen, Github } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { PERSONAL } from "@/lib/constants";

import { BeforeAfterSection } from "./before-after-section";
import { CodeSnippetsSection } from "./code-snippets-section";
import { snippets } from "./data/code-snippets";
import { comparisons } from "./data/comparisons";
import { patternScenarios } from "./data/pattern-finder";
import { quickTips } from "./data/quick-tips";
import type { DevLevel, DevLevelFilter } from "./data/types";
import { LevelSelector } from "./level-selector";
import { PatternFinderSection } from "./pattern-finder-section";
import { QuickTipsSection } from "./quick-tips-section";
import { SectionNav } from "./section-nav";

function countByLevel(items: { level: DevLevel }[]): Record<DevLevel, number> {
  return {
    junior: items.filter((i) => i.level === "junior").length,
    pleno: items.filter((i) => i.level === "pleno").length,
    senior: items.filter((i) => i.level === "senior").length,
  };
}

export function DevResourcesPage() {
  const t = useTranslations("devResourcesPage");
  const [level, setLevel] = useState<DevLevelFilter>("all");

  const handleLevelChange = useCallback((newLevel: DevLevelFilter) => {
    setLevel(newLevel);
  }, []);

  const counts = useMemo(() => {
    const allItems = [
      ...snippets.map((s) => ({ level: s.level })),
      ...comparisons.map((c) => ({ level: c.level })),
      ...quickTips.map((t) => ({ level: t.level })),
      ...patternScenarios.map((p) => ({ level: p.level })),
    ];
    return countByLevel(allItems);
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={BookOpen}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
      />

      <SectionNav />

      <LevelSelector
        level={level}
        onLevelChange={handleLevelChange}
        counts={counts}
      />

      <QuickTipsSection level={level} />

      <div className="bg-muted/30">
        <CodeSnippetsSection level={level} />
      </div>

      <PatternFinderSection level={level} />

      <div className="bg-muted/30">
        <BeforeAfterSection level={level} />
      </div>

      <CTASection
        icon={BookOpen}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.projects")}
        secondaryButton={
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              {t("cta.github")}
            </a>
          </Button>
        }
      />
    </main>
  );
}
