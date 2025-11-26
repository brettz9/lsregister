import js from "@eslint/js"
import globals from "globals";

export default [
  {
    ignores: ["dist"]
  },
  js.configs.recommended,
  {
    files: ["*.mjs"],
    languageOptions: {
      sourceType: "module"
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ["src/bin/cli.js", "sample.js"],
    rules: {
      "no-console": "off"
    }
  }
];
