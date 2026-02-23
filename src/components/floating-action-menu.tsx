"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  LayoutGrid,
  Maximize2,
  MessageCircle,
  Minimize2,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

const SCROLL_THRESHOLD = 200;
const FOCUS_STORAGE_KEY = "focus-mode-enabled";
const FOCUS_HTML_CLASS = "focus-mode";

/**
 * FAB unificado (desktop only — md+).
 * Botão principal expande 3 ações: scroll-to-top (condicional),
 * focus mode e chat.
 */
export function FloatingActionMenu() {
  const tGlobal = useTranslations("global");
  const tChat = useTranslations("chat");

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [focusActive, setFocusActive] = useState(false);

  // Restaura focus mode do localStorage no mount
  useEffect(() => {
    try {
      if (localStorage.getItem(FOCUS_STORAGE_KEY) === "true") {
        document.documentElement.classList.add(FOCUS_HTML_CLASS);
        setFocusActive(true);
      }
    } catch {}
  }, []);

  // Detecta scroll para exibir/ocultar ação de scroll-to-top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-fab-menu]")) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  }, []);

  const toggleFocus = useCallback(() => {
    const next = !focusActive;
    setFocusActive(next);
    try {
      localStorage.setItem(FOCUS_STORAGE_KEY, String(next));
    } catch {}
    document.documentElement.classList.toggle(FOCUS_HTML_CLASS, next);
    setOpen(false);
  }, [focusActive]);

  const openChat = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-chat-widget"));
    setOpen(false);
  }, []);

  type Action = {
    id: string;
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    active?: boolean;
  };

  const actions: Action[] = [
    ...(scrolled
      ? [
          {
            id: "scroll",
            icon: ArrowUp,
            label: tGlobal("scrollToTop"),
            onClick: scrollToTop,
          },
        ]
      : []),
    {
      id: "focus",
      icon: focusActive ? Maximize2 : Minimize2,
      label: focusActive ? tGlobal("exitFocusMode") : tGlobal("focusMode"),
      onClick: toggleFocus,
      active: focusActive,
    },
    {
      id: "chat",
      icon: MessageCircle,
      label: tChat("open"),
      onClick: openChat,
    },
  ];

  return (
    <div
      data-fab-menu="true"
      className="fixed bottom-6 right-6 z-50 hidden flex-col items-center gap-2.5 md:flex"
    >
      {/* Sub-ações */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="flex flex-col items-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            {actions.map((action, i) => (
              <motion.button
                key={action.id}
                onClick={action.onClick}
                title={action.label}
                aria-label={action.label}
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    delay: i * 0.05,
                    duration: 0.2,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 6,
                  scale: 0.85,
                  transition: {
                    delay: (actions.length - 1 - i) * 0.03,
                    duration: 0.15,
                  },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition-colors ${
                  action.active
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-card/90 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <action.icon className="h-4 w-4" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão principal */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={tGlobal("quickActions")}
        aria-expanded={open}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <LayoutGrid className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
