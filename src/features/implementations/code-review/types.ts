/**
 * Representa um problema encontrado na revisão de código.
 */
export interface ReviewIssue {
  severity: "error" | "warning" | "info";
  line: number | null;
  message: string;
  suggestion: string;
}

/**
 * Resultado completo da revisão de código com pontuação e itens.
 */
export interface ReviewResult {
  score: number;
  summary: string;
  issues: ReviewIssue[];
  improvements: string[];
  strengths: string[];
}
