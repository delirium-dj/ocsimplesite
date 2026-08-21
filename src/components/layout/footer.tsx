import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Container } from '~/components/ui/container';

export const Footer = component$(() => {
  return (
    <footer class="mt-24 border-t border-slate-200/70 py-10 dark:border-white/10">
      <Container class="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row dark:text-slate-400">
        <p>© {new Date().getFullYear()} ocsimplesite. All rights reserved.</p>
        <nav class="flex items-center gap-5">
          <Link href="/" class="transition-colors hover:text-slate-900 dark:hover:text-white">
            Home
          </Link>
          <Link href="/who-we-are" class="transition-colors hover:text-slate-900 dark:hover:text-white">
            Who We Are
          </Link>
          <Link href="/contact" class="transition-colors hover:text-slate-900 dark:hover:text-white">
            Contact
          </Link>
        </nav>
      </Container>
    </footer>
  );
});
