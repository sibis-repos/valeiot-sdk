import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  tseslint.configs.recommended,
  { 
    files: ["**/*.{js,mjs,cjs,ts}"], 
    languageOptions: { globals: {...globals.browser, ...globals.node} }, 
    rules: { "@typescript-eslint/no-explicit-any": "off"} 
  },
]);