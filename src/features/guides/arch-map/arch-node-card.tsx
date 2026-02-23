import { motion } from "framer-motion";
import type React from "react";

import type { ArchGroup, ArchNodeData } from "./types";

export const GROUP_COLORS: Record<
  ArchGroup,
  { bg: string; border: string; text: string; glow: string }
> = {
  client: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
    glow: "shadow-primary/20",
  },
  server: {
    bg: "bg-chart-4/10",
    border: "border-chart-4/30",
    text: "text-chart-4",
    glow: "shadow-chart-4/20",
  },
  data: {
    bg: "bg-chart-5/10",
    border: "border-chart-5/30",
    text: "text-chart-5",
    glow: "shadow-chart-5/20",
  },
  infra: {
    bg: "bg-chart-2/10",
    border: "border-chart-2/30",
    text: "text-chart-2",
    glow: "shadow-chart-2/20",
  },
};

type ArchNodeCardProps = {
  node: ArchNodeData;
  label: string;
  description: string;
  isActive: boolean;
  isConnected: boolean;
  animationDelay: number;
  isSelected: boolean;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

export function ArchNodeCard({
  node,
  label,
  description,
  isActive,
  isConnected,
  animationDelay,
  isSelected,
  wrapperClassName,
  wrapperStyle,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ArchNodeCardProps) {
  const Icon = node.icon;
  const colors = GROUP_COLORS[node.group];

  const borderClass =
    isActive || isSelected
      ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
      : isConnected
        ? `${colors.bg} ${colors.border}`
        : "border-border bg-card hover:border-primary/20";

  return (
    <motion.div
      className={wrapperClassName}
      style={wrapperStyle}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: animationDelay }}
    >
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={`w-full rounded-xl border p-3 text-left transition-all duration-200 ${borderClass}`}
        aria-pressed={isSelected}
        aria-label={label}
      >
        <div className="flex items-start gap-2">
          <div
            className={`shrink-0 rounded-lg p-1.5 ${colors.bg} border ${colors.border}`}
          >
            <Icon className={`h-4 w-4 ${colors.text}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-foreground">
              {label}
            </p>
            <p className="truncate text-[10px] text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {node.tech.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded bg-muted px-1 py-0.5 text-[9px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {node.tech.length > 2 && (
            <span className="rounded bg-muted px-1 py-0.5 text-[9px] text-muted-foreground">
              +{node.tech.length - 2}
            </span>
          )}
        </div>
      </button>
    </motion.div>
  );
}
