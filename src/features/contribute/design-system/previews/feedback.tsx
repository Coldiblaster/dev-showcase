"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, RotateCcw } from "lucide-react";
import { type ReactNode, useCallback, useRef, useState } from "react";

import { ScoreGauge } from "@/components/score-gauge";
import { Button } from "@/components/ui/button";

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted/50 ${className ?? ""}`}
    />
  );
}

function AnimatedSectionPreview() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <motion.div
          key={`a-${key}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary"
        >
          fade up
        </motion.div>
        <motion.div
          key={`b-${key}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-lg border border-border bg-card/50 px-4 py-3 text-sm text-muted-foreground"
        >
          delay=0.3
        </motion.div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setKey((k) => k + 1)}
        className="gap-1.5 text-xs text-muted-foreground"
      >
        <RotateCcw className="h-3 w-3" />
        Replay
      </Button>
    </div>
  );
}

function CopyFeedbackPreview() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("Hello from Dev Showcase!").catch(() => {});
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="gap-2"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        {copied ? "Copied!" : "Copy to clipboard"}
      </Button>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/95 px-3 py-1.5 shadow-md"
            role="status"
          >
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/15">
              <Check className="h-2.5 w-2.5 text-primary" />
            </div>
            <span className="text-xs font-medium text-foreground">Copied!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const feedbackPreviews: Record<
  string,
  { preview: ReactNode; code: string }
> = {
  animatedSection: {
    preview: <AnimatedSectionPreview />,
    code: `<AnimatedSection>
  <h2>Animated on viewport entry</h2>
</AnimatedSection>

<AnimatedSection delay={0.3}>
  <p>Delayed animation</p>
</AnimatedSection>`,
  },

  pageSkeleton: {
    preview: (
      <div className="mx-auto w-full max-w-xs space-y-3 rounded-xl border border-border bg-background/50 p-4">
        <SkeletonBlock className="mx-auto h-3 w-16" />
        <SkeletonBlock className="mx-auto h-5 w-3/4" />
        <SkeletonBlock className="mx-auto h-3 w-2/3" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <SkeletonBlock className="h-16" />
          <SkeletonBlock className="h-16" />
        </div>
      </div>
    ),
    code: `<PageSkeleton variant="guide" />
<PageSkeleton variant="implementation" />
<PageSkeleton variant="tool" />`,
  },

  scoreGauge: {
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="scale-[0.65] sm:scale-75">
          <ScoreGauge score={92} />
        </div>
        <div className="scale-[0.65] sm:scale-75">
          <ScoreGauge score={65} />
        </div>
        <div className="scale-[0.65] sm:scale-75">
          <ScoreGauge score={35} />
        </div>
      </div>
    ),
    code: `<ScoreGauge score={92} />
<ScoreGauge score={65} />
<ScoreGauge score={35} label="/100" />`,
  },

  copyFeedback: {
    preview: <CopyFeedbackPreview />,
    code: `const { showFeedback } = useCopyFeedback();
const { copied, copy } = useCopyToClipboard();

<Button onClick={() => { copy(text); showFeedback(); }}>
  {copied ? <Check /> : <Copy />}
  {copied ? "Copied!" : "Copy"}
</Button>`,
  },
};
