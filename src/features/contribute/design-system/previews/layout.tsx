"use client";

import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const layoutPreviews: Record<
  string,
  { preview: ReactNode; code: string }
> = {
  heroSection: {
    preview: (
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background/50">
        <div className="relative px-4 py-6 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative">
            <Badge
              variant="outline"
              className="mb-3 border-primary/30 text-xs text-primary"
            >
              Badge
            </Badge>
            <h3 className="mb-1 text-lg font-bold text-foreground">
              Hero Title
            </h3>
            <p className="text-xs text-muted-foreground">
              Description text goes here
            </p>
          </div>
        </div>
      </div>
    ),
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
    preview: (
      <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
        <div className="rounded-lg border border-border bg-background/50 p-4 text-center">
          <span className="text-xs text-muted-foreground">
            variant=&quot;default&quot;
          </span>
        </div>
        <div className="rounded-lg border border-border bg-secondary/20 p-4 text-center">
          <span className="text-xs text-muted-foreground">
            variant=&quot;alternate&quot;
          </span>
        </div>
      </div>
    ),
    code: `<SectionWrapper id="section" variant="default">
  {children}
</SectionWrapper>

<SectionWrapper id="section-alt" variant="alternate">
  {children}
</SectionWrapper>`,
  },

  sectionNav: {
    preview: (
      <div className="mx-auto flex w-full max-w-sm items-center justify-center gap-1 rounded-full border border-border/50 bg-background/80 px-2 py-1.5 backdrop-blur-sm">
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Section 1
        </span>
        <span className="rounded-full px-3 py-1 text-xs text-muted-foreground">
          Section 2
        </span>
        <span className="rounded-full px-3 py-1 text-xs text-muted-foreground">
          Section 3
        </span>
      </div>
    ),
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
    preview: (
      <div className="mx-auto w-full max-w-sm px-6">
        <Separator />
      </div>
    ),
    code: `<SectionDivider />
<SectionDivider maxWidth="3xl" />`,
  },
};
