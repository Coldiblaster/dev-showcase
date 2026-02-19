"use client";

import { Code2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { HeroSection } from "@/components/hero-section";

import { CodeEditor } from "./code-editor";
import { HowItWorks } from "./how-it-works";
import { ReviewResults } from "./review-results";
import type { ReviewResult } from "./types";

/** Página de demonstração de revisão de código com editor e resultados. */
export function CodeReviewShowcase() {
  const t = useTranslations("codeReviewPage");
  const locale = useLocale();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("auto");
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReview = useCallback(async () => {
    if (code.length < 10) {
      setError(t("error.tooShort"));
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/code-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: language !== "auto" ? language : undefined,
          locale,
        }),
      });
      if (res.status === 429) {
        setError(t("error.rateLimit"));
        return;
      }
      if (!res.ok) throw new Error();
      setResult(await res.json());
    } catch {
      setError(t("error.generic"));
    } finally {
      setLoading(false);
    }
  }, [code, language, locale, t]);

  const handleClear = useCallback(() => {
    setCode("");
    setResult(null);
    setError("");
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection
        badge={t("hero.badge")}
        badgeIcon={Code2}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        backHref="/ferramentas"
      />

      <section className="px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <AnimatedSection>
            <CodeEditor
              code={code}
              language={language}
              loading={loading}
              error={error}
              onCodeChange={setCode}
              onLanguageChange={setLanguage}
              onReview={handleReview}
              onClear={handleClear}
            />
          </AnimatedSection>
          <ReviewResults result={result} />
          <HowItWorks />
        </div>
      </section>
    </div>
  );
}
