"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { type ReactNode, useCallback } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TOTAL_STEPS = 9;

interface TutorialStepProps {
  id: string;
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  faq?: ReactNode;
  nextStepId?: string;
  nextStepLabel?: string;
}

/** Wrapper de um passo do tutorial com número, ícone, título, FAQ e navegação. */
export function TutorialStep({
  id,
  step,
  icon: Icon,
  title,
  description,
  children,
  faq,
  nextStepId,
  nextStepLabel,
}: TutorialStepProps) {
  const goToNext = useCallback(() => {
    if (!nextStepId) return;
    document.getElementById(nextStepId)?.scrollIntoView({ behavior: "smooth" });
  }, [nextStepId]);

  return (
    <SectionWrapper id={id} maxWidth="4xl">
      <AnimatedSection>
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <Badge
                variant="outline"
                className="border-primary/30 font-mono text-xs text-primary"
              >
                {String(step).padStart(2, "0")}/
                {String(TOTAL_STEPS).padStart(2, "0")}
              </Badge>
              <div className="hidden h-1.5 flex-1 overflow-hidden rounded-full bg-border/30 sm:block">
                <div
                  className="h-full rounded-full bg-primary/50 transition-all duration-500"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h2>
            <p className="mt-1 text-muted-foreground">{description}</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="space-y-6">{children}</div>
      </AnimatedSection>

      {faq && (
        <AnimatedSection delay={0.2}>
          <div className="mt-10">{faq}</div>
        </AnimatedSection>
      )}

      {nextStepId && nextStepLabel && (
        <AnimatedSection delay={0.3}>
          <div className="mt-10 flex justify-end">
            <Button
              variant="outline"
              size="lg"
              onClick={goToNext}
              className="gap-2 rounded-full border-primary/30 text-primary hover:bg-primary/10"
            >
              {nextStepLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </AnimatedSection>
      )}
    </SectionWrapper>
  );
}
