#!/usr/bin/env node
import "dotenv/config";

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { NAMESPACES } from "../src/lib/i18n/load-messages";
import { DEFAULT_LOCALE } from "../src/lib/i18n/request";
import {
  providerSourceCode,
  providerTargetCode,
  TARGET_LOCALES,
} from "./i18n-maps";
import {
  ProviderName,
  resolveProviderName,
  Translator,
} from "./translators/translator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const LOCALES_DIR = path.join(ROOT, "messages");
/**
 * Localidade de origem usada para gerar traduções.
 * Pode ser sobrescrita em tempo de execução via env var `TRANSLATION_SOURCE`.
 */
const SOURCE_LOCALE = process.env.TRANSLATION_SOURCE ?? DEFAULT_LOCALE;

/**
 * Termos que não devem ser traduzidos (nomes próprios, marcas, etc).
 * Podem ser configurados via arquivo protected-terms.json na raiz do projeto,
 * ou via env var PROTECTED_TERMS (separado por vírgula).
 * Prioridade: env var > arquivo > default.
 */
let PROTECTED_TERMS: string[] = [
  "Safer",
  "Cockpit",
  "next",
  "react",
  "github",
  "Next",
  "React",
  "GitHub",
];
try {
  // 1. Tenta carregar do arquivo se existir
  const protectedTermsPath = path.join(ROOT, "protected-terms.json");
  import("fs").then((fsModule) => {
    if (fsModule.existsSync(protectedTermsPath)) {
      const fileTerms = JSON.parse(
        fsModule.readFileSync(protectedTermsPath, "utf-8"),
      );
      if (Array.isArray(fileTerms)) {
        PROTECTED_TERMS = fileTerms.map(String);
      }
    }
    // 2. Se houver env var, sobrescreve
    if (process.env.PROTECTED_TERMS) {
      PROTECTED_TERMS = process.env.PROTECTED_TERMS.split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    // 3. Remove duplicatas
    PROTECTED_TERMS = Array.from(new Set(PROTECTED_TERMS));
  });
} catch (e) {
  // fallback para default
}

/**
 * Flag --force: Re-traduz todos os valores, mesmo os que já existem.
 * Uso: pnpm run translate -- --force
 */

const FORCE_MODE = process.argv.includes("--force");
// Flag de log detalhado: --verbose ou LOG_VERBOSE=1
const LOG_VERBOSE =
  process.argv.includes("--verbose") || process.env.LOG_VERBOSE === "1";

// Delay entre traduções (ms), configurável por env var TRANSLATE_DELAY_MS (default 120ms)
const TRANSLATE_DELAY_MS = parseInt(
  process.env.TRANSLATE_DELAY_MS || "120",
  10,
);

if (process.env.NODE_ENV === "production") {
  console.error("translate.ts must not run in production. Aborting.");
  process.exit(1);
}

// Campos que não devem ser traduzidos em arrays de objetos
const FIELDS_TO_IGNORE: string[] = ["company"];

// Export para testes unitários
export { flatten, unflatten };

function flatten(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, unknown> {
  const res: Record<string, unknown> = {};
  for (const k of Object.keys(obj)) {
    const val = obj[k as keyof typeof obj] as unknown;
    const key = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(val)) {
      let lastType: string | null = null;
      for (let idx = 0; idx < val.length; idx++) {
        const item = val[idx];
        const type = Array.isArray(item) ? "array" : typeof item;
        if (lastType && type !== lastType) {
          if (LOG_VERBOSE) {
            console.warn(
              `[translate] Aviso: Array misto detectado em ${key} (índice ${idx})`,
            );
          }
        }
        lastType = type;
        if (Array.isArray(item)) {
          if (LOG_VERBOSE) {
            console.warn(
              `[translate] Aviso: Array de arrays detectado em ${key}[${idx}] (não suportado)`,
            );
          }
        } else if (typeof item === "object" && item !== null) {
          for (const field of Object.keys(item)) {
            if (FIELDS_TO_IGNORE.includes(field)) continue;
            Object.assign(
              res,
              flatten({ [field]: item[field] }, `${key}[${idx}]`),
            );
          }
        } else {
          const arrKey = `${key}[${idx}]`;
          if (arrKey in res) {
            if (LOG_VERBOSE) {
              console.warn(
                `[translate] Aviso: Colisão de path detectada em ${arrKey}. Valor anterior será mantido.`,
              );
            }
          } else {
            res[arrKey] = item;
          }
        }
      }
    } else {
      res[key] = val;
    }
  }
  return res;
}

/**
 * Desfazer flatten de um dicionário com chaves em notação com pontos
 * e recriar o objeto aninhado.
 * @param dict Dicionário achatado
 */
// Novo unflatten que reconstrói arrays de objetos
function unflatten(dict: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const k of Object.keys(dict)) {
    // Detecta paths de array: ex: items[0].description
    const parts = k.split(/\.(?![^\[]*\])/g); // split ignorando pontos dentro de []
    let cur: any = result;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const arrayMatch = part.match(/(.+)\[(\d+)\]$/);
      if (arrayMatch) {
        const arrKey = arrayMatch[1];
        const arrIdx = parseInt(arrayMatch[2], 10);
        if (!cur[arrKey]) cur[arrKey] = [];
        if (!cur[arrKey][arrIdx]) cur[arrKey][arrIdx] = {};
        if (i === parts.length - 1) {
          cur[arrKey][arrIdx] = dict[k];
        } else {
          cur = cur[arrKey][arrIdx];
        }
      } else {
        if (i === parts.length - 1) {
          cur[part] = dict[k];
        } else {
          if (!cur[part]) cur[part] = {};
          cur = cur[part];
        }
      }
    }
  }
  return result;
}

