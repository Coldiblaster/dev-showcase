"use client";

import { Fragment } from "react";

interface SnippetExplanationProps {
  text: string;
}

/**
 * Renderiza texto de explicação com formatação rica.
 *
 * Suporta:
 * - **bold** → <strong> estilizado
 * - `code` → <code> com highlight
 * - • bullets → lista estilizada
 * - Linhas **Title:** → cabeçalhos de seção
 * - Parágrafos separados por linha vazia
 */
export function SnippetExplanation({ text }: SnippetExplanationProps) {
  const blocks = text.split("\n\n");

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <ExplanationBlock key={i} block={block.trim()} />
      ))}
    </div>
  );
}

function ExplanationBlock({ block }: { block: string }) {
  const lines = block.split("\n");

  const isBulletList = lines.every(
    (l) => l.startsWith("•") || l.startsWith("- "),
  );

  const isHeadingBlock =
    lines.length === 1 && /^\*\*[^*]+\*\*$/.test(lines[0].trim());

  const isSectionHeader =
    lines.length === 1 && /^\*\*[^*]+:\*\*/.test(lines[0].trim());

  if (isHeadingBlock || isSectionHeader) {
    return (
      <p className="text-xs font-semibold text-foreground md:text-sm">
        <InlineFormat text={lines[0]} />
      </p>
    );
  }

  if (isBulletList) {
    return (
      <ul className="space-y-1.5 pl-1">
        {lines.map((line, i) => (
          <li key={i} className="flex gap-2 text-xs text-muted-foreground md:text-sm">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
            <span className="leading-relaxed">
              <InlineFormat text={line.replace(/^[•\-]\s*/, "")} />
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (lines.length > 1 && lines.slice(1).every((l) => l.startsWith("•") || l.startsWith("- "))) {
    const [header, ...bullets] = lines;
    return (
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground md:text-sm">
          <InlineFormat text={header} />
        </p>
        <ul className="space-y-1.5 pl-1">
          {bullets.map((line, i) => (
            <li key={i} className="flex gap-2 text-xs text-muted-foreground md:text-sm">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              <span className="leading-relaxed">
                <InlineFormat text={line.replace(/^[•\-]\s*/, "")} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
      <InlineFormat text={block} />
    </p>
  );
}

function InlineFormat({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-primary"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
