"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";

/** Lista os termos mais buscados via /api/search. */
export function SearchesSection() {
  const t = useTranslations("statsPage");
  const [terms, setTerms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/search", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { terms: string[] }) => setTerms(data.terms ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <SectionWrapper id="searches" variant="default">
      <AnimatedSection>
        <SectionHeader
          icon={Search}
          title={t("searches.title")}
          subtitle={t("searches.description")}
        />
      </AnimatedSection>

      {loading && (
        <AnimatedSection delay={0.1}>
          <p className="text-sm text-muted-foreground">
            {t("searches.loading")}
          </p>
        </AnimatedSection>
      )}

      {!loading && terms.length === 0 && (
        <AnimatedSection delay={0.1}>
          <p className="text-sm text-muted-foreground">{t("searches.empty")}</p>
        </AnimatedSection>
      )}

      {!loading && terms.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {terms.map((term, i) => (
            <AnimatedSection key={term} delay={0.1 + i * 0.04}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm text-foreground">
                <span className="font-mono text-xs text-primary">#{i + 1}</span>
                {term}
              </span>
            </AnimatedSection>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
