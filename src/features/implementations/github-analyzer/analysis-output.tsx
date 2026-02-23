"use client";

import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";

interface AnalysisOutputProps {
  summary: string;
  languages: string[];
  highlights: string[];
  advice: string;
}

/** Exibe a análise gerada pela IA do perfil GitHub. */
export function AnalysisOutput({
  summary,
  languages,
  highlights,
  advice,
}: AnalysisOutputProps) {
  const t = useTranslations("githubAnalyzerPage");

  return (
    <AnimatedSection delay={0.1}>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">
            {t("analysis.title")}
          </h3>
        </div>

        <div className="space-y-4">
          {/* Sumário */}
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              {t("analysis.summaryTitle")}
            </p>
            <p className="text-sm leading-relaxed text-foreground">{summary}</p>
          </div>

          {/* Linguagens */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
              {t("analysis.languagesTitle")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <Badge
                  key={lang}
                  variant="outline"
                  className="border-primary/30 text-xs text-primary"
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Destaques */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
              {t("analysis.highlightsTitle")}
            </p>
            <ul className="space-y-1.5">
              {highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-0.5 text-primary shrink-0">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Sugestão */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-400">
              {t("analysis.adviceTitle")}
            </p>
            <p className="text-sm text-foreground">{advice}</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
