"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useScrollLock } from "@/hooks/use-scroll-lock";

import { executeCommand, type TranslationFn } from "./commands";
import {
  AVAILABLE_COMMANDS,
  type TerminalLine,
  type Theme,
  THEME_COLORS,
} from "./constants";

/**
 * Posições físicas (e.code) e caracteres (e.key) que ativam o terminal.
 * Cobre múltiplos layouts: US, UK, ABNT2, ISO europeus, etc.
 */
const TRIGGER_CODES = new Set(["Backquote", "Quote"]);
const TRIGGER_KEYS = new Set(["`", "~"]);

/** Hook que gerencia estado, atalhos e lógica do terminal easter egg. */
export function useTerminal() {
  const t = useTranslations("terminal");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<Theme>("matrix");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const greetingLines = useMemo<TerminalLine[]>(
    () => [
      { type: "system", content: t("greeting") },
      { type: "system", content: t("hint") },
      { type: "system", content: "" },
    ],
    [t],
  );

  // --- Ações ---

  const close = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
    setIsMaximized(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setLines(greetingLines);
  }, [greetingLines]);

  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => {
      if (prev) setTimeout(() => inputRef.current?.focus(), 100);
      return !prev;
    });
  }, []);

  const toggleMaximize = useCallback(() => {
    setIsMaximized((prev) => !prev);
    setIsMinimized(false);
  }, []);

  // --- Atalho de teclado (Ctrl/Cmd + ~) ---

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && !isMinimized) {
        close();
        return;
      }

      const isTerminalShortcut =
        (e.ctrlKey || e.metaKey) &&
        !e.altKey &&
        (TRIGGER_CODES.has(e.code) || TRIGGER_KEYS.has(e.key));

      if (isTerminalShortcut) {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) setLines(greetingLines);
          return !prev;
        });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isMinimized, close, greetingLines]);

  // --- Evento customizado (open-terminal) ---

  useEffect(() => {
    const onOpenTerminal = () => {
      setIsOpen(true);
      setLines(greetingLines);
    };
    window.addEventListener("open-terminal", onOpenTerminal);
    return () => window.removeEventListener("open-terminal", onOpenTerminal);
  }, [greetingLines]);

  useScrollLock(isOpen && !isMinimized);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // --- Execução de comandos ---

  const runCommand = useCallback(
    (cmd: string) => {
      const inputLine: TerminalLine = {
        type: "input",
        content: `${t("prompt")}:~$ ${cmd}`,
      };

      const result = executeCommand(cmd, t as TranslationFn);

      if (result.action?.type === "clear") {
        setLines(result.lines);
        return;
      }

      setLines((prev) => [...prev, inputLine, ...result.lines]);

      if (result.action?.type === "setTheme") {
        setTheme(result.action.theme);
      }

      if (result.action?.type === "exit") {
        setTimeout(close, 1000);
      }
    },
    [t, close],
  );

  // --- Submit do formulário ---

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    runCommand(input);
    setInput("");
  };

  // --- Teclado do input (histórico + autocomplete) ---

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex =
        historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInput(history[history.length - 1 - newIndex] || "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
      setHistoryIndex(newIndex);
      setInput(
        newIndex === -1 ? "" : history[history.length - 1 - newIndex] || "",
      );
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const matches = AVAILABLE_COMMANDS.filter((cmd) =>
        cmd.startsWith(input.toLowerCase()),
      );
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  return {
    isOpen,
    isMinimized,
    isMaximized,
    open,
    close,
    toggleMinimize,
    toggleMaximize,
    lines,
    input,
    setInput,
    colors: THEME_COLORS[theme],
    inputRef,
    bottomRef,
    handleSubmit,
    handleKeyDown,
    t,
  };
}
