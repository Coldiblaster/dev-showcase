import "dotenv/config";

import { stdin as input, stdout as output } from "node:process";

import fs from "fs";
import path from "path";
import readline from "readline/promises";
import { fileURLToPath } from "url";

function die(msg: string): never {
  console.error(msg);
  process.exit(1);
}

const locale = process.argv[2];
if (!locale)
  die("Uso: pnpm run add-locale -- <locale>  ex.: pnpm run add-locale -- de");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, "..");
const srcPt = path.join(root, "messages", "pt-BR");
const dest = path.join(root, "messages", locale);

if (!fs.existsSync(srcPt)) die("Pasta fonte pt-BR não encontrada: " + srcPt);

fs.mkdirSync(dest, { recursive: true });

/**
 * Função para limpar strings de um objeto recursivamente
 */
function blankStrings(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = Array.isArray(obj)
    ? ([] as unknown as Record<string, unknown>)
    : ({} as Record<string, unknown>);
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = blankStrings(v as Record<string, unknown>);
    } else if (typeof v === "string") {
      out[k] = "";
    } else {
      out[k] = v;
    }
  }
  return out;
}

/**
 * Copia estrutura recursivamente de pt-BR para o novo locale
 */
function copyStructure(source: string, target: string, basePath: string = "") {
  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // Cria diretório e copia recursivamente
      fs.mkdirSync(targetPath, { recursive: true });
      console.log(`📁 Criado diretório: ${relativePath}/`);
      copyStructure(sourcePath, targetPath, relativePath);
    } else if (entry.isFile()) {
      if (entry.name.endsWith(".json")) {
        // Copia JSON com valores em branco
        try {
          const raw = fs.readFileSync(sourcePath, "utf8");
          const json = JSON.parse(raw) as Record<string, unknown>;
          const blanked = blankStrings(json);
          fs.writeFileSync(
            targetPath,
            JSON.stringify(blanked, null, 2) + "\n",
            "utf8",
          );
          console.log(`✅ Criado (em branco): ${relativePath}`);
        } catch {
          // fallback to copy if parsing fails
          fs.copyFileSync(sourcePath, targetPath);
          console.log(`✅ Copiado: ${relativePath}`);
        }
      } else if (entry.name.endsWith(".ts")) {
        // Copia arquivos .ts (index.ts) diretamente
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`📋 Copiado: ${relativePath}`);
      }
    }
  }
}

// Copia toda a estrutura recursivamente
console.log(`\n🔄 Criando estrutura para locale "${locale}"...\n`);
copyStructure(srcPt, dest);
console.log(`\n✅ Estrutura criada em: ${dest}\n`);

function safeWriteWithBackup(filePath: string, content: string) {
  const abs = path.resolve(filePath);
  if (fs.existsSync(abs)) {
    const bak = abs + ".bak";
    fs.copyFileSync(abs, bak);
    console.log("backup criado", bak);
  }
  fs.writeFileSync(abs, content, "utf8");
}

// 1) update src/lib/i18n/config.ts -> add to LOCALES_CONFIG
const configPath = path.join(root, "src", "lib", "i18n", "config.ts");
if (fs.existsSync(configPath)) {
  (async () => {
    let c = fs.readFileSync(configPath, "utf8");
    // Detect LOCALES_CONFIG object
    const re = /(export const LOCALES_CONFIG = {)([\s\S]*?)(^}\s*as const;)/m;
    if (re.test(c)) {
      if (c.includes(`"${locale}":`) || c.includes(`'${locale}':`)) {
        console.log(
          `LOCALES_CONFIG já contém o locale '${locale}' — ignorado.`,
        );
      } else {
        const rl = readline.createInterface({ input, output });
        let name = "";
        while (!name) {
          name = await rl.question(`Nome amigável para ${locale}: `);
          if (!name) {
            console.log("Por favor, digite um nome válido.");
          }
        }
        // Suggest a default short code (sigla) based on the locale
        const defaultCode = ((): string => {
          const parts = locale.split("-");
          if (parts.length === 2) return parts[1].toLowerCase();
          return locale.slice(0, 2).toLowerCase();
        })();
        let code = await rl.question(
          `Sigla curta para ${locale} [${defaultCode}]: `,
        );
        if (!code) code = defaultCode;
        rl.close();
        // Insere antes do fechamento do objeto (usa `code` em vez de `flag`)
        c = c.replace(
          /^}(\s*as const;)/m,
          `  "${locale}": { name: "${name}", code: "${code}" },\n}$1`,
        );
        safeWriteWithBackup(configPath, c);
        console.log(`LOCALES_CONFIG atualizado em src/lib/i18n/config.ts`);
      }
    } else {
      console.log(
        "Padrão LOCALES_CONFIG não encontrado em config.ts — adicione manualmente.",
      );
    }
  })();
} else console.log("src/lib/i18n/config.ts não encontrado — ignorado");

