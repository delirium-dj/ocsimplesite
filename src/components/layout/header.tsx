import { component$, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Container } from '~/components/ui/container';
import { ThemeToggle } from '~/components/theme/theme-toggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/who-we-are', label: 'Who We Are' },
  { href: '/contact', label: 'Contact' },
];

export const Header = component$(() => {
  const open = useSignal(false);

  return (
    <>
      <header class="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-50/70 backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/70">
        <Container class="flex h-16 items-center justify-between">
          <Link
            href="/"
            onClick$={() => (open.value = false)}
            class="flex items-center gap-2 text-base font-bold tracking-tight"
          >
            <span class="inline-block h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500" />
            <span>ocsimplesite</span>
          </Link>

          {/* Desktop nav (tablet/desktop) */}
          <nav class="hidden items-center gap-1 sm:gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                class="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Hamburger (mobile/tablet only) */}
          <button
            type="button"
            aria-label={open.value ? 'Close menu' : 'Open menu'}
            aria-expanded={open.value}
            aria-controls="mobile-menu"
            onClick$={() => (open.value = !open.value)}
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 backdrop-blur transition-colors hover:bg-white md:hidden dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              {open.value ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </Container>
      </header>

      {/* Full-screen overlay menu (mobile/tablet only).
          NOTE: must NOT be a child of <header> — the header's backdrop-filter would
          become its containing block and collapse the fixed overlay to the header's
          height. Keeping it a sibling lets `fixed inset-0` span the whole viewport. */}
      <div
        id="mobile-menu"
        class={{
          'fixed inset-0 z-[60] flex flex-col bg-slate-50/80 backdrop-blur-md dark:bg-slate-950/80 md:hidden':
            true,
          'pointer-events-none opacity-0': !open.value,
          'opacity-100': open.value,
        }}
        aria-hidden={!open.value}
      >
        <Container class="flex h-16 items-center justify-between">
          <Link
            href="/"
            onClick$={() => (open.value = false)}
            class="flex items-center gap-2 text-base font-bold tracking-tight"
          >
            <span class="inline-block h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500" />
            <span>ocsimplesite</span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick$={() => (open.value = false)}
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </Container>

        <nav class="flex flex-1 flex-col items-center justify-center gap-8 text-2xl font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick$={() => (open.value = false)}
              class="text-slate-700 transition-colors hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div class="flex justify-center pb-12">
          <ThemeToggle />
        </div>
      </div>
    </>
  );
});
