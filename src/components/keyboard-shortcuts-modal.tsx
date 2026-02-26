"use client";

import { Keyboard } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SHORTCUTS: { keys: string[]; key: string }[] = [
  { keys: ["Ctrl", "K"], key: "search" },
  { keys: ["Ctrl", "~"], key: "terminal" },
  { keys: ["Ctrl", "/"], key: "shortcuts" },
  { keys: ["Esc"], key: "close" },
];

/** Modal que exibe todos os atalhos de teclado. Abre com Ctrl+/ ou Ctrl+Alt+K (evita conflito com Ctrl+Shift no Ubuntu/GNOME). */
export function KeyboardShortcutsModal() {
  const t = useTranslations("global.keyboardShortcuts");
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(
      typeof navigator !== "undefined" &&
        /Mac|iPod|iPhone|iPad/.test(navigator.platform),
    );
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isShortcuts =
        (e.ctrlKey || e.metaKey) &&
        (e.key === "/" || e.key === "?") &&
        !e.altKey;
      const isAltK =
        (e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "k";
      if (isShortcuts || isAltK) {
        e.preventDefault();
        e.stopPropagation();
        setOpen((prev) => !prev);
      }
    }
    function handleOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("open-keyboard-shortcuts", handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("open-keyboard-shortcuts", handleOpenEvent);
    };
  }, []);

  const formatKeys = useCallback(
    (shortcut: (typeof SHORTCUTS)[number]) => {
      const mod = isMac ? "⌘" : "Ctrl";
      if (shortcut.keys.length === 1 && shortcut.keys[0] === "Esc") {
        return "Esc";
      }
      return shortcut.keys
        .map((k) =>
          k === "Ctrl" ? mod : k === "~" ? "~" : k === "/" ? "/" : k,
        )
        .join(" + ");
    },
    [isMac],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-md"
        onPointerDownOutside={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Keyboard className="h-5 w-5 text-primary" />
            {t("title")}
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
        <div className="mt-4 space-y-3">
          {SHORTCUTS.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-muted/30 px-4 py-2.5"
            >
              <span className="text-sm font-medium text-foreground">
                {t(`items.${shortcut.key}` as Parameters<typeof t>[0])}
              </span>
              <kbd className="inline-flex items-center gap-1 rounded border border-border bg-background px-2 py-1 font-mono text-xs font-medium text-muted-foreground">
                {formatKeys(shortcut)}
              </kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
