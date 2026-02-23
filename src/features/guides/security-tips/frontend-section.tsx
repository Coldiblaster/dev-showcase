"use client";

import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";

import type securityPage from "@/../messages/pt-BR/securityPage.json";
import { AnimatedSection } from "@/components/animated-section";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section-header";
import { SectionWrapper } from "@/components/section-wrapper";
import { TipItem } from "@/components/tip-item";

import { HONEYPOT_CODE, RECAPTCHA_PROVIDER_CODE } from "./code-examples";

type FrontendTip = (typeof securityPage)["frontend"]["tips"][number];

/** Seção de segurança no frontend (XSS, CSP, honeypot, reCAPTCHA). */
export function FrontendSection() {
  const t = useTranslations("securityPage");

  return (
    <SectionWrapper id="frontend">
      <AnimatedSection>
        <SectionHeader
          icon={Lock}
          title={t("frontend.title")}
          subtitle={t("frontend.subtitle")}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="mb-6 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          {t("frontend.description")}
        </p>
        <div className="mb-8 flex flex-col gap-4">
          {(t.raw("frontend.tips") as FrontendTip[]).map((tip) => (
            <TipItem
              key={tip.title}
              title={tip.title}
              description={tip.description}
            />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="mb-6">
          <CodeBlock
            title="components/contact-form.tsx — Honeypot"
            code={HONEYPOT_CODE}
          />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <CodeBlock
          title="components/recaptcha-provider.tsx"
          code={RECAPTCHA_PROVIDER_CODE}
        />
      </AnimatedSection>
    </SectionWrapper>
  );
}
