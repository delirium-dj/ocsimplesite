import { component$, Slot } from '@builder.io/qwik';
import { Header } from '~/components/layout/header';
import { Footer } from '~/components/layout/footer';

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col">
      <Header />
      <main class="flex-1">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
