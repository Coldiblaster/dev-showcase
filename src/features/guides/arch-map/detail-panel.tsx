import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { GROUP_COLORS } from "./arch-node-card";
import type { ArchNodeData } from "./types";

type ConnectedNode = {
  node: ArchNodeData;
  label: string;
};

type DetailPanelProps = {
  node: ArchNodeData;
  label: string;
  description: string;
  details: string;
  connectedTo: ConnectedNode[];
  connectedToLabel: string;
  closeLabel: string;
  onClose: () => void;
  onSelectNode: (node: ArchNodeData) => void;
};

export function DetailPanel({
  node,
  label,
  description,
  details,
  connectedTo,
  connectedToLabel,
  closeLabel,
  onClose,
  onSelectNode,
}: DetailPanelProps) {
  const Icon = node.icon;
  const colors = GROUP_COLORS[node.group];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.2 }}
      className="border-t border-border bg-card/95 p-5 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`shrink-0 rounded-lg p-2 ${colors.bg} border ${colors.border}`}
            >
              <Icon className={`h-5 w-5 ${colors.text}`} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {label}
              </h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
          {details}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {node.tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>

        {connectedTo.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {connectedToLabel}
            </span>
            {connectedTo.map(({ node: connNode, label: connLabel }) => (
              <button
                key={connNode.id}
                onClick={() => onSelectNode(connNode)}
                className="rounded border border-border bg-muted px-2 py-0.5 text-xs text-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                {connLabel}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
