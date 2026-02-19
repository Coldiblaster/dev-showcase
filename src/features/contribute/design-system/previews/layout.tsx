"use client";

import { useTranslations } from "next-intl";
import type { ComponentType, ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function HeroSectionPreview() {
  const t = useTranslations("designSystemPage.previews.layout");
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background/50">
      <div className="relative px-4 py-6 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="relative">
          <Badge
            variant="outline"
            className="mb-3 border-primary/30 text-xs text-primary"
          >
            {t("badge")}
          </Badge>
          <h3 className="mb-1 text-lg font-bold text-foreground">
            {t("heroTitle")}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t("descriptionText")}
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionWrapperPreview() {
  const t = useTranslations("designSystemPage.previews.layout");
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
      <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
        <span className="text-xs text-muted-foreground">
          {t("variantDefault")}
        </span>
      </div>
      <div className="rounded-lg border border-border bg-secondary/20 p-4 text-center">
        <span className="text-xs text-muted-foreground">
          {t("variantAlternate")}
        </span>
      </div>
    </div>
  );
}

function SectionNavPreview() {
  const t = useTranslations("designSystemPage.previews.layout");
  return (
    <div className="mx-auto flex w-full max-w-sm items-center justify-center gap-1 rounded-full border border-border/50 bg-background/80 px-2 py-1.5 backdrop-blur-sm">
      <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
        {t("section1")}
      </span>
      <span className="rounded-full px-3 py-1 text-xs text-muted-foreground">
        {t("section2")}
      </span>
      <span className="rounded-full px-3 py-1 text-xs text-muted-foreground">
        {t("section3")}
      </span>
    </div>
  );
}

function SectionDividerPreview() {
  return (
    <div className="mx-auto w-full max-w-sm px-6">
      <Separator />
    </div>
  );
}

export const layoutPreviews: Record<
  string,
  { preview: ReactNode | ComponentType; code: string }
> = {
  heroSection: {
    preview: HeroSectionPreview,
    code: `<HeroSection
  badge="Badge"
  badgeIcon={Star}
  title="Hero Title"
  description="Description text goes here"
  showBackLink
  backHref="/"
  ctaSlot={<Button>Call to Action</Button>}
/>`,
  },
  sectionWrapper: {
    preview: SectionWrapperPreview,
    code: `<SectionWrapper id="section" variant="default">
  {children}
</SectionWrapper>

<SectionWrapper id="section-alt" variant="alternate">
  {children}
</SectionWrapper>`,
  },
  sectionNav: {
    preview: SectionNavPreview,
    code: `<SectionNav
  sections={[
    { id: "intro", label: "Intro" },
    { id: "features", label: "Features" },
    { id: "docs", label: "Docs" },
  ]}
  triggerId="intro"
/>`,
  },
  sectionDivider: {
    preview: SectionDividerPreview,
    code: `<SectionDivider />
<SectionDivider maxWidth="3xl" />`,
  },
};
