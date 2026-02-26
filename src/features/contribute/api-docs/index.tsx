"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Code2,
  FileCode,
  Globe,
  Key,
  Lock,
  Shield,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { SectionNav } from "@/components/section-nav";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeUp, stagger } from "@/lib/animation-variants";

const OVERVIEW_FEATURES = [
  { key: "rateLimit", icon: Shield },
  { key: "caching", icon: Zap },
  { key: "validation", icon: Code2 },
  { key: "errorHandling", icon: AlertTriangle },
] as const;

const ENDPOINT_KEYS = [
  "chat",
  "codeReview",
  "contact",
  "github",
  "contributors",
  "reactions",
  "online",
  "search",
  "lighthouse",
  "newsletter",
  "prGenerator",
  "githubAnalyzer",
] as const;

const SECURITY_LAYERS = [
  { key: "rateLimit", icon: Shield },
  { key: "recaptcha", icon: Lock },
  { key: "validation", icon: Code2 },
  { key: "headers", icon: Globe },
  { key: "envVars", icon: Key },
] as const;

/** Documentação das APIs internas — endpoints, parâmetros, rate limiting e segurança. */
export function ApiDocsPage() {
  const t = useTranslations("apiDocsPage");

  const sections = [
    { id: "overview", label: t("sectionNav.overview") },
    { id: "endpoints", label: t("sectionNav.endpoints") },
    { id: "security", label: t("sectionNav.security") },
  ];

  const scrollToOverview = () => {
    document.getElementById("overview")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={FileCode}
        title={t("hero.title")}
        description={t("hero.description")}
        showBackLink
        backHref="/contribua"
        ctaSlot={
          <AnimatedSection delay={0.25}>
            <Button
              size="lg"
              onClick={scrollToOverview}
              className="gap-2 rounded-full"
            >
              {t("hero.cta")}
            </Button>
          </AnimatedSection>
        }
      />

      <SectionNav sections={sections} triggerId="overview" />

      {/* Overview section */}
      <SectionWrapper id="overview" variant="default">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Badge
                variant="outline"
                className="mb-1 border-primary/30 text-primary"
              >
                {t("overview.badge")}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("overview.title")}
              </h2>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("overview.description")}
          </p>
        </AnimatedSection>
        <motion.div
          className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {OVERVIEW_FEATURES.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1.5 font-semibold text-foreground">
                {t(`overview.features.${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`overview.features.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      <SectionDivider />

      {/* Endpoints section */}
      <SectionWrapper id="endpoints" variant="alternate">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Badge
                variant="outline"
                className="mb-1 border-primary/30 text-primary"
              >
                {t("endpoints.badge")}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("endpoints.title")}
              </h2>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("endpoints.description")}
          </p>
        </AnimatedSection>
        <motion.div
          className="mx-auto grid max-w-4xl gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {ENDPOINT_KEYS.map((key) => {
            const method = t(`endpoints.items.${key}.method`);
            const isPost = method === "POST";
            return (
              <motion.div
                key={key}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30 md:p-8"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t(`endpoints.items.${key}.title`)}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={isPost ? "default" : "outline"}>
                      {method}
                    </Badge>
                    <code className="rounded bg-muted px-2 py-1 font-mono text-sm text-primary">
                      {t(`endpoints.items.${key}.path`)}
                    </code>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {t(`endpoints.items.${key}.description`)}
                </p>
                <div className="grid gap-2 border-t border-border/50 pt-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t("endpoints.labels.rateLimit")}
                    </span>
                    <p className="text-muted-foreground/80">
                      {t(`endpoints.items.${key}.rateLimit`)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t("endpoints.labels.params")}
                    </span>
                    <p className="text-muted-foreground/80">
                      {t(`endpoints.items.${key}.params`)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t("endpoints.labels.response")}
                    </span>
                    <p className="text-muted-foreground/80">
                      {t(`endpoints.items.${key}.response`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionWrapper>

      <SectionDivider />

      {/* Security section */}
      <SectionWrapper id="security" variant="default">
        <AnimatedSection>
          <div className="mb-8 flex items-center gap-3 md:mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Badge
                variant="outline"
                className="mb-1 border-primary/30 text-primary"
              >
                {t("security.badge")}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                {t("security.title")}
              </h2>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t("security.description")}
          </p>
        </AnimatedSection>
        <motion.div
          className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {SECURITY_LAYERS.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-1.5 font-semibold text-foreground">
                {t(`security.layers.${key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`security.layers.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
