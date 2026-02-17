"use client";

import { Check, Eye, Shield, X, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { comparisons } from "./data/comparisons";

export function BeforeAfterSection() {
  const t = useTranslations("devResourcesPage.beforeAfter");

  return (
    <section id="refactoring" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-16 text-center">
            <Badge variant="secondary" className="mb-4 font-mono text-xs">
              {t("badge")}
            </Badge>
            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </AnimatedSection>

        {/* Comparisons */}
        <div className="space-y-12">
          {comparisons.map((comparison, index) => (
            <AnimatedSection key={comparison.id} delay={index * 0.1}>
              <Card className="overflow-hidden border-border bg-card">
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-6">
                    <Badge variant="outline" className="mb-3">
                      {comparison.category}
                    </Badge>
                    <h3 className="mb-2 text-2xl font-semibold">
                      {comparison.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {comparison.problem}
                    </p>
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="comparison" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="comparison">
                        {t("tabs.comparison")}
                      </TabsTrigger>
                      <TabsTrigger value="before">
                        {t("tabs.before")}
                      </TabsTrigger>
                      <TabsTrigger value="after">
                        {t("tabs.after")}
                      </TabsTrigger>
                    </TabsList>

                    {/* Comparison View */}
                    <TabsContent value="comparison" className="mt-6">
                      <div className="grid gap-4 lg:grid-cols-2">
                        {/* Before */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <X className="h-4 w-4 text-destructive" />
                            <span className="font-semibold">
                              {t("beforeProblems")}
                            </span>
                          </div>
                          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                            <code className="font-mono">
                              {comparison.before.code}
                            </code>
                          </pre>
                          <ul className="space-y-2 text-sm">
                            {comparison.before.issues.map((issue, i) => (
                              <li
                                key={i}
                                className="flex gap-2 text-destructive"
                              >
                                <X className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* After */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="font-semibold">
                              {t("afterImprovements")}
                            </span>
                          </div>
                          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                            <code className="font-mono">
                              {comparison.after.code}
                            </code>
                          </pre>
                          <ul className="space-y-2 text-sm">
                            {comparison.after.improvements.map(
                              (improvement, i) => (
                                <li
                                  key={i}
                                  className="flex gap-2 text-green-500"
                                >
                                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                                  <span>{improvement}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Metrics */}
                      {comparison.metrics && (
                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                          {comparison.metrics.performance && (
                            <MetricCard
                              icon={Zap}
                              value={comparison.metrics.performance}
                              label={t("metrics.performance")}
                              colorClass="bg-primary/10 text-primary"
                            />
                          )}
                          {comparison.metrics.readability && (
                            <MetricCard
                              icon={Eye}
                              value={comparison.metrics.readability}
                              label={t("metrics.readability")}
                              colorClass="bg-accent/10 text-accent"
                            />
                          )}
                          {comparison.metrics.maintainability && (
                            <MetricCard
                              icon={Shield}
                              value={comparison.metrics.maintainability}
                              label={t("metrics.maintainability")}
                              colorClass="bg-chart-2/10 text-chart-2"
                            />
                          )}
                        </div>
                      )}
                    </TabsContent>

                    {/* Before Tab */}
                    <TabsContent value="before" className="mt-6">
                      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                        <code className="font-mono">
                          {comparison.before.code}
                        </code>
                      </pre>
                      <ul className="mt-4 space-y-2 text-sm">
                        {comparison.before.issues.map((issue, i) => (
                          <li key={i} className="flex gap-2 text-destructive">
                            <X className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>

                    {/* After Tab */}
                    <TabsContent value="after" className="mt-6">
                      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                        <code className="font-mono">
                          {comparison.after.code}
                        </code>
                      </pre>
                      <ul className="mt-4 space-y-2 text-sm">
                        {comparison.after.improvements.map(
                          (improvement, i) => (
                            <li key={i} className="flex gap-2 text-green-500">
                              <Check className="mt-0.5 h-4 w-4 shrink-0" />
                              <span>{improvement}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon: Icon,
  value,
  label,
  colorClass,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  colorClass: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4">
      <div className={`rounded-lg p-2 ${colorClass.split(" ")[0]}`}>
        <Icon className={`h-5 w-5 ${colorClass.split(" ")[1]}`} />
      </div>
      <div>
        <p className={`text-2xl font-bold ${colorClass.split(" ")[1]}`}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
