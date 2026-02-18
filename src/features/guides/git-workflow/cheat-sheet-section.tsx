"use client";

import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CardBlur } from "@/components/ui/card-blur";

interface AliasItem {
  alias: string;
  command: string;
  description: string;
}

interface UsefulItem {
  command: string;
  description: string;
}

export function CheatSheetSection() {
  const t = useTranslations("gitWorkflow.cheatSheet");
  const aliases = t.raw("aliases") as AliasItem[];
  const useful = t.raw("useful") as UsefulItem[];

  return (
    <section id="cheat-sheet" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <Zap className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("title")}
              </h2>
              <p className="font-mono text-sm text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("description")}
          </p>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2">
          <AnimatedSection delay={0.1}>
            <CardBlur className="h-full">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                {t("aliasesTitle")}
              </h3>
              <div className="flex flex-col gap-3">
                {aliases.map((item) => (
                  <div
                    key={item.alias}
                    className="rounded-lg bg-secondary/30 p-3"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <code className="font-mono text-xs font-semibold text-primary">
                        {item.alias}
                      </code>
                      <span className="text-[10px] text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                    <code className="block font-mono text-[10px] text-muted-foreground/70">
                      {item.command}
                    </code>
                  </div>
                ))}
              </div>
            </CardBlur>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <CardBlur className="h-full">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                {t("usefulTitle")}
              </h3>
              <div className="flex flex-col gap-2">
                {useful.map((item) => (
                  <div
                    key={item.command}
                    className="flex items-baseline gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary/50"
                  >
                    <code className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] font-medium text-primary">
                      {item.command}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </CardBlur>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
