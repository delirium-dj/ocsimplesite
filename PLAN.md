# Plan: QwikJS + Tailwind 3 Website

> **Status:** ✅ Implementation complete. This file is the original spec; the live
> "what's built / how / gotchas" log is [PROGRESS.md](./PROGRESS.md). For AI-assistant
> instructions, see [AGENTS.md](./AGENTS.md) (mandatory read-before-edit loop).

## Goal
A super-sick, simple marketing site with:
- **Homepage** (`/`)
- **Who We Are** (`/who-we-are`)
- **Contact Us** (`/contact`) — including a contact info section (Google Maps embed,
  address, phone/email, social icons, working hours)
- **Dark / Light theme** that:
  - Detects the visitor's OS theme (`prefers-color-scheme`) on first load and applies it automatically
  - Lets the visitor manually toggle and remembers the choice (`localStorage`)
  - Falls back gracefully to system theme when no manual choice is stored
- **Responsive hamburger menu** (mobile / tablet): a hamburger button that opens a
  full-screen overlay with a slight blur over the page; desktop/large-tablet keeps the
  inline nav.

## Stack
- [Qwik](https://qwik.dev) + [QwikCity](https://qwik.dev/docs/qwikcity/) (file-based routing)
- [Tailwind CSS 3](https://tailwindcss.com) **3.4** (`darkMode: 'class'`)
- TypeScript **5.6**, Vite **7** (Qwik peer is `vite >=5 <8`)
- `ignore` devDependency (required by the Qwik 1.20 CLI — see PROGRESS.md §6)

## Project Setup (as actually built)
The project was scaffolded by hand rather than `npm create qwik`, with these files:
- `package.json` — scripts: `dev` (`vite --mode ssr`), `build` (`qwik build` → SSG +
  type-check), `preview`.
- `vite.config.ts` — `qwikVite()` + `qwikCity()` + `tsconfigPaths()`.
- `tsconfig.json` — TS 5.6, `~/` path alias → `./src/*`, strict.
- `tailwind.config.js` — `darkMode: 'class'`, custom `fade-up` keyframe/animation.
- `postcss.config.js` — `tailwindcss` + `autoprefixer`.
- `adapters/static/vite.config.ts` — static SSG adapter used by `npm run build`.
- `src/global.css` — `@tailwind` directives, base `dark:` colors, `transition-colors`,
  and `prefers-reduced-motion` handling.

## Theme System (the core requirement)
A small inline script in `src/root.tsx` `<head>` sets the `dark` class on `<html>`
**before paint** (prevents flash).

- `src/components/theme/theme-script.ts` — string of inline JS:
  - Read `localStorage.theme`.
  - If `"dark"` → add `dark` class; if `"light"` → remove it.
  - If unset → use `window.matchMedia('(prefers-color-scheme: dark)').matches`, and
    subscribe to OS changes (`addEventListener('change', …)`) until a manual choice is made.
- `src/components/theme/theme-toggle.tsx` — Qwik component:
  - `useSignal` + `useVisibleTask$` to read current resolved theme (swap sun/moon icon).
  - On click: toggle `dark` class on `<html>`, write `localStorage.theme`, stop following OS.
  - Real `<button>` with `aria-label` + `aria-pressed`.
- Injected via `<script dangerouslySetInnerHTML={themeScript} />` in `root.tsx` so SSR
  output already has the correct class.

### Theme state logic (summary)
| Stored value | Behavior |
|---|---|
| `undefined` | Follow OS `prefers-color-scheme`, live-update on change |
| `"light"` | Force light, ignore OS |
| `"dark"` | Force dark, ignore OS |

## Routing / Pages (QwikCity file-based)
```
.
├─ AGENTS.md            # AI-assistant memory + mandatory read-before-edit loop
├─ PLAN.md             # this file (spec)
├─ PROGRESS.md         # implementation log / gotchas
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ adapters/static/vite.config.ts
├─ public/favicon.svg
└─ src/
   ├─ global.css
   ├─ root.tsx                 # html shell + theme inline script + <head>
   ├─ entry.ssr.tsx / entry.dev.tsx / entry.preview.tsx
   ├─ components/
   │  ├─ router-head/router-head.tsx
   │  ├─ theme/{theme-script.ts, theme-toggle.tsx}
   │  ├─ layout/{header.tsx, footer.tsx}   # header has hamburger + overlay
   │  └─ ui/{container.tsx, button.tsx}
   └─ routes/
      ├─ layout.tsx            # Header + Footer wrapper (applies to all routes)
      ├─ index.tsx             # Homepage
      ├─ who-we-are/index.tsx  # Who We Are
      └─ contact/index.tsx     # Contact Us + info/map section
```

### Pages content
- **Homepage** (`/`): gradient hero with `animate-fade-up` entrance, 3-feature grid
  (Fast / Adaptive / Simple), CTAs to the other pages.
- **Who We Are** (`/who-we-are`): mission blurb + 4 value cards + contact CTA card.
- **Contact Us** (`/contact`):
  - A `Form` backed by `routeAction$` (`useContactAction`) with client-side validation
    (name ≥ 2, valid email regex, message ≥ 10 chars); success shows a thank-you panel.
  - Below the form: a two-column section — a **Google Maps iframe** (`output=embed`,
    address `355 Template Street, San Francisco, California 94110`) on the left, and on
    the right a grid of info cards: **Address**, **Contact us** (tel/mailto links),
    **Working hours** (24/7), and **Follow us** (LinkedIn / X / Instagram SVG links).
  - Local components in this file: `InfoCard` and `SocialLink` (uses `<Slot />`).

## Responsive Header / Hamburger Menu
- `src/components/layout/header.tsx`:
  - `md+` (desktop / large tablet): inline nav links + `ThemeToggle`.
  - Below `md` (phones / small tablets): inline nav hides, a **hamburger button**
    (`md:hidden`) appears.
  - Tapping it opens a **full-screen overlay** (`fixed inset-0 z-[60]
    bg-slate-50/80 backdrop-blur-md dark:bg-slate-950/80`) that blurs the page behind and
    centers the nav links + `ThemeToggle`.
  - Driven by a `useSignal(false)` `open`; auto-closes on any link/close click; hamburger
    icon swaps to an X.
  - **Gotcha:** the overlay is a **sibling of `<header>`**, not a child — the header's
    `backdrop-blur-lg` (`backdrop-filter`) would otherwise become its containing block and
    collapse the `fixed` overlay to the header's height. See PROGRESS.md §6 (gotcha #8).

## Design (super-sick, simple, responsive)
- Tokens via Tailwind: `dark:` variants everywhere (driven by the `dark` class).
- Backgrounds: light = `bg-slate-50 text-slate-900`; dark = `dark:bg-slate-950 dark:text-slate-100`.
- Accent: indigo/violet gradient (`from-indigo-500 to-violet-500`), glass cards
  (`backdrop-blur`, `border`, `bg-white/60 dark:bg-white/5`).
- Typography: Inter / system font stack; large bold headings, generous spacing.
- Mobile-first; `flex`/`grid` with `sm:`, `md:`, `lg:` breakpoints.
- Smooth theme transition: `transition-colors duration-300`.

## Accessibility & UX
- Respect `prefers-reduced-motion` (kills transitions/animations).
- Theme toggle is a real `<button>` with `aria-label` + `aria-pressed`.
- Hamburger has `aria-label`, `aria-expanded`, `aria-controls`; overlay has `aria-hidden`.
- Sufficient contrast in both modes; focus-visible rings on interactive elements.

## Project Memory (for AI assistants)
- `AGENTS.md` is the single "memory" file all major coding agents read automatically
  (opencode, Codex, Claude Code, Cursor, Copilot). Its mandated loop:
  1. Read `AGENTS.md` → 2. Recognize stack → 3. Read `PROGRESS.md` (+ `PLAN.md`) →
  4. On finish, update `PROGRESS.md`.
- Keep `PLAN.md` as the spec; `PROGRESS.md` as the living log.

## Build & Verify
- `npm run dev` → http://localhost:5173 (vite `--mode ssr`).
- `npm run build` → SSG to `dist/` (3 pages) + `tsc` type-check.
- `npm run preview` → serve the built static site.
- Verified: build + type-check green; SSG generates `/`, `/who-we-are`, `/contact`; the
  theme inline script is present in `<head>`; `dark:` variants compiled.

## Optional Enhancements (later)
- Replace the static adapter with a server adapter and send the contact form via
  Resend/SMTP (form is currently demo-only under static).
- Expand `DocumentHead` OG/Twitter tags per route.
- Deploy `dist/` to Netlify / Vercel / Cloudflare Pages.
