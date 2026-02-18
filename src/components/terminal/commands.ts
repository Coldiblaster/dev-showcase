import { CONTENT_ITEMS } from "@/data/content";

import {
  COMMAND_OUTPUT_MAP,
  type TerminalLine,
  type Theme,
  THEME_COLORS,
} from "./constants";

/** Função de tradução compatível com next-intl (inclui acesso raw). */
export type TranslationFn = {
  (key: string, values?: Record<string, string>): string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: (key: string) => any;
};

/** Ação resultante da execução de um comando. */
export type CommandAction =
  | { type: "clear" }
  | { type: "exit" }
  | { type: "setTheme"; theme: Theme };

/** Resultado da execução: linhas de output + ação opcional. */
export interface CommandResult {
  lines: TerminalLine[];
  action?: CommandAction;
}

/** Prefixos de rota por categoria de conteúdo. */
const CATEGORY_PREFIX: Record<string, string> = {
  implementation: "/implementacoes",
  guide: "/dicas",
  tool: "/ferramentas",
};

/** Monta as linhas do comando `projects` listando todos os itens de conteúdo. */
function buildProjectLines(): TerminalLine[] {
  return [
    { type: "output", content: "" },
    ...CONTENT_ITEMS.map((item) => {
      const prefix = CATEGORY_PREFIX[item.category] ?? "/dicas";
      return {
        type: "output" as const,
        content: `  ${item.slug.padEnd(20)} → ${prefix}/${item.slug}`,
      };
    }),
    { type: "output", content: "" },
  ];
}

/** Processa o comando `theme` com ou sem argumento. */
function handleTheme(arg: string | undefined, t: TranslationFn): CommandResult {
  if (arg && THEME_COLORS[arg as Theme]) {
    const theme = arg as Theme;
    return {
      lines: [{ type: "system", content: t("themeChanged", { theme }) }],
      action: { type: "setTheme", theme },
    };
  }
  return {
    lines: [{ type: "system", content: t("themeInvalid") }],
  };
}

/** Processa comandos cujo output vem diretamente das traduções (help, about, etc). */
function handleTranslatedCommand(
  command: string,
  t: TranslationFn,
): CommandResult | null {
  if (!(command in COMMAND_OUTPUT_MAP)) return null;

  const output = t.raw(COMMAND_OUTPUT_MAP[command]) as string[];
  if (!Array.isArray(output)) return null;

  return {
    lines: [
      ...output.map((line) => ({ type: "output" as const, content: line })),
      { type: "output", content: "" },
    ],
  };
}

/** Executa um comando e retorna linhas de saída + ação opcional. */
export function executeCommand(cmd: string, t: TranslationFn): CommandResult {
  const trimmed = cmd.trim().toLowerCase();

  if (trimmed === "clear") {
    return {
      lines: [{ type: "system", content: t("clearMessage") }],
      action: { type: "clear" },
    };
  }

  if (trimmed === "exit") {
    return {
      lines: [{ type: "system", content: t("exitMessage") }],
      action: { type: "exit" },
    };
  }

  if (trimmed.startsWith("theme")) {
    return handleTheme(trimmed.split(" ")[1], t);
  }

  if (trimmed === "projects") {
    return { lines: buildProjectLines() };
  }

  const translated = handleTranslatedCommand(trimmed, t);
  if (translated) return translated;

  return {
    lines: [
      { type: "output", content: t("unknownCommand", { command: cmd }) },
      { type: "output", content: "" },
    ],
  };
}
