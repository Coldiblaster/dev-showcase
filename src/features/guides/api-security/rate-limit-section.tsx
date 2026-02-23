"use client";

import { Gauge } from "lucide-react";
import { useTranslations } from "next-intl";

import type apiSecurityPage from "@/../messages/pt-BR/apiSecurityPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

import { RATE_LIMIT_INMEMORY, RATE_LIMIT_REDIS } from "./code-examples";

type Row = (typeof apiSecurityPage)["rateLimit"]["rows"][number];

/** Seção sobre rate limiting in-memory vs Redis distribuído. */
export function RateLimitSection() {
  const t = useTranslations("apiSecurityPage");

  return (
    <SectionWrapper id="rate-limit" variant="alternate">
      <AnimatedSection>
        <SectionHeader
          icon={Gauge}
          title={t("rateLimit.title")}
          subtitle={t("rateLimit.description")}
        />
      </AnimatedSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
            <p className="mb-2 font-semibold text-foreground">
              {t("rateLimit.inMemoryTitle")}
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              {t("rateLimit.inMemoryDesc")}
            </p>
            <CodeBlock code={RATE_LIMIT_INMEMORY} title="rate-limit.ts" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="mb-2 font-semibold text-foreground">
              {t("rateLimit.redisTitle")}
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              {t("rateLimit.redisDesc")}
            </p>
            <CodeBlock code={RATE_LIMIT_REDIS} title="redis-rate-limit.ts" />
          </div>
        </AnimatedSection>
      </div>

      {/* Tabela de limites por rota */}
      <AnimatedSection delay={0.2}>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                {(
                  [
                    "tableRoute",
                    "tableLimit",
                    "tableWindow",
                    "tableBackend",
                  ] as const
                ).map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left font-medium text-muted-foreground"
                  >
                    {t(`rateLimit.${col}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(t.raw("rateLimit.rows") as Row[]).map((row, i) => (
                <tr
                  key={row.route}
                  className={i % 2 === 0 ? "bg-card/30" : "bg-transparent"}
                >
                  <td className="px-4 py-3 font-mono text-xs text-primary">
                    {row.route}
                  </td>
                  <td className="px-4 py-3 text-foreground">{row.limit}</td>
                  <td className="px-4 py-3 text-foreground">{row.window}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        row.backend === "Redis"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {row.backend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
