/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import alias from "@rollup/plugin-alias";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), alias()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
