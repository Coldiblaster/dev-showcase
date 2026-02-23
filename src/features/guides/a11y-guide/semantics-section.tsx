"use client";

import { FileCode2 } from "lucide-react";
import { useTranslations } from "next-intl";

import type a11yGuidePage from "@/../messages/pt-BR/a11yGuidePage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { LIVE_REGION, SEMANTICS_BAD, SEMANTICS_GOOD } from "./a11y-data";

type Landmark = (typeof a11yGuidePage)["semantics"]["landmarks"][number];

/** Seção de HTML semântico: landmarks, headings e live regions. */
export function SemanticsSection() {
  const t = useTranslations("a11yGuidePage");

  return (
    <SectionWrapper id="semantics" variant="default">
      <AnimatedSection>
        <SectionHeader
          icon={FileCode2}
          title={t("semantics.title")}
          subtitle={t("semantics.description")}
        />
      </AnimatedSection>

      {/* Landmarks */}
      <AnimatedSection delay={0.1}>
        <p className="mb-3 font-semibold text-foreground">
          {t("semantics.landmarksTitle")}
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          {t("semantics.landmarksDesc")}
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              {(t.raw("semantics.landmarks") as Landmark[]).map((lm, i) => (
                <tr key={lm.tag} className={i % 2 === 0 ? "bg-card/30" : ""}>
                  <td className="px-4 py-3 font-mono text-xs text-primary whitespace-nowrap">
                    {lm.tag}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                    {lm.role}
                  </td>
                  <td className="px-4 py-3 text-foreground">{lm.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      {/* Bom vs Ruim */}
      <AnimatedSection delay={0.15}>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <p className="mb-3 text-sm font-semibold text-destructive/80">
              ❌ {t("semantics.badExample")}
            </p>
            <CodeBlock code={SEMANTICS_BAD} title="❌ ruim" />
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="mb-3 text-sm font-semibold text-primary">
              ✅ {t("semantics.goodExample")}
            </p>
            <CodeBlock code={SEMANTICS_GOOD} title="✅ bom" />
          </div>
        </div>
      </AnimatedSection>

      {/* Live region */}
      <AnimatedSection delay={0.2}>
        <div className="mt-8 rounded-2xl border border-border/60 bg-card/50 p-5">
          <p className="mb-3 font-semibold text-foreground">
            {t("semantics.liveRegionTitle")}
          </p>
          <CodeBlock code={LIVE_REGION} title="live-region.tsx" />
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
