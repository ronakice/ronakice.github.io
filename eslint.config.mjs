import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
})

const config = [
  {
    ignores: [
      ".next/**",
      ".next.pre-react18-fix/**",
      "out/**",
      "tmp/**",
      "node_modules/**",
      "next-env.d.ts",
      "components/ui/**",
      "components/SketchSelfPortrait.tsx",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["components/DarkSideVoxel.tsx", "tailwind.config.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]

export default config
