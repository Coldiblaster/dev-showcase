"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import {
  getCookieName,
  isSupportedLocale,
  type Locale,
  localeCode,
  locales,
  LOCALES_CONFIG,
} from "@/lib/i18n";
import { getLocaleCookie, setLocaleCookie } from "@/lib/i18n/cookie";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Client-visible locale (reflect persisted choice immediately)
  const [clientLocale, setClientLocale] = useState<Locale | null>(null);

  useEffect(() => {
    try {
      const c = getLocaleCookie(getCookieName());
      if (c && isSupportedLocale(c)) setClientLocale(c);
    } catch {
      // ignore
    }
  }, []);

  function changeLocale(newLocale: Locale) {
    if (!isSupportedLocale(newLocale)) return;
    setLocaleCookie(getCookieName(), newLocale);
    setClientLocale(newLocale);
    router.refresh();
  }

  const active = (clientLocale ?? locale) as Locale;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen((s) => !s)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4" />
        <span className="font-mono text-xs text-muted-foreground">
          {localeCode[active]}
        </span>
        <span className="hidden sm:inline">{LOCALES_CONFIG[active].name}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full z-50 mt-2 min-w-45 overflow-hidden rounded-lg border border-border bg-card shadow-xl"
            >
              {locales.map((loc) => (
                <motion.button
                  key={loc}
                  onClick={() => {
                    setIsOpen(false);
                    changeLocale(loc);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                    active === loc
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary"
                  }`}
                  whileHover={{ x: 2 }}
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {localeCode[loc]}
                  </span>
                  <span className="flex-1 font-medium">
                    {LOCALES_CONFIG[loc].name}
                  </span>
                  {active === loc && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <Check className="h-4 w-4 text-primary" />
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
