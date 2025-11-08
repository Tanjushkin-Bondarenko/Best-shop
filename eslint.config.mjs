import globals from "globals";
import js from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-console": "off",
      indent: ["error", 2],
    },
  },
];