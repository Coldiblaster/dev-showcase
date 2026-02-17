import type { ReactNode } from "react";

const URL_REGEX = /(https?:\/\/[^\s`,)]+)/g;
const BOLD_REGEX = /\*\*(.+?)\*\*/g;

/** Formata texto do chat convertendo URLs em links e **texto** em negrito. */
export function formatMessage(text: string): ReactNode[] {
  const parts = text.split(/(https?:\/\/[^\s`,)]+|\*\*.+?\*\*)/g);
  return parts.map((part, i) => {
    if (URL_REGEX.test(part)) {
      URL_REGEX.lastIndex = 0;
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 break-all hover:text-primary"
        >
          {part.replace(/https?:\/\//, "")}
        </a>
      );
    }
    if (BOLD_REGEX.test(part)) {
      BOLD_REGEX.lastIndex = 0;
      return <strong key={i}>{part.replace(/\*\*/g, "")}</strong>;
    }
    return part;
  });
}
