"use client";

import { Loader2, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? t("newsletterError"));
        return;
      }

      setStatus("success");
      setEmail("");
      setWebsite("");
    } catch {
      setStatus("error");
      setErrorMsg(t("newsletterError"));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-2 font-mono text-xs font-medium text-muted-foreground">
        <Mail className="h-3.5 w-3.5" />
        {t("newsletterTitle")}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <label htmlFor="newsletter-website">Website</label>
          <input
            id="newsletter-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <Input
          type="email"
          placeholder={t("newsletterPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          required
          className="h-9 flex-1 min-w-0 text-sm"
          aria-label={t("newsletterPlaceholder")}
        />
        <Button
          type="submit"
          size="sm"
          disabled={status === "loading"}
          className="h-9 min-w-[4.5rem] shrink-0"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            t("newsletterButton")
          )}
        </Button>
      </form>
      {status === "success" && (
        <p className="text-xs text-primary">{t("newsletterSuccess")}</p>
      )}
      {status === "error" && (
        <p className="text-xs text-destructive">{errorMsg}</p>
      )}
    </div>
  );
}
