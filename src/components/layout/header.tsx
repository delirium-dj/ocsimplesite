import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Container } from '~/components/ui/container';
import { ThemeToggle } from '~/components/theme/theme-toggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/who-we-are', label: 'Who We Are' },
  { href: '/contact', label: 'Contact' },
];

export const Header = component$(() => {
  return (
    <header class="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-50/70 backdrop-blur-lg dark:border-white/10 dark:bg-slate-950/70">
      <Container class="flex h-16 items-center justify-between">
        <Link
          href="/"
          class="flex items-center gap-2 text-base font-bold tracking-tight"
        >
          <span class="inline-block h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500" />
          <span>ocsimplesite</span>
        </Link>

        <nav class="flex items-center gap-1 sm:gap-2">
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
      </Container>
    </header>
  );
});
