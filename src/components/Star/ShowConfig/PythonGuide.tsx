import { component$ } from "@builder.io/qwik";

export const PythonGuide = component$(() => {
  return (
    <div class="mt-4 rounded-lg bg-surface-secondary p-6 dark:bg-surface-dark-secondary">
      <h4 class="mb-2 font-semibold text-text dark:text-text-dark-default">
        {$localize`Using Python Library`}
      </h4>
      <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
        {$localize`Follow these steps to apply the configuration using Python:`}
      </p>
      <ol class="list-inside list-decimal space-y-2 text-text-secondary dark:text-text-dark-secondary">
        <li>
          {$localize`Install the required library:`}{" "}
          <code class="rounded bg-surface-tertiary p-1 dark:bg-surface-dark">
            pip install routeros-api
          </code>
        </li>
        <li>{$localize`Copy the generated Python code`}</li>
        <li>{$localize`Run the script with your router's credentials`}</li>
      </ol>
    </div>
  );
});
