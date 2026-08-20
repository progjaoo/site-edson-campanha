const path = require("node:path");
const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  oxc: {
    jsx: "react-jsx",
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
