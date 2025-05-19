import { component$ } from '@builder.io/qwik';
import { Container } from '../';

/**
 * ContainerWithSlots demonstrates how to use the Container component's
 * default and named slots for flexible content organization.
 */
export default component$(() => {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Default Slot for Main Content</h3>
        <Container 
          title="Form Content" 
          description="The main content is placed in the default slot."
        >
          <div class="grid gap-4">
            <div>
              <label class="block text-sm font-medium mb-1" for="username-slot">Username</label>
              <input
                type="text"
                id="username-slot"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1" for="password-slot">Password</label>
              <input
                type="password"
                id="password-slot"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                placeholder="••••••••"
              />
            </div>
          </div>
        </Container>
      </div>

      <div>
        <h3 class="text-sm font-medium mb-2">Footer Slot for Actions</h3>
        <Container 
          title="Form with Footer Actions" 
          description="Use the footer slot to add action buttons."
        >
          <div class="grid gap-4">
            <div>
              <label class="block text-sm font-medium mb-1" for="message-slot">Message</label>
              <textarea
                id="message-slot"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                rows={3}
                placeholder="Type your message here"
              ></textarea>
            </div>
          </div>
          
          <div q:slot="footer" class="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <button class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
              Cancel
            </button>
            <button class="px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Submit
            </button>
          </div>
        </Container>
      </div>

      <div>
        <h3 class="text-sm font-medium mb-2">Multi-Section Form</h3>
        <Container 
          title="Registration Form" 
          description="Combining main content and footer actions."
        >
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1" for="first-name">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="last-name">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1" for="email-slot">Email Address</label>
              <input
                type="email"
                id="email-slot"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>
          </div>
          
          <div q:slot="footer" class="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              All fields are required
            </div>
            <div class="flex gap-2">
              <button class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
                Back
              </button>
              <button class="px-3 py-1.5 bg-primary-600 text-white rounded-md">
                Continue
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}); 