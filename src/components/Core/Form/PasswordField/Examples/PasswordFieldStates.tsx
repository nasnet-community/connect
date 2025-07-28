import { component$, useSignal } from "@builder.io/qwik";
import { PasswordField } from "../index";

export default component$(() => {
  const defaultPassword = useSignal("");
  const requiredPassword = useSignal("");
  const errorPassword = useSignal("weak123");
  const disabledPassword = useSignal("password123");

  return (
    <div class="max-w-md space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Default State</h3>
        <PasswordField
          value={defaultPassword.value}
          onValueChange$={(value) => (defaultPassword.value = value)}
          label="Password"
          placeholder="Enter your password"
          helperText="Enter a secure password"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Required State</h3>
        <PasswordField
          value={requiredPassword.value}
          onValueChange$={(value) => (requiredPassword.value = value)}
          label="Password"
          placeholder="Enter your password"
          required={true}
          helperText="This field is required"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Error State</h3>
        <PasswordField
          value={errorPassword.value}
          onValueChange$={(value) => (errorPassword.value = value)}
          label="Password"
          placeholder="Enter your password"
          error="Password is too weak"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Disabled State</h3>
        <PasswordField
          value={disabledPassword.value}
          onValueChange$={(value) => (disabledPassword.value = value)}
          label="Password"
          placeholder="Enter your password"
          disabled={true}
          helperText="This field is disabled"
        />
      </div>
    </div>
  );
});
