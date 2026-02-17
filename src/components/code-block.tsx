"use client";

import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";

import { useCopyFeedback } from "@/components/copy-feedback";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

/**
 * Bloco de código com syntax highlighting e botão de copiar.
 *
 * Exibe código formatado com estilo de terminal macOS e permite
 * copiar o conteúdo para área de transferência.
 *
 * @param code - Código a ser exibido
 * @param title - Título opcional (ex: nome do arquivo)
 *
 * @example
 * ```tsx
 * <CodeBlock
 *   title="app.tsx"
 *   code="const App = () => <div>Hello</div>;"
 * />
 * ```
 */
export function CodeBlock({ code, title }: { code: string; title?: string }) {
  const t = useTranslations("global");
  const { copied, copy } = useCopyToClipboard();
  const { showFeedback } = useCopyFeedback();

  const handleCopy = () => {
    copy(code);
    showFeedback();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[hsl(220,40%,6%)]">
      {title && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {title}
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
      <pre className="overflow-x-auto whitespace-pre-wrap break-all p-3 font-mono text-xs leading-relaxed text-foreground/90 md:whitespace-pre md:break-normal md:p-4 md:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
