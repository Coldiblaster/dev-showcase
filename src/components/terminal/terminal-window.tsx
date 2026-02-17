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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-3xl overflow-hidden rounded-xl border ${colors.border} ${colors.bg} shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-red-500 transition-opacity hover:opacity-80"
              />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <span
              className={`ml-2 font-mono text-xs ${colors.text} opacity-60`}
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
          className="h-[60vh] max-h-[500px] overflow-y-auto p-4 font-mono text-sm"
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
