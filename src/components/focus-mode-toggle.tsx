"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const STORAGE_KEY = "focus-mode-enabled";
const HTML_CLASS = "focus-mode";

/** Botão flutuante que ativa/desativa o modo foco:
 *  oculta navbar, footer e elementos marcados com [data-hide-focus].
 *  Estado persiste via localStorage. */
export function FocusModeToggle() {
  const t = useTranslations("global");
  const [active, setActive] = useState(false);

  // Restaura estado persistido no mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        document.documentElement.classList.add(HTML_CLASS);
        setActive(true);
      }
    } catch {}
  }, []);

  function toggle() {
    const next = !active;
    setActive(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {}
    if (next) {
      document.documentElement.classList.add(HTML_CLASS);
    } else {
      document.documentElement.classList.remove(HTML_CLASS);
    }
  }

  return (
    <button
      onClick={toggle}
      className="fab-floating fixed bottom-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 shadow-lg backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
      aria-label={active ? t("exitFocusMode") : t("focusMode")}
      title={active ? t("exitFocusMode") : t("focusMode")}
    >
      {active ? (
        <Maximize2 className="h-4 w-4 text-primary" />
      ) : (
        <Minimize2 className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}
