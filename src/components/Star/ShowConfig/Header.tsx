import { component$ } from "@builder.io/qwik";

interface HeaderProps {
  title?: string;
}

export const Header = component$<HeaderProps>(({ title }) => {
  return (
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold text-text dark:text-text-dark-default">
        {title || $localize`Configuration Preview`}
      </h1>
      <p class="text-text-secondary dark:text-text-dark-secondary mx-auto max-w-2xl">
        {$localize`Below you'll find your generated configuration. You can use either Python or MikroTik script to apply these settings.`}
      </p>
    </div>
  );
});
