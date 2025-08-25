import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { ThemeToggle, type Theme } from "./ThemeToggle";

interface ThemeTestCardProps {
  title: string;
  description: string;
  theme: Theme;
}

/**
 * ThemeTestCard component
 *
 * Used to demonstrate a specific theme mode with examples of UI elements
 */
const ThemeTestCard = component$<ThemeTestCardProps>(
  ({ title, description, theme }) => {
    const currentTheme = useSignal<string>("unknown");

    // Check if the dark mode is currently applied
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      // Re-run when theme changes
      track(() => theme);

      // Determine the actual applied theme
      if (document.documentElement.classList.contains("dark")) {
        currentTheme.value = "dark";
      } else {
        currentTheme.value = "light";
      }
    });

    return (
      <div class="overflow-hidden rounded-lg border border-border dark:border-border-dark">
        <div class="border-b border-border bg-neutral-50 px-4 py-3 dark:border-border-dark dark:bg-neutral-800">
          <h3 class="flex items-center justify-between text-lg font-semibold">
            {title}
            <span class="rounded-md bg-primary-100 px-2 py-1 text-sm text-primary-700 dark:bg-primary-900 dark:text-primary-300">
              Applied: {currentTheme.value}
            </span>
          </h3>
          <p class="text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>

        <div class="bg-white p-4 dark:bg-surface-dark">
          <h4 class="text-md mb-4 font-medium">UI Elements</h4>

          {/* Examples of different UI elements in current theme */}
          <div class="space-y-4">
            {/* Text variations */}
            <div class="space-y-2">
              <p class="text-text-default dark:text-text-dark-default">
                Regular text in current theme
              </p>
              <p class="text-text-secondary dark:text-text-dark-secondary">
                Secondary text in current theme
              </p>
              <p class="text-text-muted dark:text-text-dark-muted">
                Muted text in current theme
              </p>
            </div>

            {/* Surface variations */}
            <div class="grid grid-cols-3 gap-2">
              <div class="rounded bg-white p-2 text-center text-sm dark:bg-surface-dark">
                Default
              </div>
              <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded p-2 text-center text-sm">
                Secondary
              </div>
              <div class="dark:bg-surface-dark-tertiary bg-surface-tertiary rounded p-2 text-center text-sm">
                Tertiary
              </div>
            </div>

            {/* Buttons */}
            <div class="flex flex-wrap gap-2">
              <button class="rounded-md bg-primary-500 px-3 py-1.5 text-white">
                Primary
              </button>
              <button class="rounded-md bg-secondary-500 px-3 py-1.5 text-white">
                Secondary
              </button>
              <button class="rounded-md border border-border px-3 py-1.5 dark:border-border-dark">
                Outline
              </button>
            </div>

            {/* Form Elements */}
            <div class="space-y-2">
              <input
                type="text"
                placeholder="Input field"
                class="w-full rounded-md border border-border bg-white px-3 py-2 dark:border-border-dark dark:bg-surface-dark"
              />
              <div class="flex items-center space-x-2">
                <input type="checkbox" id={`checkbox-${theme}`} />
                <label for={`checkbox-${theme}`}>Checkbox</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

/**
 * ThemeTest component
 *
 * Demonstrates and tests different theme modes:
 * - Light mode
 * - Dark mode
 * - System preference detection
 */
export const ThemeTest = component$(() => {
  const activeTheme = useSignal<Theme>("system");
  const systemPreference = useSignal<"light" | "dark">("light");

  // Function to set the theme
  const setTheme = $((theme: Theme) => {
    activeTheme.value = theme;

    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      // theme === "system"
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  });

  // Check system preference
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    systemPreference.value = mediaQuery.matches ? "dark" : "light";

    const handleChange = (e: MediaQueryListEvent) => {
      systemPreference.value = e.matches ? "dark" : "light";

      if (activeTheme.value === "system") {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  });

  return (
    <div class="mb-12 space-y-8">
      <section>
        <h2 class="mb-4 text-2xl font-semibold">Theme Test Cases</h2>
        <p class="mb-6">
          This component demonstrates the three theme modes (light, dark,
          system) and shows how UI elements adapt to each theme. The actual
          applied theme is shown in the top-right corner of each card.
        </p>

        <div class="mb-6 flex items-center justify-between rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <div>
            <h3 class="mb-1 font-medium">Theme Controls</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Current system preference:{" "}
              <span class="font-medium">{systemPreference.value}</span>
            </p>
          </div>

          <div class="flex items-center space-x-4">
            <button
              onClick$={() => setTheme("light")}
              class={`rounded-md px-3 py-1.5 ${activeTheme.value === "light" ? "bg-primary-500 text-white" : "bg-neutral-200 dark:bg-neutral-700"}`}
            >
              Light Mode
            </button>
            <button
              onClick$={() => setTheme("dark")}
              class={`rounded-md px-3 py-1.5 ${activeTheme.value === "dark" ? "bg-primary-500 text-white" : "bg-neutral-200 dark:bg-neutral-700"}`}
            >
              Dark Mode
            </button>
            <button
              onClick$={() => setTheme("system")}
              class={`rounded-md px-3 py-1.5 ${activeTheme.value === "system" ? "bg-primary-500 text-white" : "bg-neutral-200 dark:bg-neutral-700"}`}
            >
              System
            </button>

            <div class="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ThemeTestCard
          title="Light Mode Test"
          description="Tests UI in forced light mode regardless of system preference"
          theme="light"
        />

        <ThemeTestCard
          title="Dark Mode Test"
          description="Tests UI in forced dark mode regardless of system preference"
          theme="dark"
        />

        <ThemeTestCard
          title="System Preference Test"
          description="Tests UI using the system preference (OS setting)"
          theme="system"
        />
      </div>

      <section class="mt-8 rounded-lg border border-border p-4 dark:border-border-dark">
        <h3 class="mb-2 text-lg font-semibold">Theme Implementation Notes</h3>
        <ul class="list-disc space-y-1 pl-5">
          <li>
            The theme implementation uses Tailwind's{" "}
            <code class="rounded bg-neutral-100 px-1 py-0.5 text-sm dark:bg-neutral-800">
              darkMode: 'class'
            </code>{" "}
            strategy
          </li>
          <li>
            Dark mode is applied by adding the{" "}
            <code class="rounded bg-neutral-100 px-1 py-0.5 text-sm dark:bg-neutral-800">
              dark
            </code>{" "}
            class to the{" "}
            <code class="rounded bg-neutral-100 px-1 py-0.5 text-sm dark:bg-neutral-800">
              html
            </code>{" "}
            element
          </li>
          <li>
            Theme preference is stored in localStorage for persistence across
            page refreshes
          </li>
          <li>
            The implementation respects user's system preference when set to
            "system"
          </li>
          <li>
            All semantic color tokens have dark mode variants using the{" "}
            <code class="rounded bg-neutral-100 px-1 py-0.5 text-sm dark:bg-neutral-800">
              dark:
            </code>{" "}
            prefix
          </li>
        </ul>
      </section>
    </div>
  );
});

export default ThemeTest;
