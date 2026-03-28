import { component$, useSignal } from "@builder.io/qwik";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";
import { showConfigSubtlePanelClass } from "./theme";

const gifScriptGuide = `${import.meta.env.BASE_URL}gifs/ScriptGuide.gif`;

export const ScriptGuide = component$(() => {
  const isFullScreen = useSignal(false);
  const locale = useMessageLocale();

  return (
    <div class={showConfigSubtlePanelClass}>
      <div class="border-b border-gray-200 bg-surface/50 px-4 py-4 dark:border-gray-700 dark:bg-surface-dark/50 md:px-5 md:py-5">
        <h4 class="flex items-center gap-3 text-lg font-semibold text-text dark:text-text-dark-default md:text-xl">
          <svg
            class="text-primary h-5 w-5 md:h-6 md:w-6"
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
          {semanticMessages.show_config_guide_title({}, { locale })}
        </h4>
      </div>

      <div class="space-y-4 p-4 md:p-5">
        <div class="rounded-lg bg-surface p-3 dark:bg-surface-dark md:p-4">
          <h5 class="mb-3 text-base font-medium text-text dark:text-text-dark-default md:text-lg">
            {semanticMessages.show_config_guide_visual_title({}, { locale })}
          </h5>
          <div class="relative overflow-hidden rounded-lg">
            <button
              onClick$={() => (isFullScreen.value = true)}
              class="absolute right-3 top-3 rounded-lg bg-surface/80 p-2 shadow-lg backdrop-blur transition-colors hover:bg-surface dark:bg-surface-dark/80 dark:hover:bg-surface-dark"
              aria-label={semanticMessages.show_config_guide_open_fullscreen(
                {},
                { locale },
              )}
            >
              <svg
                class="h-5 w-5 text-text dark:text-text-dark-default"
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
              src={gifScriptGuide}
              alt={semanticMessages.show_config_guide_image_alt({}, { locale })}
              width={1024}
              height={576}
              class="w-full rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl dark:border dark:border-gray-700"
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
                aria-label={semanticMessages.show_config_guide_close_fullscreen(
                  {},
                  { locale },
                )}
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
                src={gifScriptGuide}
                alt={semanticMessages.show_config_guide_image_alt(
                  {},
                  { locale },
                )}
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
