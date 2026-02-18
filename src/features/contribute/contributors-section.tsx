"use client";

import { motion } from "framer-motion";
import { Heart, RefreshCw, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { SectionWrapper } from "@/components/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeUp, stagger } from "@/lib/animation-variants";
import { REPOS } from "@/lib/constants";

import { useContributors } from "./use-contributors";

/** Grid dinâmico de contribuidores do repositório via GitHub API. */
export function ContributorsSection() {
  const t = useTranslations("contributePage.contributors");
  const { contributors, loading, error, retry } = useContributors();

  return (
    <SectionWrapper id="contributors">
      <AnimatedSection>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 border-primary/30 px-3 py-1 text-primary"
          >
            <Users className="h-3 w-3" />
            {t("badge")}
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
      </AnimatedSection>

      {loading && (
        <div className="py-12 text-center" role="status" aria-live="polite">
          <div
            className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        </div>
      )}

      {error && (
        <div className="py-12 text-center">
          <p className="mb-3 text-sm text-muted-foreground">{t("error")}</p>
          <Button variant="outline" size="sm" onClick={retry} className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" />
            {t("retry")}
          </Button>
        </div>
      )}

      {!loading && !error && contributors.length === 0 && (
        <AnimatedSection>
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-primary/30 p-8 text-center">
            <Heart className="mx-auto mb-4 h-10 w-10 text-primary/40" />
            <h3 className="mb-2 font-semibold">{t("beFirst")}</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t("beFirstDescription")}
            </p>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link
                href={REPOS.devShowcase}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("viewOnGithub")}
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      )}

      {!loading && !error && contributors.length > 0 && (
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4"
        >
          {contributors.map((c) => (
            <motion.div key={c.login} variants={fadeUp}>
              <Link
                href={c.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-card/50"
              >
                <Image
                  src={c.avatarUrl}
                  alt={c.login}
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-border transition-colors group-hover:border-primary/50"
                />
                <span className="text-sm font-medium">{c.login}</span>
                <span className="text-xs text-muted-foreground">
                  {t("contributions", { count: c.contributions })}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </SectionWrapper>
  );
}
