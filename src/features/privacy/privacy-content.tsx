"use client";

import { useLocale, useTranslations } from "next-intl";

import type privacyPage from "@/../messages/pt-BR/privacyPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { BackLink } from "@/components/back-link";

type WhatWeCollectItem =
  (typeof privacyPage)["sections"]["whatWeCollect"]["items"][number];
type CookieRow = (typeof privacyPage)["sections"]["cookies"]["rows"][number];

const SECTION_KEYS = [
  "whatWeCollect",
  "cookies",
  "analytics",
  "thirdParties",
  "rights",
  "updates",
] as const;

export function PrivacyContent() {
  const t = useTranslations("privacyPage");
  const locale = useLocale();

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20">
      <AnimatedSection>
        <section aria-labelledby="intro-title" className="mb-12">
          <h2
            id="intro-title"
            className="mb-4 text-xl font-semibold text-foreground"
          >
            {t("intro.title")}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {t("intro.body")}
          </p>
        </section>
      </AnimatedSection>

      {/* O que coletamos */}
      <AnimatedSection delay={0.05}>
        <section aria-labelledby="what-we-collect-title" className="mb-12">
          <h2
            id="what-we-collect-title"
            className="mb-6 text-xl font-semibold text-foreground"
          >
            {t("sections.whatWeCollect.title")}
          </h2>
          <ul className="flex flex-col gap-4">
            {(t.raw("sections.whatWeCollect.items") as WhatWeCollectItem[]).map(
              (item, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-border bg-card/50 p-4"
                >
                  <h3 className="mb-2 font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ),
            )}
          </ul>
        </section>
      </AnimatedSection>

      {/* Cookies */}
      <AnimatedSection delay={0.1}>
        <section aria-labelledby="cookies-title" className="mb-12">
          <h2
            id="cookies-title"
            className="mb-4 text-xl font-semibold text-foreground"
          >
            {t("sections.cookies.title")}
          </h2>
          <p className="mb-6 text-muted-foreground">
            {t("sections.cookies.body")}
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm" role="table">
              <caption className="sr-only">
                {t("sections.cookies.title")}
              </caption>
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th scope="col" className="p-3 font-medium text-foreground">
                    {t("sections.cookies.table.name")}
                  </th>
                  <th scope="col" className="p-3 font-medium text-foreground">
                    {t("sections.cookies.table.purpose")}
                  </th>
                  <th scope="col" className="p-3 font-medium text-foreground">
                    {t("sections.cookies.table.duration")}
                  </th>
                  <th scope="col" className="p-3 font-medium text-foreground">
                    {t("sections.cookies.table.type")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(t.raw("sections.cookies.rows") as CookieRow[]).map(
                  (row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0"
                    >
                      <td className="p-3 font-mono text-xs text-foreground">
                        {row.name}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.purpose}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {row.duration}
                      </td>
                      <td className="p-3 text-muted-foreground">{row.type}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("sections.cookies.storage")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("sections.cookies.revokeHint")}
          </p>
        </section>
      </AnimatedSection>

      {/* Analytics, Terceiros, Direitos, Atualizações */}
      {SECTION_KEYS.slice(2).map((key, idx) => (
        <AnimatedSection key={key} delay={0.15 + idx * 0.05}>
          <section aria-labelledby={`${key}-title`} className="mb-12">
            <h2
              id={`${key}-title`}
              className="mb-4 text-xl font-semibold text-foreground"
            >
              {t(`sections.${key}.title`)}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {t(`sections.${key}.body`)}
            </p>
          </section>
        </AnimatedSection>
      ))}

      <AnimatedSection delay={0.5}>
        <p className="mb-4 text-sm text-muted-foreground">
          {t("lastUpdated")}:{" "}
          {new Date().toLocaleDateString(
            locale === "pt-BR"
              ? "pt-BR"
              : locale === "de"
                ? "de-DE"
                : locale === "es"
                  ? "es"
                  : "en-US",
            { day: "numeric", month: "long", year: "numeric" },
          )}
        </p>
        <BackLink href="/" label={t("backHome")} />
      </AnimatedSection>
    </div>
  );
}
