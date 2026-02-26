"use client";

import { motion } from "framer-motion";
import { Keyboard, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { GlobalSearch } from "@/components/global-search";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CHANGELOG } from "@/data/changelog";

/** Data do lançamento mais recente para checar se é "novo" (< 14 dias). */
const LATEST_DATE = new Date(CHANGELOG[0].date);
const IS_RECENT =
  (Date.now() - LATEST_DATE.getTime()) / (1000 * 60 * 60 * 24) < 14;

interface NavActionsProps {
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}

export function NavActions({ isMobileOpen, onMobileToggle }: NavActionsProps) {
  const t = useTranslations("nav");
  const tGlobal = useTranslations("global.keyboardShortcuts");

  const openShortcuts = () => {
    window.dispatchEvent(new CustomEvent("open-keyboard-shortcuts"));
  };
  const pathname = usePathname();
  const isActive = pathname === "/novidades";

  return (
    <div className="flex items-center gap-3">
      <div className="hidden lg:flex lg:items-center lg:gap-3">
        <GlobalSearch />

        <LanguageSwitcher />
        <motion.button
          onClick={openShortcuts}
          whileTap={{ scale: 0.95 }}
          aria-label={tGlobal("title")}
          title={tGlobal("title")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <Keyboard className="h-4 w-4" />
        </motion.button>
        <Link
          href="/novidades"
          aria-label={t("changelog")}
          title={t("changelog")}
          className={`relative flex h-9 w-9 items-center justify-center rounded-lg border bg-card transition-colors ${
            isActive
              ? "border-primary/50 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          {IS_RECENT && !isActive && (
            <span
              className="absolute -right-0.5 -top-0.5 flex h-2 w-2"
              aria-hidden
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
          )}
        </Link>
      </div>

      <motion.button
        onClick={onMobileToggle}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
        whileTap={{ scale: 0.95 }}
        aria-label={isMobileOpen ? t("closeMenu") : t("openMenu")}
        aria-expanded={isMobileOpen}
        aria-controls="mobile-menu"
      >
        <div className="flex flex-col gap-1">
          <motion.span
            animate={isMobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
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
