"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: SectionNavItem[];
  /** ID do primeiro elemento de seção que dispara a visibilidade da nav. */
  triggerId?: string;
  /** Tempo em ms para a nav sumir após parar de scrollar. */
  hideDelay?: number;
}

/**
 * Navegação fixa por seções com pill animada.
 * Visível apenas no desktop (hidden no mobile).
 * Aparece ao scrollar, some automaticamente após inatividade.
 */
export function SectionNav({
  sections,
  triggerId,
  hideDelay = 2000,
}: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [inRange, setInRange] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const firstId = triggerId ?? sections[0]?.id;

  const show = inRange && (revealed || hovered);

  const reveal = useCallback(() => {
    setRevealed(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setRevealed(false), hideDelay);
  }, [hideDelay]);

  useEffect(() => {
    if (!sections.length) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection((prev) => {
              if (prev !== entry.target.id) reveal();
              return entry.target.id;
            });
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    let visibilityObserver: IntersectionObserver | undefined;
    let wasInRange = false;
    const triggerEl = firstId ? document.getElementById(firstId) : null;
    if (triggerEl) {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          const nowInRange =
            entry.isIntersecting || entry.boundingClientRect.top < 0;
          setInRange(nowInRange);
          if (nowInRange && !wasInRange) reveal();
          wasInRange = nowInRange;
        },
        { threshold: 0 },
      );
      visibilityObserver.observe(triggerEl);
    }

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) sectionObserver.observe(el);
    }

    return () => {
      sectionObserver.disconnect();
      visibilityObserver?.disconnect();
    };
  }, [sections, firstId, reveal]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="Section navigation"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed left-1/2 top-20 z-40 hidden -translate-x-1/2 md:block"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-2 py-1.5 shadow-lg backdrop-blur-xl">
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
                      : "text-muted-foreground/80 hover:text-foreground"
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
                  <span className="relative z-10">{section.label}</span>
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
