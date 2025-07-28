import { component$ } from "@builder.io/qwik";
import { Form } from "../index";
import { Field } from "../../Field";
import { Button } from "../../../button";
import { routeAction$, zod$, z } from "@builder.io/qwik-city";

// This is a mock routeAction that would typically be defined in a page file
// In a real application, this would be defined and exported from a route file
export const useLoginAction = routeAction$(
  async (data, { cookie }) => {
    // Simulated authentication logic
    console.log("Processing login for:", data.email);

    // Demo purposes: only accept test@example.com with password "password123"
    if (data.email === "test@example.com" && data.password === "password123") {
      // Set a fake auth cookie
      cookie.set("auth-token", "demo-token-123", { secure: true, path: "/" });
      // Return success
      return {
        success: true,
        message: "Login successful",
        user: { email: data.email, name: "Demo User" },
      };
    }

    // Return failure for invalid credentials
    return {
      success: false,
      message: "Invalid email or password",
    };
  },
  // Form validation with Zod schema
  zod$({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rememberMe: z.boolean().optional(),
  }),
);

export default component$(() => {
  const loginAction = useLoginAction();

  return (
    <div class="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 class="mb-6 text-lg font-semibold">Login with Qwik City Action</h2>

      <Form qwikAction={loginAction} spaReset={true}>
        {loginAction.value?.success && (
          <div class="mb-4 rounded border border-green-200 bg-green-50 p-3 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
            {loginAction.value.message}
          </div>
        )}

        {loginAction.value?.success === false && (
          <div class="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
            {loginAction.value.message}
          </div>
        )}

        <Field
          id="email"
          label="Email"
          type="email"
          required
          placeholder="your.email@example.com"
          error={loginAction.value?.fieldErrors?.email?.[0]}
        />

        <Field
          id="password"
          label="Password"
          type="password"
          required
          placeholder="********"
          error={loginAction.value?.fieldErrors?.password?.[0]}
        />

        <div class="mb-4 mt-2">
          <label class="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </span>
          </label>
        </div>

        <div class="flex items-center justify-between">
          <Button
            type="submit"
            variant="primary"
            loading={loginAction.isRunning}
            class="w-full"
          >
            {loginAction.isRunning ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            For demo: use <span class="font-mono">test@example.com</span> /{" "}
            <span class="font-mono">password123</span>
          </p>
        </div>
      </Form>
    </div>
  );
});
