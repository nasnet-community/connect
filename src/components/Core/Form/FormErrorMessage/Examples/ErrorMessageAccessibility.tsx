import { component$ } from '@builder.io/qwik';
import { FormErrorMessage } from '../';

/**
 * ErrorMessageAccessibility demonstrates proper accessibility implementations
 * for the FormErrorMessage component.
 */
export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Proper Field Association</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Using <code>id</code> and <code>aria-describedby</code> to associate error messages with form controls.
        </p>
        
        <div class="w-full max-w-md">
          <label for="username-a11y" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Username <span class="text-error">*</span>
          </label>
          <input
            id="username-a11y"
            type="text"
            aria-invalid="true"
            aria-describedby="username-error-a11y username-hint"
            aria-required="true"
            class="block w-full px-3 py-2 border border-error rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-error dark:text-white"
          />
          <p id="username-hint" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Choose a username that is unique and memorable.
          </p>
          <FormErrorMessage id="username-error-a11y">
            Username must be at least 3 characters long
          </FormErrorMessage>
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Using Proper ARIA Role</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          The FormErrorMessage component uses <code>role="alert"</code> by default to ensure errors are announced to screen readers.
        </p>
        
        <div class="w-full max-w-md">
          <label for="email-a11y" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            id="email-a11y"
            type="email"
            aria-invalid="true"
            aria-describedby="email-error-a11y"
            class="block w-full px-3 py-2 border border-error rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-error dark:text-white"
          />
          <FormErrorMessage 
            id="email-error-a11y"
            role="alert"
            icon={<span class="i-lucide-alert-triangle w-4 h-4" />}
          >
            Please enter a valid email address
          </FormErrorMessage>
          <p class="mt-3 text-xs text-gray-600 dark:text-gray-400 italic">
            Note: Screen readers will announce this error automatically due to the "alert" role
          </p>
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Supporting Multiple Form Fields</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          For errors affecting multiple fields, use comprehensive messaging with proper associations.
        </p>
        
        <form class="w-full max-w-md border border-gray-200 p-4 rounded-lg dark:border-gray-700">
          <h4 class="font-medium mb-3">Password Creation</h4>
          
          <div class="space-y-4">
            <div>
              <label for="password-a11y" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password-a11y"
                type="password"
                aria-invalid="true"
                aria-describedby="passwords-error-a11y"
                class="block w-full px-3 py-2 border border-error rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-error dark:text-white"
              />
            </div>
            
            <div>
              <label for="confirm-a11y" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-a11y"
                type="password"
                aria-invalid="true"
                aria-describedby="passwords-error-a11y"
                class="block w-full px-3 py-2 border border-error rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-error dark:text-white"
              />
            </div>
            
            <FormErrorMessage 
              id="passwords-error-a11y"
              icon={<span class="i-lucide-alert-octagon w-4 h-4" />}
            >
              Passwords do not match
            </FormErrorMessage>
          </div>
        </form>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Visual + Non-Visual Cues</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Using both color and icons to ensure errors are perceivable by all users, including those with color vision deficiencies.
        </p>
        
        <div class="w-full max-w-md">
          <label for="phone-a11y" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            id="phone-a11y"
            type="tel"
            aria-invalid="true"
            aria-describedby="phone-error-a11y"
            class="block w-full px-3 py-2 border border-error rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-error dark:text-white"
          />
          <FormErrorMessage 
            id="phone-error-a11y"
            icon={<span class="i-lucide-x-circle w-4 h-4" />}
          >
            Please enter a valid phone number (e.g., 555-123-4567)
          </FormErrorMessage>
          <p class="mt-3 text-xs text-gray-600 dark:text-gray-400 italic">
            Note: The error uses both red color and an icon to ensure all users can perceive it
          </p>
        </div>
      </div>
    </div>
  );
});
