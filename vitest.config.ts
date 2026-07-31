import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/**
 * Vitest ran without a config until now, which worked only because every test
 * happened to sit beside the module it covered and could reach it relatively.
 * The first test that needed a module from elsewhere failed to resolve `@/`,
 * so the alias is declared here to match `tsconfig.json`.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
