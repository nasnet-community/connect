import { component$, useSignal } from "@builder.io/qwik";
import { PasswordField } from "../index";

export default component$(() => {
  const password = useSignal("");

  return (
    <div class="max-w-md">
      <PasswordField
        value={password.value}
        onValueChange$={(value) => (password.value = value)}
        label="Password"
        placeholder="Enter your password"
        helperText="Password must be at least 8 characters"
      />
    </div>
  );
});
