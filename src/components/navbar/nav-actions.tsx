"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { GlobalSearch } from "@/components/global-search";
import { LanguageSwitcher } from "@/components/language-switcher";

interface NavActionsProps {
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

export function NavActions({ isMobileOpen, onMobileToggle }: NavActionsProps) {
  const t = useTranslations("nav");

  return (
    <div className="flex items-center gap-3">
      <GlobalSearch />
      <LanguageSwitcher />

      <motion.button
        onClick={onMobileToggle}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
        whileTap={{ scale: 0.95 }}
        aria-label={isMobileOpen ? t("closeMenu") : t("openMenu")}
        aria-expanded={isMobileOpen}
        aria-controls="mobile-menu"
      >
        <div className="flex flex-col gap-1">
          <motion.span
            animate={
              isMobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
            }
            className="block h-0.5 w-4 bg-current"
          />
          <motion.span
            animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-4 bg-current"
          />
          <motion.span
            animate={
              isMobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
            }
            className="block h-0.5 w-4 bg-current"
          />
        </div>
      </motion.button>
    </div>
  );
}
