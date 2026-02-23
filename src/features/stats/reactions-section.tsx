"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { CONTENT_ITEMS } from "@/data/content";
import { getCategoryPath } from "@/lib/content-paths";

interface ReactionData {
  path: string;
  heart: number;
  fire: number;
  bulb: number;
  total: number;
}

const EMOJI: Record<string, string> = {
  heart: "❤️",
  fire: "🔥",
  bulb: "💡",
};

/** Carrega as reações dos conteúdos mais populares da plataforma. */
export function ReactionsSection() {
  const t = useTranslations("statsPage");
  const [data, setData] = useState<ReactionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paths = CONTENT_ITEMS.map(
      (item) => `/${getCategoryPath(item.category)}/${item.slug}`,
    );

    Promise.all(
      paths.map((path) =>
        fetch(`/api/reactions?path=${encodeURIComponent(path)}`)
          .then((r) => r.json())
          .then(
            (d: { heart: number; fire: number; bulb: number }) =>
              ({
                path,
                heart: d.heart ?? 0,
                fire: d.fire ?? 0,
                bulb: d.bulb ?? 0,
                total: (d.heart ?? 0) + (d.fire ?? 0) + (d.bulb ?? 0),
              }) as ReactionData,
          )
          .catch(
            () =>
              ({ path, heart: 0, fire: 0, bulb: 0, total: 0 }) as ReactionData,
          ),
      ),
    )
      .then((results) => {
        const filtered = results
          .filter((r) => r.total > 0)
          .sort((a, b) => b.total - a.total);
        setData(filtered);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SectionWrapper id="reactions" variant="alternate">
      <AnimatedSection>
        <SectionHeader
          icon={Heart}
          title={t("reactions.title")}
          subtitle={t("reactions.description")}
        />
      </AnimatedSection>

      {loading && (
        <AnimatedSection delay={0.1}>
          <p className="text-sm text-muted-foreground">
            {t("reactions.loading")}
          </p>
        </AnimatedSection>
      )}

      {!loading && data.length === 0 && (
        <AnimatedSection delay={0.1}>
          <p className="text-sm text-muted-foreground">
            {t("reactions.empty")}
          </p>
        </AnimatedSection>
      )}

      {!loading && data.length > 0 && (
        <div className="space-y-3">
          {data.map((item, i) => (
            <AnimatedSection key={item.path} delay={0.1 + i * 0.04}>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/50 p-4">
                <span className="min-w-0 truncate font-mono text-sm text-foreground">
                  {item.path}
                </span>
                <div className="flex items-center gap-3">
                  {(["heart", "fire", "bulb"] as const).map((type) => (
                    <span
                      key={type}
                      className="flex items-center gap-1 text-sm"
                    >
                      <span>{EMOJI[type]}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {item[type]}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
