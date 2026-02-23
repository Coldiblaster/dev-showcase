"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Check,
  Globe,
  Maximize2,
  MessageCircle,
  Minimize2,
  Search,
  Terminal,
} from "lucide-react";
import { usePathname } from "next/navigation";
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
const CONTENT_PATH_RE =
  /^\/(pt-BR|en|es|de)?\/?((dicas|ferramentas|implementacoes)\/.+)/;

/** Barra de ações fixa no rodapé, visível apenas no mobile. */
export function MobileActionBar() {
  const t = useTranslations("global");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [clientLocale, setClientLocale] = useState<Locale | null>(null);
  const [focusActive, setFocusActive] = useState(false);

  const isContentPage = CONTENT_PATH_RE.test(pathname);

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

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openChat = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-chat-widget"));
  }, []);

  const openTerminal = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-terminal"));
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

  const baseActions = [
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
      onClick: () => setLangOpen((s) => !s),
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
      key: "terminal",
      icon: Terminal,
      label: t("mobileTerminal"),
      onClick: openTerminal,
      disabled: false,
      active: false,
    },
  ];

  const actions = isContentPage
    ? [
        ...baseActions,
        {
          key: "focus",
          icon: focusActive ? Maximize2 : Minimize2,
          label: t("mobileFocus"),
          onClick: toggleFocus,
          disabled: false,
          active: focusActive,
        },
      ]
    : baseActions;

  return (
    <>
      {/* Language picker overlay */}
      <AnimatePresence>
        {langOpen && (
          <>
            <div
              className="fixed inset-0 z-60 md:hidden"
              onClick={() => setLangOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="fixed inset-x-4 bottom-18 z-60 overflow-hidden rounded-xl border border-border bg-card shadow-2xl md:hidden"
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

      {/* Bottom action bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border/30 bg-background/90 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        aria-label={t("mobileActions")}
      >
        <div
          className={`grid h-14 ${isContentPage ? "grid-cols-6" : "grid-cols-5"}`}
        >
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
