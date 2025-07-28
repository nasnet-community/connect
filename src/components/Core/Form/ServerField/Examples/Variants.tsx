import { component$ } from "@builder.io/qwik";
import { ServerFormField } from "../ServerFormField";

export default component$(() => {
  return (
    <div class="space-y-6">
      {/* Standard vertical layout */}
      <div>
        <h3 class="mb-2 text-sm font-medium">Standard Layout (Vertical)</h3>
        <ServerFormField label="Full Name">
          <input
            type="text"
            class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Enter your full name"
          />
        </ServerFormField>
      </div>

      {/* Inline layout */}
      <div>
        <h3 class="mb-2 text-sm font-medium">Inline Layout</h3>
        <ServerFormField label="Subscribe to newsletter?" inline={true}>
          <input
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          />
        </ServerFormField>
      </div>

      {/* Custom class */}
      <div>
        <h3 class="mb-2 text-sm font-medium">With Custom Class</h3>
        <ServerFormField
          label="Phone Number"
          class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
        >
          <input
            type="tel"
            class="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Enter your phone number"
          />
        </ServerFormField>
      </div>
    </div>
  );
});
