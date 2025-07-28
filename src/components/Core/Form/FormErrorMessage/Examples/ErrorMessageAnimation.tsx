import { component$, useSignal, $ } from "@builder.io/qwik";
import { FormErrorMessage } from "../";

/**
 * ErrorMessageAnimation demonstrates the animation feature of FormErrorMessage
 * to draw attention to validation errors.
 */
export default component$(() => {
  const showFirstError = useSignal(false);
  const showSecondError = useSignal(false);
  const formSubmitted = useSignal(false);

  const toggleFirstError = $(() => {
    showFirstError.value = !showFirstError.value;
  });

  const toggleSecondError = $(() => {
    showSecondError.value = !showSecondError.value;
  });

  const handleFormSubmit = $(() => {
    formSubmitted.value = true;
  });

  const resetForm = $(() => {
    showFirstError.value = false;
    showSecondError.value = false;
    formSubmitted.value = false;
  });

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Toggle Error Messages</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Click the buttons below to toggle error messages with animation.
        </p>

        <div class="mb-6 flex space-x-3">
          <button
            onClick$={toggleFirstError}
            class="rounded bg-primary-600 px-3 py-2 text-white hover:bg-primary-700"
          >
            {showFirstError.value ? "Hide" : "Show"} Username Error
          </button>

          <button
            onClick$={toggleSecondError}
            class="rounded bg-primary-600 px-3 py-2 text-white hover:bg-primary-700"
          >
            {showSecondError.value ? "Hide" : "Show"} Email Error
          </button>
        </div>

        <div class="w-full max-w-md space-y-4">
          <div>
            <label
              for="username-anim"
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              id="username-anim"
              type="text"
              aria-invalid={showFirstError.value}
              aria-describedby={
                showFirstError.value ? "username-error" : undefined
              }
              class={`block w-full border px-3 py-2 ${showFirstError.value ? "border-error" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
            />
            {showFirstError.value && (
              <FormErrorMessage
                id="username-error"
                animate
                icon={<span class="i-lucide-alert-triangle h-4 w-4" />}
              >
                Username must be at least 3 characters long
              </FormErrorMessage>
            )}
          </div>

          <div>
            <label
              for="email-anim"
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email-anim"
              type="email"
              aria-invalid={showSecondError.value}
              aria-describedby={
                showSecondError.value ? "email-error" : undefined
              }
              class={`block w-full border px-3 py-2 ${showSecondError.value ? "border-error" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
            />
            {showSecondError.value && (
              <FormErrorMessage
                id="email-error"
                animate
                icon={<span class="i-lucide-x-circle h-4 w-4" />}
              >
                Please enter a valid email address
              </FormErrorMessage>
            )}
          </div>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-4 dark:border-gray-700">
        <h3 class="mb-2 text-sm font-medium">Form Submission Example</h3>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Click the submit button to simulate form submission with validation
          errors.
        </p>

        <div class="w-full max-w-md">
          <form
            preventdefault:submit
            onSubmit$={handleFormSubmit}
            class="space-y-4"
          >
            <div>
              <label
                for="password-anim"
                class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password-anim"
                type="password"
                aria-invalid={formSubmitted.value}
                aria-describedby={
                  formSubmitted.value ? "password-error" : undefined
                }
                class={`block w-full border px-3 py-2 ${formSubmitted.value ? "border-error" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
              />
              {formSubmitted.value && (
                <FormErrorMessage
                  id="password-error"
                  animate
                  icon={<span class="i-lucide-shield-alert h-4 w-4" />}
                >
                  Password must include at least 8 characters, including
                  uppercase, lowercase, and a number
                </FormErrorMessage>
              )}
            </div>

            <div>
              <label
                for="confirm-anim"
                class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirm-anim"
                type="password"
                aria-invalid={formSubmitted.value}
                aria-describedby={
                  formSubmitted.value ? "confirm-error" : undefined
                }
                class={`block w-full border px-3 py-2 ${formSubmitted.value ? "border-error" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:text-white`}
              />
              {formSubmitted.value && (
                <FormErrorMessage
                  id="confirm-error"
                  animate
                  icon={<span class="i-lucide-alert-octagon h-4 w-4" />}
                >
                  Passwords do not match
                </FormErrorMessage>
              )}
            </div>

            <div class="flex space-x-3">
              <button
                type="submit"
                class="rounded bg-primary-600 px-3 py-2 text-white hover:bg-primary-700"
              >
                Submit Form
              </button>

              {formSubmitted.value && (
                <button
                  type="button"
                  onClick$={resetForm}
                  class="rounded bg-gray-200 px-3 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  Reset Form
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
