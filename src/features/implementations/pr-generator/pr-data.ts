/** Tipos e constantes para o gerador de PR descriptions. */

export const PR_TYPES = [
  "feat",
  "fix",
  "refactor",
  "docs",
  "test",
  "chore",
  "style",
  "perf",
] as const;

export type PrType = (typeof PR_TYPES)[number];

export interface PrFormData {
  title: string;
  type: PrType;
  description: string;
  filesChanged: string;
}

export interface PrResult {
  summary: string;
  changes: string[];
  testing: string[];
  notes?: string;
}

/** Gera o markdown formatado do PR para copiar. */
export function formatPrMarkdown(
  result: PrResult,
  type: PrType,
  title: string,
): string {
  const lines: string[] = [
    `## ${title}`,
    "",
    `**Type:** \`${type}\``,
    "",
    "### Summary",
    result.summary,
    "",
    "### Changes",
    ...result.changes.map((c) => `- ${c}`),
    "",
    "### How to Test",
    ...result.testing.map((t) => `- [ ] ${t}`),
  ];

  if (result.notes) {
    lines.push("", "### Notes", result.notes);
  }

  return lines.join("\n");
}
