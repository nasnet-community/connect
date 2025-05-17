import { FormLabel } from './FormLabel';
import { FormHelperText } from './FormHelperText';
import { FormErrorMessage } from './FormErrorMessage';

export default {
  title: 'Core/Form/Utilities',
};

export const FormUtilities = {
  render: () => (
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold mb-4">Form Utility Components</h2>
        <p class="mb-6">
          Standalone utility components for building custom form fields.
        </p>
      </div>

      {/* Form Label examples */}
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 class="font-medium mb-4">Form Label</h3>
        <div class="space-y-4">
          <div>
            <FormLabel for="name">Basic Label</FormLabel>
            <input
              id="name"
              type="text"
              class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
          </div>
          
          <div>
            <FormLabel for="email" required>Required Label</FormLabel>
            <input
              id="email"
              type="email"
              required
              class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
          </div>
          
          <div>
            <FormLabel for="custom" class="text-primary-600 dark:text-primary-400">
              Custom Styled Label
            </FormLabel>
            <input
              id="custom"
              type="text"
              class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
          </div>
        </div>
      </div>

      {/* Form Helper Text examples */}
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 class="font-medium mb-4">Form Helper Text</h3>
        <div class="space-y-4">
          <div>
            <FormLabel for="password">Password</FormLabel>
            <input
              id="password"
              type="password"
              class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
            <FormHelperText>
              Password must be at least 8 characters.
            </FormHelperText>
          </div>
          
          <div>
            <FormLabel for="phone">Phone Number</FormLabel>
            <input
              id="phone"
              type="tel"
              class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
            <FormHelperText class="text-gray-400">
              Optional. Format: +1 (xxx) xxx-xxxx
            </FormHelperText>
          </div>
        </div>
      </div>

      {/* Form Error Message examples */}
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 class="font-medium mb-4">Form Error Message</h3>
        <div class="space-y-4">
          <div>
            <FormLabel for="username">Username</FormLabel>
            <input
              id="username"
              type="text"
              class="mt-1 block w-full rounded-md border border-error bg-white px-3 py-2 focus:border-error focus:outline-none focus:ring-1 focus:ring-error dark:border-error dark:bg-surface-dark dark:text-text-dark-default"
            />
            <FormErrorMessage message="Username is already taken." />
          </div>
          
          <div>
            <FormLabel for="confirm-password">Confirm Password</FormLabel>
            <input
              id="confirm-password"
              type="password"
              class="mt-1 block w-full rounded-md border border-error bg-white px-3 py-2 focus:border-error focus:outline-none focus:ring-1 focus:ring-error dark:border-error dark:bg-surface-dark dark:text-text-dark-default"
            />
            <FormErrorMessage>Passwords do not match.</FormErrorMessage>
          </div>
        </div>
      </div>

      {/* Comprehensive example with all components */}
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 class="font-medium mb-4">Complete Form Field Example</h3>
        
        <div class="mb-6">
          <FormLabel for="valid-email" required>Email Address</FormLabel>
          <input
            id="valid-email"
            type="email"
            class="mt-1 block w-full rounded-md border border-border bg-white px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
          />
          <FormHelperText>We'll never share your email with anyone else.</FormHelperText>
        </div>
        
        <div>
          <FormLabel for="invalid-email" required>Email Address</FormLabel>
          <input
            id="invalid-email"
            type="email"
            class="mt-1 block w-full rounded-md border border-error bg-white px-3 py-2 focus:border-error focus:outline-none focus:ring-1 focus:ring-error dark:border-error dark:bg-surface-dark dark:text-text-dark-default"
          />
          <FormErrorMessage message="Please enter a valid email address." />
          <FormHelperText>We'll never share your email with anyone else.</FormHelperText>
        </div>
      </div>
    </div>
  ),
}; 