/**
 * Substitui placeholders {{0}}, {{1}}, ... no código pelas traduções.
 * Usado para que os comentários nos exemplos sigam o idioma selecionado.
 * O parâmetro getMessage pode ser o `t` do useTranslations; use (k) => t(k as any) se o tipo do t for restrito.
 */
export function fillCodeComments(
  code: string,
  getMessage: (key: string) => string,
  keyPrefix: string,
  count: number,
): string {
  let result = code;
  for (let i = 0; i < count; i++) {
    result = result.replace(
      new RegExp(`\\{\\{${i}\\}\\}`, "g"),
      getMessage(`${keyPrefix}.${i}`),
    );
  }
  return result;
}
