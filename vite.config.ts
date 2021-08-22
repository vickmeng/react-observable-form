import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./node_modules"),
    },
  },
  build: {
    outDir: "docs",
  },

  // @ts-ignore
  base: process.env.NODE_ENV === "production" ? "react-observable-form" : "",
});
