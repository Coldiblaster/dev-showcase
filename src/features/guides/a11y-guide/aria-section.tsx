"use client";

import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

import type a11yGuidePage from "@/../messages/pt-BR/a11yGuidePage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { ARIA_LABELS_BAD, ARIA_LABELS_GOOD } from "./a11y-data";

type Role = (typeof a11yGuidePage)["aria"]["roles"][number];
type LiveRegion = (typeof a11yGuidePage)["aria"]["liveRegions"][number];

/** Seção de ARIA roles, labels e live regions. */
export function AriaSection() {
  const t = useTranslations("a11yGuidePage");

  return (
    <SectionWrapper id="aria" variant="default">
      <AnimatedSection>
        <SectionHeader
          icon={MessageSquare}
          title={t("aria.title")}
          subtitle={t("aria.description")}
        />
      </AnimatedSection>

      {/* Roles comuns */}
      <AnimatedSection delay={0.1}>
        <p className="mb-4 font-semibold text-foreground">
          {t("aria.rolesTitle")}
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              {(t.raw("aria.roles") as Role[]).map((r, i) => (
                <tr key={r.role} className={i % 2 === 0 ? "bg-card/30" : ""}>
                  <td className="px-4 py-3 font-mono text-xs text-primary whitespace-nowrap">
                    {r.role}
                  </td>
                  <td className="px-4 py-3 text-foreground">{r.use}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {r.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* Labels — bom vs ruim */}
      <AnimatedSection delay={0.15}>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <p className="mb-3 text-sm font-semibold text-destructive/80">
              ❌ {t("semantics.badExample")}
            </p>
            <CodeBlock code={ARIA_LABELS_BAD} title="❌ ruim" />
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="mb-3 text-sm font-semibold text-primary">
              ✅ {t("semantics.goodExample")}
            </p>
            <CodeBlock code={ARIA_LABELS_GOOD} title="✅ bom" />
          </div>
        </div>
      </AnimatedSection>

      {/* Live regions */}
      <AnimatedSection delay={0.2}>
        <p className="mb-1 mt-8 font-semibold text-foreground">
          {t("aria.liveTitle")}
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          {t("aria.liveDesc")}
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {(t.raw("aria.liveRegions") as LiveRegion[]).map((lr) => (
            <div
              key={lr.attr}
              className="rounded-xl border border-border/60 bg-card/50 p-4"
            >
              <code className="block mb-1.5 text-xs text-primary">
                {lr.attr}
              </code>
              <p className="text-xs text-muted-foreground">{lr.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
