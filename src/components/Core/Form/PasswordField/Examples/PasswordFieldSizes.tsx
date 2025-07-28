import { component$, useSignal } from "@builder.io/qwik";
import { PasswordField } from "../index";

export default component$(() => {
  const smallPassword = useSignal("");
  const mediumPassword = useSignal("");
  const largePassword = useSignal("");

  return (
    <div class="max-w-md space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Small Size</h3>
        <PasswordField
          value={smallPassword.value}
          onValueChange$={(value) => (smallPassword.value = value)}
          label="Password"
          placeholder="Small password field"
          size="sm"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Medium Size (Default)</h3>
        <PasswordField
          value={mediumPassword.value}
          onValueChange$={(value) => (mediumPassword.value = value)}
          label="Password"
          placeholder="Medium password field"
          size="md"
        />
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Large Size</h3>
        <PasswordField
          value={largePassword.value}
          onValueChange$={(value) => (largePassword.value = value)}
          label="Password"
          placeholder="Large password field"
          size="lg"
        />
      </div>
    </div>
  );
});
