import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "example",
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@jiant/canvable": path.resolve(__dirname, "./src/main.ts"),
    },
  },
});
