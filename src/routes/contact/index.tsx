import { component$, Slot } from '@builder.io/qwik';
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

      <div class="mt-16 grid gap-8 lg:grid-cols-2">
        {/* Google Maps window (no API key needed via output=embed) */}
        <div class="h-72 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 lg:h-auto">
          <iframe
            title="Our location — 355 Template Street, San Francisco"
            src="https://www.google.com/maps?q=355+Template+Street+San+Francisco+California+94110&output=embed"
            loading="lazy"
            class="h-full w-full"
          />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <InfoCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
                <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
            title="Address"
            lines={['355 Template Street', 'San Francisco, California 94110']}
          />

          <InfoCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            }
            title="Contact us"
            lines={[
              <a href="tel:+19178107553" class="transition-colors hover:text-indigo-500">+1 (917) 810 7553</a>,
              <a href="mailto:your.email@example.com" class="transition-colors hover:text-indigo-500">your.email@example.com</a>,
            ]}
          />

          <InfoCard
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            }
            title="Working hours"
            lines={['Available to you', '24/7']}
          />

          <div class="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div class="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
              <h3 class="text-sm font-semibold uppercase tracking-wide">Follow us</h3>
            </div>
            <div class="mt-4 flex items-center gap-3">
              <SocialLink href="https://www.linkedin.com" label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5" aria-hidden="true">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21H9z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://x.com" label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://www.instagram.com" label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5" aria-hidden="true">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.41-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.17.42-.36 1.04-.41 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.41 2.19.21.55.47.94.88 1.35.41.41.8.67 1.35.88.42.17 1.04.36 2.19.41 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.41.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.17-.42.36-1.04.41-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.41-2.19a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.42-.17-1.04-.36-2.19-.41-1.24-.06-1.61-.07-4.76-.07zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96zm0 1.8a3.18 3.18 0 1 0 0 6.36 3.18 3.18 0 0 0 0-6.36zm5.2-2.15a1.16 1.16 0 1 1 0 2.32 1.16 1.16 0 0 1 0-2.32z" />
                </svg>
              </SocialLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
});

interface InfoCardProps {
  icon: any;
  title: string;
  lines: any[];
}

const InfoCard = component$<InfoCardProps>(({ icon, title, lines }) => {
  return (
    <div class="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div class="flex items-center gap-3 text-slate-700 dark:text-slate-200">
        {icon}
        <h3 class="text-sm font-semibold uppercase tracking-wide">{title}</h3>
      </div>
      <div class="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
});

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink = component$<SocialLinkProps>(({ href, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-indigo-300 hover:text-indigo-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-indigo-400/40 dark:hover:text-indigo-400"
    >
      <Slot />
    </a>
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
