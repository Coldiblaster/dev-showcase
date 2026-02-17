export type DevLevel = "junior" | "pleno" | "senior";

export type DevLevelFilter = DevLevel | "all";

export const levelColors: Record<DevLevel, string> = {
  junior: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  pleno: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  senior: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};
