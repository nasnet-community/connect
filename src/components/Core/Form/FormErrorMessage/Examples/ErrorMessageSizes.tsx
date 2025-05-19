import { component$ } from '@builder.io/qwik';
import { FormErrorMessage } from '../';

/**
 * ErrorMessageSizes demonstrates the different size variants of the FormErrorMessage component.
 */
export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Small Size</h3>
        <div class="w-full max-w-md">
          <label for="field-sm" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Field with Small Error
          </label>
          <input
            id="field-sm"
            type="text"
            aria-invalid="true"
            aria-describedby="error-sm"
            class="block w-full px-3 py-2 border border-error rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-error dark:text-white"
          />
          <FormErrorMessage id="error-sm" size="sm">
            This field is required
          </FormErrorMessage>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-medium mb-2">Medium Size (Default)</h3>
        <div class="w-full max-w-md">
          <label for="field-md" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Field with Medium Error
          </label>
          <input
            id="field-md"
            type="text"
            aria-invalid="true"
            aria-describedby="error-md"
            class="block w-full px-3 py-2 border border-error rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-error dark:text-white"
          />
          <FormErrorMessage id="error-md" size="md">
            Please enter a valid value
          </FormErrorMessage>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-medium mb-2">Large Size</h3>
        <div class="w-full max-w-md">
          <label for="field-lg" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Field with Large Error
          </label>
          <input
            id="field-lg"
            type="text"
            aria-invalid="true"
            aria-describedby="error-lg"
            class="block w-full px-3 py-2 border border-error rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-error dark:text-white"
          />
          <FormErrorMessage id="error-lg" size="lg">
            The entered value does not match the required format
          </FormErrorMessage>
        </div>
      </div>

      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h3 class="text-sm font-medium mb-2">Size Comparison</h3>
        <div class="space-y-4">
          <FormErrorMessage size="sm">Small error message</FormErrorMessage>
          <FormErrorMessage size="md">Medium error message</FormErrorMessage>
          <FormErrorMessage size="lg">Large error message</FormErrorMessage>
        </div>
      </div>
    </div>
  );
});
