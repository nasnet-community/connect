import { component$ } from "@builder.io/qwik";
import { FormLabel } from "../index";

export default component$(() => {
  return (
    <div class="max-w-md space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Standard Label with For Attribute
        </h3>
        <div class="mb-1 text-sm text-gray-600 dark:text-gray-300">
          Proper association between label and input using the 'for' attribute
        </div>
        <FormLabel for="access-email" id="email-label">
          Email Address
        </FormLabel>
        <input
          id="access-email"
          type="email"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
          placeholder="Enter your email"
          aria-labelledby="email-label"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Screen Reader Only Label</h3>
        <div class="mb-1 text-sm text-gray-600 dark:text-gray-300">
          Label is visually hidden but accessible to screen readers
        </div>
        <FormLabel for="sr-search" srOnly>
          Search
        </FormLabel>
        <div class="relative">
          <input
            id="sr-search"
            type="search"
            class="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 dark:border-gray-700"
            placeholder="Search for anything..."
          />
          <span
            class="i-lucide-search absolute left-3 top-2.5 h-4 w-4 text-gray-500"
            aria-hidden="true"
          ></span>
        </div>
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          The label "Search" is present for screen readers but not visible on
          screen
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Required Field with ARIA Attributes
        </h3>
        <FormLabel for="req-name" required id="name-label">
          Full Name
        </FormLabel>
        <input
          id="req-name"
          type="text"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
          placeholder="Enter your full name"
          aria-required="true"
          aria-labelledby="name-label"
          required
        />
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          The required state is communicated visually with an asterisk and to
          screen readers with ARIA attributes
        </div>
      </div>

      <div class="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="mb-2 text-sm font-medium">Accessibility Features:</h4>
        <ul class="list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-300">
          <li>
            Uses <code>for</code> attribute to associate labels with input
            fields
          </li>
          <li>
            Provides <code>id</code> attributes on labels for{" "}
            <code>aria-labelledby</code> references
          </li>
          <li>
            Supports <code>srOnly</code> for visually hidden but screen reader
            accessible labels
          </li>
          <li>
            Includes <code>aria-required</code> and <code>aria-disabled</code>{" "}
            states
          </li>
          <li>Shows required state visually with an asterisk</li>
        </ul>
      </div>
    </div>
  );
});