async function readJson(
  filePath: string,
): Promise<Record<string, unknown> | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Busca recursivamente todos os arquivos JSON em um diretório
 * @param dir Diretório base
 * @param baseDir Diretório raiz para cálculo de caminhos relativos
 * @returns Array de caminhos relativos dos arquivos JSON
 */
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
        // Recursivamente buscar em subpastas
        const subFiles = await getAllJsonFiles(fullPath, baseDir);
        results.push(...subFiles);
      } else if (
        entry.isFile() &&
        entry.name.endsWith(".json") &&
        !entry.name.startsWith("__")
      ) {
        // Adicionar arquivo JSON (ignorando arquivos de teste)
        const relativePath = path.relative(baseDir, fullPath);
        results.push(relativePath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return results;
}

/**
 * Retorna os arquivos de namespace a serem processados pelo script.
 * Usa `NAMESPACES` centralizado para manter paridade com a App.
 */
async function listNamespaceFiles(): Promise<string[]> {
  // Busca recursivamente todos os arquivos JSON no diretório de origem
  const dir = path.join(LOCALES_DIR, SOURCE_LOCALE);
  try {
    return await getAllJsonFiles(dir);
  } catch {
    // Directory missing — return known namespaces that actually exist.
    const candidates = NAMESPACES.map((ns) => `${ns}.json`);
    const out: string[] = [];
    for (const name of candidates) {
      const p = path.join(LOCALES_DIR, SOURCE_LOCALE, name);
      try {
        await fs.access(p);
        out.push(name);
      } catch {
        // arquivo não existe — ignore
      }
    }
    return out;
  }
}

function protectPlaceholders(text: string) {
  const placeholders = Array.from(text.matchAll(/\{[^}]+\}/g));
  let tmp = text;
  const map: Record<string, string> = {};

  // Proteger placeholders ICU {variavel}
  placeholders.forEach((ph, idx) => {
    const key = `__PH${idx}__`;
    map[key] = ph[0];
    tmp = tmp.replace(ph[0], key);
  });

  // Proteger termos que não devem ser traduzidos
  PROTECTED_TERMS.forEach((term, idx) => {
    const regex = new RegExp(`\\b${term}\\b`, "g");
    const matches = tmp.match(regex);
    if (matches) {
      matches.forEach((match, matchIdx) => {
        const key = `__TERM${idx}x${matchIdx}__`;
        map[key] = match;
        tmp = tmp.replace(match, key);
      });
    }
  });

  return { text: tmp, map } as { text: string; map: Record<string, string> };
}

