import { component$, useSignal, $ } from "@builder.io/qwik";
import { Input } from "~/components/Core/Input";

export const BasicInput = component$(() => {
  const name = useSignal("");
  const email = useSignal("");
  const password = useSignal("");

  const handleNameChange$ = $((_: any, value: string) => {
    name.value = value;
  });

  const handleEmailChange$ = $((_: any, value: string) => {
    email.value = value;
  });

  const handlePasswordChange$ = $((_: any, value: string) => {
    password.value = value;
  });

  return (
    <div class="space-y-6 p-6">
      <div class="mb-4">
        <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Basic Input Usage
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Simple input components with labels, placeholders, and different input types.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-1">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={name.value}
          onChange$={handleNameChange$}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
          value={email.value}
          onChange$={handleEmailChange$}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
          value={password.value}
          onChange$={handlePasswordChange$}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
        />

        <Input
          label="Website"
          type="url"
          placeholder="https://example.com"
        />

        <Input
          label="Search"
          type="search"
          placeholder="Search for anything..."
        />

        <Input
          label="Birth Date"
          type="date"
        />

        <Input
          label="Meeting Time"
          type="time"
        />
      </div>

      <div class="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="mb-2 font-medium text-gray-900 dark:text-white">Form Values:</h4>
        <pre class="text-sm text-gray-600 dark:text-gray-400">
          {JSON.stringify(
            {
              name: name.value,
              email: email.value,
              password: password.value ? "***" : "",
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
});