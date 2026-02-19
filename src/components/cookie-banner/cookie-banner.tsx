"use client";

import { Cookie } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  type ConsentStatus,
  getConsent,
  setConsent,
} from "@/lib/cookie-consent";

/**
 * Banner de consentimento de cookies (padrão mercado).
 * Exibido até o usuário aceitar ou recusar; persiste escolha em cookie.
 */
export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [consent, setConsentState] = useState<ConsentStatus>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsentState(getConsent());
    setMounted(true);
  }, []);

  const handleAccept = useCallback(() => {
    setConsent("accepted");
    setConsentState("accepted");
  }, []);

  const handleReject = useCallback(() => {
    setConsent("rejected");
    setConsentState("rejected");
  }, []);

  if (!mounted || consent !== null) return null;

  return (
    <aside
      role="region"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 p-4 shadow-lg backdrop-blur-sm md:bottom-4 md:left-4 md:right-auto md:max-w-md md:rounded-xl md:border"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"
            aria-hidden
          >
            <Cookie className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2
              id="cookie-banner-title"
              className="text-sm font-semibold text-foreground"
            >
              {t("title")}
            </h2>
            <p
              id="cookie-banner-desc"
              className="mt-1 text-xs leading-relaxed text-muted-foreground"
            >
              {t("description")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={handleAccept} aria-label={t("accept")}>
            {t("accept")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReject}
            aria-label={t("reject")}
          >
            {t("reject")}
          </Button>
          <Link
            href="/privacidade"
            className="rounded text-xs text-muted-foreground underline underline-offset-2 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={t("learnMoreAriaLabel")}
          >
            {t("learnMore")}
          </Link>
        </div>
      </div>
    </aside>
  );
}
