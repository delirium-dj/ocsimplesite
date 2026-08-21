import { component$ } from '@builder.io/qwik';
import { routeAction$, Form, type DocumentHead } from '@builder.io/qwik-city';
import { Container } from '~/components/ui/container';
import { Button } from '~/components/ui/button';

export const useContactAction = routeAction$(async (data) => {
  const name = String(data.name ?? '').trim();
  const email = String(data.email ?? '').trim();
  const message = String(data.message ?? '').trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'Enter a valid email.';
  if (message.length < 10) errors.message = 'Message must be at least 10 characters.';

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // In a real app you'd send an email / persist here.
  return { success: true, name };
});

export default component$(() => {
  const action = useContactAction();

  return (
    <Container class="py-20">
      <div class="mx-auto max-w-xl">
        <h1 class="bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl dark:from-white dark:to-slate-400">
          Contact us
        </h1>
        <p class="mt-4 text-slate-600 dark:text-slate-300">
          Have a question or a project in mind? Drop us a line and we’ll get back
          to you.
        </p>

        {action.value?.success ? (
          <div class="mt-10 rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200">
            Thanks{action.value.name ? `, ${action.value.name}` : ''}! Your message
            has been received.
          </div>
        ) : (
          <Form
            action={action}
            class="mt-10 space-y-5 rounded-3xl border border-slate-200 bg-white/60 p-8 backdrop-blur dark:border-white/10 dark:bg-white/5"
          >
            <Field
              label="Name"
              name="name"
              type="text"
              placeholder="Ada Lovelace"
              error={action.value?.errors?.name}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              error={action.value?.errors?.email}
            />
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell us what you need…"
                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:border-white/10 dark:bg-slate-900/40 dark:text-white dark:placeholder:text-slate-500"
              />
              {action.value?.errors?.message && (
                <p class="mt-1.5 text-sm text-rose-500">{action.value.errors.message}</p>
              )}
            </div>
            <Button>Send message</Button>
          </Form>
        )}
      </div>
    </Container>
  );
});

interface FieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  error?: string;
}

const Field = component$<FieldProps>(({ label, name, type, placeholder, error }) => {
  return (
    <div>
      <label
        for={name}
        class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:border-white/10 dark:bg-slate-900/40 dark:text-white dark:placeholder:text-slate-500"
      />
      {error && <p class="mt-1.5 text-sm text-rose-500">{error}</p>}
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Contact Us — ocsimplesite',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with the ocsimplesite team.',
    },
  ],
};
