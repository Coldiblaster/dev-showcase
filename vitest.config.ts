import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**"],
    fileParallelism: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/app/styles/**",
        "src/proxy.ts",
        "**/__mocks__/**",
        "**/*.d.ts",
      ],
    },
  },
  esbuild: {
    jsx: "automatic", // 👈 força o modo automático do React 17+
    jsxImportSource: "react", // 👈 diz pro esbuild usar react-jsx-runtime
  },
});
