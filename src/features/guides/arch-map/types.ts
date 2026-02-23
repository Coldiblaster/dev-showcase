import type { LucideIcon } from "lucide-react";

export type ArchGroup = "client" | "server" | "data" | "infra";

export type ArchNodeData = {
  id: string;
  icon: LucideIcon;
  tech: string[];
  x: number;
  y: number;
  connections: string[];
  group: ArchGroup;
};

export type ProjectData = {
  id: string;
  nodes: ArchNodeData[];
};
