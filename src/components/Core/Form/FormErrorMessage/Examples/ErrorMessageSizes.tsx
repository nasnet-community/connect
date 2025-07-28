import { component$ } from "@builder.io/qwik";
import { FormErrorMessage } from "../";

/**
 * ErrorMessageSizes demonstrates the different size variants of the FormErrorMessage component.
 */
export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">Small Size</h3>
        <div class="w-full max-w-md">
          <label
            for="field-sm"
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Field with Small Error
          </label>
          <input
            id="field-sm"
            type="text"
            aria-invalid="true"
            aria-describedby="error-sm"
            class="block w-full rounded-md border border-error px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-error dark:bg-gray-700 dark:text-white"
          />
          <FormErrorMessage id="error-sm" size="sm">
            This field is required
          </FormErrorMessage>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Medium Size (Default)</h3>
        <div class="w-full max-w-md">
          <label
            for="field-md"
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Field with Medium Error
          </label>
          <input
            id="field-md"
            type="text"
            aria-invalid="true"
            aria-describedby="error-md"
            class="block w-full rounded-md border border-error px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-error dark:bg-gray-700 dark:text-white"
          />
          <FormErrorMessage id="error-md" size="md">
            Please enter a valid value
          </FormErrorMessage>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Large Size</h3>
        <div class="w-full max-w-md">
          <label
            for="field-lg"
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Field with Large Error
          </label>
          <input
            id="field-lg"
            type="text"
            aria-invalid="true"
            aria-describedby="error-lg"
            class="block w-full rounded-md border border-error px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-error dark:bg-gray-700 dark:text-white"
          />
          <FormErrorMessage id="error-lg" size="lg">
            The entered value does not match the required format
          </FormErrorMessage>
        </div>
      </div>

      <div class="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h3 class="mb-2 text-sm font-medium">Size Comparison</h3>
        <div class="space-y-4">
          <FormErrorMessage size="sm">Small error message</FormErrorMessage>
          <FormErrorMessage size="md">Medium error message</FormErrorMessage>
          <FormErrorMessage size="lg">Large error message</FormErrorMessage>
        </div>
      </div>
    </div>
  );
});
