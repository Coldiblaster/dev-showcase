import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Vinicius Bastazin — Desenvolvedor Frontend Senior";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const avatarData = await readFile(
    join(process.cwd(), "public", "avatar-desk.png"),
  );
  const avatarBase64 = `data:image/png;base64,${avatarData.toString("base64")}`;

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Tailwind",
    "Node.js",
  ];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#0a0f1a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient accent */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(76,206,172,0.15) 0%, transparent 70%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(76,206,172,0.08) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "60px 80px",
        }}
      >
        {/* Left side - Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 700,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#4cceac",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 800,
                color: "#0a0f1a",
              }}
            >
              VB
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#e2e8f0",
                fontFamily: "monospace",
              }}
            >
              {"<VB />"}
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Vinicius Bastazin
          </h1>

          {/* Title */}
          <p
            style={{
              fontSize: 24,
              color: "#4cceac",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Desenvolvedor Frontend Senior
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: 18,
              color: "#94a3b8",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            +8 anos de experiência em React, Next.js e React Native. Arquitetura
            frontend, design systems e liderança técnica.
          </p>

          {/* Skills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {skills.map((skill) => (
              <div
                key={skill}
                style={{
                  padding: "6px 16px",
                  borderRadius: 20,
                  border: "1px solid rgba(76,206,172,0.3)",
                  background: "rgba(76,206,172,0.08)",
                  color: "#4cceac",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {skill}
              </div>
            ))}
          </div>

          {/* URL */}
          <p
            style={{
              fontSize: 14,
              color: "#64748b",
              fontFamily: "monospace",
              margin: 0,
              marginTop: 8,
            }}
          >
            viniciusbastazin.vercel.app
          </p>
        </div>

        {/* Right side - Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: "4px solid rgba(76,206,172,0.3)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#1a1f2e",
            }}
          >
            {}
            <img
              src={avatarBase64}
              alt=""
              width={280}
              height={280}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
