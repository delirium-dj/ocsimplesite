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
      <div class="mx-auto max-w-4xl">
        <h1 class="bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl dark:from-white dark:to-slate-400 text-center">
          Contact us
        </h1>
        <p class="mt-4 text-slate-600 dark:text-slate-300 text-center">
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
             <div class="flex justify-center">
               <Button>Send message</Button>
             </div>
          </Form>
        )}
      </div>

      <div class="mt-16 space-y-8 max-w-4xl mx-auto">
        {/* Google Maps window (no API key needed via output=embed) */}
        <div class="h-80 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 sm:h-96 lg:h-[28rem]">
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
              <a href="tel:+19178107553" class="transition-colors hover:text-indigo-400">+1 (917) 810 7553</a>,
              <a href="mailto:your.email@example.com" class="transition-colors hover:text-indigo-400">your.email@example.com</a>,
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
            lines={['Available to you', '24/7 via email']}
          />

          <div class="rounded-2xl border border-slate-200 bg-white/60 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div class="flex items-center justify-center gap-3 text-slate-700 dark:text-slate-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
              <h3 class="text-sm font-semibold uppercase tracking-wide">Follow us</h3>
            </div>
            <div class="mt-4 flex items-center justify-center gap-3">
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
              <SocialLink href="https://www.facebook.com" label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5" aria-hidden="true">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://www.tiktok.com" label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
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
      <div class="flex items-center justify-center gap-3 text-slate-700 dark:text-slate-200">
        {icon}
        <h3 class="text-sm font-semibold uppercase tracking-wide">{title}</h3>
      </div>
      <div class="mt-3 space-y-1 text-center text-sm text-slate-600 dark:text-slate-300">
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
