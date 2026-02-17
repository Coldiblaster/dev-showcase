"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

interface TerminalHintProps {
  onOpen: () => void;
}

/** Dica flutuante clicável que indica a tecla para abrir o terminal. */
export function TerminalHint({ onOpen }: TerminalHintProps) {
  const t = useTranslations("global");

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden md:block">
      <motion.button
        type="button"
        onClick={onOpen}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3 }}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-border/30 bg-background/80 px-3 py-1.5 text-xs text-muted-foreground/60 backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-muted-foreground"
      >
        <Terminal className="h-3 w-3" />
        <span>
          <kbd className="rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px]">
            Ctrl
          </kbd>
          {" + "}
          <kbd className="rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px]">
            `
          </kbd>{" "}
          {t("terminalFor")}
        </span>
      </motion.button>
    </div>
  );
}
