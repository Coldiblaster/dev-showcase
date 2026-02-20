/**
 * Traduz mensagens de erro do JSON.parse (sempre em inglês no engine) para o idioma da UI.
 */
type TranslateFn = (
  key: string,
  values?: Record<string, string | number>,
) => string;

const UNEXPECTED_END = "Unexpected end of JSON input";
const TOKEN_POSITION_REGEX = /in JSON at position (\d+)/i;

export function translateJsonError(message: string, t: TranslateFn): string {
  if (message === UNEXPECTED_END) {
    return t("result.errors.unexpectedEnd");
  }
  const positionMatch = message.match(TOKEN_POSITION_REGEX);
  if (positionMatch) {
    const position = positionMatch[1];
    return t("result.errors.unexpectedToken", { position: Number(position) });
  }
  return t("result.errors.generic", { message });
}
