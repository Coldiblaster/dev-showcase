"use client";

import { Activity, Minus, RefreshCw, X } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface PerformanceWidgetHeaderProps {
  title: string;
  /** Rótulo do viewport atual (ex.: "Desktop" ou "Mobile") */
  viewportLabel?: string;
  reloadLabel: string;
  /** Tooltip do botão Recarregar (ex.: relê Performance API desta aba) */
  reloadHint?: string;
  minimizeLabel: string;
  closeLabel: string;
  loading: boolean;
  minimized: boolean;
  onReload: () => void;
  onMinimize: () => void;
  onClose: () => void;
  onPointerDown?: (e: React.PointerEvent) => void;
  /** Layout compacto (quando minimizado) */
  compact?: boolean;
  /** Label curto na barra minimizada (ex.: "perf") */
  pillLabel?: string;
  /** Rótulo para a área clicável que expande (modo minimizado) */
  expandLabel?: string;
  className?: string;
}

export function PerformanceWidgetHeader({
  title,
  viewportLabel,
  reloadLabel,
  reloadHint,
  minimizeLabel,
  closeLabel,
  loading,
  minimized: _minimized,
  onReload,
  onMinimize,
  onClose,
  onPointerDown,
  compact = false,
  pillLabel,
  expandLabel,
  className,
}: PerformanceWidgetHeaderProps) {
  const isTerminalBar = compact && pillLabel != null;

  /** Mobile/touch: um toque expande. Desktop: duplo clique expande (evita expandir ao arrastar). */
  const [expandOnSingleClick, setExpandOnSingleClick] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(pointer: coarse)");
    const update = () => setExpandOnSingleClick(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  return (
    <div
      role="presentation"
      onPointerDown={onPointerDown}
      className={cn(
        "flex items-center justify-between",
        !compact && "border-b border-border px-2 py-1.5 sm:px-3 sm:py-2",
        compact && "gap-1 px-1 py-0.5",
        onPointerDown &&
          "cursor-grab touch-none select-none active:cursor-grabbing",
        className,
      )}
    >
      {/* Esquerda minimizado: arrastável. Desktop = duplo clique expande; mobile = um toque expande. */}
      {isTerminalBar ? (
        <div
          role="button"
          tabIndex={0}
          aria-label={expandLabel ?? minimizeLabel}
          onClick={
            expandOnSingleClick
              ? (e) => {
                  e.stopPropagation();
                  onMinimize();
                }
              : undefined
          }
          onDoubleClick={
            !expandOnSingleClick
              ? (e) => {
                  e.stopPropagation();
                  onMinimize();
                }
              : undefined
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onMinimize();
            }
          }}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-1 rounded text-left py-0.5 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Activity className="h-3 w-3 shrink-0 text-primary" aria-hidden />
          <span className="truncate font-mono text-[9px] font-medium text-primary">
            {pillLabel ?? title.toLowerCase()}
          </span>
        </div>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-1.5">
          <Activity className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          <span className="truncate font-mono text-[10px] font-semibold tracking-widest text-primary sm:text-xs">
            {title}
          </span>
          {viewportLabel && (
            <span
              className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[9px] font-medium text-muted-foreground sm:text-[10px]"
              title={viewportLabel}
            >
              {viewportLabel}
            </span>
          )}
        </div>
      )}
      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
        {!compact && (
          <>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onReload}
              disabled={loading}
              aria-label={reloadLabel}
              title={reloadHint}
              className="flex items-center justify-center rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40"
            >
              <RefreshCw
                className={cn("h-3.5 w-3.5", loading && "animate-spin")}
                aria-hidden
              />
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onMinimize}
              aria-label={minimizeLabel}
              className="flex items-center justify-center rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden />
            </button>
          </>
        )}
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onClose}
          aria-label={closeLabel}
          className={cn(
            "flex items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            compact ? "p-0.5" : "rounded-md p-1",
          )}
        >
          <X
            className={cn(compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5")}
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}
