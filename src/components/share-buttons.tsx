"use client";

import { Check, Linkedin, Share2, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  title: string;
}

function buildTwitterUrl(title: string, url: string): string {
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  return `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
}

function buildLinkedInUrl(url: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

/** Botões de compartilhamento: genérico (Web Share/clipboard), Twitter e LinkedIn. */
export function ShareButtons({ title }: ShareButtonsProps) {
  const t = useTranslations("global");
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  function getUrl() {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }

  async function handleGenericShare() {
    if (typeof window === "undefined") return;
    const url = getUrl();

    if (canShare) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* fallback */
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  function handleTwitter() {
    window.open(
      buildTwitterUrl(title, getUrl()),
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleLinkedIn() {
    window.open(buildLinkedInUrl(getUrl()), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleGenericShare}
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
      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitter}
        className="gap-1.5 rounded-full text-xs"
        aria-label={t("shareTwitter")}
      >
        <Twitter className="h-3 w-3" />
        {t("shareTwitter")}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleLinkedIn}
        className="gap-1.5 rounded-full text-xs"
        aria-label={t("shareLinkedIn")}
      >
        <Linkedin className="h-3 w-3" />
        {t("shareLinkedIn")}
      </Button>
    </div>
  );
}
