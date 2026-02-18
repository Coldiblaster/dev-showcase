"use client";

import { motion } from "framer-motion";
import { ArrowDown, BookOpen, Check, Plus, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { HeroSection } from "@/components/hero-section";

import { type Track, useTrack } from "./track-context";

interface TrackCardProps {
  icon: React.ElementType;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

function TrackCard({
  icon: Icon,
  label,
  description,
  selected,
  onSelect,
}: TrackCardProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative flex-1 rounded-2xl border p-5 text-left transition-all ${
        selected
          ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
          : "border-border/50 bg-card/50 hover:border-primary/30"
      }`}
      aria-pressed={selected}
    >
      <div className="mb-3 flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
            selected ? "bg-primary/20" : "bg-primary/10"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${selected ? "text-primary" : "text-primary/60"}`}
          />
        </div>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-primary"
          >
            <Check className="h-3.5 w-3.5 text-primary-foreground" />
          </motion.div>
        )}
      </div>
      <h3 className="mb-1 text-sm font-semibold">{label}</h3>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
      {selected && (
        <motion.div
          layoutId="track-indicator"
          className="absolute inset-0 rounded-2xl ring-2 ring-primary/40"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
    </motion.button>
  );
}

/** Hero do tutorial com seletor de trilha (novo / melhorar). */
export function TutorialHero() {
  const t = useTranslations("tutorialPage.hero");
  const { track, setTrack } = useTrack();

  const handleSelect = useCallback(
    (selected: Track) => {
      setTrack(selected);
      setTimeout(() => {
        document
          .getElementById("environment")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 250);
    },
    [setTrack],
  );

  return (
    <HeroSection
      badge={t("badge")}
      badgeIcon={BookOpen}
      title={t("title")}
      description={t("description")}
      showBackLink
      backHref="/contribua"
      ctaSlot={
        <AnimatedSection delay={0.2}>
          <div className="mx-auto flex max-w-lg flex-col items-center gap-10">
            <div className="flex w-full gap-4">
              <TrackCard
                icon={Plus}
                label={t("trackNew")}
                description={t("trackNewDesc")}
                selected={track === "new"}
                onSelect={() => handleSelect("new")}
              />
              <TrackCard
                icon={Wrench}
                label={t("trackImprove")}
                description={t("trackImproveDesc")}
                selected={track === "improve"}
                onSelect={() => handleSelect("improve")}
              />
            </div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-muted-foreground/40"
            >
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </div>
        </AnimatedSection>
      }
    />
  );
}
