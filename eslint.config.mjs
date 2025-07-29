import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintComments from "eslint-plugin-eslint-comments"; // ✅ import the plugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "eslint-comments": eslintComments, // ✅ register plugin
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "eslint-comments/no-use": [
        "error",
        {
          allow: [],
          disallow: ["ts-nocheck"], // ✅ block @ts-nocheck
        },
      ],
    },
  },
];

export default eslintConfig;
