import { component$ } from "@builder.io/qwik";
import { ServerFormField } from "../ServerFormField";

export default component$(() => {
  return (
    <div class="space-y-4">
      <ServerFormField label="Username">
        <input
          type="text"
          class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Enter your username"
        />
      </ServerFormField>

      <ServerFormField label="Email" required={true}>
        <input
          type="email"
          class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          placeholder="Enter your email"
        />
      </ServerFormField>
    </div>
  );
});
