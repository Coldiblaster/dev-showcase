"use client";

import { useEffect, useState } from "react";

/** Breakpoint alinhado ao Tailwind md (768px). */
const DESKTOP_MIN_WIDTH_PX = 768;
const MEDIA_QUERY = `(min-width: ${DESKTOP_MIN_WIDTH_PX}px)`;

export type ViewportMode = "desktop" | "mobile";

/**
 * Retorna o modo de viewport atual pela resolução da tela (desktop ≥768px, mobile <768px).
 * Atualiza ao redimensionar a janela. Usa 768px (Tailwind md) como corte.
 */
export function useViewportMode(): ViewportMode {
  const [mode, setMode] = useState<ViewportMode>("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(MEDIA_QUERY);
    setMode(mq.matches ? "desktop" : "mobile");

    const handle = (e: MediaQueryListEvent) => {
      setMode(e.matches ? "desktop" : "mobile");
    };
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  return mode;
}
