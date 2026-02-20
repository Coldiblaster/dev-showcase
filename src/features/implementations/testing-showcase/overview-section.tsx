"use client";

import { Beaker, FileCode, Layers, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";

const ICON_MAP = {
  Beaker,
  FileCode,
  Layers,
  Zap,
} as const;

export function OverviewSection() {
  const t = useTranslations("testingPage.overview");
  const items = t.raw("items") as Array<{
    icon: keyof typeof ICON_MAP;
    title: string;
    description: string;
  }>;

  return (
    <section
      id="overview"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="overview-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="overview-heading">
            <SectionHeader
              icon={Beaker}
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("description")}
          </p>
        </AnimatedSection>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Beaker;
            return (
              <AnimatedSection key={item.title} delay={0.1 + i * 0.05}>
                <Card className="h-full border-border/50 transition-colors hover:border-primary/30">
                  <CardContent className="flex gap-4 p-4 md:p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
