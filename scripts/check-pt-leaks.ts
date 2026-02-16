#!/usr/bin/env node
/**
 * Detecta palavras em português em arquivos de tradução de outros idiomas.
 * Útil para encontrar traduções que falharam ou foram esquecidas.
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const LOCALES_DIR = path.join(ROOT, "messages");

// Palavras comuns em português que não devem aparecer em outros idiomas
const PT_WORDS = [
  "adicionar",
  "atualizar",
  "criar",
  "deletar",
  "excluir",
  "remover",
  "salvar",
  "voltar",
  "ação",
  "açõ",
  "análise",
  "controle",
  "documentação",
  "gerenciamento",
  "gestão",
  "usuário",
  "negócio",
  "segurança",
  "carregando",
  "maturidade",
  "você",
  "vocês",
  "olá",
];

// Palavras que são idênticas em português e espanhol (não verificar para ES)
const PT_ES_IDENTICAL = [
  "editar",
  "cancelar",
  "confirmar",
  "filtrar",
  "importar",
  "exportar",
];

function flatten(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  const res: Record<string, string> = {};
  for (const k of Object.keys(obj)) {
    const val = obj[k as keyof typeof obj] as unknown;
    const key = prefix ? `${prefix}.${k}` : k;
    if (val && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(res, flatten(val as Record<string, unknown>, key));
    } else if (typeof val === "string") {
      res[key] = val;
    }
  }
  return res;
}

async function checkFile(filePath: string, locale: string) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const json = JSON.parse(content);
    const flat = flatten(json as Record<string, unknown>);

    const issues: string[] = [];

    for (const [key, value] of Object.entries(flat)) {
      // Normalizar para comparação consistente
      const normalizedValue = value.normalize("NFC").toLowerCase();

      // Verifica cada palavra em português
      for (const ptWord of PT_WORDS) {
        // Ignora palavras que são idênticas em português e espanhol
        if (locale === "es" && PT_ES_IDENTICAL.includes(ptWord)) {
          continue;
        }

        // Normalizar palavra também para comparação consistente
        const normalizedWord = ptWord.normalize("NFC").toLowerCase();

        // Buscar palavra (com espaços ou pontuação ao redor)
        if (normalizedValue.includes(normalizedWord)) {
          issues.push(`  ❌ ${key}: "${value}" (contém: "${ptWord}")`);
          break; // Não precisa checar outras palavras nesta chave
        }
      }
    }

    return issues;
  } catch (error) {
    console.error(`Erro ao processar ${filePath}:`, error);
    return [];
  }
}

async function getAllJsonFiles(
  dir: string,
  baseDir: string = dir,
): Promise<string[]> {
  const results: string[] = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await getAllJsonFiles(fullPath, baseDir);
        results.push(...subFiles);
      } else if (
        entry.isFile() &&
        entry.name.endsWith(".json") &&
        !entry.name.startsWith("__")
      ) {
        const relativePath = path.relative(baseDir, fullPath);
        results.push(relativePath);
      }
    }
  } catch (error) {
    console.error(`Erro ao ler diretório ${dir}:`, error);
  }

  return results;
}

async function main() {
  console.log("🔍 Detectando palavras em português em traduções...\n");

  const locales = await fs.readdir(LOCALES_DIR, { withFileTypes: true });
  let totalIssues = 0;

  for (const locale of locales) {
    if (!locale.isDirectory() || locale.name === "pt-BR") continue;

    const localeDir = path.join(LOCALES_DIR, locale.name);
    const files = await getAllJsonFiles(localeDir);

    console.log(`\n📁 Verificando locale: ${locale.name}`);

    for (const file of files) {
      const filePath = path.join(localeDir, file);
      const issues = await checkFile(filePath, locale.name);

      if (issues.length > 0) {
        console.log(`\n  📄 ${file}`);
        issues.forEach((issue) => console.log(issue));
        totalIssues += issues.length;
      }
    }
  }

  if (totalIssues === 0) {
    console.log(
      "\n\n✅ Nenhuma palavra em português encontrada nas traduções!",
    );
  } else {
    console.log(`\n\n⚠️  Total de problemas encontrados: ${totalIssues}`);
    console.log(
      "\nDica: Execute 'pnpm run translate:force' para re-traduzir ou corrija manualmente.",
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Erro:", error);
  process.exit(1);
});
