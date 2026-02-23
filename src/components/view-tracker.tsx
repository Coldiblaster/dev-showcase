"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { hasAnalyticsConsent } from "@/lib/cookie-consent";

/**
 * Dispara tracking de page view para /api/stats/track quando o usuário aceitou cookies.
 * Usa sessionStorage para evitar contagem duplicada na mesma sessão/path.
 */
export function ViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!hasAnalyticsConsent()) return;

    const path = pathname.replace(/^\/(pt-BR|en|es|de)/, "") || "/";
    const storageKey = `tracked:${path}`;

    // sessionStorage pode lançar em Safari ITP / modo privado
    try {
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, "1");
    } catch {
      return;
    }

    const body = JSON.stringify({ path });
    const jsonBlob = (b: string) => new Blob([b], { type: "application/json" });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/stats/track", jsonBlob(body));
      navigator.sendBeacon("/api/online", jsonBlob("{}"));
    } else {
      fetch("/api/stats/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
      fetch("/api/online", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
