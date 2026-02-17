/** Temas visuais disponíveis para o terminal. */
export type Theme = "matrix" | "amber" | "green" | "blue";

/** Linha de entrada, saída ou sistema no terminal. */
export interface TerminalLine {
  type: "input" | "output" | "system";
  content: string;
}

/** Cores CSS para cada tema do terminal. */
export const THEME_COLORS: Record<
  Theme,
  { text: string; prompt: string; bg: string; border: string }
> = {
  matrix: {
    text: "text-green-400",
    prompt: "text-green-300",
    bg: "bg-black/95",
    border: "border-green-900/50",
  },
  amber: {
    text: "text-amber-400",
    prompt: "text-amber-300",
    bg: "bg-black/95",
    border: "border-amber-900/50",
  },
  green: {
    text: "text-emerald-400",
    prompt: "text-emerald-300",
    bg: "bg-black/95",
    border: "border-emerald-900/50",
  },
  blue: {
    text: "text-cyan-400",
    prompt: "text-cyan-300",
    bg: "bg-black/95",
    border: "border-cyan-900/50",
  },
};

/** Comandos reconhecidos pelo terminal. */
export const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "contact",
  "social",
  "theme",
  "clear",
  "exit",
  "whoami",
  "sudo",
  "rm -rf",
  "coffee",
];

/** Mapeamento de comando para chave de tradução da saída. */
export const COMMAND_OUTPUT_MAP: Record<string, string> = {
  help: "commands.help.output",
  about: "commands.about.output",
  skills: "commands.skills.output",
  contact: "commands.contact.output",
  social: "commands.social.output",
  whoami: "commands.whoami.output",
  sudo: "commands.sudo.output",
  "rm -rf": "commands.rm -rf.output",
  coffee: "commands.coffee.output",
};
