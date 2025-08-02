import { component$ } from "@builder.io/qwik";

export const PythonGuide = component$(() => {
  return (
    <div class="bg-surface-secondary dark:bg-surface-dark-secondary mt-4 rounded-lg p-6">
      <h4 class="mb-2 font-semibold text-text dark:text-text-dark-default">
        {$localize`Using Python Library`}
      </h4>
      <p class="text-text-secondary dark:text-text-dark-secondary mb-4">
        {$localize`Follow these steps to apply the configuration using Python:`}
      </p>
      <ol class="text-text-secondary dark:text-text-dark-secondary list-inside list-decimal space-y-2">
        <li>
          {$localize`Install the required library:`}{" "}
          <code class="bg-surface-tertiary rounded p-1 dark:bg-surface-dark">
            pip install routeros-api
          </code>
        </li>
        <li>{$localize`Copy the generated Python code`}</li>
        <li>{$localize`Run the script with your router's credentials`}</li>
      </ol>
    </div>
  );
});
