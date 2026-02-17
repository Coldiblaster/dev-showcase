"use client";

import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Layers,
  Link2,
  Palette,
  Terminal,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

import type tailwindTipsPage from "@/../messages/pt-BR/tailwindTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { CTASection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { ResourceLink } from "@/components/resource-link";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";
import { Separator } from "@/components/ui/separator";

type SetupStep = (typeof tailwindTipsPage)["setup"]["steps"][number];
type ComponentItem = (typeof tailwindTipsPage)["components"]["items"][number];
type PatternItem = (typeof tailwindTipsPage)["patterns"]["items"][number];
type TipItem = (typeof tailwindTipsPage)["tips"]["items"][number];
type ResourceItem = (typeof tailwindTipsPage)["resources"]["items"][number];

export function TailwindTips() {
  const t = useTranslations("tailwindTipsPage");

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Palette}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        warning={t("hero.warning")}
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Terminal}
              title={t("setup.title")}
              subtitle={t("setup.subtitle")}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mb-10 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
              {t("setup.description")}
            </p>
          </AnimatedSection>

          <div className="flex flex-col gap-8">
            {(t.raw("setup.steps") as SetupStep[]).map((step, i) => (
              <AnimatedSection key={step.title} delay={0.1 + i * 0.05}>
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1.5 text-base font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                    <CodeBlock code={step.code} title={`step-${i + 1}`} />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Layers}
              title={t("components.title")}
              subtitle={t("components.subtitle")}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mb-10 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
              {t("components.description")}
            </p>
          </AnimatedSection>

          <div className="flex flex-col gap-10">
            {(t.raw("components.items") as ComponentItem[]).map((item, i) => (
              <AnimatedSection key={item.name} delay={0.1 + i * 0.08}>
                <CardBlur radius="xl" padding="p-6" className="">
                  <div className="flex items-center gap-2 text-lg text-foreground mb-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {item.name}
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <CodeBlock code={item.code} title={item.name} />
                  </div>
                </CardBlur>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={ChevronRight}
              title={t("patterns.title")}
              subtitle={t("patterns.subtitle")}
            />
          </AnimatedSection>

          <div className="flex flex-col gap-8">
            {(t.raw("patterns.items") as PatternItem[]).map((pattern, i) => (
              <AnimatedSection key={pattern.title} delay={0.1 + i * 0.05}>
                <CardBlur radius="xl" padding="p-6">
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {pattern.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {pattern.description}
                  </p>
                  <CodeBlock code={pattern.code} title={pattern.title} />
                </CardBlur>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      {/* Do vs Don't Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                <BookOpen className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  {t("tips.title")}
                </h2>
                <p className="font-mono text-sm text-muted-foreground">
                  {t("tips.subtitle")}
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="flex flex-col gap-6">
            {(t.raw("tips.items") as TipItem[]).map((item, i) => (
              <AnimatedSection key={item.title} delay={0.1 + i * 0.05}>
                <CardBlur radius="xl" padding="p-6">
                  <h3 className="mb-4 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <div className="mb-4 grid gap-3 md:grid-cols-2">
                    <div className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <code className="font-mono text-xs text-red-300">
                        {item.bad}
                      </code>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                      <code className="font-mono text-xs text-green-300">
                        {item.good}
                      </code>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.explanation}
                  </p>
                </CardBlur>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              icon={Link2}
              title={t("resources.title")}
              subtitle={t("resources.subtitle")}
            />
          </AnimatedSection>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {(t.raw("resources.items") as ResourceItem[]).map((item, i) => (
              <AnimatedSection key={item.name} delay={0.1 + i * 0.05}>
                <ResourceLink
                  href={item.url}
                  title={item.name}
                  description={item.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <Separator />
      </div>

      <CTASection
        icon={Palette}
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.button")}
      />
    </div>
  );
}
