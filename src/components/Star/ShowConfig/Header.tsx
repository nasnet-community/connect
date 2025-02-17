import { component$ } from "@builder.io/qwik";

export const Header = component$(() => {
  return (
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold text-text dark:text-text-dark-default">
        {$localize`Configuration Preview`}
      </h1>
      <p class="mx-auto max-w-2xl text-text-secondary dark:text-text-dark-secondary">
        {$localize`Below you'll find your generated configuration. You can use either Python or MikroTik script to apply these settings.`}
      </p>
    </div>
  );
});
