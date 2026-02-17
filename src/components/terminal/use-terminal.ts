"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { useScrollLock } from "@/hooks/use-scroll-lock";

import { CONTENT_ITEMS } from "@/data/content";

import {
  AVAILABLE_COMMANDS,
  COMMAND_OUTPUT_MAP,
  type TerminalLine,
  type Theme,
  THEME_COLORS,
} from "./constants";

/** Hook que gerencia o estado e lógica do terminal (tecla ~, comandos, temas). */
export function useTerminal() {
  const t = useTranslations("terminal");
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<Theme>("matrix");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        return;
      }

      const isTerminalShortcut =
        (e.ctrlKey || e.metaKey) && e.code === "Backquote";

      if (isTerminalShortcut) {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setLines([
              { type: "system", content: t("greeting") },
              { type: "system", content: t("hint") },
              { type: "system", content: "" },
            ]);
          }
          return !prev;
        });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, t]);

  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    const onOpenTerminal = () => {
      setIsOpen(true);
      setLines([
        { type: "system", content: t("greeting") },
        { type: "system", content: t("hint") },
        { type: "system", content: "" },
      ]);
    };
    window.addEventListener("open-terminal", onOpenTerminal);
    return () => window.removeEventListener("open-terminal", onOpenTerminal);
  }, [t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const autocomplete = useCallback((currentInput: string) => {
    const matches = AVAILABLE_COMMANDS.filter((cmd) =>
      cmd.startsWith(currentInput.toLowerCase()),
    );
    if (matches.length === 1) setInput(matches[0]);
  }, []);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newLines: TerminalLine[] = [
        ...lines,
        { type: "input", content: `${t("prompt")}:~$ ${cmd}` },
      ];

      if (trimmed === "clear") {
        setLines([{ type: "system", content: t("clearMessage") }]);
        return;
      }
      if (trimmed === "exit") {
        setLines([...newLines, { type: "system", content: t("exitMessage") }]);
        setTimeout(() => setIsOpen(false), 1000);
        return;
      }

      if (trimmed.startsWith("theme")) {
        const newTheme = trimmed.split(" ")[1] as Theme;
        if (newTheme && THEME_COLORS[newTheme]) {
          setTheme(newTheme);
          setLines([
            ...newLines,
            { type: "system", content: t("themeChanged", { theme: newTheme }) },
          ]);
        } else {
          setLines([
            ...newLines,
            { type: "system", content: t("themeInvalid") },
          ]);
        }
        return;
      }

      if (trimmed === "projects") {
        const projectLines = CONTENT_ITEMS.map((item) => {
          const prefix =
            item.category === "implementation" ? "/implementacoes" : "/dicas";
          return `  ${item.slug.padEnd(20)} → ${prefix}/${item.slug}`;
        });
        setLines([
          ...newLines,
          { type: "output", content: "" },
          ...projectLines.map((l) => ({ type: "output" as const, content: l })),
          { type: "output", content: "" },
        ]);
        return;
      }

      if (trimmed in COMMAND_OUTPUT_MAP) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const output = (t as any).raw(COMMAND_OUTPUT_MAP[trimmed]) as string[];
        if (Array.isArray(output)) {
          setLines([
            ...newLines,
            ...output.map((line) => ({
              type: "output" as const,
              content: line,
            })),
            { type: "output", content: "" },
          ]);
        }
        return;
      }

      setLines([
        ...newLines,
        { type: "output", content: t("unknownCommand", { command: cmd }) },
        { type: "output", content: "" },
      ]);
    },
    [lines, t],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    executeCommand(input);
    setInput("");
  };

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
      autocomplete(input);
    }
  };

  const open = useCallback(() => {
    setIsOpen(true);
    setLines([
      { type: "system", content: t("greeting") },
      { type: "system", content: t("hint") },
      { type: "system", content: "" },
    ]);
  }, [t]);

  const colors = THEME_COLORS[theme];

  return {
    isOpen,
    open,
    setIsOpen,
    lines,
    input,
    setInput,
    colors,
    inputRef,
    scrollRef,
    handleSubmit,
    handleKeyDown,
    t,
  };
}
