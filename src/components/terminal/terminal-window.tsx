"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

import type { TerminalLine } from "./constants";

/** Props da janela do terminal. */
interface TerminalWindowProps {
  colors: { text: string; prompt: string; bg: string; border: string };
  lines: TerminalLine[];
  input: string;
  prompt: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

/** Janela flutuante do terminal com título e área de linhas. */
export function TerminalWindow({
  colors,
  lines,
  input,
  prompt,
  scrollRef,
  inputRef,
  onClose,
  onInputChange,
  onSubmit,
  onKeyDown,
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-end justify-center backdrop-blur-sm md:items-center md:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className={`flex h-[85dvh] w-full flex-col overflow-hidden border-t ${colors.border} ${colors.bg} shadow-2xl md:h-auto md:max-w-3xl md:rounded-xl md:border`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="hidden gap-1.5 md:flex">
              <button
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-red-500 transition-opacity hover:opacity-80"
              />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <span
              className={`font-mono text-xs md:ml-2 ${colors.text} opacity-60`}
            >
              {prompt}:~
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto p-4 pb-8 font-mono text-sm md:h-[60vh] md:max-h-[500px] md:pb-4"
          onClick={() => inputRef.current?.focus()}
        >
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
              className={`flex-1 bg-transparent ${colors.text} caret-current outline-none`}
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
