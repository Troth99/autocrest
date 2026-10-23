<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AutoCrest AI coding guide

## Project overview

This repo is a Next.js 16 App Router app with TypeScript, Tailwind, and Supabase auth. Use the app structure in [README.md](README.md) as the entry point for setup and conventions.

## Working commands

- Install dependencies: `npm install`
- Run locally: `npm run dev`
- Validate production build: `npm run build`
- Lint: `npm run lint`

## Architecture and file conventions

- App routes live under `src/app` and use route groups like `(marketing)`, `(auth)`, and `(dashboard)` to keep URLs clean.
- Feature-specific code belongs in `src/features/<domain>/` with folders like `components`, `services`, `types`, and `validators`.
- Shared UI and reusable hooks live under `src/shared/` instead of being duplicated in feature folders.
- Supabase server helpers and user/session logic live in `src/lib/supabase/` and should be reused rather than reimplemented.
- Use the `@/` alias for imports inside the repo; avoid brittle relative paths when a shared module is involved.

## Implementation conventions

- Prefer Server Components by default. Only add `"use client"` when you need browser interactivity, hooks, or event handlers.
- Keep auth and data-fetching flows aligned with the Supabase SSR setup in `src/lib/supabase/server.ts` and `src/lib/supabase/current-user.ts`.
- Validate form inputs with the existing Zod validators under `src/features/**/validators/` instead of introducing ad hoc checks.
- Match the current folder pattern: feature UI in the nearest feature folder, shared primitives in `src/shared/components/ui`, and page-level concerns in the route folders.
- When editing auth, registration, or profile work, preserve the surrounding route group structure and avoid changing URL paths unless explicitly requested.

## Expected review patterns

- Keep changes minimal and close to the relevant feature.
- Prefer reusing existing patterns from `src/features/auth`, `src/features/profile`, and `src/shared` instead of creating parallel abstractions.
- If a task is ambiguous, read the local feature files first and follow the same naming and composition patterns already used in the repo.

## Useful references

- [README.md](README.md)
- [src/app](src/app)
- [src/features](src/features)
- [src/shared](src/shared)
- [src/lib/supabase](src/lib/supabase)

## Personal preferences
- Use `async/await` for all asynchronous code instead of `.then()` or `.catch()`.
- before changing any code, check the existing codebase for similar patterns and follow them.
- do not add libraries or dependencies unless absolutely necessary; prefer using existing utilities and helpers.
- after working on a feature, show what changes were made.
- 
## Teaching workflow
- When I ask for step-by-step help, give one small change at a time.
- Name the exact file and insertion point.
- Explain briefly why the change is needed.
- When I say "done", continue to the next step.
- When I ask you to make the changes, edit the files directly.

## Code quality
- Keep state local unless multiple components need to share it.
- Extract custom hooks when they reuse meaningful behavior,
  not simply because state variable names repeat.
- Prefer clear, specific names over generic abstractions.
- Follow the existing error and loading patterns.

## Database changes
- Clearly distinguish local migrations from applied Supabase changes.
- Store database schema and function changes in migration files.
- Enforce vehicle ownership using authenticated users and RLS.
- Use transactions for changes that must succeed or fail together.

## UI behavior
- Disable actions while saving and show useful error messages.
- Preserve the current design unless I request a visual change.
- Keep keyboard navigation and accessible labels working.

## Verification
- Run checks appropriate to the change.
- State what was checked and what still needs browser or Supabase testing.
- Do not claim a feature works live based only on TypeScript checks.