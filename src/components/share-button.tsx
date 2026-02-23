"use client";

import { Check, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  title: string;
}

/** Botão de compartilhamento usando Web Share API (mobile/Chrome).
 *  Fallback: copia a URL atual para o clipboard. */
export function ShareButton({ title }: ShareButtonProps) {
  const t = useTranslations("global");
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  async function handleShare() {
    const url = window.location.href;

    if (canShare) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Usuário cancelou ou erro — cai para o fallback de clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-1.5 rounded-full text-xs"
      aria-label={t("shareAriaLabel")}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-primary" />
          {t("linkCopied")}
        </>
      ) : (
        <>
          <Share2 className="h-3 w-3" />
          {t("share")}
        </>
      )}
    </Button>
  );
}
