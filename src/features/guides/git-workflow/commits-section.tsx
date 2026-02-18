"use client";

import { GitCommitHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { CardBlur } from "@/components/ui/card-blur";

interface CommitType {
  type: string;
  description: string;
  example: string;
  color: string;
}

const COLOR_MAP: Record<string, string> = {
  green: "border-green-500/30 bg-green-500/10 text-green-400",
  red: "border-red-500/30 bg-red-500/10 text-red-400",
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  orange: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  yellow: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  gray: "border-gray-500/30 bg-gray-500/10 text-gray-400",
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
};

export function CommitsSection() {
  const t = useTranslations("gitWorkflow.commits");
  const types = t.raw("types") as CommitType[];
  const tips = t.raw("tips") as string[];

  return (
    <section id="commits" className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <GitCommitHorizontal className="h-5 w-5 text-blue-500" />
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
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("description")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <span className="text-xs font-medium text-muted-foreground">
              {t("formatLabel")}:
            </span>
            <code className="ml-2 font-mono text-sm font-bold text-primary">
              {t("format")}
            </code>
          </div>
        </AnimatedSection>

        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((item, i) => (
            <AnimatedSection key={item.type} delay={0.1 + i * 0.03}>
              <CardBlur className="h-full" padding="p-4">
                <Badge
                  variant="outline"
                  className={`mb-2 font-mono text-xs ${COLOR_MAP[item.color] ?? ""}`}
                >
                  {item.type}
                </Badge>
                <p className="mb-2 text-xs text-muted-foreground">
                  {item.description}
                </p>
                <code className="block truncate rounded bg-secondary/50 px-2 py-1 font-mono text-[10px] text-foreground/70">
                  {item.example}
                </code>
              </CardBlur>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <CardBlur>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {t("tipsTitle")}
            </h3>
            <ul className="flex flex-col gap-2">
              {tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <span className="mt-0.5 text-primary">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </CardBlur>
        </AnimatedSection>
      </div>
    </section>
  );
}
