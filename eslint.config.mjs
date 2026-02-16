import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig } from "eslint/config";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    ignores: [".next/**/*", "dist/**", "node_modules/**"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      react: pluginReact,
      prettier: pluginPrettier,
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": pluginReactHooks,
      "@next/next": nextPlugin,
    },
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "warn",
      "@next/next/google-font-display": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@typescript-eslint/no-this-alias": "warn",
      "simple-import-sort/imports": "error",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "off",
      "prettier/prettier": ["error"],
    },
  },
  // Configuração para ignorar parâmetros com prefixo _
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  ...tseslint.configs.recommended,
  // Override específico para arquivos de teste (DEVE SER O ÚLTIMO)
  {
    files: ["**/__tests__/**/*", "**/*.test.*"],
    rules: {
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-this-alias": "off",
    },
  },
]);
