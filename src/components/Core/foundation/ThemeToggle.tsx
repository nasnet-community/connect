import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export type Theme = "light" | "dark" | "system";

/**
 * ThemeToggle component for switching between light, dark, and system themes.
 * Uses local storage to persist user preference.
 */
export const ThemeToggle = component$<{
  /**
   * Optional CSS class for styling the container
   */
  class?: string;

  /**
   * Optional CSS class for styling the button
   */
  buttonClass?: string;
}>(({ class: className, buttonClass }) => {
  const theme = useSignal<Theme>("system");

  // Define applyTheme function with $ wrapper for serialization
  const applyTheme = $((newTheme: Theme) => {
    // Add transition class to enable smooth animation
    document.documentElement.classList.add("transition-theme");

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // newTheme === "system"
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }

    localStorage.setItem("theme", newTheme);

    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove("transition-theme");
    }, 500); // Slightly longer than our transition duration (300ms)
  });

  // Initialize theme state on client
  useVisibleTask$(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    if (storedTheme) {
      theme.value = storedTheme;
      applyTheme(storedTheme);
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      theme.value = "system";
      document.documentElement.classList.toggle("dark", prefersDark);
    }

    // Add listener for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (theme.value === "system") {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  });

  // Toggle through the themes: system -> light -> dark -> system
  const toggleTheme = $(() => {
    const nextTheme: Record<Theme, Theme> = {
      system: "light",
      light: "dark",
      dark: "system",
    };

    theme.value = nextTheme[theme.value];
    applyTheme(theme.value);
  });

  return (
    <div class={className}>
      <button
        onClick$={toggleTheme}
        class={
          buttonClass ||
          "rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:hover:bg-gray-800"
        }
        aria-label="Toggle theme"
        title={`Current theme: ${theme.value}. Click to change.`}
      >
        {/* Show different icon based on current theme */}
        {theme.value === "light" && (
          <svg
            class="h-5 w-5 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
        {theme.value === "dark" && (
          <svg
            class="h-5 w-5 text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
        {theme.value === "system" && (
          <svg
            class="h-5 w-5 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    </div>
  );
});

export default ThemeToggle;
