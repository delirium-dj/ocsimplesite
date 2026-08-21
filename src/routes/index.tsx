import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Container } from '~/components/ui/container';
import { Button } from '~/components/ui/button';

const features = [
  {
    title: 'Fast by default',
    body: 'Built on Qwik’s resumability — zero hydration, instant interactivity, tiny bundles.',
  },
  {
    title: 'Adaptive theming',
    body: 'Automatically matches your system’s dark or light preference, with a one-tap override.',
  },
  {
    title: 'Simply elegant',
    body: 'A clean, responsive design system that stays out of your way and lets content shine.',
  },
];

export default component$(() => {
  return (
    <>
      <section class="relative overflow-hidden">
        <div class="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 blur-3xl dark:from-indigo-500/20 dark:to-violet-500/20" />
        <Container class="flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
          <span class="mb-6 inline-flex animate-fade-up items-center rounded-full border border-slate-200 bg-white/60 px-4 py-1.5 text-xs font-medium text-slate-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Qwik + Tailwind · Light &amp; Dark
          </span>
          <h1 class="animate-fade-up max-w-3xl bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl dark:from-white dark:to-slate-400">
            A super-sick, simple website that just gets your vibe.
          </h1>
          <p class="animate-fade-up mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            We build fast, beautiful experiences that adapt to you — automatically
            switching between light and dark the moment you arrive.
          </p>
          <div class="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/who-we-are">Who we are</Button>
            <Button href="/contact" variant="ghost">
              Get in touch
            </Button>
          </div>
        </Container>
      </section>

      <section class="py-16">
        <Container>
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                class="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur transition-colors hover:border-indigo-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/40"
              >
                <h3 class="text-lg font-semibold">{f.title}</h3>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: 'ocsimplesite — Fast, adaptive, simple',
  meta: [
    {
      name: 'description',
      content:
        'A super-sick, simple Qwik + Tailwind website with automatic light/dark theming.',
    },
  ],
};
