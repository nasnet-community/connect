import { component$, useSignal } from "@builder.io/qwik";
import GifScriptguide from "~/../public/gifs/ScriptGuide.gif";

const steps = [
  {
    title: $localize`Access Router`,
    description: $localize`Connect to your router using Winbox`,
  },
  {
    title: $localize`Backup Configuration`,
    description: $localize`Create a backup of your current settings before proceeding use '/system backup save dont-encrypt=yes name="name of the file"'`,
  },
  {
    title: $localize`Reset Configuration and Apply Script`,
    description: $localize`Use '/system reset-configuration no-defaults=yes run-after-reset="name of the file"' to clear existing settings and apply new configuration`,
  },
];

export const ScriptGuide = component$(() => {
  const isFullScreen = useSignal(false);

  return (
    <div class="mt-6 overflow-hidden rounded-xl bg-surface-secondary dark:bg-surface-dark-secondary">
      {/* Header Section */}
      <div class="border-b border-gray-200 bg-surface/50 p-6 dark:border-gray-700 dark:bg-surface-dark/50">
        <h4 class="flex items-center gap-3 text-xl font-semibold text-text dark:text-text-dark-default">
          <svg
            class="text-primary h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {$localize`RouterOS Configuration Guide`}
        </h4>
      </div>

      {/* Main Content */}
      <div class="space-y-8 p-6">
        {/* Prerequisites Section */}
        <div class="max-w-3xl">
          <div class="rounded-lg bg-surface p-6 shadow-sm dark:bg-surface-dark">
            <h5 class="text-primary mb-4 flex items-center gap-2 text-lg font-medium">
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {$localize`Prerequisites`}
            </h5>
            <ul class="space-y-4 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li class="flex items-start gap-3">
                <svg
                  class="text-primary mt-0.5 h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <div>
                  <a
                    href="https://mikrotik.com/download"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary hover:text-primary-hover group inline-flex items-center gap-1 font-medium"
                  >
                    {$localize`Download Winbox`}
                    <svg
                      class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <p class="mt-1 text-sm text-text-secondary dark:text-text-dark-secondary">
                    {$localize`Required for router management and configuration`}
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="text-primary mt-0.5 h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <div>
                  <p class="font-medium text-text dark:text-text-dark-default">
                    {$localize`Latest RouterOS Version`}
                  </p>
                  <p class="mt-1 text-sm text-text-secondary dark:text-text-dark-secondary">
                    <a
                      href="https://www.starlink4iran.com/faqs/mcg/%D8%A8%D9%87%D8%B1%D9%88%D8%B2%D8%B1%D8%B3%D8%A7%D9%86%DB%8C-%D8%B1%D9%88%D8%AA%D8%B1-%D9%85%DB%8C%DA%A9%D8%B1%D9%88%D8%AA%DB%8C%DA%A9/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-primary hover:text-primary-hover group inline-flex items-center gap-1"
                    >
                      {$localize`How to update router OS?`}
                      <svg
                        class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-Linecap="round"
                          stroke-Linejoin="round"
                          stroke-Width={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Steps Section */}
        <div class="max-w-3xl">
          <h5 class="mb-4 text-lg font-medium text-text dark:text-text-dark-default">
            {$localize`Configuration Steps`}
          </h5>
          <div class="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                class="rounded-lg bg-surface p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-surface-dark"
              >
                <div class="flex gap-4">
                  <div class="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-medium text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h6 class="font-medium text-text dark:text-text-dark-default">
                      {step.title}
                    </h6>
                    <p class="mt-1 text-sm text-text-secondary dark:text-text-dark-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Section with fullscreen button */}
        <div class="mt-8 rounded-lg bg-surface p-4 dark:bg-surface-dark">
          <h5 class="mb-4 text-lg font-medium text-text dark:text-text-dark-default">
            {$localize`Visual Guide`}
          </h5>
          <div class="relative overflow-hidden rounded-lg">
            <button
              onClick$={() => (isFullScreen.value = true)}
              class="absolute right-4 top-4 rounded-lg bg-surface/80 p-2 
                   shadow-lg backdrop-blur transition-colors hover:bg-surface 
                   dark:bg-surface-dark/80 dark:hover:bg-surface-dark"
              aria-label="View fullscreen"
            >
              <svg
                class="h-6 w-6 text-text dark:text-text-dark-default"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                />
              </svg>
            </button>
            <img
              src={GifScriptguide}
              alt="RouterOS Terminal Guide"
              width={1024}
              height={576}
              class="w-full rounded-lg shadow-lg transition-all duration-300
                   hover:shadow-xl dark:border dark:border-gray-700"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Fullscreen Modal */}
        {isFullScreen.value && (
          <div
            class="fixed inset-0 z-50 flex items-center justify-center 
                      bg-black/90 p-4 backdrop-blur-sm"
            onClick$={() => (isFullScreen.value = false)}
          >
            <div class="relative h-[95vh] w-[95vw]">
              <button
                onClick$={(e) => {
                  e.stopPropagation();
                  isFullScreen.value = false;
                }}
                class="hover:bg-surface-hover dark:hover:bg-surface-dark-hover absolute -right-2 -top-2 z-10 rounded-full 
                          bg-surface p-2 shadow-lg 
                          transition-colors dark:bg-surface-dark"
                aria-label="Close fullscreen"
              >
                <svg
                  class="h-6 w-6 text-text dark:text-text-dark-default"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={GifScriptguide}
                alt="RouterOS Terminal Guide"
                width={1024}
                height={576}
                class="h-full w-full rounded-lg object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
