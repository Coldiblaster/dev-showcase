"use client";

import { ExternalLink, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { CardBlur } from "@/components/ui/card-blur";

import { NODEMAILER_API_CODE, RESEND_API_CODE } from "./code-examples";

export function LibsSection() {
  const t = useTranslations("contactFormPage.libs");

  return (
    <section
      id="libs"
      className="px-4 py-12 md:px-6 md:py-20"
      role="region"
      aria-labelledby="contact-libs-heading"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div id="contact-libs-heading">
            <SectionHeader
              icon={Mail}
              title={t("title")}
              subtitle={t("subtitle")}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("description")}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <p className="mt-6 text-sm font-medium text-foreground">
            {t("intro")}
          </p>
          <ul className="mt-3 space-y-3" role="list">
            <li>
              <a
                href={t("resendUrl")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary underline underline-offset-2 hover:no-underline"
              >
                {t("resendName")}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
              <span className="ml-1.5 text-muted-foreground">
                — {t("resendDesc")}
              </span>
            </li>
            <li>
              <a
                href={t("nodemailerUrl")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary underline underline-offset-2 hover:no-underline"
              >
                {t("nodemailerName")}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
              <span className="ml-1.5 text-muted-foreground">
                — {t("nodemailerDesc")}
              </span>
            </li>
            <li>
              <a
                href={t("reactEmailUrl")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary underline underline-offset-2 hover:no-underline"
              >
                {t("reactEmailName")}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
              <span className="ml-1.5 text-muted-foreground">
                — {t("reactEmailDesc")}
              </span>
            </li>
          </ul>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <CardBlur padding="p-6" className="mt-8 space-y-6">
            <CodeBlock title={t("codeTitleResend")} code={RESEND_API_CODE} />
            <CodeBlock
              title={t("codeTitleNodemailer")}
              code={NODEMAILER_API_CODE}
            />
          </CardBlur>
        </AnimatedSection>
      </div>
    </section>
  );
}
