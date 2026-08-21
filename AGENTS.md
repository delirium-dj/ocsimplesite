# AGENTS.md — Project Memory & Rules for AI Assistants

This file is the **single source of instructions** every AI assistant must follow in this
repo. opencode, OpenAI Codex, Claude Code, Cursor, and GitHub Copilot all read `AGENTS.md`
automatically. It is the project's "memory."

## Mandatory operating loop (do this every session)

1. **Read this file (memory).** You are now aware of the stack and the rules.
2. **Recognize the stack.** This is **Qwik + QwikCity + Tailwind CSS 3** (Vite 7, TS 5.6).
   Do not introduce other frameworks or upgrade the stack without an explicit request.
3. **Read progress before touching code.** Open
   [PROGRESS.md](./PROGRESS.md) (and [PLAN.md](./PLAN.md) for the spec) to learn what
   exists, how it was built, and the known gotchas. Work *within* that design.
4. **Update memory when done.** After finishing a task, edit `PROGRESS.md` (and `PLAN.md`
   if requirements changed) so the next human or AI session continues without friction.

> If `PLAN.md`/`PROGRESS.md` ever contradict the code, treat the docs as authoritative and
> flag the discrepancy — do not silently diverge.

## Hard rules for this project

- **Stack is fixed:** Qwik + QwikCity + Tailwind CSS **3** (`darkMode: 'class'`).
  No Tailwind 4, no framework swaps without explicit request.
- **Theme system is deliberate:** a `dark` class on `<html>` set by
  `src/components/theme/theme-script.ts` (no-flash, OS-aware) and toggled by
  `src/components/theme/theme-toggle.tsx` (manual override persisted to `localStorage`).
  Never switch `darkMode` to `'media'`.
- **Vite pinned to `^7`** (Qwik peer: `vite >=5 <8`) and **TypeScript to `^5.6`**.
  No Vite 8 / TS 7.
- **`ignore` devDependency is required** by the Qwik 1.20 CLI — do not remove it.
- **Contact form is demo-only** under the static adapter (see PROGRESS.md §6).

## Quick orientation

- Routing: file-based in `src/routes/` (`layout.tsx` wraps every page).
- Shared UI: `src/components/ui/`; layout: `src/components/layout/`; theme: `src/components/theme/`.
- Run: `npm run dev` (dev), `npm run build` (SSG + type-check), `npm run preview`.

## How to update PROGRESS.md (step 4)

Append/modify the relevant section in `PROGRESS.md`: what changed, why, file pointers, and
any new gotchas. Keep the "Status" table and "Gotchas" list current. This is the handoff
note for the next session — make it good enough that a junior dev could continue.
