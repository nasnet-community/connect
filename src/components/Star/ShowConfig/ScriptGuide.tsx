import { component$, useSignal } from "@builder.io/qwik";
import GifScriptguide from "../../../../public/gifs/ScriptGuide.gif";

export const ScriptGuide = component$(() => {
  const isFullScreen = useSignal(false);

  return (
    <div class="bg-surface-secondary dark:bg-surface-dark-secondary mt-6 overflow-hidden rounded-xl">
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
        {/* Demo Section with fullscreen button */}
        <div class="rounded-lg bg-surface p-4 dark:bg-surface-dark">
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
