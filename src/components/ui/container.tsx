import { Slot, component$ } from '@builder.io/qwik';

interface ContainerProps {
  class?: string;
}

export const Container = component$<ContainerProps>(({ class: className }) => {
  return (
    <div class={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className ?? ''}`}>
      <Slot />
    </div>
  );
});
