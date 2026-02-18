"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Dispara tracking de page view para /api/stats/track.
 * Usa sessionStorage para evitar contagem duplicada na mesma sessão/path.
 */
export function ViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.replace(/^\/(pt-BR|en|es|de)/, "") || "/";
    const storageKey = `tracked:${path}`;

    if (sessionStorage.getItem(storageKey)) return;

    sessionStorage.setItem(storageKey, "1");

    const body = JSON.stringify({ path });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/stats/track",
        new Blob([body], { type: "application/json" }),
      );
    } else {
      fetch("/api/stats/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
