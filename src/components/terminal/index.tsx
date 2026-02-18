"use client";

import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

import { TerminalHint } from "./terminal-hint";
import { TerminalWindow } from "./terminal-window";
import { useTerminal } from "./use-terminal";

/** Easter egg de terminal acessível via Ctrl+~ ou clicando na hint. */
export function TerminalEasterEgg() {
  const tGlobal = useTranslations("global");
  const {
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
    colors,
    inputRef,
    bottomRef,
    handleSubmit,
    handleKeyDown,
    t,
  } = useTerminal();

  const showHint = !isOpen;

  return (
    <>
      {showHint && <TerminalHint onOpen={open} />}
      <AnimatePresence>
        {isOpen && (
          <TerminalWindow
            colors={colors}
            lines={lines}
            input={input}
            prompt={t("prompt")}
            ariaLabel={tGlobal("terminal")}
            closeLabel={tGlobal("closeTerminal")}
            inputLabel={tGlobal("terminalInput")}
            isMinimized={isMinimized}
            isMaximized={isMaximized}
            bottomRef={bottomRef}
            inputRef={inputRef}
            onClose={close}
            onMinimize={toggleMinimize}
            onMaximize={toggleMaximize}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          />
        )}
      </AnimatePresence>
    </>
  );
}
