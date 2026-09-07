import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard Vite + React setup. Static single-page app, deployed on Vercel.
// See vercel.json for the SPA fallback rewrite.
export default defineConfig({
  plugins: [react()],
});
