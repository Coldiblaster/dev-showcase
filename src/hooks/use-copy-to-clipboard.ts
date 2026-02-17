"use client";

import { useCallback, useRef, useState } from "react";

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

/**
 * Hook para copiar texto para a área de transferência com feedback visual.
 *
 * @param duration - Duração do estado "copiado" em ms (padrão: 2000)
 *
 * @example
 * ```tsx
 * const { copied, copy } = useCopyToClipboard();
 * <button onClick={() => copy("texto")}>
 *   {copied ? <Check /> : <Copy />}
 * </button>
 * ```
 */
export function useCopyToClipboard(
  duration = 2000,
): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), duration);
      } catch {
        setCopied(false);
      }
    },
    [duration],
  );

  return { copied, copy };
}
