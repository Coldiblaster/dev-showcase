"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Eye,
  Github,
  Linkedin,
  Mail,
  User,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { useSiteStats } from "@/hooks/use-site-stats";
import { PERSONAL } from "@/lib/constants";

/** Hero da página inicial com nome, CTA e redes sociais. */
export function HomeHeroSection() {
  const t = useTranslations("hero");
  const { stats, loading: statsLoading } = useSiteStats();
  const hasStats = !statsLoading && (stats.visitors > 0 || stats.views > 0);
  return (
    <>
      <HeroSection
        badge={t("greeting")}
        badgeIcon={User}
        title={t("name")}
        subtitle={t("role")}
        description={""}
        showBackLink={false}
        badgeSlot={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 md:mb-6"
          >
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary md:px-4 md:py-1.5 md:text-sm">
              {t("greeting")}
            </span>
          </motion.div>
        }
        titleSlot={
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground md:mb-4 md:text-5xl lg:text-7xl"
          >
            {t("name")}
          </motion.h1>
        }
        descriptionSlot={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mb-6 max-w-2xl space-y-2 md:mb-10 md:space-y-4"
          >
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base lg:text-lg">
              {t("description.intro")}
            </p>
            <p className="text-sm font-medium leading-relaxed text-foreground md:text-base lg:text-lg">
              {t("description.value")}
            </p>
            <p className="text-xs italic leading-relaxed text-muted-foreground/80 md:text-sm">
              {t("description.mission")}
            </p>
          </motion.div>
        }
        ctaSlot={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row md:mb-12 md:gap-4"
          >
            <Button
              size="default"
              className="min-w-40 font-medium md:min-w-45 md:text-base md:px-6 md:py-5"
              asChild
            >
              <a href="#projects">{t("cta")}</a>
            </Button>
            <Button
              variant="outline"
              size="default"
              className="min-w-40 font-medium md:min-w-45 md:text-base md:px-6 md:py-5"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-chat-widget"))
              }
            >
              {t("secondary")}
            </Button>
          </motion.div>
        }
        cvSlot={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-4 flex justify-center md:mb-8"
          >
            <a
              href="/curriculo_VINICIUS_BASTAZIN_ARAUJO.pdf"
              download
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70 transition-colors hover:text-primary md:text-sm"
            >
              <Download className="h-3 w-3 md:h-3.5 md:w-3.5" />
              {t("downloadCv")}
            </a>
          </motion.div>
        }
        statsSlot={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-muted-foreground md:mb-8 md:gap-6 md:text-sm"
          >
            {hasStats && (
              <>
                <span className="flex items-center gap-1.5">
                  <Users
                    className="h-3 w-3 text-primary md:h-3.5 md:w-3.5"
                    aria-hidden="true"
                  />
                  {t("stats.visitors", { count: stats.visitors })}
                </span>
                <span className="text-border" aria-hidden="true">
                  •
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye
                    className="h-3 w-3 text-primary md:h-3.5 md:w-3.5"
                    aria-hidden="true"
                  />
                  {t("stats.pageViews", { count: stats.views })}
                </span>
                <span className="text-border" aria-hidden="true">
                  •
                </span>
              </>
            )}
            <span className="flex items-center gap-1.5">
              <span className="text-primary" aria-hidden="true">
                ✓
              </span>
              {t("stats.impact")}
            </span>
            <span className="text-border" aria-hidden="true">
              •
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary" aria-hidden="true">
                ✓
              </span>
              {t("stats.implementations")}
            </span>
            <span className="text-border" aria-hidden="true">
              •
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary" aria-hidden="true">
                ✓
              </span>
              {t("stats.opensource")}
            </span>
          </motion.div>
        }
        socialSlot={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center justify-center gap-3 md:gap-4"
          >
            {[
              {
                icon: Github,
                href: PERSONAL.github,
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: PERSONAL.linkedin,
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: `mailto:${PERSONAL.email}`,
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary md:h-10 md:w-10"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>
        }
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="-mt-4 flex justify-center pb-6 md:-mt-8 md:pb-10"
      >
        <motion.a
          href="#about"
          className="inline-flex text-muted-foreground hover:text-primary"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label={t("scrollDown")}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.a>
      </motion.div>
    </>
  );
}
