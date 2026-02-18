import type { DevLevel } from "./types";

export interface QuickTip {
  id: string;
  level: DevLevel;
}

export const quickTips: QuickTip[] = [
  { id: "key-unique", level: "junior" },
  { id: "optional-chaining", level: "junior" },
  { id: "fragment-div", level: "junior" },
  { id: "const-let", level: "junior" },
  { id: "updater-function", level: "pleno" },
  { id: "abort-controller", level: "pleno" },
  { id: "as-const", level: "pleno" },
  { id: "error-boundary", level: "pleno" },
  { id: "barrel-files", level: "senior" },
  { id: "server-components", level: "senior" },
  { id: "composition-over-config", level: "senior" },
  { id: "use-sync-external-store", level: "senior" },
];
