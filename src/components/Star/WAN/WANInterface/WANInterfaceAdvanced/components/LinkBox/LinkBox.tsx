import { component$, Slot, useSignal, $, type QRL } from "@builder.io/qwik";
import { LinkBoxHeader } from "./LinkBoxHeader";
import type { WANLinkConfig } from "../../types";

export interface LinkBoxProps {
  link: WANLinkConfig;
  onRemove$?: QRL<() => void>;
  canRemove: boolean;
  isExpanded?: boolean;
  isCompact?: boolean;
  errors?: string[];
}

export const LinkBox = component$<LinkBoxProps>(
  ({ link, onRemove$, canRemove, isExpanded = true, isCompact = false, errors = [] }) => {
    const expanded = useSignal(isExpanded);

    const toggleExpanded$ = $(() => {
      expanded.value = !expanded.value;
    });

    return (
      <div
        class={`
        group relative overflow-hidden transition-all duration-300
        ${isCompact ? "rounded-xl hover:scale-[1.02]" : "rounded-2xl hover:scale-[1.01]"}
        ${
          errors.length > 0
            ? "bg-gradient-to-br from-error-50/80 to-error-100/80 dark:from-error-900/20 dark:to-error-800/20"
            : "bg-white/80 dark:bg-gray-800/80"
        }
        backdrop-blur-xl border
        ${
          errors.length > 0
            ? "border-error-300/50 dark:border-error-500/50 shadow-error-200/20"
            : "border-white/50 dark:border-gray-700/50"
        }
        ${isCompact ? "shadow-lg hover:shadow-xl" : "shadow-xl hover:shadow-2xl"}
      `}
        data-link-id={link.id}
      >
        {/* Animated gradient overlay */}
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Glow effect on hover */}
        <div class="absolute -inset-px bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none"></div>
        
        <div class="relative z-10">
          <LinkBoxHeader
            link={link}
            onRemove$={onRemove$}
            canRemove={canRemove}
            isExpanded={expanded.value}
            isCompact={isCompact}
            onToggleExpanded$={toggleExpanded$}
            hasErrors={errors.length > 0}
          />

          <div
            class={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${expanded.value ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div class={`border-t border-gray-200/50 dark:border-gray-700/50 ${isCompact ? "p-4" : "p-6"}`}>
              <Slot />

              {errors.length > 0 && (
                <div class="mt-6 rounded-xl bg-error-50/50 dark:bg-error-900/20 backdrop-blur-sm border border-error-200/50 dark:border-error-700/50 p-4">
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0">
                      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-error-100 dark:bg-error-900/50">
                        <svg
                          class="h-5 w-5 text-error-600 dark:text-error-400 animate-pulse"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1 space-y-2">
                      <h4 class="text-sm font-medium text-error-900 dark:text-error-300">
                        {errors.length === 1 ? $localize`Validation Error` : $localize`Validation Errors`}
                      </h4>
                      {errors.map((error, index) => (
                        <div
                          key={index}
                          class="flex items-center gap-2 text-sm text-error-700 dark:text-error-400"
                        >
                          <span class="h-1 w-1 rounded-full bg-error-400 dark:bg-error-500"></span>
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
