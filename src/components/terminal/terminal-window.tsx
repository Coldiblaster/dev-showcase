"use client";

import { motion, useDragControls } from "framer-motion";
import { Terminal, X } from "lucide-react";
import { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";

import type { TerminalLine } from "./constants";

/** Props da janela do terminal. */
interface TerminalWindowProps {
  colors: { text: string; prompt: string; bg: string; border: string };
  lines: TerminalLine[];
  input: string;
  prompt: string;
  ariaLabel: string;
  closeLabel: string;
  inputLabel: string;
  isMinimized: boolean;
  isMaximized: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

/** Botões estilo macOS (fechar, minimizar, maximizar). */
function TrafficButtons({
  onClose,
  onMinimize,
  onMaximize,
  closeLabel,
}: {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  closeLabel: string;
}) {
  return (
    <div className="hidden gap-1.5 md:flex">
      <button
        onClick={onClose}
        onPointerDown={(e) => e.stopPropagation()}
        className="group relative h-3 w-3 rounded-full bg-red-500 transition-opacity hover:opacity-80"
        aria-label={closeLabel}
      >
        <X className="absolute inset-0 m-auto h-2 w-2 text-red-900 opacity-0 transition-opacity group-hover:opacity-100" />
      </button>
      {onMinimize && (
        <button
          onClick={onMinimize}
          onPointerDown={(e) => e.stopPropagation()}
          className="group relative h-3 w-3 rounded-full bg-yellow-500 transition-opacity hover:opacity-80"
          tabIndex={-1}
          aria-hidden="true"
        >
          <span className="absolute inset-x-0.5 top-1/2 h-px -translate-y-1/2 bg-yellow-900 opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      )}
      {onMaximize && (
        <button
          onClick={onMaximize}
          onPointerDown={(e) => e.stopPropagation()}
          className="group relative h-3 w-3 rounded-full bg-green-500 transition-opacity hover:opacity-80"
          tabIndex={-1}
          aria-hidden="true"
        >
          <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-sm border border-green-900 opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      )}
    </div>
  );
}

/** Barra flutuante exibida quando o terminal está minimizado. */
function MinimizedBar({
  colors,
  prompt,
  closeLabel,
  onClose,
  onRestore,
}: {
  colors: TerminalWindowProps["colors"];
  prompt: string;
  closeLabel: string;
  onClose: () => void;
  onRestore: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "fixed bottom-4 left-4 z-40 hidden cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 shadow-2xl md:flex",
        colors.border,
        colors.bg,
      )}
      onClick={onRestore}
    >
      <TrafficButtons onClose={onClose} closeLabel={closeLabel} />
      <Terminal className={cn("h-3.5 w-3.5", colors.text, "opacity-60")} />
      <span className={cn("font-mono text-xs", colors.text, "opacity-60")}>
        {prompt}:~
      </span>
    </motion.div>
  );
}

/** Janela principal do terminal com drag, minimizar e maximizar. */
export function TerminalWindow({
  colors,
  lines,
  input,
  prompt,
  ariaLabel,
  closeLabel,
  inputLabel,
  isMinimized,
  isMaximized,
  bottomRef,
  inputRef,
  onClose,
  onMinimize,
  onMaximize,
  onInputChange,
  onSubmit,
  onKeyDown,
}: TerminalWindowProps) {
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const isDraggable = !isMaximized;

  const handleFocusTrap = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([tabindex="-1"]), input, [tabindex="0"]',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  if (isMinimized) {
    return (
      <MinimizedBar
        colors={colors}
        prompt={prompt}
        closeLabel={closeLabel}
        onClose={onClose}
        onRestore={onMinimize}
      />
    );
  }

  return (
    <motion.div
      ref={constraintsRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-end justify-center backdrop-blur-sm md:items-center md:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onKeyDown={handleFocusTrap}
    >
      <motion.div
        drag={isDraggable}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "flex w-full flex-col overflow-hidden border-t shadow-2xl transition-[max-height,max-width,border-radius,height] duration-300",
          colors.border,
          colors.bg,
          isMaximized
            ? "h-dvh md:h-full md:max-h-full md:max-w-full md:rounded-none md:border-0"
            : "h-[85dvh] md:max-h-[60vh] md:max-w-2xl md:rounded-xl md:border",
        )}
      >
        {/* Title bar */}
        <div
          className={cn(
            "flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5",
            isDraggable && "md:cursor-grab md:active:cursor-grabbing",
          )}
          onPointerDown={(e) => {
            if (isDraggable) dragControls.start(e);
          }}
          onDoubleClick={onMaximize}
        >
          <div className="flex items-center gap-2">
            <TrafficButtons
              onClose={onClose}
              onMinimize={onMinimize}
              onMaximize={onMaximize}
              closeLabel={closeLabel}
            />
            <span
              className={`font-mono text-xs md:ml-2 ${colors.text} opacity-60`}
            >
              {prompt}:~
            </span>
          </div>
          <button
            onClick={onClose}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={closeLabel}
            className="rounded-md p-1 text-white/30 transition-colors hover:text-white/60 focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <ScrollArea
          className="min-h-0 flex-1 overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="p-4 pb-8 font-mono text-sm md:pb-4">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap leading-relaxed ${
                  line.type === "input"
                    ? colors.prompt + " font-semibold"
                    : line.type === "system"
                      ? "text-white/60 italic"
                      : colors.text
                }`}
              >
                {line.content || "\u00A0"}
              </div>
            ))}

            <form onSubmit={onSubmit} className="flex items-center">
              <span className={`${colors.prompt} font-semibold`}>
                {prompt}:~$&nbsp;
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label={inputLabel}
                className={`flex-1 bg-transparent ${colors.text} caret-current outline-none`}
                autoComplete="off"
                spellCheck={false}
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}
