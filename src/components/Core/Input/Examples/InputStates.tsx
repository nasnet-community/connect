import { component$ } from "@builder.io/qwik";
import { Input } from "~/components/Core/Input";

export const InputStates = component$(() => {
  return (
    <div class="space-y-6 p-6">
      <div class="mb-4">
        <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Input Validation States
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Different validation states with proper visual feedback and accessibility features.
        </p>
      </div>

      <div class="space-y-6">
        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Default State
          </h4>
          <Input
            label="Username"
            placeholder="Enter your username"
            helperText="Choose a unique username with 3-20 characters"
          />
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Valid State
          </h4>
          <Input
            label="Email Address"
            type="email"
            value="user@example.com"
            validation="valid"
            helperText="Email address is valid and available"
          />
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Invalid State
          </h4>
          <Input
            label="Password"
            type="password"
            value="123"
            validation="invalid"
            errorMessage="Password must be at least 8 characters long"
          />
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Warning State
          </h4>
          <Input
            label="Phone Number"
            type="tel"
            value="555-1234"
            validation="warning"
            warningMessage="Phone number format may not be valid"
          />
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Disabled State
          </h4>
          <Input
            label="Account Type"
            value="Premium"
            disabled
            helperText="This field cannot be modified"
          />
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Readonly State
          </h4>
          <Input
            label="User ID"
            value="USR-12345"
            readonly
            helperText="This is your unique user identifier"
          />
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Required Field
          </h4>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            required
            helperText="This field is required for account creation"
          />
        </div>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h4 class="mb-2 font-medium text-green-900 dark:text-green-100">
            ✅ Accessibility Features
          </h4>
          <ul class="space-y-1 text-sm text-green-800 dark:text-green-200">
            <li>• Proper ARIA attributes for screen readers</li>
            <li>• Error messages linked to inputs</li>
            <li>• Visual and semantic validation states</li>
            <li>• Keyboard navigation support</li>
          </ul>
        </div>

        <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h4 class="mb-2 font-medium text-blue-900 dark:text-blue-100">
            💡 State Guidelines
          </h4>
          <ul class="space-y-1 text-sm text-blue-800 dark:text-blue-200">
            <li>• Use "valid" for confirmed correct input</li>
            <li>• Use "invalid" for validation errors</li>
            <li>• Use "warning" for potential issues</li>
            <li>• Provide clear, actionable error messages</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="mb-2 font-medium text-gray-900 dark:text-white">State Properties:</h4>
        <pre class="text-sm text-gray-600 dark:text-gray-400">
{`// Default state
<Input validation="default" helperText="..." />

// Valid state  
<Input validation="valid" helperText="..." />

// Invalid state
<Input validation="invalid" errorMessage="..." />

// Warning state
<Input validation="warning" warningMessage="..." />`}
        </pre>
      </div>
    </div>
  );
});