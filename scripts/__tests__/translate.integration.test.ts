import fs from "fs/promises";
import path from "path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ROOT = path.resolve(__dirname, "..", "..");
const LOCALES_DIR = path.join(ROOT, "messages");

describe("translate orchestrator (integration, mocked providers)", () => {
  const testNs = `test-namespace-temp-${Date.now()}`;
  const ptDir = path.join(LOCALES_DIR, "pt-BR");
  const enDir = path.join(LOCALES_DIR, "en");
  const esDir = path.join(LOCALES_DIR, "es");
  const deDir = path.join(LOCALES_DIR, "de");
  const ptFile = path.join(ptDir, `${testNs}.json`);
  const enFile = path.join(enDir, `${testNs}.json`);
  const esFile = path.join(esDir, `${testNs}.json`);
  const deFile = path.join(deDir, `${testNs}.json`);

  beforeEach(async () => {
    await fs.mkdir(ptDir, { recursive: true });
    await fs.mkdir(enDir, { recursive: true });
    await fs.mkdir(esDir, { recursive: true });
    await fs.mkdir(deDir, { recursive: true });
    // ensure pt file with two keys
    const pt = { hello: "Olá", nested: { a: "Valor {name}" } };
    await fs.writeFile(ptFile, JSON.stringify(pt, null, 2) + "\n", "utf-8");
    // create target files with empty values (script fills in translations)
    const empty = { hello: "", nested: { a: "" } };
    await fs.writeFile(enFile, JSON.stringify(empty, null, 2) + "\n", "utf-8");
    await fs.writeFile(esFile, JSON.stringify(empty, null, 2) + "\n", "utf-8");
    await fs.writeFile(deFile, JSON.stringify(empty, null, 2) + "\n", "utf-8");
  });

  afterEach(async () => {
    // cleanup all test files - aguardar um pouco para garantir que arquivos foram gravados
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      await fs.unlink(ptFile);
    } catch {
      // noop
    }
    try {
      await fs.unlink(enFile);
    } catch {
      // noop
    }
    try {
      await fs.unlink(esFile);
    } catch {
      // noop
    }
    try {
      await fs.unlink(deFile);
    } catch {
      // noop
    }

    // Limpar também arquivos de teste do outro teste se existirem
    const validationFile = "zz-validation-test-temp.json";
    try {
      await fs.unlink(path.join(enDir, validationFile));
      await fs.unlink(path.join(esDir, validationFile));
      await fs.unlink(path.join(deDir, validationFile));
      await fs.unlink(path.join(ptDir, validationFile));
    } catch {
      // noop
    }
  });

  it("creates target locale file using mocked translator", async () => {
    // Limpar cache e configurar mock em runtime
    vi.resetModules();

    // Mock do tradutor DeepL
    vi.doMock("../translators/deepl.translator", () => ({
      default: class {
        async translate(
          text: string,
          _sourceLang: string,
          _targetLang: string,
        ) {
          return text + "::EN";
        }
      },
    }));

    // import run dynamically (o mock já foi configurado acima)
    const mod = await import("../translate");
    await mod.run();

    // Aguardar um pouco para garantir que os arquivos foram gravados
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verificar se o arquivo foi criado e traduzido
    try {
      const enContentRaw = await fs.readFile(enFile, "utf-8");
      const enJson = JSON.parse(enContentRaw);
      expect(enJson.hello).toBe("Olá::EN");
      expect(enJson.nested.a).toBe("Valor {name}::EN");
    } catch (error) {
      // Se arquivo não existir, log para debug
      console.log("Erro ao ler arquivo:", error);
      throw error;
    }
  });
});
