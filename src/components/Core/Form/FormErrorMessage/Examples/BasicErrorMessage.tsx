import { component$ } from "@builder.io/qwik";
import { FormErrorMessage } from "../";

/**
 * BasicErrorMessage demonstrates the standard usage of FormErrorMessage component
 * for displaying form validation errors.
 */
export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Default Error Message</h3>
        <div class="w-full max-w-md">
          <label
            for="username-basic"
            class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            id="username-basic"
            type="text"
            aria-invalid="true"
            aria-describedby="username-error"
            class="block w-full rounded-md border border-error px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-error dark:bg-gray-700 dark:text-white"
          />
          <FormErrorMessage id="username-error">
            Username must be at least 3 characters long
          </FormErrorMessage>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">
          Multiple Error Messages Example
        </h3>
        <div class="w-full max-w-md">
          <div class="mb-4">
            <label
              for="email-basic"
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email-basic"
              type="email"
              aria-invalid="true"
              aria-describedby="email-error"
              class="block w-full rounded-md border border-error px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-error dark:bg-gray-700 dark:text-white"
            />
            <FormErrorMessage id="email-error">
              Please enter a valid email address
            </FormErrorMessage>
          </div>

          <div>
            <label
              for="password-basic"
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password-basic"
              type="password"
              aria-invalid="true"
              aria-describedby="password-error"
              class="block w-full rounded-md border border-error px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-error dark:bg-gray-700 dark:text-white"
            />
            <FormErrorMessage id="password-error">
              Password must contain at least 8 characters, including uppercase,
              lowercase, and a number
            </FormErrorMessage>
          </div>
        </div>
      </div>
    </div>
  );
});
