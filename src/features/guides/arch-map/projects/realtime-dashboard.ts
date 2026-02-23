import {
  Cloud,
  Cpu,
  Database,
  MonitorSmartphone,
  Server,
  Shield,
} from "lucide-react";

import type { ProjectData } from "../types";

export const REALTIME_DASHBOARD: ProjectData = {
  id: "realtime-dashboard",
  nodes: [
    {
      id: "dashboard",
      icon: MonitorSmartphone,
      tech: ["React", "Recharts", "TanStack Table"],
      x: 5,
      y: 10,
      connections: ["gateway"],
      group: "client",
    },
    {
      id: "gateway",
      icon: Shield,
      tech: ["Next.js Middleware", "Edge"],
      x: 30,
      y: 10,
      connections: ["ws", "rest"],
      group: "server",
    },
    {
      id: "ws",
      icon: Cpu,
      tech: ["Socket.io", "Redis Pub/Sub"],
      x: 57,
      y: 10,
      connections: ["events"],
      group: "server",
    },
    {
      id: "rest",
      icon: Server,
      tech: ["Node.js", "Express", "Zod"],
      x: 57,
      y: 55,
      connections: ["db"],
      group: "server",
    },
    {
      id: "events",
      icon: Cloud,
      tech: ["Kafka", "Bull Queue"],
      x: 82,
      y: 10,
      connections: ["db"],
      group: "infra",
    },
    {
      id: "db",
      icon: Database,
      tech: ["TimescaleDB", "Prisma"],
      x: 82,
      y: 55,
      connections: [],
      group: "data",
    },
  ],
};
