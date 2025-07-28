import { component$ } from "@builder.io/qwik";
import { FormErrorMessage } from "../";

/**
 * ErrorMessageWithIcons demonstrates how to use icons with the FormErrorMessage component
 * to enhance visual communication.
 */
export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Basic X Icon</h3>
        <div class="w-full max-w-md">
          <label
            for="field-x"
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            id="field-x"
            type="text"
            aria-invalid="true"
            aria-describedby="error-x"
            class="block w-full rounded-md border border-error px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-error dark:bg-gray-700 dark:text-white"
          />
          <FormErrorMessage
            id="error-x"
            icon={<span class="i-lucide-x h-4 w-4" />}
          >
            This field is required
          </FormErrorMessage>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Circle X Icon</h3>
        <div class="w-full max-w-md">
          <label
            for="field-circle"
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            id="field-circle"
            type="email"
            aria-invalid="true"
            aria-describedby="error-circle"
            class="block w-full rounded-md border border-error px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-error dark:bg-gray-700 dark:text-white"
          />
          <FormErrorMessage
            id="error-circle"
            icon={<span class="i-lucide-x-circle h-4 w-4" />}
          >
            Please enter a valid email address
          </FormErrorMessage>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Alert Triangle Icon</h3>
        <div class="w-full max-w-md">
          <label
            for="field-triangle"
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="field-triangle"
            type="password"
            aria-invalid="true"
            aria-describedby="error-triangle"
            class="block w-full rounded-md border border-error px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-error dark:bg-gray-700 dark:text-white"
          />
          <FormErrorMessage
            id="error-triangle"
            icon={<span class="i-lucide-alert-triangle h-4 w-4" />}
          >
            Password must be at least 8 characters long
          </FormErrorMessage>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Alert Octagon Icon</h3>
        <div class="w-full max-w-md">
          <label
            for="field-octagon"
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Credit Card
          </label>
          <input
            id="field-octagon"
            type="text"
            aria-invalid="true"
            aria-describedby="error-octagon"
            class="block w-full rounded-md border border-error px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-error dark:bg-gray-700 dark:text-white"
          />
          <FormErrorMessage
            id="error-octagon"
            icon={<span class="i-lucide-alert-octagon h-4 w-4" />}
          >
            Invalid credit card number
          </FormErrorMessage>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Icon Sizes</h3>
        <div class="space-y-4">
          <FormErrorMessage
            size="sm"
            icon={<span class="i-lucide-alert-triangle h-3 w-3" />}
          >
            Small error with small icon
          </FormErrorMessage>

          <FormErrorMessage
            size="md"
            icon={<span class="i-lucide-alert-triangle h-4 w-4" />}
          >
            Medium error with medium icon
          </FormErrorMessage>

          <FormErrorMessage
            size="lg"
            icon={<span class="i-lucide-alert-triangle h-5 w-5" />}
          >
            Large error with large icon
          </FormErrorMessage>
        </div>
      </div>
    </div>
  );
});
