/**
 * Retorna a chave Redis para o ranking da semana ISO atual.
 * Exemplo: "stats:pages:week:2026-W08"
 *
 * Usa UTC para evitar variação por fuso horário entre servidor e cliente.
 * Algoritmo ISO 8601: semana começa na segunda, referenciada pela quinta-feira.
 */
export function getIsoWeekKey(): string {
  const now = new Date();
  const d = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
  );
  const day = d.getUTCDay() || 7; // domingo (0) → 7
  d.setUTCDate(d.getUTCDate() + 4 - day); // aponta para a quinta-feira da semana
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return `stats:pages:week:${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