/**
 * Restore placeholder tokens to the original bracketed form.
 * @param text Translated text that may contain placeholder tokens
 * @param map Mapping from token to original placeholder
 */
function restorePlaceholders(text: string, map: Record<string, string>) {
  let out = text;
  for (const k of Object.keys(map))
    out = out.replace(new RegExp(k, "g"), map[k]);
  return out;
}

function ensureDir(p: string) {
  return fs.mkdir(p, { recursive: true });
}

/**
 * Sincroniza arquivos index.ts da origem para os targets.
 * Copia o index.ts principal e os index.ts de cada módulo (pastas).
 */
async function syncIndexFiles(target: string) {
  // 1. Copia o index.ts principal (messages/pt-BR/index.ts -> messages/{target}/index.ts)
  const mainIndexSource = path.join(LOCALES_DIR, SOURCE_LOCALE, "index.ts");
  const mainIndexTarget = path.join(LOCALES_DIR, target, "index.ts");

  try {
    await fs.copyFile(mainIndexSource, mainIndexTarget);
    console.log(`📋 Synced main index: ${target}/index.ts`);
  } catch (error) {
    console.error(
      `Failed to sync main index for ${target}:`,
      error instanceof Error ? error.message : error,
    );
  }

  // 2. Copia index.ts de cada módulo (pastas dentro de pt-BR)
  try {
    const sourceDir = path.join(LOCALES_DIR, SOURCE_LOCALE);
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const moduleIndexSource = path.join(sourceDir, entry.name, "index.ts");
        try {
          await fs.access(moduleIndexSource);
          const moduleIndexTarget = path.join(
            LOCALES_DIR,
            target,
            entry.name,
            "index.ts",
          );
          await ensureDir(path.dirname(moduleIndexTarget));
          await fs.copyFile(moduleIndexSource, moduleIndexTarget);
          console.log(
            `📋 Synced module index: ${target}/${entry.name}/index.ts`,
          );
        } catch {
          // index.ts não existe neste módulo, ignorar
        }
      }
    }
  } catch (error) {
    console.error(
      `Failed to scan modules for ${target}:`,
      error instanceof Error ? error.message : error,
    );
  }
}

async function loadTranslator(provider: ProviderName): Promise<Translator> {
  if (provider === "deepl") {
    const mod = await import("./translators/deepl.translator");
    console.log("[DEBUG] mod from deepl.translator:", mod);
    return new mod.default();
  }
  if (provider === "google") {
    const mod = await import("./translators/google.translator");
    console.log("[DEBUG] mod from google.translator:", mod);
    return new mod.default();
  }
  throw new Error(`Unsupported provider: ${provider}`);
}

/**
 * Detecta todos os locales no diretório messages/ e atualiza i18n-maps.ts
 * se houver novos locales que não estão em TARGET_LOCALES.
 * Retorna a lista atualizada de locales.
 */
