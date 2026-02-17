import * as React from "react";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactEmailTemplate({
  name,
  email,
  message,
}: ContactEmailProps) {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "#0a0f1a",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* Header — table layout for email client compatibility */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%)",
          padding: "28px 40px",
          borderBottom: "2px solid #4cceac",
        }}
      >
        <table cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: "middle", paddingRight: 14 }}>
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
                          fontSize: 17,
                          fontWeight: 800,
                          color: "#0a0f1a",
                          lineHeight: 1,
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#e2e8f0",
                  }}
                >
                  Novo Contato via Portfolio
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Body */}
      <div style={{ padding: "32px 40px" }}>
        {/* Sender info */}
        <div
          style={{
            backgroundColor: "#1a1f2e",
            borderRadius: 10,
            padding: "20px 24px",
            marginBottom: 28,
          }}
        >
          <table cellPadding={0} cellSpacing={0} style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    color: "#94a3b8",
                    fontSize: 13,
                    paddingBottom: 12,
                    width: 70,
                    verticalAlign: "top",
                  }}
                >
                  Nome
                </td>
                <td
                  style={{
                    color: "#f1f5f9",
                    fontSize: 15,
                    fontWeight: 600,
                    paddingBottom: 12,
                  }}
                >
                  {name}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    color: "#94a3b8",
                    fontSize: 13,
                    verticalAlign: "top",
                  }}
                >
                  Email
                </td>
                <td>
                  <a
                    href={`mailto:${email}`}
                    style={{
                      color: "#4cceac",
                      fontSize: 15,
                      textDecoration: "none",
                    }}
                  >
                    {email}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Message */}
        <div style={{ marginBottom: 28 }}>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: 1.5,
              marginTop: 0,
              marginBottom: 10,
            }}
          >
            Mensagem
          </p>
          <div
            style={{
              color: "#e2e8f0",
              fontSize: 15,
              lineHeight: 1.7,
              backgroundColor: "#1a1f2e",
              borderRadius: 10,
              padding: "20px 24px",
              borderLeft: "3px solid #4cceac",
              whiteSpace: "pre-wrap" as const,
            }}
          >
            {message}
          </div>
        </div>

        {/* Reply CTA */}
        <table cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td
                align="center"
                style={{
                  backgroundColor: "#4cceac",
                  borderRadius: 8,
                }}
              >
                <a
                  href={`mailto:${email}?subject=Re: Contato via Portfolio`}
                  style={{
                    display: "inline-block",
                    color: "#0a0f1a",
                    padding: "13px 32px",
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Responder {name.split(" ")[0]}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "20px 40px",
          borderTop: "1px solid #1e293b",
        }}
      >
        <p
          style={{
            color: "#64748b",
            fontSize: 12,
            margin: 0,
          }}
        >
          Enviado via{" "}
          <a
            href="https://viniciusbastazin.vercel.app"
            style={{ color: "#4cceac", textDecoration: "none" }}
          >
            viniciusbastazin.vercel.app
          </a>
        </p>
      </div>
    </div>
  );
}
