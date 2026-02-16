import type { Locale } from "@/lib/i18n";

/**
 * Interpola variáveis em uma string do tipo "Olá, {name}!"
 */
export function interpolate(
  str: string,
  vars: Record<string, string | number>,
) {
  return Object.keys(vars).reduce((acc, key) => {
    const re = new RegExp(`\\{${key}\\}`, "g");
    return acc.replace(re, String(vars[key]));
  }, str);
}

/**
 * Pluralização simples baseada em ICU MessageFormat.
 * Suporta pattern: {count, plural, =0 {...} one {...} other {...}}
 */
export function getPluralMessage(
  pattern: string,
  count: number,
  locale: Locale,
) {
  // Extract the inner content after "{count, plural," and parse balanced-brace variants.
  const start = pattern.indexOf("{count");
  const openIndex = pattern.indexOf("plural", start);
  const variants: Record<string, string> = {};

  if (openIndex >= 0) {
    let i = openIndex + "plural".length;
    const n = pattern.length;
    while (i < n) {
      while (i < n && /[\s,]/.test(pattern[i])) i++;
      if (i >= n) break;
      const keyMatch = pattern
        .slice(i)
        .match(/^(=\d+|zero|one|two|few|many|other)\b/);
      if (!keyMatch) break;
      const key = keyMatch[1];
      i += key.length;
      while (i < n && /[\s,]/.test(pattern[i])) i++;
      while (i < n && pattern[i] !== "{") i++;
      if (i >= n || pattern[i] !== "{") break;
      i++;
      let depth = 1;
      let buf = "";
      while (i < n && depth > 0) {
        const ch = pattern[i];
        if (ch === "{") {
          depth++;
          buf += ch;
          i++;
          continue;
        }
        if (ch === "}") {
          depth--;
          if (depth === 0) {
            i++;
            break;
          }
          buf += ch;
          i++;
          continue;
        }
        buf += ch;
        i++;
      }
      variants[key] = buf.trim();
    }
  }

  const localeMap: Record<Locale, string> = {
    "pt-BR": "pt-BR",
    en: "en-US",
    es: "es-ES",
    de: "de-DE",
  };

  const pr = new Intl.PluralRules(localeMap[locale]);
  const category = pr.select(count);

  let template =
    variants[`=${count}`] ?? variants[category] ?? variants.other ?? "{count}";
  const formattedCount = new Intl.NumberFormat(localeMap[locale]).format(count);
  template = template.replace(/#|\{count\}/g, String(formattedCount));
  return template;
}
