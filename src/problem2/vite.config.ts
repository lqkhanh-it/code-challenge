import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import test from "@rollup/plugin-alias";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), test()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
});
