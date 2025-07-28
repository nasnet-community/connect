import { component$ } from "@builder.io/qwik";
import { FormLabel } from "../index";

export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Default State</h3>
        <FormLabel for="default-field">Default Label</FormLabel>
        <input
          id="default-field"
          type="text"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
          placeholder="Default input field"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Required State</h3>
        <FormLabel for="required-field" required>
          Required Label
        </FormLabel>
        <input
          id="required-field"
          type="text"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
          placeholder="Required input field"
          required
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Disabled State</h3>
        <FormLabel for="disabled-field" disabled>
          Disabled Label
        </FormLabel>
        <input
          id="disabled-field"
          type="text"
          class="mt-1 block w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
          placeholder="Disabled input field"
          disabled
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Error State</h3>
        <FormLabel for="error-field" error>
          Error Label
        </FormLabel>
        <input
          id="error-field"
          type="text"
          class="mt-1 block w-full rounded-md border border-red-500 px-3 py-2 dark:border-red-500"
          placeholder="Error input field"
          aria-invalid="true"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Success State</h3>
        <FormLabel for="success-field" success>
          Success Label
        </FormLabel>
        <input
          id="success-field"
          type="text"
          class="mt-1 block w-full rounded-md border border-green-500 px-3 py-2 dark:border-green-500"
          placeholder="Success input field"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Warning State</h3>
        <FormLabel for="warning-field" warning>
          Warning Label
        </FormLabel>
        <input
          id="warning-field"
          type="text"
          class="mt-1 block w-full rounded-md border border-yellow-500 px-3 py-2 dark:border-yellow-500"
          placeholder="Warning input field"
        />
      </div>
    </div>
  );
});
