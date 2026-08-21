# Plan: QwikJS + Tailwind 3 Website

## Goal
A super-sick, simple marketing site with:
- **Homepage** (`/`)
- **Who We Are** (`/who-we-are`)
- **Contact Us** (`/contact`)
- **Dark / Light theme** that:
  - Detects the visitor's OS theme (`prefers-color-scheme`) on first load and applies it automatically
  - Lets the visitor manually toggle and remembers the choice (`localStorage`)
  - Falls back gracefully to system theme when no manual choice is stored

## Stack
- [Qwik](https://qwik.dev) + [QwikCity](https://qwik.dev/docs/qwikcity/) (file-based routing)
- [Tailwind CSS 3](https://tailwindcss.com) (`darkMode: 'class'`)
- TypeScript, Vite

## Project Setup
1. Scaffold with `npm create qwik@latest` (choose `Empty App` / minimal).
2. Install Tailwind 3: `npm install -D tailwindcss@3 postcss autoprefixer`
3. Init config: `npx tailwindcss init -p` → produces `tailwind.config.js` + `postcss.config.js`.
4. Configure `tailwind.config.js`:
   ```js
   export default {
     darkMode: 'class',
     content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
     theme: { extend: {} },
     plugins: [],
   }
   ```
5. Add Tailwind directives to `src/global.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## Theme System (the core requirement)
Use a small inline script in `src/root.tsx` `<head>` to set the `class="dark"` BEFORE paint (prevents flash).

- `src/components/theme/theme-script.ts` — string of inline JS:
  - Read `localStorage.theme`.
  - If `"dark"` → add `dark` class to `<html>`.
  - If `"light"` → remove it.
  - If unset → use `window.matchMedia('(prefers-color-scheme: dark)').matches` to decide.
  - Subscribe to OS changes when no manual override (`matchMedia.addEventListener('change', ...)`).
- `src/components/theme/theme-toggle.tsx` — Qwik component:
  - Reads current resolved theme.
  - Button toggles `dark` class on `<html>`, writes `localStorage.theme`, and stops following OS on manual pick.
  - Uses `useVisibleTask$` only for reading state; toggle is a plain handler (no full re-render needed).
- Inject the inline script in `root.tsx` so SSR output already has the correct class.

### Theme state logic (summary)
| Stored value | Behavior |
|---|---|
| `undefined` | Follow OS `prefers-color-scheme`, live-update on change |
| `"light"` | Force light, ignore OS |
| `"dark"` | Force dark, ignore OS |

## Routing / Pages (QwikCity file-based)
```
src/
  root.tsx                 # html shell + theme inline script + <head>
  global.css               # tailwind directives + base styles
  entry.ssr.tsx
  components/
    theme/
      theme-script.ts
      theme-toggle.tsx
    layout/
      header.tsx           # nav + ThemeToggle
      footer.tsx
    ui/
      container.tsx        # max-width wrapper
      button.tsx           # shared CTA button
  routes/
    layout.tsx             # Header + Footer wrapper (applies to all routes)
    index.tsx              # Homepage
    who-we-are/index.tsx   # Who We Are
    contact/index.tsx      # Contact Us
```

### Pages content
- **Homepage** (`/`): hero with gradient/glassmorphism, headline, subhead, CTA buttons, a 3-feature grid, footer CTA.
- **Who We Are** (`/who-we-are`): mission statement, values cards, short story blurb.
- **Contact Us** (`/contact`): simple form (name, email, message) with client-side validation using Qwik `Form` / `useAction$` (optional backend stub) + contact details.

## Design (super-sick, simple, responsive)
- Tokens via Tailwind: define `dark:` variants everywhere.
- Backgrounds: light = `bg-slate-50 text-slate-900`; dark = `dark:bg-slate-950 dark:text-slate-100`.
- Accent: indigo/violet gradient (`from-indigo-500 to-violet-500`), glass cards (`backdrop-blur`, `border`, `bg-white/60 dark:bg-white/5`).
- Typography: system font stack or `Inter`; large bold headings, generous spacing.
- Mobile-first; `flex`/`grid` responsive with `sm:`, `md:`, `lg:` breakpoints.
- Smooth theme transition: `transition-colors duration-300` on body/elements.

## Accessibility & UX
- Respect `prefers-reduced-motion` for transitions.
- Theme toggle is a real `<button>` with `aria-label` and `aria-pressed`.
- Sufficient color contrast in both modes.
- Focus-visible rings on interactive elements.

## Build & Verify
- `npm run dev` → check each route, toggle theme, change OS theme to confirm auto-adopt.
- `npm run build` + `npm run preview` to confirm no flash-of-wrong-theme on reload.
- Verify `localStorage.theme` persistence and OS-change live update.

## Optional Enhancements (later)
- `useAction$` for contact form email sending (e.g., via Resend/SMTP).
- SEO: `DocumentHead` per route, OG tags.
- Deploy: static adapter (`@builder.io/qwik-city/adapters/static/vite`) → Netlify/Vercel/Cloudflare Pages.
