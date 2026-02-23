"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bug,
  GitCommitHorizontal,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { BackLink } from "@/components/back-link";
import { Badge } from "@/components/ui/badge";
import { CHANGELOG, type ChangelogEntryType } from "@/data/changelog";

const TYPE_CONFIG: Record<
  ChangelogEntryType,
  { icon: React.ElementType; className: string; dotClass: string }
> = {
  feature: {
    icon: Sparkles,
    className: "bg-primary/10 text-primary border-primary/20",
    dotClass: "bg-primary",
  },
  improvement: {
    icon: Zap,
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dotClass: "bg-blue-400",
  },
  fix: {
    icon: Bug,
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dotClass: "bg-amber-400",
  },
  refactor: {
    icon: Wrench,
    className: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    dotClass: "bg-purple-400",
  },
};

export function ChangelogPage() {
  const t = useTranslations("changelogPage");
  const tGlobal = useTranslations("global.pageHero");
  const locale = useLocale();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <section className="relative overflow-hidden px-4 pb-16 pt-24 md:px-6 md:pb-24 md:pt-32">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <BackLink href="/" label={tGlobal("back")} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 border-primary/30 px-3 py-1 text-primary"
            >
              <GitCommitHorizontal className="h-3 w-3" />
              {t("hero.badge")}
            </Badge>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              {t("hero.title")}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mx-auto mb-8 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              {t("hero.description")}
            </p>
          </AnimatedSection>

          {/* Stats rápidos */}
          <AnimatedSection delay={0.25}>
            <div className="inline-flex flex-wrap justify-center gap-3">
              {[
                {
                  label: `v${CHANGELOG[0].version}`,
                  sub: t("hero.statCurrentVersion"),
                },
                { label: `${CHANGELOG.length}`, sub: t("hero.statVersions") },
                {
                  label: `${CHANGELOG.reduce((acc, v) => acc + v.items.length, 0)}`,
                  sub: t("hero.statChanges"),
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-secondary/30 px-5 py-3"
                >
                  <p className="font-mono text-xl font-bold text-foreground">
                    {stat.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            {/* Linha vertical contínua */}
            <div
              className="absolute left-[11px] top-0 h-full w-px bg-gradient-to-b from-primary/40 via-border to-transparent"
              aria-hidden
            />

            <div className="space-y-10">
              {CHANGELOG.map((version, versionIndex) => (
                <AnimatedSection
                  key={version.version}
                  delay={versionIndex * 0.05}
                >
                  <div className="relative pl-8">
                    {/* Dot na timeline */}
                    <div
                      className={`absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        versionIndex === 0
                          ? "border-primary bg-primary/20"
                          : "border-border bg-background"
                      }`}
                      aria-hidden
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          versionIndex === 0
                            ? "bg-primary"
                            : "bg-muted-foreground/40"
                        }`}
                      />
                    </div>

                    {/* Card da versão */}
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: versionIndex * 0.05 + 0.1 }}
                      className="rounded-2xl border border-border bg-secondary/10 p-5 md:p-6"
                    >
                      {/* Cabeçalho */}
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className="font-mono text-sm font-bold text-primary">
                              v{version.version}
                            </span>
                            {versionIndex === 0 && (
                              <Badge className="bg-primary/15 text-xs text-primary">
                                {t("hero.latestBadge")}
                              </Badge>
                            )}
                          </div>
                          <h2 className="text-lg font-semibold text-foreground md:text-xl">
                            {version.title}
                          </h2>
                        </div>

                        <time
                          dateTime={version.date}
                          className="shrink-0 font-mono text-xs text-muted-foreground"
                        >
                          {new Date(version.date).toLocaleDateString(locale, {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      </div>

                      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                        {version.summary}
                      </p>

                      {/* Items */}
                      <ul className="space-y-2.5">
                        {version.items.map((item, itemIndex) => {
                          const cfg = TYPE_CONFIG[item.type];
                          const Icon = cfg.icon;

                          return (
                            <li
                              key={itemIndex}
                              className="flex items-start gap-3"
                            >
                              <span
                                className={`mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${cfg.className}`}
                              >
                                <Icon className="h-3 w-3" />
                                {t(`types.${item.type}`)}
                              </span>

                              <span className="text-sm leading-relaxed text-foreground/85">
                                {item.description}
                                {item.href && (
                                  <Link
                                    href={item.href}
                                    className="ml-1.5 inline-flex items-center gap-0.5 text-primary underline-offset-2 hover:underline"
                                  >
                                    <ArrowRight className="h-3 w-3" />
                                  </Link>
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      <p className="mt-4 text-right font-mono text-xs text-muted-foreground/50">
                        {t("itemsCount", { count: version.items.length })}
                      </p>
                    </motion.div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
