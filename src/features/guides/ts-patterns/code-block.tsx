"use client";

import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";

import { useCopyFeedback } from "@/components/copy-feedback";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CodeBlockProps {
  code: string;
  highlight?: string;
  label?: string;
}

export function CodeBlock({ code, highlight, label }: CodeBlockProps) {
  const t = useTranslations("global");
  const { copied, copy } = useCopyToClipboard();
  const { showFeedback } = useCopyFeedback();

  const handleCopy = () => {
    copy(code);
    showFeedback();
  };

  const lines = code.split("\n");

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[hsl(220,40%,6%)]">
      {label && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {label}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="rounded-md p-1.5 text-muted-foreground/50 transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={copied ? t("codeCopied") : t("copyCode")}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-primary" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      )}
      <div className="overflow-x-auto p-3 md:p-4">
        <pre className="font-mono text-xs leading-relaxed md:text-sm">
          {lines.map((line, i) => {
            const isHighlighted = highlight && line.includes(highlight);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className={`${
                  isHighlighted
                    ? "rounded bg-primary/10 px-1 text-primary"
                    : line.startsWith("//")
                      ? "text-muted-foreground/60"
                      : line.includes("// ✅")
                        ? "text-green-400/90"
                        : line.includes("// ❌")
                          ? "text-red-400/90"
                          : "text-foreground/90"
                }`}
              >
                {line || "\u00A0"}
              </motion.div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
