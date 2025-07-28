import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { routeAction$, Form, useLocation } from "@builder.io/qwik-city";
import { getSupabaseClient } from "~/utils/auth";
import { Button } from "~/components/Core/button";

// Action to handle login
export const useLoginAction = routeAction$(async (data, requestEvent) => {
  const { email, password } = data as { email: string; password: string };

  // Create Supabase client
  const supabase = getSupabaseClient();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    // Get redirect URL from query param or default to report page
    const redirectTo =
      requestEvent.url.searchParams.get("redirectTo") || "/vpn";

    // Set auth cookie if needed

    throw requestEvent.redirect(302, redirectTo);
  } catch (error) {
    if (error instanceof Response) {
      throw error; // This is our redirect
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
});

export default component$(() => {
  const loginAction = useLoginAction();
  const location = useLocation();

  const formData = useStore({
    email: "",
    password: "",
  });

  const isLoading = useSignal(false);

  const handleSubmit = $(() => {
    isLoading.value = true;
  });

  return (
    <div class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div class="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-md dark:bg-gray-800">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Login
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Please sign in to access the dashboard
          </p>
        </div>

        <Form
          action={loginAction}
          onSubmit$={handleSubmit}
          class="mt-8 space-y-6"
        >
          <input
            type="hidden"
            name="redirectTo"
            value={location.url.searchParams.get("redirectTo") || "/vpn"}
          />

          <div class="space-y-4">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autocomplete="email"
                value={formData.email}
                onInput$={(e: any) => (formData.email = e.target.value)}
                class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="text"
                required
                autocomplete="current-password"
                value={formData.password}
                onInput$={(e: any) => (formData.password = e.target.value)}
                class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>
          </div>

          {loginAction.value?.success === false && (
            <div class="rounded-md border border-red-200 bg-red-100 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900 dark:text-red-200">
              {loginAction.value.message}
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isLoading.value}
              disabled={isLoading.value}
              class="w-full"
            >
              {isLoading.value ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
});
