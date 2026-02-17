import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { promisify } from "util";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const execAsync = promisify(exec);
const ROOT = path.resolve(__dirname, "..", "..");
const LOCALES_DIR = path.join(ROOT, "messages");

describe("validate-i18n script", () => {
  const testNs = "zz-validation-test-temp";
  const ptFile = path.join(LOCALES_DIR, "pt-BR", `${testNs}.json`);
  const enFile = path.join(LOCALES_DIR, "en", `${testNs}.json`);
  const esFile = path.join(LOCALES_DIR, "es", `${testNs}.json`);
  const deFile = path.join(LOCALES_DIR, "de", `${testNs}.json`);

  beforeEach(async () => {
    // Garante que os arquivos de teste não existem
    await fs.unlink(ptFile).catch(() => {});
    await fs.unlink(enFile).catch(() => {});
    await fs.unlink(esFile).catch(() => {});
    await fs.unlink(deFile).catch(() => {});

    // Também limpa possíveis arquivos com nomes variantes
    const testFiles = await fs
      .readdir(path.join(LOCALES_DIR, "pt-BR"))
      .catch(() => []);
    for (const file of testFiles) {
      if (file.includes("test-") && file.endsWith("-temp.json")) {
        await fs.unlink(path.join(LOCALES_DIR, "pt-BR", file)).catch(() => {});
        await fs.unlink(path.join(LOCALES_DIR, "en", file)).catch(() => {});
        await fs.unlink(path.join(LOCALES_DIR, "es", file)).catch(() => {});
        await fs.unlink(path.join(LOCALES_DIR, "de", file)).catch(() => {});
      }
    }
  });

  afterEach(async () => {
    // Limpa arquivos de teste
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
  });

  it("deve passar quando todas as chaves existem em todos os locales", async () => {
    const content = { hello: "Hello", nested: { key: "Value" } };

    await fs.writeFile(ptFile, JSON.stringify(content, null, 2), "utf-8");
    await fs.writeFile(enFile, JSON.stringify(content, null, 2), "utf-8");
    await fs.writeFile(esFile, JSON.stringify(content, null, 2), "utf-8");
    await fs.writeFile(deFile, JSON.stringify(content, null, 2), "utf-8");

    try {
      const { stdout } = await execAsync("pnpm run validate:i18n", {
        cwd: ROOT,
      });
      expect(stdout).toContain("Validação i18n concluída");
    } finally {
      // Garante limpeza mesmo se teste falhar
      await fs.unlink(ptFile).catch(() => {});
      await fs.unlink(enFile).catch(() => {});
      await fs.unlink(esFile).catch(() => {});
      await fs.unlink(deFile).catch(() => {});
    }
  });

  it("deve falhar quando chave está faltando em locale target", async () => {
    const ptContent = { hello: "Olá", missing: "Faltando" };
    const enContent = { hello: "Hello" }; // missing key

    await fs.writeFile(ptFile, JSON.stringify(ptContent, null, 2), "utf-8");
    await fs.writeFile(enFile, JSON.stringify(enContent, null, 2), "utf-8");
    await fs.writeFile(esFile, JSON.stringify(ptContent, null, 2), "utf-8");
    await fs.writeFile(deFile, JSON.stringify(ptContent, null, 2), "utf-8");

    let didFail = false;
    try {
      await execAsync("pnpm run validate:i18n", { cwd: ROOT });
    } catch (error: any) {
      didFail = true;
      // Verificar que o processo falhou (stderr contém mensagem de erro)
      const errorOutput = error.stderr || error.stdout || error.message || "";
      expect(errorOutput).toContain("chaves ausentes");
      expect(errorOutput).toContain("missing");
    } finally {
      expect(didFail).toBe(true);
      // Garante limpeza mesmo se teste falhar
      await fs.unlink(ptFile).catch(() => {});
      await fs.unlink(enFile).catch(() => {});
      await fs.unlink(esFile).catch(() => {});
      await fs.unlink(deFile).catch(() => {});
    }
  });

  it("deve falhar quando chave nested está faltando", async () => {
    const ptContent = { nested: { deep: { key: "Value" } } };
    const enContent = { nested: { deep: {} } }; // missing nested.deep.key

    await fs.writeFile(ptFile, JSON.stringify(ptContent, null, 2), "utf-8");
    await fs.writeFile(enFile, JSON.stringify(enContent, null, 2), "utf-8");
    await fs.writeFile(esFile, JSON.stringify(ptContent, null, 2), "utf-8");
    await fs.writeFile(deFile, JSON.stringify(ptContent, null, 2), "utf-8");

    try {
      await execAsync("pnpm run validate:i18n", { cwd: ROOT });
      expect.fail("Deveria ter falhado");
    } catch (error: any) {
      // Verificar que o processo falhou (stderr contém mensagem de erro)
      const errorOutput = error.stderr || error.stdout || error.message || "";
      expect(errorOutput).toContain("nested.deep.key");
    } finally {
      // Garante limpeza mesmo se teste falhar
      await fs.unlink(ptFile).catch(() => {});
      await fs.unlink(enFile).catch(() => {});
      await fs.unlink(esFile).catch(() => {});
      await fs.unlink(deFile).catch(() => {});
    }
  });

  it("deve ignorar arquivos que começam com __", async () => {
    const testFile = path.join(LOCALES_DIR, "pt-BR", "__ignore_test__.json");
    const testContent = { should: "be ignored" };

    await fs.writeFile(testFile, JSON.stringify(testContent, null, 2), "utf-8");

    // Limpa possíveis arquivos de outros testes antes de validar
    try {
      await fs.unlink(ptFile);
      await fs.unlink(enFile);
      await fs.unlink(esFile);
      await fs.unlink(deFile);
    } catch {
      // noop - arquivos podem não existir
    }

    try {
      const { stdout } = await execAsync("pnpm run validate:i18n", {
        cwd: ROOT,
      });
      expect(stdout).toContain("Validação i18n concluída");
    } finally {
      await fs.unlink(testFile);
    }
  });

  it("deve validar todos os namespaces existentes", async () => {
    // Cria arquivo de teste temporário em todos os locales para validação
    const content = { hello: "test", nested: { a: "b" } };
    await fs.writeFile(ptFile, JSON.stringify(content, null, 2), "utf-8");
    await fs.writeFile(enFile, JSON.stringify(content, null, 2), "utf-8");
    await fs.writeFile(esFile, JSON.stringify(content, null, 2), "utf-8");
    await fs.writeFile(deFile, JSON.stringify(content, null, 2), "utf-8");

    try {
      const { stdout } = await execAsync("pnpm run validate:i18n", {
        cwd: ROOT,
      });
      expect(stdout).toContain("Validação i18n concluída");
    } finally {
      // Garante limpeza mesmo se teste falhar
      await fs.unlink(ptFile).catch(() => {});
      await fs.unlink(enFile).catch(() => {});
      await fs.unlink(esFile).catch(() => {});
      await fs.unlink(deFile).catch(() => {});
    }
  });
});