// 2) update scripts/i18n-maps.ts -> TARGET_LOCALES and maps
const mapsPath = path.join(root, "scripts", "i18n-maps.ts");
if (fs.existsSync(mapsPath)) {
  let c = fs.readFileSync(mapsPath, "utf8");
  // TARGET_LOCALES
  const reTargets =
    /(const TARGET_LOCALES\s*[:=]\s*[^\[]*\[)([\s\S]*?)(\]\s*;)/m;
  if (reTargets.test(c)) {
    c = c.replace(
      reTargets,
      (_m: string, p1: string, p2: string, p3: string) => {
        const items = p2
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
          .map((s: string) => s.replace(/['"]\s]/g, ""));
        if (!items.includes(locale)) items.push(locale);
        const joined = items.map((i: string) => `"${i}"`).join(", ");
        return p1 + joined + p3;
      },
    );
    console.log("Idioma inserido em TARGET_LOCALES");
  } else
    console.log(
      "Padrão TARGET_LOCALES não encontrado em i18n-maps.ts — ignorado",
    );

  // GENERIC_TARGET_MAP (add simple mapping if missing)
  if (!c.includes(`"${locale}":`)) {
    const reGeneric =
      /(const GENERIC_TARGET_MAP\s*:\s*Record<[^>]+>\s*=\s*{)([\s\S]*?)(};)/m;
    if (reGeneric.test(c)) {
      c = c.replace(
        reGeneric,
        (_m: string, p1: string, p2: string, p3: string) => {
          const insert = `  "${locale}": "${locale}",\n`;
          return p1 + p2 + insert + p3;
        },
      );
      console.log("Entrada adicionada em GENERIC_TARGET_MAP");
    }
  }

  // DEEPL_TARGET_MAP (add mapping like 'DE')
  if (!c.includes(`"${locale}":`)) {
    const reDeep =
      /(const DEEPL_TARGET_MAP\s*:\s*Record<[^>]+>\s*=\s*{)([\s\S]*?)(};)/m;
    if (reDeep.test(c)) {
      const code = locale.toUpperCase().split("-")[0];
      c = c.replace(
        reDeep,
        (_m: string, p1: string, p2: string, p3: string) => {
          const insert = `  "${locale}": "${code}",\n`;
          return p1 + p2 + insert + p3;
        },
      );
      console.log(
        "Entrada adicionada em DEEPL_TARGET_MAP (tentativa automática)",
      );
    }
  }

  safeWriteWithBackup(mapsPath, c);
} else console.log("scripts/i18n-maps.ts não encontrado — ignorado");

// 3) update language-select.tsx -> insert option before </select>
const selectPath = path.join(
  root,
  "src",
  "shared",
  "components",
  "language-select.tsx",
);
if (fs.existsSync(selectPath)) {
  let s = fs.readFileSync(selectPath, "utf8");
  if (!s.includes(`value=\"${locale}\"`)) {
    const bak = selectPath + ".bak";
    fs.copyFileSync(selectPath, bak);
    const option = `      <option value=\"${locale}\">${locale}</option>\n`;
    // try to insert after existing options block or before </select>
    if (s.includes("</select>")) {
      s = s.replace(/<\/select>/, option + "</select>");
      fs.writeFileSync(selectPath, s, "utf8");
      console.log(
        "Opção inserida em language-select.tsx (backup em " + bak + ")",
      );
    } else {
      console.log(
        "Não foi possível encontrar </select> para inserir a opção — ignorado",
      );
    }
  } else console.log("language-select already contains locale — skipped");
} else console.log("language-select.tsx não encontrado — ignorado");

console.log("\nScaffold concluído. Próximos passos:");
console.log(
  " - Revise os backups criados (*.bak), se houver, e ajuste mapeamentos específicos do provedor (DeepL).",
);
console.log(
  " - Execute `pnpm run translate` no CI ou localmente com chaves de API para gerar traduções reais.",
);

export {};
