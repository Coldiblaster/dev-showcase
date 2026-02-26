import * as React from "react";

import type { ChangelogVersion } from "@/data/changelog";
import { PERSONAL } from "@/lib/constants";

interface NewsletterTemplateProps {
  entry: ChangelogVersion;
}

function formatDate(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function NewsletterTemplate({ entry }: NewsletterTemplateProps) {
  const link = `${PERSONAL.siteUrl}/novidades`;
  const dateFormatted = formatDate(entry.date);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "#0a0f1a",
        color: "#e2e8f0",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* Header com logo VB */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)",
          padding: "24px 28px",
          borderBottom: "2px solid #4cceac",
        }}
      >
        <table
          cellPadding={0}
          cellSpacing={0}
          style={{ borderCollapse: "collapse" }}
        >
          <tbody>
            <tr>
              <td style={{ verticalAlign: "middle", paddingRight: 12 }}>
                <table
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    borderCollapse: "collapse",
                    width: 40,
                    height: 40,
                    backgroundColor: "#4cceac",
                    borderRadius: 10,
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        style={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: "#0a0f1a",
                          lineHeight: 1,
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                      >
                        VB
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style={{ verticalAlign: "middle" }}>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#e2e8f0",
                  }}
                >
                  {PERSONAL.projectName} — Novidades
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ padding: 24 }}>
        <p
          style={{
            fontSize: 15,
            color: "#e2e8f0",
            marginBottom: 16,
            lineHeight: 1.5,
          }}
        >
          Olá, aqui é o {PERSONAL.name}! 👋 Segue as novidades que preparei pra
          você — sem enrolação, direto ao ponto.
        </p>
        <h1 style={{ fontSize: 22, margin: "0 0 8px 0", color: "#f8fafc" }}>
          {entry.title}
        </h1>
        <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 16px 0" }}>
          v{entry.version} · {dateFormatted}
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
        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: "1px solid #1e293b",
          }}
        >
          <p style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>
            Conecte-se:{" "}
            <a
              href={PERSONAL.linkedin}
              style={{ color: "#4cceac", textDecoration: "none" }}
            >
              LinkedIn
            </a>
            {" · "}
            <a
              href={PERSONAL.github}
              style={{ color: "#4cceac", textDecoration: "none" }}
            >
              GitHub
            </a>
            {" · "}
            <a
              href={PERSONAL.siteUrl}
              style={{ color: "#4cceac", textDecoration: "none" }}
            >
              Site
            </a>
          </p>
          <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>
            Você recebeu este email por estar inscrito em {PERSONAL.projectName}
          </p>
        </div>
      </div>
    </div>
  );
}
