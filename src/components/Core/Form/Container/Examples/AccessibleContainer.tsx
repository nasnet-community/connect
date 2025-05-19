import { component$ } from '@builder.io/qwik';
import { Container } from '../';

/**
 * AccessibleContainer demonstrates best practices for making Container components
 * accessible to users with disabilities.
 */
export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Semantic Headings</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
          The Container component uses semantic heading elements for proper document structure.
        </p>
        <Container 
          title="Accessible Form Section" 
          description="This heading is rendered as an h3 for proper document outline."
        >
          <div class="grid gap-4">
            <div>
              <label class="block text-sm font-medium mb-1" for="name-a11y">
                Full Name <span aria-hidden="true" class="text-red-500">*</span>
                <span class="sr-only">(required)</span>
              </label>
              <input
                type="text"
                id="name-a11y"
                required
                aria-required="true"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>
          </div>
        </Container>
      </div>

      <div>
        <h3 class="text-sm font-medium mb-2">Organized Form Structure</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Group related form fields within containers for logical organization.
        </p>
        <Container 
          title="Account Information" 
          description="Please provide your account details below."
        >
          <form class="space-y-4">
            <fieldset>
              <legend class="text-sm font-medium mb-2">Login Credentials</legend>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="email-a11y">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email-a11y"
                    aria-describedby="email-help"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                  <p id="email-help" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    We'll never share your email with anyone else.
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="password-a11y">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password-a11y"
                    aria-describedby="password-help"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                  <p id="password-help" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Must be at least 8 characters long.
                  </p>
                </div>
              </div>
            </fieldset>
            
            <fieldset>
              <legend class="text-sm font-medium mb-2">Communication Preferences</legend>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input type="checkbox" id="newsletter-a11y" class="mr-2" />
                  <label for="newsletter-a11y" class="text-sm">Subscribe to newsletter</label>
                </div>
                <div class="flex items-center">
                  <input type="checkbox" id="marketing-a11y" class="mr-2" />
                  <label for="marketing-a11y" class="text-sm">Receive marketing emails</label>
                </div>
              </div>
            </fieldset>
          </form>
          
          <div q:slot="footer" class="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              type="submit" 
              class="px-4 py-2 bg-primary-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </div>
        </Container>
      </div>
    </div>
  );
}); 