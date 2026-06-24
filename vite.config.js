import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use the GitHub Pages basename only for production builds;
  // keep `/` (absolute) for the dev server to avoid empty-base errors.
  base: command === 'build' ? '/Matrix-Rank-Solver-/' : '/',
}));