async function autoDetectAndUpdateLocales(): Promise<string[]> {
  try {
    const entries = await fs.readdir(LOCALES_DIR, { withFileTypes: true });
    const detectedLocales = entries
      .filter((entry) => entry.isDirectory() && entry.name !== SOURCE_LOCALE)
      .map((entry) => entry.name)
      .sort();

    const currentLocales = Array.from(TARGET_LOCALES) as string[];
    const newLocales = detectedLocales.filter(
      (locale) => !currentLocales.includes(locale),
    );

    if (newLocales.length === 0) {
      return detectedLocales; // Retorna os locales existentes
    }

    console.log(`\n🔍 Novos locales detectados: ${newLocales.join(", ")}`);
    console.log(`📝 Atualizando i18n-maps.ts...\n`);

    // Ler o arquivo i18n-maps.ts
    const i18nMapsPath = path.join(__dirname, "i18n-maps.ts");
    let content = await fs.readFile(i18nMapsPath, "utf-8");

    // Atualizar TARGET_LOCALES
    const allLocales = [...currentLocales, ...newLocales].sort((a, b) =>
      a.localeCompare(b),
    );
    const newTargetLocales = `export const TARGET_LOCALES = [${allLocales.map((l) => `"${l}"`).join(", ")}] as const;`;
    content = content.replace(
      /export const TARGET_LOCALES = \[[\s\S]*?\] as const;/,
      newTargetLocales,
    );

    // Atualizar DEEPL_TARGET_MAP
    for (const locale of newLocales) {
      const deeplCode = locale.toUpperCase();
      const deeplMapRegex =
        /export const DEEPL_TARGET_MAP: Record<string, string> = \{([^}]*)\};/;
      const match = content.match(deeplMapRegex);
      if (match) {
        const currentMap = match[1];
        const newEntry = `\n  ${locale}: "${deeplCode}",`;
        const newMap = `export const DEEPL_TARGET_MAP: Record<string, string> = {${currentMap}${newEntry}\n};`;
        content = content.replace(deeplMapRegex, newMap);
      }
    }

    // Atualizar GENERIC_TARGET_MAP
    for (const locale of newLocales) {
      const genericMapRegex =
        /export const GENERIC_TARGET_MAP: Record<string, string> = \{([^}]*)\};/;
      const match = content.match(genericMapRegex);
      if (match) {
        const currentMap = match[1];
        const newEntry = `\n  ${locale}: "${locale}",`;
        const newMap = `export const GENERIC_TARGET_MAP: Record<string, string> = {${currentMap}${newEntry}\n};`;
        content = content.replace(genericMapRegex, newMap);
      }
    }

    // Salvar o arquivo atualizado
    await fs.writeFile(i18nMapsPath, content, "utf-8");

    console.log(
      `✅ i18n-maps.ts atualizado com os novos locales: ${newLocales.join(", ")}\n`,
    );

    return detectedLocales;
  } catch (error) {
    console.error(
      `⚠️  Erro ao detectar/atualizar locales:`,
      error instanceof Error ? error.message : error,
    );
    return Array.from(TARGET_LOCALES);
  }
}

