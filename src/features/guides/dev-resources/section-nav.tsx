"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

const sections = [
  { id: "tips", key: "tips" },
  { id: "snippets", key: "snippets" },
  { id: "patterns", key: "patterns" },
  { id: "refactoring", key: "refactoring" },
] as const;

export function SectionNav() {
  const t = useTranslations("devResourcesPage.sectionNav");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    let visibilityObserver: IntersectionObserver | undefined;
    const tipsEl = document.getElementById("tips");
    if (tipsEl) {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(
            entry.isIntersecting || entry.boundingClientRect.top < 0,
          );
        },
        { threshold: 0 },
      );
      visibilityObserver.observe(tipsEl);
    }

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) sectionObserver.observe(el);
    }

    return () => {
      sectionObserver.disconnect();
      visibilityObserver?.disconnect();
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  if (!isVisible) return null;

  return (
    <motion.nav
      aria-label="Navegação de seções"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed left-1/2 top-20 z-40 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-border/50 bg-background/80 px-2 py-1.5 shadow-lg backdrop-blur-md">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              aria-current={isActive ? "true" : undefined}
              className={`relative rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="section-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{t(section.key)}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
