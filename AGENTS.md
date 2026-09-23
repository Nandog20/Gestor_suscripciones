# AGENTS.md

## Project

"gestorsubs" — single-package SPA (no monorepo). React 19 + TypeScript + Vite 8.

- Entry chain: `index.html` → `src/main.tsx` → `src/App.tsx`.
- `src/types/` holds the domain model (`Subscription`, `Person`); components go in `src/components/`, custom hooks in `src/hooks/`.
- No test framework, no test script, no CI workflows. Don't invent `pnpm test`.

## Commands

Package manager: **pnpm only** (`pnpm-lock.yaml`). Never npm/yarn.

- `pnpm dev` — dev server (HMR).
- `pnpm lint` — oxlint (config: `.oxlintrc.json`). This is **not ESLint**; there is no `.eslintrc`.
- `pnpm build` — runs `tsc -b && vite build`. **This is the only typecheck**; there is no separate `typecheck` script, and type errors fail the build.

Verify changes with: `pnpm lint` → `pnpm build`.

## Toolchain quirks

- **Tailwind CSS v4** is wired via the `@tailwindcss/vite` plugin in `vite.config.ts`. There is no `tailwind.config.js` and no `postcss.config.js` — don't add either; v4 needs neither. Utilities load from `@import "tailwindcss";` (must stay the first line of `src/index.css`).
- **React Compiler is enabled** (`babel-plugin-react-compiler` via `@rolldown/plugin-babel` in `vite.config.ts`). It changes dev/build performance (see README). Don't add a second compiler or swap plugins without reason.
- **TypeScript is a project-reference setup** (`tsconfig.json` → `tsconfig.app.json` for `src/`, `tsconfig.node.json` for `vite.config.ts`). Edits to `vite.config.ts` are typechecked under the `node` config.

## TypeScript constraints (enforced by `tsc -b`)

- `verbatimModuleSyntax`: type-only imports must be written `import type { ... }`.
- `erasableSyntaxOnly`: no TS enums, namespaces, or constructor parameter properties.
- `allowImportingTsExtensions`: local imports include the extension (e.g. `import App from './App.tsx'`).
- `noUnusedLocals` / `noUnusedParameters`: unused imports/vars fail the build.
- `strict` is **not** enabled (unlike the default Vite template) — don't assume strict null checks are on.
