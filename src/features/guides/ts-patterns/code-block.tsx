"use client";

import { motion } from "framer-motion";
import { Check, ClipboardCopy } from "lucide-react";
import { useCallback, useState } from "react";

interface CodeBlockProps {
  code: string;
  highlight?: string;
  label?: string;
}

export function CodeBlock({ code, highlight, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lines = code.split("\n");

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-secondary/30">
      {label && (
        <div className="flex items-center justify-between border-b border-border/30 px-4 py-2">
          <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-green-400" />
                <span className="text-green-400">Copiado</span>
              </>
            ) : (
              <>
                <ClipboardCopy className="h-3 w-3" />
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  Copiar
                </span>
              </>
            )}
          </button>
        </div>
      )}
      {!label && (
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 z-10 rounded-md p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-secondary/50 hover:text-foreground group-hover:opacity-100"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <ClipboardCopy className="h-3.5 w-3.5" />
          )}
        </button>
      )}
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-xs leading-relaxed">
          {lines.map((line, i) => {
            const isHighlighted =
              highlight && line.includes(highlight);
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
