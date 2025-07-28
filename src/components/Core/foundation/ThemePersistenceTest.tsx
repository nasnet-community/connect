import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { Theme } from "./ThemeToggle";

/**
 * ThemePersistenceTest component
 *
 * Tests and demonstrates theme persistence across page refreshes.
 * This component shows:
 * 1. Current theme from localStorage
 * 2. When the theme was last set
 * 3. Allows setting a new theme and simulating a page refresh
 */
export const ThemePersistenceTest = component$(() => {
  const activeTheme = useSignal<Theme>("system");
  const storedTimestamp = useSignal<string | null>(null);
  const isLoading = useSignal<boolean>(false);
  const refreshCount = useSignal<number>(0);

  // Get the theme from localStorage
  const getStoredTheme = $(() => {
    const theme = localStorage.getItem("theme") as Theme | null;
    const timestamp = localStorage.getItem("theme-timestamp");

    activeTheme.value = theme || "system";
    storedTimestamp.value = timestamp;
  });

  // Set the theme and save to localStorage
  const setTheme = $((theme: Theme) => {
    // Store the theme in localStorage
    localStorage.setItem("theme", theme);

    // Save timestamp for demonstration purposes
    const timestamp = new Date().toISOString();
    localStorage.setItem("theme-timestamp", timestamp);
    storedTimestamp.value = timestamp;

    // Apply the theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }

    // Update the active theme
    activeTheme.value = theme;
  });

  // Simulate a page refresh
  const simulateRefresh = $(() => {
    isLoading.value = true;

    // Hide content briefly to simulate reload
    setTimeout(() => {
      // Re-read from localStorage to simulate page refresh
      getStoredTheme();
      isLoading.value = false;
      refreshCount.value++;
    }, 1000);
  });

  // Load theme on initial render
  useVisibleTask$(() => {
    getStoredTheme();
  });

  return (
    <div class="space-y-6 rounded-lg border border-border bg-white p-6 dark:border-border-dark dark:bg-surface-dark">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">Theme Persistence Test</h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          This component tests theme persistence across page refreshes by
          storing theme preferences in localStorage.
        </p>
      </div>

      {/* Current Theme Status */}
      <div
        class={`transition-opacity duration-300 ${isLoading.value ? "opacity-0" : "opacity-100"}`}
      >
        <div class="bg-surface-secondary dark:bg-surface-dark-secondary mb-4 rounded-lg p-4">
          <h3 class="mb-2 font-medium">Current Theme Status</h3>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="rounded-md bg-white p-3 dark:bg-surface-dark">
              <p class="text-text-muted dark:text-text-dark-muted text-sm">
                Active Theme
              </p>
              <p class="text-lg font-medium">{activeTheme.value}</p>
              <p class="text-text-muted dark:text-text-dark-muted text-xs">
                Applied class:{" "}
                {document.documentElement.classList.contains("dark")
                  ? "dark"
                  : "light"}
              </p>
            </div>

            <div class="rounded-md bg-white p-3 dark:bg-surface-dark">
              <p class="text-text-muted dark:text-text-dark-muted text-sm">
                Storage Status
              </p>
              <p class="text-lg font-medium">
                {storedTimestamp.value ? "Persisted" : "Not Saved"}
              </p>
              {storedTimestamp.value && (
                <p class="text-text-muted dark:text-text-dark-muted text-xs">
                  Last saved: {new Date(storedTimestamp.value).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {refreshCount.value > 0 && (
            <div class="mt-3 rounded-md bg-primary-100 p-2 text-sm text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              Page simulated reload {refreshCount.value}{" "}
              {refreshCount.value === 1 ? "time" : "times"} and persisted theme
              was restored!
            </div>
          )}
        </div>
      </div>

      {/* Theme Controls */}
      <div class="rounded-lg border border-border bg-white p-4 dark:border-border-dark dark:bg-surface-dark">
        <h3 class="mb-3 font-medium">Theme Control Panel</h3>
        <div class="mb-4 flex flex-wrap gap-3">
          <button
            onClick$={() => setTheme("light")}
            class={`rounded-md px-4 py-2 font-medium ${
              activeTheme.value === "light"
                ? "bg-primary-500 text-white"
                : "text-text-default bg-neutral-200 dark:bg-neutral-700 dark:text-text-dark-default"
            }`}
          >
            Light Mode
          </button>

          <button
            onClick$={() => setTheme("dark")}
            class={`rounded-md px-4 py-2 font-medium ${
              activeTheme.value === "dark"
                ? "bg-primary-500 text-white"
                : "text-text-default bg-neutral-200 dark:bg-neutral-700 dark:text-text-dark-default"
            }`}
          >
            Dark Mode
          </button>

          <button
            onClick$={() => setTheme("system")}
            class={`rounded-md px-4 py-2 font-medium ${
              activeTheme.value === "system"
                ? "bg-primary-500 text-white"
                : "text-text-default bg-neutral-200 dark:bg-neutral-700 dark:text-text-dark-default"
            }`}
          >
            System
          </button>
        </div>

        <div class="mt-4 flex items-center justify-between border-t border-border pt-4 dark:border-border-dark">
          <p class="text-sm">
            After setting a theme, simulate a page refresh to test persistence:
          </p>

          <button
            onClick$={simulateRefresh}
            disabled={isLoading.value}
            class={`rounded-md px-4 py-2 font-medium ${
              isLoading.value
                ? "cursor-not-allowed bg-neutral-300 dark:bg-neutral-700"
                : "bg-secondary-500 text-white hover:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-500"
            }`}
          >
            {isLoading.value ? "Reloading..." : "Simulate Refresh"}
          </button>
        </div>
      </div>

      {/* Persistence Mechanics */}
      <div class="rounded-lg bg-neutral-50 p-4 text-sm dark:bg-neutral-800">
        <h3 class="mb-2 font-medium">How Theme Persistence Works</h3>
        <ol class="list-decimal space-y-1 pl-5">
          <li>
            Theme preference is stored in{" "}
            <code class="rounded bg-white px-1 py-0.5 dark:bg-surface-dark">
              localStorage.theme
            </code>
          </li>
          <li>On page load, the theme is read from localStorage</li>
          <li>
            If a theme is found, it's applied by adding/removing the{" "}
            <code class="rounded bg-white px-1 py-0.5 dark:bg-surface-dark">
              dark
            </code>{" "}
            class
          </li>
          <li>
            If no theme is found, system preference is used as the default
          </li>
          <li>
            The ThemeToggle component maintains this state when manual changes
            are made
          </li>
        </ol>

        <div class="mt-4 rounded-md border border-border bg-white p-3 dark:border-border-dark dark:bg-surface-dark">
          <p class="mb-1 font-medium">
            Implementation in ThemeToggle component:
          </p>
          <pre class="overflow-x-auto rounded bg-neutral-50 p-2 text-xs dark:bg-neutral-800">
            {`// Initialize theme state
useVisibleTask$(() => {
  // Check for theme in localStorage
  const storedTheme = localStorage.getItem("theme");
  
  if (storedTheme) {
    // Apply stored theme
    applyTheme(storedTheme as Theme);
  } else {
    // Default to system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", prefersDark);
  }
});`}
          </pre>
        </div>
      </div>
    </div>
  );
});

export default ThemePersistenceTest;
