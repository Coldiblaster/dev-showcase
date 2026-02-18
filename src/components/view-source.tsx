"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Code2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

/** Props do componente que exibe fonte ao lado do conteúdo. */
interface ViewSourceProps {
  /** Filhos a serem renderizados normalmente */
  children: React.ReactNode;
  /** Código-fonte a ser exibido */
  code: string;
  /** Caminho do arquivo exibido no cabeçalho */
  filePath: string;
}

/** Permite alternar entre conteúdo e código-fonte. */
export function ViewSource({ children, code, filePath }: ViewSourceProps) {
  const t = useTranslations("viewSource");
  const [isOpen, setIsOpen] = useState(false);
  const lineCount = code.split("\n").length;

  return (
    <div className="relative">
      {children}

      <div className="absolute right-4 top-4 z-10 md:right-6 md:top-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t("hide") : t("toggle")}
          className="gap-2 border-border/40 bg-background/80 text-xs backdrop-blur-sm hover:bg-muted/80"
        >
          <Code2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">
            {isOpen ? t("hide") : t("toggle")}
          </span>
          {isOpen ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/40 bg-muted/10 px-4 py-6 md:px-6">
              <div className="mx-auto max-w-5xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{t("title")}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {t("lines", { count: lineCount })}
                  </span>
                </div>
                <CodeBlock title={filePath} code={code} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
