"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";

export function HomeHeroSection() {
  const t = useTranslations("hero");
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
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t("greeting")}
              </span>
            </motion.div>
          }
          titleSlot={
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4 text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl"
            >
              {t("name")}
            </motion.h1>
          }
          descriptionSlot={
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto mb-10 max-w-2xl space-y-4"
            >
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("description.intro")}
              </p>
              <p className="text-base font-medium leading-relaxed text-foreground md:text-lg">
                {t("description.value")}
              </p>
              <p className="text-sm italic leading-relaxed text-muted-foreground/80">
                {t("description.mission")}
              </p>
            </motion.div>
          }
          ctaSlot={
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button size="lg" className="min-w-45 font-medium" asChild>
                <a href="#projects">{t("cta")}</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="min-w-45 font-medium"
                asChild
              >
                <a href="#contact">{t("secondary")}</a>
              </Button>
            </motion.div>
          }
          statsSlot={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground md:gap-6 md:text-sm"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-primary">✓</span>
                {t("stats.impact")}
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-primary">✓</span>
                {t("stats.implementations")}
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-primary">✓</span>
                {t("stats.opensource")}
              </span>
            </motion.div>
          }
          socialSlot={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center justify-center gap-4"
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/Coldiblaster",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/vbastazin/",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:vbastazin@gmail.com",
                  label: "Email",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
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
        className="mt-16 flex justify-center"
      >
        <motion.a
          href="#about"
          className="inline-flex text-muted-foreground hover:text-primary"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.a>
      </motion.div>
    </>
  );
}
