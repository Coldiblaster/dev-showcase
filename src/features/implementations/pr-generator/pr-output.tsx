"use client";

import { Check, ClipboardList, Copy, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { Button } from "@/components/ui/button";

import { formatPrMarkdown, type PrResult, type PrType } from "./pr-data";

interface PrOutputProps {
  result: PrResult;
  type: PrType;
  title: string;
  onRegenerate: () => void;
  loading: boolean;
}

/** Exibe o resultado gerado com opções de copiar texto e markdown. */
export function PrOutput({
  result,
  type,
  title,
  onRegenerate,
  loading,
}: PrOutputProps) {
  const t = useTranslations("prGeneratorPage");
  const [copiedMd, setCopiedMd] = useState(false);

  function copyToClipboard(text: string, setCopiedFn: (v: boolean) => void) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedFn(true);
      setTimeout(() => setCopiedFn(false), 2000);
    });
  }

  const markdown = formatPrMarkdown(result, type, title);

  return (
    <AnimatedSection>
      <div className="rounded-2xl border border-primary/20 bg-card/60 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-primary" />
            <h2 className="font-semibold text-foreground">
              {t("output.title")}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(markdown, setCopiedMd)}
              className="gap-1.5 text-xs"
            >
              {copiedMd ? (
                <Check className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copiedMd ? t("output.copiedButton") : t("output.copyMarkdown")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              disabled={loading}
              className="gap-1.5 text-xs"
            >
              <RefreshCw
                className={`h-3 w-3 ${loading ? "animate-spin" : ""}`}
              />
              {t("output.regenerate")}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Sumário */}
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              {t("output.summaryTitle")}
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {result.summary}
            </p>
          </div>

          {/* Mudanças */}
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              {t("output.changesTitle")}
            </p>
            <ul className="space-y-1">
              {result.changes.map((change, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-0.5 text-primary shrink-0">•</span>
                  {change}
                </li>
              ))}
            </ul>
          </div>

          {/* Como testar */}
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              {t("output.testingTitle")}
            </p>
            <ul className="space-y-1">
              {result.testing.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-xs text-muted-foreground">
                    {i + 1}.
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Notas */}
          {result.notes && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-amber-400">
                {t("output.notesTitle")}
              </p>
              <p className="text-sm text-foreground">{result.notes}</p>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
