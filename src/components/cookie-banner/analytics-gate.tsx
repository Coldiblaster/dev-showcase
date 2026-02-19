"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCallback, useEffect, useState } from "react";

import { hasAnalyticsConsent } from "@/lib/cookie-consent";

/**
 * Renderiza Vercel Analytics apenas quando o usuário aceitou cookies.
 * Evita carregar script de terceiros antes do consentimento (LGPD/GDPR).
 */
export function AnalyticsGate() {
  const [canLoad, setCanLoad] = useState(false);

  const check = useCallback(() => {
    if (hasAnalyticsConsent()) setCanLoad(true);
  }, []);

  useEffect(() => {
    check();
    // Rechecar quando o cookie puder ter sido alterado (ex.: usuário aceitou no banner)
    const id = setInterval(check, 500);
    return () => clearInterval(id);
  }, [check]);

  if (!canLoad) return null;
  return <Analytics />;
}
