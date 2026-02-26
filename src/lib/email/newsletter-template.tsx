import * as React from "react";

import type { ChangelogVersion } from "@/data/changelog";
import { PERSONAL } from "@/lib/constants";

interface NewsletterTemplateProps {
  entry: ChangelogVersion;
}

export function NewsletterTemplate({ entry }: NewsletterTemplateProps) {
  const link = `${PERSONAL.siteUrl}/novidades`;

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "#0a0f1a",
        color: "#e2e8f0",
        padding: 24,
        borderRadius: 12,
      }}
    >
      <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 8 }}>
        {PERSONAL.siteName} — Novidades
      </p>
      <h1 style={{ fontSize: 22, margin: "0 0 8px 0", color: "#f8fafc" }}>
        {entry.title}
      </h1>
      <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px 0" }}>
        v{entry.version} · {entry.date}
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
        {entry.summary}
      </p>
      <ul style={{ paddingLeft: 20, margin: "0 0 24px 0", lineHeight: 1.7 }}>
        {entry.items.slice(0, 5).map((item, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            {item.description}
          </li>
        ))}
      </ul>
      <a
        href={link}
        style={{
          display: "inline-block",
          backgroundColor: "#4cceac",
          color: "#0a0f1a",
          padding: "12px 24px",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        Ver todas as novidades →
      </a>
      <p
        style={{
          marginTop: 24,
          fontSize: 12,
          color: "#64748b",
          borderTop: "1px solid #1e293b",
          paddingTop: 16,
        }}
      >
        Você recebeu este email por estar inscrito em {PERSONAL.siteUrl}
      </p>
    </div>
  );
}
