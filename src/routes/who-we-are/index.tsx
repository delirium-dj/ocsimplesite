import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Container } from '~/components/ui/container';
import { Button } from '~/components/ui/button';

const values = [
  { title: 'Simplicity', body: 'We strip away the noise so the essentials stand out.' },
  { title: 'Performance', body: 'Speed is a feature. We treat every millisecond as sacred.' },
  { title: 'Empathy', body: 'We design for real people and respect their preferences.' },
  { title: 'Craft', body: 'Details matter. Polish is not optional, it’s the point.' },
];

export default component$(() => {
  return (
    <Container class="py-20">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl dark:from-white dark:to-slate-400">
          Who we are
        </h1>
        <p class="mt-6 text-lg text-slate-600 dark:text-slate-300">
          We’re a small team obsessed with building web experiences that feel
          effortless. No bloat, no friction — just clean, fast, adaptive products
          that respect how you like to browse.
        </p>
      </div>

      <div class="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
        {values.map((v) => (
          <div
            key={v.title}
            class="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur transition-colors hover:border-indigo-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/40"
          >
            <h3 class="text-lg font-semibold">{v.title}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{v.body}</p>
          </div>
        ))}
      </div>

      <div class="mx-auto mt-14 max-w-2xl rounded-3xl border border-slate-200 bg-white/60 p-8 text-center backdrop-blur dark:border-white/10 dark:bg-white/5">
        <p class="text-lg text-slate-700 dark:text-slate-200">
          Like what you see? Let’s build something together.
        </p>
        <div class="mt-6 flex justify-center">
          <Button href="/contact">Contact us</Button>
        </div>
      </div>
    </Container>
  );
});

export const head: DocumentHead = {
  title: 'Who We Are — ocsimplesite',
  meta: [
    {
      name: 'description',
      content: 'Meet the team behind ocsimplesite and the values we build by.',
    },
  ],
};
