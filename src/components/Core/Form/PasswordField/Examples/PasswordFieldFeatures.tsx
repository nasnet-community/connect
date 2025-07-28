import { component$, useSignal } from "@builder.io/qwik";
import { PasswordField } from "../index";

export default component$(() => {
  const password1 = useSignal("");
  const password2 = useSignal("");
  const password3 = useSignal("");

  return (
    <div class="max-w-md space-y-8">
      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Password with Visibility Toggle
        </h3>
        <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
          Click the eye icon to toggle password visibility
        </p>
        <PasswordField
          value={password1.value}
          onValueChange$={(value) => (password1.value = value)}
          label="Password"
          placeholder="Enter your password"
          toggleLabel="Toggle password visibility"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">
          Password with Strength Indicator
        </h3>
        <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
          Try typing different passwords to see the strength indicator change
        </p>
        <PasswordField
          value={password2.value}
          onValueChange$={(value) => (password2.value = value)}
          label="Create Password"
          placeholder="Enter a strong password"
          showStrength={true}
          helperText="Mix uppercase, lowercase, numbers, and special characters for a stronger password"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Initially Visible Password</h3>
        <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
          Password starts as visible text instead of hidden
        </p>
        <PasswordField
          value={password3.value}
          onValueChange$={(value) => (password3.value = value)}
          label="Password"
          placeholder="This password starts as visible text"
          initiallyVisible={true}
        />
      </div>
    </div>
  );
});
