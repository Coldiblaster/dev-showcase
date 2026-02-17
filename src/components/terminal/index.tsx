"use client";

import { AnimatePresence } from "framer-motion";

import { TerminalHint } from "./terminal-hint";
import { TerminalWindow } from "./terminal-window";
import { useTerminal } from "./use-terminal";

/** Easter egg de terminal acessível pela tecla ~ ou clicando na hint. */
export function TerminalEasterEgg() {
  const {
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
  } = useTerminal();

  return (
    <>
      {!isOpen && <TerminalHint onOpen={open} />}
      <AnimatePresence>
        {isOpen && (
          <TerminalWindow
            colors={colors}
            lines={lines}
            input={input}
            prompt={t("prompt")}
            scrollRef={scrollRef}
            inputRef={inputRef}
            onClose={() => setIsOpen(false)}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          />
        )}
      </AnimatePresence>
    </>
  );
}
