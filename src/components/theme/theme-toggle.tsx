import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

/**
 * Theme toggle button.
 * - Reflects the current resolved theme (from the `dark` class on <html>).
 * - On click it flips the theme, updates <html>, and persists the choice to
 *   localStorage so the inline script keeps honoring it on future visits.
 */
export const ThemeToggle = component$(() => {
  const isDark = useSignal(false);

  useVisibleTask$(() => {
    isDark.value = document.documentElement.classList.contains('dark');
  });

  return (
    <button
      type="button"
      aria-label={isDark.value ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark.value}
      onClick$={() => {
        const root = document.documentElement;
        const next = !root.classList.contains('dark');
        root.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
        isDark.value = next;
      }}
      class="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
    >
      {/* Sun icon (shown in dark mode → click for light) */}
      <svg
        class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      {/* Moon icon (shown in light mode → click for dark) */}
      <svg
        class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
});
