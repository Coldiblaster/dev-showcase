function HeroSkeleton() {
  return (
    <section className="relative flex min-h-[90dvh] flex-col justify-center px-4 pt-24 pb-16 md:min-h-screen md:px-6 md:py-32">
      <div className="mx-auto w-full max-w-4xl text-center">
        <div className="mx-auto mb-8 h-4 w-20 rounded bg-muted/40" />
        <div className="mx-auto mb-6 h-7 w-36 rounded-full bg-muted/40" />
        <div className="mx-auto mb-4 h-10 w-3/4 rounded bg-muted/50 md:h-14" />
        <div className="mx-auto mb-2 h-5 w-1/2 rounded bg-muted/30 md:mb-4" />
        <div className="mx-auto mb-2 h-4 w-full max-w-2xl rounded bg-muted/30" />
        <div className="mx-auto h-4 w-2/3 rounded bg-muted/30" />
      </div>
    </section>
  );
}

function CodeWindowSkeleton({ lines = 5 }: { lines?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/40 bg-muted/10">
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-muted/40" />
        <div className="h-3 w-3 rounded-full bg-muted/40" />
        <div className="h-3 w-3 rounded-full bg-muted/40" />
        <div className="ml-4 h-3 w-24 rounded bg-muted/30" />
      </div>
      <div className="space-y-2 p-4">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded bg-muted/20"
            style={{ width: `${60 + ((i * 17) % 40)}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function GuideSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 pb-32 md:px-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 h-5 w-28 rounded-full bg-muted/40" />
            <div className="mx-auto mb-3 h-8 w-2/3 rounded bg-muted/50" />
            <div className="mx-auto h-4 w-1/2 rounded bg-muted/30" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="space-y-3 rounded-xl border border-border/40 bg-muted/10 p-5"
              >
                <div className="h-5 w-2/3 rounded bg-muted/50" />
                <div className="h-3 w-full rounded bg-muted/20" />
                <div className="h-3 w-4/5 rounded bg-muted/20" />
                <div className="flex gap-2 pt-2">
                  <div className="h-5 w-14 rounded-full bg-muted/30" />
                  <div className="h-5 w-16 rounded-full bg-muted/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ImplementationSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 pb-32 md:px-6">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="space-y-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 h-5 w-28 rounded-full bg-muted/40" />
            <div className="mx-auto mb-3 h-8 w-2/3 rounded bg-muted/50" />
            <div className="mx-auto h-4 w-1/2 rounded bg-muted/30" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <CodeWindowSkeleton lines={5} />
            <CodeWindowSkeleton lines={5} />
          </div>
        </div>
      ))}
      <div className="space-y-4">
        <div className="mx-auto h-8 w-1/3 rounded bg-muted/50" />
        <div className="grid gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-xl border border-border/30 bg-muted/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 pb-32 md:px-6">
      <div className="overflow-hidden rounded-xl border border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-muted/40" />
          <div className="h-3 w-3 rounded-full bg-muted/40" />
          <div className="h-3 w-3 rounded-full bg-muted/40" />
          <div className="ml-4 h-4 w-48 rounded bg-muted/30" />
        </div>
        <div className="grid md:grid-cols-2">
          <div className="space-y-3 border-r border-border/30 p-5">
            <div className="h-4 w-20 rounded bg-muted/50" />
            <div className="h-10 w-full rounded-lg bg-muted/20" />
            <div className="h-4 w-20 rounded bg-muted/50" />
            <div className="h-32 w-full rounded-lg bg-muted/15" />
          </div>
          <div className="space-y-3 p-5">
            <div className="h-4 w-24 rounded bg-muted/50" />
            <div className="h-48 w-full rounded-lg bg-muted/15" />
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-5 w-28 rounded-full bg-muted/40" />
          <div className="mx-auto mb-3 h-8 w-1/3 rounded bg-muted/50" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="space-y-2 rounded-xl border border-border/40 bg-muted/10 p-4"
            >
              <div className="h-4 w-1/2 rounded bg-muted/50" />
              <div className="h-8 w-full rounded-lg bg-muted/20" />
              <div className="h-3 w-3/4 rounded bg-muted/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const VARIANT_MAP = {
  guide: GuideSkeleton,
  implementation: ImplementationSkeleton,
  tool: ToolSkeleton,
} as const;

export type PageSkeletonVariant = keyof typeof VARIANT_MAP;

export function PageSkeleton({ variant }: { variant: PageSkeletonVariant }) {
  const ContentSkeleton = VARIANT_MAP[variant];

  return (
    <div className="animate-pulse">
      <HeroSkeleton />
      <ContentSkeleton />
    </div>
  );
}
