"use client";

import { BookOpen, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { REPOS } from "@/lib/constants";

/** Call-to-action final com links para GitHub, documentação e issues. */
export function ContributeCtaSection() {
  const t = useTranslations("contributePage.cta");

  return (
    <SectionWrapper id="cta" variant="alternate">
      <AnimatedSection>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mb-8 text-muted-foreground">{t("description")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2 rounded-full">
              <Link
                href={REPOS.devShowcase}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                {t("github")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 rounded-full"
            >
              <Link
                href={`${REPOS.devShowcase}/blob/main/docs/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="h-4 w-4" />
                {t("docs")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 rounded-full"
            >
              <Link
                href={`${REPOS.devShowcase}/issues`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                {t("issues")}
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
