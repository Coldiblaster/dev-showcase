"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  type ComponentType,
  createElement,
  type ReactNode,
  useState,
} from "react";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

interface ComponentShowcaseProps {
  name: string;
  path: string;
  description: string;
  preview?: ReactNode | ComponentType;
  code?: string;
}

/** Card de showcase com preview interativo e toggle de código. */
export function ComponentShowcase({
  name,
  path,
  description,
  preview,
  code,
}: ComponentShowcaseProps) {
  const t = useTranslations("designSystemPage.showcase");
  const [showCode, setShowCode] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="group overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-colors hover:border-primary/30"
    >
      {preview && (
        <div
          className="flex min-h-[120px] items-center justify-center overflow-x-auto border-b border-border/50 bg-background/30 p-6"
          aria-label={`${name} ${t("preview")}`}
        >
          <div className="w-full">
            {typeof preview === "function" ? createElement(preview) : preview}
          </div>
        </div>
      )}

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="font-semibold text-foreground">{name}</h3>
          {code && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCode(!showCode)}
              aria-expanded={showCode}
              aria-label={showCode ? t("hideCode") : t("viewCode")}
              className="h-8 shrink-0 gap-1.5 text-xs text-muted-foreground"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {showCode ? t("hideCode") : t("viewCode")}
              </span>
            </Button>
          )}
        </div>
        <p className="mb-2 font-mono text-xs text-primary/60">{path}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <AnimatePresence>
        {showCode && code && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/40 px-5 pb-5">
              <CodeBlock code={code} title={path} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
