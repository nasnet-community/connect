import { component$ } from "@builder.io/qwik";
import { Container } from "../";

/**
 * ContainerWithSlots demonstrates how to use the Container component's
 * default and named slots for flexible content organization.
 */
export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-medium">Default Slot for Main Content</h3>
        <Container
          title="Form Content"
          description="The main content is placed in the default slot."
        >
          <div class="grid gap-4">
            <div>
              <label class="mb-1 block text-sm font-medium" for="username-slot">
                Username
              </label>
              <input
                type="text"
                id="username-slot"
                class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium" for="password-slot">
                Password
              </label>
              <input
                type="password"
                id="password-slot"
                class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                placeholder="••••••••"
              />
            </div>
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Footer Slot for Actions</h3>
        <Container
          title="Form with Footer Actions"
          description="Use the footer slot to add action buttons."
        >
          <div class="grid gap-4">
            <div>
              <label class="mb-1 block text-sm font-medium" for="message-slot">
                Message
              </label>
              <textarea
                id="message-slot"
                class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                rows={3}
                placeholder="Type your message here"
              ></textarea>
            </div>
          </div>

          <div
            q:slot="footer"
            class="mt-4 flex justify-end gap-2 border-t border-gray-200 pt-4 dark:border-gray-700"
          >
            <button class="rounded-md bg-gray-200 px-3 py-1.5 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Cancel
            </button>
            <button class="rounded-md bg-primary-600 px-3 py-1.5 text-white hover:bg-primary-700">
              Submit
            </button>
          </div>
        </Container>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Multi-Section Form</h3>
        <Container
          title="Registration Form"
          description="Combining main content and footer actions."
        >
          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm font-medium" for="first-name">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium" for="last-name">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
                />
              </div>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium" for="email-slot">
                Email Address
              </label>
              <input
                type="email"
                id="email-slot"
                class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600"
              />
            </div>
          </div>

          <div
            q:slot="footer"
            class="mt-4 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-4 md:flex-row dark:border-gray-700"
          >
            <div class="text-sm text-gray-500 dark:text-gray-400">
              All fields are required
            </div>
            <div class="flex gap-2">
              <button class="rounded-md bg-gray-200 px-3 py-1.5 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                Back
              </button>
              <button class="rounded-md bg-primary-600 px-3 py-1.5 text-white">
                Continue
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
});
