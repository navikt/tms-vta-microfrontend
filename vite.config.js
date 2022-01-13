import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";

const reactUrl = "https://asset-bucket-proxy.dev.intern.nav.no/react-17.esm.js";
const reactDomUrl = "https://asset-bucket-proxy.dev.intern.nav.no/react-dom-17.esm.js";

const imports = {
  react: reactUrl,
  "react-dom": reactDomUrl,
};

export default ({ command }) => ({
  plugins: [
    react(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
    }),
    {
      ...rollupImportMapPlugin({ imports }),
      enforce: "pre",
      apply: "build",
    },
  ],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: "src/App.jsx",
      output: {
        manualChunks: false,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  test: {
    global: true,
    environment: "jsdom",
    deps: {
      inline: ["@testing-library/user-event"],
    },
  },
});