export async function run() {
  const rawProvider = process.env.TRANSLATION_PROVIDER;
  const provider = resolveProviderName(rawProvider);

  console.log(`\n🔧 Debug Info:`);
  console.log(`   process.argv: ${JSON.stringify(process.argv)}`);
  console.log(`   FORCE_MODE: ${FORCE_MODE}`);
  console.log(`\nTranslation provider: ${provider}`);

  if (FORCE_MODE) {
    console.log(
      `\n⚠️  FORCE MODE: Re-traduzindo todos os valores (incluindo existentes)\n`,
    );
  }

  // Auto-detectar e atualizar novos locales (retorna lista atualizada)
  const targetLocales = await autoDetectAndUpdateLocales();

  const namespaces = await listNamespaceFiles();

  const translator = await loadTranslator(provider);

  // Primeiro, sincroniza os arquivos index.ts para todos os targets
  console.log("\n🔄 Sincronizando arquivos index.ts...\n");
  for (const target of targetLocales) {
    await syncIndexFiles(target);
  }
  console.log("\n✅ Sincronização de index.ts concluída\n");

  for (const nsFile of namespaces) {
    const srcPath = path.join(LOCALES_DIR, SOURCE_LOCALE, nsFile);
    const srcJson = await readJson(srcPath);
    if (!srcJson) continue;
    const flatSrc = flatten(srcJson as Record<string, unknown>);

    for (const target of targetLocales) {
      const targetDir = path.join(LOCALES_DIR, target);
      const targetPath = path.join(targetDir, nsFile);

      // Garantir que o diretório do arquivo existe (pode estar em subpasta)
      await ensureDir(path.dirname(targetPath));

      const targetJson = (await readJson(targetPath)) || {};
      const flatTarget = flatten(targetJson as Record<string, unknown>);

      let changed = false;
      const out: Record<string, unknown> = { ...flatTarget };

      // Função recursiva fortemente tipada para traduzir e sincronizar arrays/objetos
      async function translateDeep<T = unknown>(
        src: T,
        tgt: T | undefined,
        path: string = "",
      ): Promise<T> {
        if (Array.isArray(src)) {
          // Garante que o array de destino tenha o mesmo comprimento do source
          const srcArr = src as unknown[];
          const tgtArr = Array.isArray(tgt) ? (tgt as unknown[]) : [];
          const result: unknown[] = [];
          for (let idx = 0; idx < srcArr.length; idx++) {
            const tgtItem = idx in tgtArr ? tgtArr[idx] : undefined;
            result[idx] = await translateDeep(
              srcArr[idx],
              tgtItem,
              `${path}[${idx}]`,
            );
          }
          return result as T;
        } else if (src && typeof src === "object") {
          // Objeto: sempre cria todos os campos do source no destino
          const srcObj = src as Record<string, unknown>;
          const tgtObj =
            tgt && typeof tgt === "object"
              ? (tgt as Record<string, unknown>)
              : {};
          const outObj: Record<string, unknown> = {};
          for (const k of Object.keys(srcObj)) {
            outObj[k] = await translateDeep(
              srcObj[k],
              tgtObj[k],
              path ? `${path}.${k}` : k,
            );
          }
          // Copia campos extras do destino que não existem no source (para não perder nada manual)
          for (const k of Object.keys(tgtObj)) {
            if (!(k in srcObj)) {
              outObj[k] = tgtObj[k];
            }
          }
          return outObj as T;
        } else if (typeof src === "string") {
          if (src === "") return src;
          if (!FORCE_MODE && tgt !== undefined && tgt !== null && tgt !== "") {
            return tgt as T;
          }
          const { text: protectedText, map } = protectPlaceholders(src);
          try {
            const targetCode = providerTargetCode(provider, target as string);
            const sourceCode = providerSourceCode(provider, SOURCE_LOCALE);
            const translated = await translator.translate(
              protectedText,
              sourceCode,
              targetCode,
            );
            const restored = restorePlaceholders(translated, map);
            changed = true;
            if (LOG_VERBOSE) {
              console.log(`Translated ${nsFile} :: ${path} -> ${target}`);
            }
            await new Promise((r) => setTimeout(r, TRANSLATE_DELAY_MS));
            return restored as T;
          } catch (e) {
            console.error(
              `Failed to translate ${nsFile} :: ${path} -> ${target}:`,
              e instanceof Error ? e.message : e,
            );
            return src;
          }
        } else {
          // Outros tipos: copia direto
          return src;
        }
      }

      // Executa tradução profunda
      const translatedObj = await translateDeep(srcJson, targetJson);
      if (JSON.stringify(translatedObj) !== JSON.stringify(targetJson)) {
        changed = true;
        await fs.writeFile(
          targetPath,
          JSON.stringify(translatedObj, null, 2) + "\n",
          "utf-8",
        );
        console.log(`Updated ${targetPath}`);
      } else {
        console.log(`No changes for ${targetPath}`);
      }
    }
  }
}

// Run only when executed directly (tsx/node) - avoid running on import (tests)
const entry = process.argv?.[1] || "";
if (
  entry.endsWith("scripts/translate.ts") ||
  entry.endsWith("scripts\\translate.ts") ||
  entry.endsWith("translate.ts")
) {
  run().catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
}
