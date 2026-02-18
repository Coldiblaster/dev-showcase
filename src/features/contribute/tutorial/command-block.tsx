"use client";

import { Check, Copy, Terminal } from "lucide-react";

import { useCopyFeedback } from "@/components/copy-feedback";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CommandBlockProps {
  command: string;
  output?: string;
  title?: string;
}

/** Bloco estilo terminal com prompt $, botão copy e output opcional. */
export function CommandBlock({ command, output, title }: CommandBlockProps) {
  const { copied, copy } = useCopyToClipboard();
  const { showFeedback } = useCopyFeedback();

  const handleCopy = () => {
    copy(command);
    showFeedback();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[hsl(220,40%,6%)]">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary/60" />
          <span className="font-mono text-xs text-muted-foreground">
            {title ?? "terminal"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="rounded-md p-1.5 text-muted-foreground/50 transition-colors hover:bg-secondary hover:text-foreground"
          aria-label={copied ? "Copiado" : "Copiar comando"}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-primary" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      <div className="p-4 font-mono text-sm leading-relaxed">
        <div className="flex items-start gap-2">
          <span className="select-none text-primary/60">$</span>
          <span className="text-foreground/90">{command}</span>
        </div>
        {output && (
          <div className="mt-2 whitespace-pre-wrap border-t border-border/20 pt-2 text-xs text-muted-foreground/70">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}
