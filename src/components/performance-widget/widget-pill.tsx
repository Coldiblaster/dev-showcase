"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

import { cn } from "@/lib/utils";

interface PerformanceWidgetPillProps {
  label: string;
  openLabel: string;
  onClick: () => void;
  onPointerDown?: (e: React.PointerEvent) => void;
  className?: string;
}

export function PerformanceWidgetPill({
  label,
  openLabel,
  onClick,
  onPointerDown,
  className,
}: PerformanceWidgetPillProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      onPointerDown={onPointerDown}
      aria-label={openLabel}
      className={cn(
        "group flex touch-none select-none items-center gap-2 rounded-full border border-border bg-card px-3 py-2 shadow-lg transition-all hover:border-primary/40 hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        onPointerDown && "cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground">
        {label}
      </span>
      <Activity className="h-4 w-4 text-primary" aria-hidden />
    </motion.button>
  );
}
