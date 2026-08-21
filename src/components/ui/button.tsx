import { Slot, component$ } from '@builder.io/qwik';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'ghost';
  class?: string;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950';

const variants = {
  primary:
    'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5',
  ghost:
    'border border-slate-200 bg-white/60 text-slate-700 backdrop-blur hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10',
} as const;

export const Button = component$<ButtonProps>(({ href, variant = 'primary', class: className }) => {
  const cls = `${base} ${variants[variant]} ${className ?? ''}`;
  return href ? (
    <a href={href} class={cls}>
      <Slot />
    </a>
  ) : (
    <button type="button" class={cls}>
      <Slot />
    </button>
  );
});
