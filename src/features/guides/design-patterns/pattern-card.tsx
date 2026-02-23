"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";

interface PatternCardProps {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  realWorld: string;
  beforeCode: string;
  afterCode: string;
}

/** Card interativo que exibe o padrão com toggle antes/depois. */
export function PatternCard({
  id,
  name,
  category,
  tagline,
  description,
  realWorld,
  beforeCode,
  afterCode,
}: PatternCardProps) {
  const t = useTranslations("designPatternsPage");
  const [tab, setTab] = useState<"before" | "after">("before");

  return (
    <AnimatedSection>
      <div
        id={`pattern-${id}`}
        className="rounded-2xl border border-border bg-card/50 p-5 md:p-6"
      >
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h3 className="text-xl font-bold text-foreground">{name}</h3>
              <Badge
                variant="outline"
                className="border-primary/30 text-xs text-primary"
              >
                {category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>
        </div>

        <p className="mb-3 text-sm leading-relaxed text-foreground/80">
          {description}
        </p>

        <p className="mb-4 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">
            {t("patterns.realWorldLabel")}{" "}
          </span>
          {realWorld}
        </p>

        {/* Tabs antes/depois */}
        <div className="flex rounded-lg border border-border bg-secondary/30 p-0.5 w-fit mb-3">
          {(["before", "after"] as const).map((tab_) => (
            <button
              key={tab_}
              onClick={() => setTab(tab_)}
              className={`rounded-md px-4 py-1.5 text-xs font-medium transition-colors ${
                tab === tab_
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab_ === "before" ? t("patterns.before") : t("patterns.after")}
            </button>
          ))}
        </div>

        <CodeBlock
          code={tab === "before" ? beforeCode : afterCode}
          title={tab === "before" ? "before.ts" : "after.ts"}
        />
      </div>
    </AnimatedSection>
  );
}
