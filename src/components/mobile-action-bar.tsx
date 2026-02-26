"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUp,
  Check,
  Globe,
  LayoutGrid,
  Maximize2,
  MessageCircle,
  Minimize2,
  MoreVertical,
  Search,
  Terminal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import {
  getCookieName,
  isSupportedLocale,
  type Locale,
  localeCode,
  locales,
  LOCALES_CONFIG,
} from "@/lib/i18n";
import { getLocaleCookie, setLocaleCookie } from "@/lib/i18n/cookie";

const SCROLL_THRESHOLD = 200;
const FOCUS_STORAGE_KEY = "focus-mode-enabled";
const FOCUS_HTML_CLASS = "focus-mode";
/** Barra de ações fixa no rodapé, visível apenas no mobile. */
export function MobileActionBar() {
  const t = useTranslations("global");
  const locale = useLocale() as Locale;
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [clientLocale, setClientLocale] = useState<Locale | null>(null);
  const [focusActive, setFocusActive] = useState(false);

  useEffect(() => {
    try {
      const c = getLocaleCookie(getCookieName());
      if (c && isSupportedLocale(c)) setClientLocale(c);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem(FOCUS_STORAGE_KEY) === "true") {
        document.documentElement.classList.add(FOCUS_HTML_CLASS);
        setFocusActive(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openSearch = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-search"));
  }, []);

  const openMenu = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-mobile-nav"));
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openChat = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-chat-widget"));
  }, []);

  const openTerminal = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-terminal"));
  }, []);

  const openPerformance = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-performance-widget"));
  }, []);

  const toggleFocus = useCallback(() => {
    setFocusActive((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(FOCUS_STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      if (next) {
        document.documentElement.classList.add(FOCUS_HTML_CLASS);
      } else {
        document.documentElement.classList.remove(FOCUS_HTML_CLASS);
      }
      return next;
    });
  }, []);

  const changeLocale = useCallback(
    (newLocale: Locale) => {
      if (!isSupportedLocale(newLocale)) return;
      setLocaleCookie(getCookieName(), newLocale);
      setClientLocale(newLocale);
      setLangOpen(false);
      router.refresh();
    },
    [router],
  );

  const active = (clientLocale ?? locale) as Locale;

  const barActions = [
    {
      key: "search",
      icon: Search,
      label: t("mobileSearch"),
      onClick: openSearch,
      disabled: false,
      active: false,
    },
    {
      key: "language",
      icon: Globe,
      label: t("mobileLanguage"),
      onClick: () => {
        setLangOpen((s) => !s);
        setMoreOpen(false);
      },
      disabled: false,
      active: false,
    },
    {
      key: "top",
      icon: ArrowUp,
      label: t("mobileTop"),
      onClick: scrollToTop,
      disabled: !scrolled,
      active: false,
    },
    {
      key: "chat",
      icon: MessageCircle,
      label: t("mobileChat"),
      onClick: openChat,
      disabled: false,
      active: false,
    },
    {
      key: "more",
      icon: MoreVertical,
      label: t("mobileMore"),
      onClick: () => setMoreOpen((s) => !s),
      disabled: false,
      active: moreOpen,
    },
  ];

  const moreActions = [
    {
      key: "menu",
      icon: LayoutGrid,
      label: t("mobileMenu"),
      onClick: openMenu,
      active: false,
    },
    {
      key: "terminal",
      icon: Terminal,
      label: t("mobileTerminal"),
      onClick: openTerminal,
      active: false,
    },
    {
      key: "performance",
      icon: Activity,
      label: t("performanceMetrics"),
      onClick: openPerformance,
      active: false,
    },
    {
      key: "focus",
      icon: focusActive ? Maximize2 : Minimize2,
      label: focusActive ? t("exitFocusMode") : t("mobileFocus"),
      onClick: () => {
        toggleFocus();
        setMoreOpen(false);
      },
      active: focusActive,
    },
  ];

  const actions = barActions;

  return (
    <>
      {/* Language picker overlay */}
      <AnimatePresence>
        {langOpen && (
          <>
            <div
              className="fixed inset-0 z-60 lg:hidden"
              onClick={() => setLangOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed inset-x-4 bottom-18 z-60 overflow-hidden rounded-xl border border-border bg-card shadow-2xl lg:hidden"
              style={{
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
              }}
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => changeLocale(loc)}
                  className={`flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm transition-colors ${
                    active === loc
                      ? "bg-primary/10 text-primary"
                      : "text-foreground active:bg-secondary"
                  }`}
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {localeCode[loc]}
                  </span>
                  <span className="flex-1 font-medium">
                    {LOCALES_CONFIG[loc].name}
                  </span>
                  {active === loc && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Expandable "More" popover */}
      <AnimatePresence>
        {moreOpen && (
          <>
            <div
              className="fixed inset-0 z-40 lg:hidden"
              onClick={() => setMoreOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed left-1/2 bottom-16 z-50 w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 flex flex-col gap-0.5 rounded-xl border border-border bg-card py-1 shadow-xl lg:hidden"
            >
              {moreActions.map(
                ({ key, icon: Icon, label, onClick, active }) => (
                  <button
                    key={key}
                    onClick={() => {
                      onClick();
                      if (key !== "focus") setMoreOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 text-left text-sm active:bg-secondary ${
                      active ? "text-primary bg-primary/10" : "text-foreground"
                    }`}
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 font-medium">{label}</span>
                    {active && (
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                    )}
                  </button>
                ),
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom action bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border/30 bg-background/90 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        aria-label={t("mobileActions")}
      >
        <div className="grid h-14 grid-cols-5">
          {actions.map(
            ({ key, icon: Icon, label, onClick, disabled, active }) => (
              <button
                key={key}
                onClick={onClick}
                disabled={disabled}
                className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  disabled
                    ? "text-muted-foreground/30"
                    : active
                      ? "text-primary"
                      : "text-muted-foreground active:text-primary"
                }`}
                aria-label={label}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="text-[10px] leading-none">{label}</span>
              </button>
            ),
          )}
        </div>
      </nav>
    </>
  );
}
