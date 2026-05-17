import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tsConfigPaths(), tailwindcss(), tanstackStart()],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router"],
  },
});
