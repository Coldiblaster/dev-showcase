"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";

/** Hero da página Contribua com CTA de scroll para seção "Como funciona". */
export function ContributeHero() {
  const t = useTranslations("contributePage.hero");

  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HeroSection
      badge={t("badge")}
      badgeIcon={Heart}
      title={t("title")}
      description={t("description")}
      showBackLink
      backHref="/"
      ctaSlot={
        <AnimatedSection delay={0.25}>
          <Button
            size="lg"
            onClick={scrollToHowItWorks}
            className="gap-2 rounded-full"
          >
            <Heart className="h-4 w-4" />
            {t("cta")}
          </Button>
        </AnimatedSection>
      }
    />
  );
}
