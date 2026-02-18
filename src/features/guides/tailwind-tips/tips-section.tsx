"use client";

import { BookOpen, Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

import type tailwindTipsPage from "@/../messages/pt-BR/tailwindTipsPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CardBlur } from "@/components/ui/card-blur";

type TipItem = (typeof tailwindTipsPage)["tips"]["items"][number];

/** Seção de Do vs Don't com exemplos de boas/más práticas. */
export function TipsSection() {
  const t = useTranslations("tailwindTipsPage");

  return (
    <section id="tips" className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
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
                  <div className="flex items-start gap-2.5 overflow-hidden rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <code className="min-w-0 break-all font-mono text-xs text-red-300">
                      {item.bad}
                    </code>
                  </div>
                  <div className="flex items-start gap-2.5 overflow-hidden rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                    <code className="min-w-0 break-all font-mono text-xs text-green-300">
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
  );
}
