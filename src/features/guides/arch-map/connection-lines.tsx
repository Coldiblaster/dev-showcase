import { motion } from "framer-motion";

import type { ArchNodeData } from "./types";

type ConnectionLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active: boolean;
  key: string;
};

type ConnectionLinesProps = {
  nodes: ArchNodeData[];
  activeNode: string | null;
};

function buildLines(
  nodes: ArchNodeData[],
  activeNode: string | null,
): ConnectionLine[] {
  const lines: ConnectionLine[] = [];

  nodes.forEach((node) => {
    node.connections.forEach((targetId) => {
      const target = nodes.find((n) => n.id === targetId);
      if (!target) return;

      const isActive = activeNode === node.id || activeNode === target.id;

      lines.push({
        key: `${node.id}-${targetId}`,
        x1: node.x + 7,
        y1: node.y + 10,
        x2: target.x,
        y2: target.y + 10,
        active: isActive,
      });
    });
  });

  return lines;
}

export function ConnectionLines({ nodes, activeNode }: ConnectionLinesProps) {
  const lines = buildLines(nodes, activeNode);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="arrow"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" className="fill-border" />
        </marker>
        <marker
          id="arrow-active"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" className="fill-primary" />
        </marker>
      </defs>

      {lines.map((line, i) => (
        <motion.line
          key={line.key}
          x1={`${line.x1}%`}
          y1={`${line.y1}%`}
          x2={`${line.x2}%`}
          y2={`${line.y2}%`}
          className={line.active ? "stroke-primary" : "stroke-border"}
          strokeWidth={line.active ? 2 : 1}
          strokeDasharray={line.active ? "0" : "5 4"}
          markerEnd={line.active ? "url(#arrow-active)" : "url(#arrow)"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        />
      ))}

      {lines
        .filter((l) => l.active)
        .map((line, i) => (
          <motion.circle
            key={`dot-${line.key}`}
            r="3"
            className="fill-primary"
            initial={{ opacity: 0 }}
            animate={{
              cx: [`${line.x1}%`, `${line.x2}%`] as unknown as number[],
              cy: [`${line.y1}%`, `${line.y2}%`] as unknown as number[],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}
    </svg>
  );
}
