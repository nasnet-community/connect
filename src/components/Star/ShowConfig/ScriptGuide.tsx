import { component$ } from "@builder.io/qwik";

export const ScriptGuide = component$(() => {
  return (
    <div class="mt-4 rounded-lg bg-surface-secondary p-6 dark:bg-surface-dark-secondary">
      <h4 class="mb-2 font-semibold text-text dark:text-text-dark-default">
        {$localize`Using RouterOS Terminal`}
      </h4>
      <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
        {$localize`Follow these steps to apply the configuration in RouterOS:`}
      </p>
      <ol class="list-inside list-decimal space-y-2 text-text-secondary dark:text-text-dark-secondary">
        <li>{$localize`Access your router's terminal`}</li>
        <li>{$localize`Copy the generated script`}</li>
        <li>{$localize`Paste and execute the commands`}</li>
      </ol>
    </div>
  );
});
