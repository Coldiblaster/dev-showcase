"use client";

import { ExternalLink, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

import type a11yGuidePage from "@/../messages/pt-BR/a11yGuidePage.json";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

type Requirement = (typeof a11yGuidePage)["contrast"]["requirements"][number];
type Tool = (typeof a11yGuidePage)["contrast"]["tools"][number];

/** Seção de contraste WCAG AA com tabela de requisitos e ferramentas. */
export function ContrastSection() {
  const t = useTranslations("a11yGuidePage");

  return (
    <SectionWrapper id="contrast" variant="alternate">
      <AnimatedSection>
        <SectionHeader
          icon={Eye}
          title={t("contrast.title")}
          subtitle={t("contrast.description")}
        />
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tabela de requisitos */}
        <AnimatedSection delay={0.1}>
          <p className="mb-3 font-semibold text-foreground">
            {t("contrast.requirementsTitle")}
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {(t.raw("contrast.requirements") as Requirement[]).map(
                  (req, i) => (
                    <tr
                      key={req.type}
                      className={i % 2 === 0 ? "bg-card/30" : ""}
                    >
                      <td className="px-4 py-3 text-foreground">{req.type}</td>
                      <td className="px-4 py-3 font-mono text-sm font-bold text-primary">
                        {req.ratio}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {req.level}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        {/* Ferramentas */}
        <AnimatedSection delay={0.15}>
          <p className="mb-3 font-semibold text-foreground">
            {t("contrast.toolsTitle")}
          </p>
          <div className="space-y-3">
            {(t.raw("contrast.tools") as Tool[]).map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-medium text-foreground text-sm">
                      {tool.name}
                    </p>
                    <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {tool.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
