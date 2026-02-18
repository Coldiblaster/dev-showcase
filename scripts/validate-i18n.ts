/**
 * Validates that all locales contain the same set of keys as pt-BR.
 * Exits with non-zero code when missing keys are found.
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const LOCALES_DIR = path.join(ROOT, "messages");
const SOURCE = "pt-BR";
const TARGETS = ["en", "es", "de"];

async function readJson(filePath: string) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf-8"));
  } catch {
    return null;
  }
}

function flatten(obj: any, prefix = ""): Record<string, any> {
  const res: Record<string, any> = {};
  for (const k of Object.keys(obj)) {
    const val = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (val && typeof val === "object" && !Array.isArray(val))
      Object.assign(res, flatten(val, key));
    else res[key] = val;
  }
  return res;
}

async function run() {
  const srcFiles = await fs.readdir(path.join(LOCALES_DIR, SOURCE));
  const jsonFiles = srcFiles
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !f.startsWith("__")); // Ignora arquivos de teste (__test_ns__.json, etc)
  let hasError = false;

  for (const file of jsonFiles) {
    const srcPath = path.join(LOCALES_DIR, SOURCE, file);
    const srcJson = await readJson(srcPath);
    const flatSrc = flatten(srcJson || {});
    for (const t of TARGETS) {
      const tgtPath = path.join(LOCALES_DIR, t, file);
      const tgtJson = await readJson(tgtPath);
      const flatTgt = flatten(tgtJson || {});
      const missing = Object.keys(flatSrc).filter((k) => !(k in flatTgt));
      if (missing.length) {
        hasError = true;
        console.error(`Validação i18n — chaves ausentes em ${t}/${file}:`);
        missing.forEach((k) => console.error(`  • ${k}`));
      }
    }
  }

  if (hasError) process.exit(2);
  console.log(
    "Validação i18n concluída: todos os locais possuem as chaves necessárias.",
  );
}

run().catch((e) => {
  console.error("Erro ao executar a validação i18n:", e);
  process.exit(1);
});
