import { component$ } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik";
import type { AppOption } from "../types";

export const App = component$<JSX.Element>(() => {
  const options: AppOption[] = [
    {
      id: 1,
      title: "Star",
      description: "test description for star",
      icon: (
        <svg
          class="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={1.5}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      link: "/router-mode",
    },
    {
      id: 2,
      title: "Luna",
      description: "test description for luna",
      icon: (
        <svg
          class="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={1.5}
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>
      ),
      link: "/access-point",
    },
    {
      id: 3,
      title: "Harmony",
      description: "test description for harmony",
      icon: (
        <svg
          class="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      link: "/bridge-mode",
    },
    {
      id: 4,
      title: "Telescope",
      description: "test description for telescope",
      icon: (
        <svg
          class="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={1.5}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-4H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      link: "/repeater-mode",
    },
    {
      id: 5,
      title: "Galaxy",
      description: "test description for galaxy",
      icon: (
        <svg
          class="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      link: "/client-mode",
    },
    {
      id: 5,
      title: "Modem",
      description: "test description for modem",
      icon: (
        <svg
          class="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      link: "/client-mode",
    },
  ];

  return (
    <div class="to-surface-secondary dark:to-surface-dark-secondary min-h-screen bg-gradient-to-br from-surface via-surface px-4 pb-12 pt-24 dark:from-surface-dark dark:via-surface-dark">
      <div class="mx-auto max-w-7xl">
        {/* Header */}
        <div class="mb-16 text-center">
          <h1 class="mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Choose Your Operation Mode
          </h1>
          <p class="text-text-secondary dark:text-text-dark-secondary mx-auto max-w-2xl">
            Select the most suitable operation mode for your network setup. Each
            mode offers unique features and capabilities.
          </p>
        </div>

        {/* Options Grid */}
        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => (
            <a
              key={option.id}
              href={option.link}
              class="group relative rounded-2xl border border-border/50 bg-white/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary-500/50 dark:border-border-dark/50 dark:bg-surface-dark/40 dark:hover:border-primary-500/50"
            >
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div class="relative">
                <div class="mb-4 w-fit rounded-xl bg-primary-500/10 p-3 transition-transform duration-300 group-hover:scale-110 dark:bg-primary-500/5">
                  <div class="text-primary-500 dark:text-primary-400">
                    {option.icon}
                  </div>
                </div>

                <h3 class="mb-2 text-xl font-semibold text-text transition-colors duration-300 group-hover:text-primary-500 dark:text-text-dark-default dark:group-hover:text-primary-400">
                  {option.title}
                </h3>

                <p class="text-text-secondary dark:text-text-dark-secondary text-sm">
                  {option.description}
                </p>

                <div class="mt-4 flex items-center text-sm font-medium text-primary-500 dark:text-primary-400">
                  <span class="mr-2">Learn More</span>
                  <svg
                    class="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
