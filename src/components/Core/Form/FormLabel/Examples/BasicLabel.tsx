import { component$ } from "@builder.io/qwik";
import { FormLabel } from "../index";

export default component$(() => {
  return (
    <div class="space-y-6">
      <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h3 class="mb-2 text-base font-semibold">Basic Form Labels</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Simple, accessible form labels properly associated with their inputs using semantic HTML.
        </p>
      </div>

      <div class="space-y-4">
        <div>
          <FormLabel for="username" size="md" fluidSize="auto">
            Username
          </FormLabel>
          <input
            id="username"
            type="text"
            autoComplete="username"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 mobile:py-2.5 tablet:py-2 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-400 dark:focus:ring-blue-800"
            placeholder="Enter username"
          />
        </div>

        <div>
          <FormLabel for="email" size="md" fluidSize="auto">
            Email Address
          </FormLabel>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 mobile:py-2.5 tablet:py-2 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-400 dark:focus:ring-blue-800"
            placeholder="you@example.com"
          />
          <small class="mt-1 block text-xs text-gray-500 mobile:text-sm tablet:text-xs dark:text-gray-400">
            We'll never share your email with anyone else
          </small>
        </div>

        <div>
          <FormLabel for="password" size="md" fluidSize="auto" required>
            Password
          </FormLabel>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 mobile:py-2.5 tablet:py-2 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-400 dark:focus:ring-blue-800"
            placeholder="Create a secure password"
            required
            aria-describedby="password-help"
          />
          <small id="password-help" class="mt-1 block text-xs text-gray-500 mobile:text-sm tablet:text-xs dark:text-gray-400">
            Must be at least 8 characters with numbers and special characters
          </small>
        </div>

        <div>
          <FormLabel for="phone" size="md" fluidSize="auto">
            Phone Number (Optional)
          </FormLabel>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 mobile:py-2.5 tablet:py-2 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-400 dark:focus:ring-blue-800"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <FormLabel for="message" size="md" fluidSize="auto">
            Message
          </FormLabel>
          <textarea
            id="message"
            rows={4}
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 mobile:py-2.5 tablet:py-2 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-400 dark:focus:ring-blue-800"
            placeholder="Tell us how we can help..."
          ></textarea>
          <small class="mt-1 block text-xs text-gray-500 mobile:text-sm tablet:text-xs dark:text-gray-400">
            Optional: Share any additional details
          </small>
        </div>
      </div>

      <div class="border-t pt-4">
        <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          Responsive Form Layout
        </h4>
        <div class="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
          <div>
            <FormLabel for="first-name" size="sm" fluidSize="auto">
              First Name
            </FormLabel>
            <input
              id="first-name"
              type="text"
              autoComplete="given-name"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 mobile:py-2 tablet:py-1.5 dark:border-gray-600 dark:bg-gray-900"
              placeholder="John"
            />
          </div>
          
          <div>
            <FormLabel for="last-name" size="sm" fluidSize="auto">
              Last Name
            </FormLabel>
            <input
              id="last-name"
              type="text"
              autoComplete="family-name"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 mobile:py-2 tablet:py-1.5 dark:border-gray-600 dark:bg-gray-900"
              placeholder="Doe"
            />
          </div>
          
          <div class="mobile:col-span-1 tablet:col-span-2 desktop:col-span-1">
            <FormLabel for="zip-code" size="sm" fluidSize="auto">
              ZIP Code
            </FormLabel>
            <input
              id="zip-code"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 mobile:py-2 tablet:py-1.5 dark:border-gray-600 dark:bg-gray-900"
              placeholder="12345"
            />
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h4 class="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">
          Accessibility Features
        </h4>
        <ul class="space-y-1 text-sm text-blue-700 dark:text-blue-300">
          <li>✓ Proper label-input association using <code>for</code> attribute</li>
          <li>✓ Required fields indicated with asterisk and ARIA attributes</li>
          <li>✓ Appropriate input types and autoComplete for better UX</li>
          <li>✓ Responsive sizing with fluid typography support</li>
          <li>✓ Enhanced focus states with keyboard navigation</li>
          <li>✓ Helper text properly associated with <code>aria-describedby</code></li>
        </ul>
      </div>
    </div>
  );
});
