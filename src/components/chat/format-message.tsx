import type { ReactNode } from "react";

const MD_LINK_REGEX = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
const BOLD_REGEX = /\*\*(.+?)\*\*/g;

const URL_PATTERN = "https?:\\/\\/[^\\s`,)\\[\\]]+";
const TOKEN_REGEX = new RegExp(`(${URL_PATTERN}|\\*\\*.+?\\*\\*)`, "g");

function cleanUrl(raw: string): string {
  return raw.replace(/[.!?:;,]+$/, "");
}

function renderLink(href: string, label: string, key: number) {
  return (
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 break-all hover:text-primary"
    >
      {label}
    </a>
  );
}

/** Formata texto do chat: markdown links, URLs puras, **negrito**. */
export function formatMessage(text: string): ReactNode[] {
  const normalized = text.replace(MD_LINK_REGEX, (_match, label, url) => {
    return `${label} (${url})`;
  });

  const parts = normalized.split(TOKEN_REGEX);

  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      const href = cleanUrl(part);
      const trailing = part.slice(href.length);
      return (
        <span key={i}>
          {renderLink(href, href.replace(/https?:\/\//, ""), i)}
          {trailing}
        </span>
      );
    }
    if (BOLD_REGEX.test(part)) {
      BOLD_REGEX.lastIndex = 0;
      return <strong key={i}>{part.replace(/\*\*/g, "")}</strong>;
    }
    return part;
  });
}
