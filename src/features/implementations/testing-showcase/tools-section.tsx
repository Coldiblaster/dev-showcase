"use client";

import { Package } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type ToolItem = {
  name: string;
  role: string;
  description: string;
  variant: "weUse" | "alternative";
};

export function ToolsSection() {
  const t = useTranslations("testingPage.tools");
  const items = t.raw("items") as ToolItem[];

  return (
    <section
      id="tools"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="tools-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="tools-heading">
            <SectionHeader
              icon={Package}
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <AnimatedSection key={item.name} delay={0.1 + i * 0.05}>
              <Card className="h-full border-border/50 transition-colors hover:border-primary/30">
                <CardContent className="flex flex-col gap-3 p-4 md:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {item.name}
                    </span>
                    <Badge
                      variant={
                        item.variant === "weUse" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {item.variant === "weUse"
                        ? t("weUse")
                        : t("alternatives")}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-primary/90">
                    {item.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
