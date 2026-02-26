"use client";

import { Check, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import { useCopyFeedback } from "@/components/copy-feedback";

interface CopyLinkToSectionProps {
  sectionId: string;
  className?: string;
}

/** Ícone que copia a URL com hash da seção. Aparece ao lado do heading. */
export function CopyLinkToSection({
  sectionId,
  className = "",
}: CopyLinkToSectionProps) {
  const t = useTranslations("global");
  const { showFeedback } = useCopyFeedback();
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      showFeedback();
      setTimeout(() => setCopied(false), 2000);
    });
  }, [sectionId, showFeedback]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded p-1 text-muted-foreground/60 opacity-0 transition-opacity hover:bg-muted hover:text-primary group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${className}`}
      aria-label={t("copyLinkToSection")}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-primary" />
      ) : (
        <Link2 className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
