#!/usr/bin/env -S npx tsx
/**
 * Dispara o broadcast da newsletter.
 * Pergunta: local ou web? Depois: token.
 *
 * Uso: npx tsx scripts/newsletter-broadcast.ts
 * Ou: npm run newsletter:broadcast
 */

import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const LOCAL_URL = "http://localhost:3000";
const WEB_URL = "https://viniciusbastazin.vercel.app";

async function main() {
  const rl = readline.createInterface({ input, output });

  console.log("\n📧 Newsletter Broadcast — Dev Showcase\n");

  const envAnswer = await rl.question("Local ou web? (l/w): ");
  const env = envAnswer.trim().toLowerCase();
  const baseUrl = env === "w" || env === "web" ? WEB_URL : LOCAL_URL;

  const tokenFromEnv = process.env.NEWSLETTER_BROADCAST_TOKEN;
  const tokenPrompt = tokenFromEnv
    ? "Token (Enter = usar NEWSLETTER_BROADCAST_TOKEN do .env): "
    : "Token (NEWSLETTER_BROADCAST_TOKEN do .env): ";
  const token = await rl.question(tokenPrompt);
  rl.close();

  const trimmedToken = (token.trim() || tokenFromEnv || "").trim();
  if (!trimmedToken) {
    console.error(
      "❌ Token é obrigatório. Defina NEWSLETTER_BROADCAST_TOKEN no .env ou informe ao prompt.",
    );
    process.exit(1);
  }

  const url = `${baseUrl}/api/newsletter/broadcast`;
  console.log(`\n🔄 Enviando para ${url}...\n`);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${trimmedToken}`,
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("❌ Erro:", res.status, data?.error ?? res.statusText);
      process.exit(1);
    }

    console.log("✅ Sucesso!");
    console.log(`   Enviados: ${data.sent ?? 0} / ${data.total ?? 0}`);
  } catch (err) {
    console.error("❌ Falha na requisição:", err);
    process.exit(1);
  }
}

main();
