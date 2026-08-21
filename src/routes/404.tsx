import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Container } from '~/components/ui/container';
import { Button } from '~/components/ui/button';

export default component$(() => {
  return (
    <Container class="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p class="animate-fade-up text-sm font-semibold uppercase tracking-widest text-indigo-500">
        Oops
      </p>
      <h1 class="animate-fade-up mt-3 bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl dark:from-white dark:to-slate-400">
        404
      </h1>
      <p class="animate-fade-up mt-4 max-w-md text-lg text-slate-600 dark:text-slate-300">
        We couldn’t find the page you were looking for. It may have moved, or never
        existed.
      </p>
      <div class="animate-fade-up mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </Container>
  );
});

export const head: DocumentHead = {
  title: '404 — Page not found — ocsimplesite',
  meta: [
    {
      name: 'description',
      content: 'The page you were looking for could not be found.',
    },
  ],
};
