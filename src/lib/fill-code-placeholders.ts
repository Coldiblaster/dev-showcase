/**
 * Utilitários para substituir placeholders em snippets de código pelas traduções.
 *
 * Dois formatos suportados:
 *  - `fillByIndex`   → placeholders `{{0}}`, `{{1}}`, ... (usado em state-management)
 *  - `fillByKey`     → placeholders `__KEY__`             (usado em nextjs-app-router)
 *
 * Use `fillByKey` quando os placeholders têm nomes semânticos.
 * Use `fillByIndex` quando os comentários são numerados pelo next-intl (keyPrefix.0, keyPrefix.1, …).
 */

/**
 * Substitui placeholders `{{0}}`, `{{1}}`, … pelas mensagens obtidas via prefixo de chave i18n.
 *
 * @param code        - Código-fonte com placeholders `{{n}}`
 * @param getMessage  - Função que retorna a mensagem para uma chave (ex: `(k) => t(k as any)`)
 * @param keyPrefix   - Prefixo das chaves i18n (ex: `"codeComments"`)
 * @param count       - Número de placeholders (0 … count-1)
 *
 * @alias fillByIndex
 */
export function fillCodeComments(
  code: string,
  getMessage: (key: string) => string,
  keyPrefix: string,
  count: number,
): string {
  return fillByIndex(code, getMessage, keyPrefix, count);
}

export function fillByIndex(
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

/**
 * Substitui placeholders nomeados `__KEY__` pelos valores fornecidos no mapa.
 *
 * @param code         - Código-fonte com placeholders `__KEY__`
 * @param replacements - Mapa `{ __KEY__: "valor" }` ou `{ KEY: "valor" }` (sem `__`)
 */
export function fillByKey(
  code: string,
  replacements: Record<string, string>,
): string {
  let result = code;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.split(key).join(value);
  }
  return result;
}
