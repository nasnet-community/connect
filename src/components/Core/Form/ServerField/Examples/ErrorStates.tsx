import { component$ } from "@builder.io/qwik";
import { ServerFormField } from "../ServerFormField";

export default component$(() => {
  return (
    <div class="space-y-4">
      <ServerFormField
        label="Email Address"
        required={true}
        errorMessage="Please enter a valid email address"
      >
        <input
          type="email"
          class="w-full rounded-md border border-red-300 p-2 text-sm shadow-sm dark:border-red-700 dark:bg-gray-800 dark:text-white"
          placeholder="Enter your email"
          value="invalid-email"
        />
      </ServerFormField>

      <ServerFormField
        label="Password"
        errorMessage="Password must be at least 8 characters long"
      >
        <input
          type="password"
          class="w-full rounded-md border border-red-300 p-2 text-sm shadow-sm dark:border-red-700 dark:bg-gray-800 dark:text-white"
          placeholder="Enter your password"
          value="123"
        />
      </ServerFormField>

      <ServerFormField
        label="Accept terms and conditions"
        inline={true}
        errorMessage="You must accept the terms and conditions"
      >
        <input
          type="checkbox"
          class="h-4 w-4 rounded border-red-300 text-primary-600 focus:ring-primary-500 dark:border-red-700 dark:bg-gray-800"
        />
      </ServerFormField>
    </div>
  );
});
