# PROGRESS.md

> Implementation log for the **ocsimplesite** project — a QwikJS + Tailwind 3 marketing site
> with automatic light/dark theming.
>
> Companion document: [PLAN.md](./PLAN.md) (the original spec this work is based on).

This file tracks **what was built, why, and how**, so a junior developer or a future
AI session can pick up where this left off without re-deriving anything.

---

## 1. Status

| Item | Status |
|---|---|
| Project scaffold (Qwik + QwikCity + Tailwind 3) | ✅ Done |
| Homepage `/` | ✅ Done |
| Who We Are `/who-we-are` | ✅ Done |
| Contact `/contact` (validating form + info/map section) | ✅ Done |
| Automatic + manual dark/light theme | ✅ Done |
| `npm install` | ✅ Done |
| `npm run build` (SSG, 3 pages) | ✅ Done + type-checks |
| `npm run dev` boots clean | ✅ Done |

**One known workaround:** we had to add `ignore` as a devDependency because the
`@builder.io/qwik` CLI 1.20 is missing it as a transitive dep (see §6).

---

## 2. Architecture at a glance

```
ocsimplesite/
├─ PLAN.md                         # original spec
├─ PROGRESS.md                     # this file
├─ package.json                    # scripts + deps
├─ tsconfig.json                   # TS + `~/*` path alias -> ./src/*
├─ vite.config.ts                  # qwikVite + qwikCity + tsconfigPaths
├─ tailwind.config.js              # darkMode:'class', custom keyframes
├─ postcss.config.js               # tailwindcss + autoprefixer
├─ adapters/static/vite.config.ts # static SSG adapter for `npm run build`
├─ public/favicon.svg
└─ src/
   ├─ global.css                   # @tailwind directives + base theme
   ├─ global.d.ts                  # vite/client types
   ├─ root.tsx                     # <html> shell + inline theme script + <body>
   ├─ entry.ssr.tsx                # SSR render entry
   ├─ entry.dev.tsx                # client render entry (dev)
   ├─ entry.preview.tsx            # node preview server
   ├─ components/
   │  ├─ router-head/router-head.tsx   # renders <title>/meta/links/scripts
   │  ├─ theme/
   │  │  ├─ theme-script.ts            # inline no-flash bootstrap (string)
   │  │  └─ theme-toggle.tsx           # sun/moon toggle button
   │  ├─ layout/
   │  │  ├─ header.tsx                 # sticky nav + ThemeToggle
   │  │  └─ footer.tsx
   │  └─ ui/
   │     ├─ container.tsx              # max-w-6xl centered wrapper
   │     └─ button.tsx                 # primary/ghost CTA
   └─ routes/
      ├─ layout.tsx                # wraps ALL routes with Header+Footer
      ├─ index.tsx                 # Homepage
      ├─ who-we-are/index.tsx      # Who We Are
      └─ contact/index.tsx         # Contact Us (routeAction$ form)
```

Routing is **file-based** via QwikCity. `routes/layout.tsx` automatically wraps every
page, so Header/Footer/theme-toggle appear everywhere without repetition.

---

## 3. How the theme system works (the core requirement)

Two pieces cooperate:

### 3a. No-flash bootstrap — `src/components/theme/theme-script.ts`
A plain **string** of JS, injected into `<head>` by `root.tsx` via
`<script dangerouslySetInnerHTML={themeScript} />`. It runs **before first paint**, so
the correct `dark` class is already on `<html>` when the page renders (no flash of the
wrong theme).

Logic:
1. Read `localStorage.theme`.
2. If it is `"dark"` or `"light"` → apply it and stop listening to the OS.
3. If unset → use `window.matchMedia('(prefers-color-scheme: dark)').matches`, and
   **keep listening** for OS changes (`addEventListener('change', …)`) so the site
   follows the system live — until the user makes an explicit choice.

### 3b. Manual toggle — `src/components/theme/theme-toggle.tsx`
- A `useSignal(false)` `isDark` is synced on mount via `useVisibleTask$` (reads the
  current `dark` class on `<html>`).
- On click it flips the class, writes `localStorage.theme` (`"dark"`/`"light"`), and
  updates the signal — which swaps the sun/moon icon.
- The button has `aria-label` + `aria-pressed` for accessibility.

### 3c. Tailwind wiring
- `tailwind.config.js` sets `darkMode: 'class'` (so `dark:` variants respond to the
  `.dark` class on `<html>`, not the media query).
- `src/global.css` defines base background/text colors with `dark:` counterparts and a
  `transition-colors duration-300` so switching is smooth. It also honors
  `prefers-reduced-motion` by killing animations/transitions.

> **Why a class instead of the `media` strategy?** The `media` strategy can't be
> overridden by a manual toggle. The `class` strategy lets JS own the decision, which is
> exactly what "auto-detect AND let the user override" requires.

---

## 4. Pages

- **Home** (`src/routes/index.tsx`): gradient hero with an `animate-fade-up` entrance,
  a 3-card feature grid (Fast / Adaptive / Simple), CTAs to the other pages.
- **Who We Are** (`src/routes/who-we-are/index.tsx`): mission blurb + 4 value cards +
  a contact CTA card.
- **Contact** (`src/routes/contact/index.tsx`): a `Form` backed by `routeAction$`
  (`useContactAction`) with client-side validation (name ≥ 2, valid email regex,
  message ≥ 10 chars). On success it shows a thank-you panel. Below the form is a
  two-column section: a **Google Maps iframe** (`output=embed`, no API key needed,
  address `355 Template Street, San Francisco, California 94110`) on the left, and on
  the right a 2-col grid of info cards — **Address**, **Contact us** (tel/mailto links),
  **Working hours** (24/7), and **Follow us** (LinkedIn / X / Instagram SVG icon links).
  Two local components were added in this file: `InfoCard` (icon + title + lines) and
  `SocialLink` (uses `<Slot />` for the icon — do NOT type `children` in props; see §6).
  Note: with the **static** adapter there is no live server, so the form action only
  runs in `dev`; swap to a node/express adapter (or wire an email API) for real
  submissions in production.

Shared UI: `Container` (centered max-width wrapper) and `Button` (primary gradient /
ghost outline) keep the look consistent.

---

## 5. How to run

```bash
npm install        # first time only (also installs the `ignore` workaround, see §6)
npm run dev        # dev server at http://localhost:5173  (vite --mode ssr)
npm run build      # SSG -> dist/ (also runs tsc type-check)
npm run preview    # serve the built static site
```

---

## 6. Gotchas / decisions a future dev must know

1. **`ignore` devDependency added manually.** The `@builder.io/qwik` 1.20 CLI (`qwik build`)
   throws `Cannot find module 'ignore'`. Fixed by `npm install -D ignore`. If you
   regenerate the dependency tree and the error returns, re-add it.
2. **Vite pinned to `^7.3.6`, not 8.** Qwik's peer dep is `vite >=5 <8`. Latest Vite is
   8.x which is incompatible.
3. **TypeScript pinned to `^5.6`, not 7.** TS 7 is very new; Qwik type defs target 5.x.
4. **Benign esbuild warning.** `router-head.tsx` produces a "Duplicate key
   dangerouslySetInnerHTML" warning during build. This is the same pattern used by the
   official Qwik scaffold (`{...s.props} dangerouslySetInnerHTML={s.script}`) and is
   harmless — the build still succeeds.
5. **`darkMode: 'class'`** is essential (see §3c). Don't switch to `'media'`.
6. **Contact form is demo-only under the static adapter.** For real email sending you
   need a server adapter (e.g. `adapters/node` / express) or a third-party API call
   inside `useContactAction`.
7. **Qwik JSX attribute/casing gotchas (learned on the contact info section):**
   - `<iframe>` `referrerpolicy` must be camelCase **`referrerPolicy`** in Qwik's JSX
     types (or just omit it). Lowercase `referrerpolicy` fails the type check.
   - A component that renders passed-in children must use `<Slot />` and **not** declare
     `children` in its Props interface — typing `children` as `any` triggers a
     "children prop expects type 'never'" error. (See `SocialLink` in
     `src/routes/contact/index.tsx`.)

---

## 7. Next steps (optional, from PLAN.md)

- Replace the static adapter with a server adapter and send the contact form via
  Resend/SMTP.
- Add per-route `DocumentHead` OG/Twitter tags (the `head` export already exists on each
  page — extend it).
- Deploy `dist/` to Netlify / Vercel / Cloudflare Pages (static).
- Add a `404.tsx` route for not-found handling.

---

_Last updated: added contact info + Google Maps section to `/contact`; build + SSG verified._
