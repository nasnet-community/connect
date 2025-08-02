import { component$, Slot, useSignal, $, type QRL } from "@builder.io/qwik";
import { LinkBoxHeader } from "./LinkBoxHeader";
import type { WANLinkConfig } from "../../../../../StarContext/WANType";

export interface LinkBoxProps {
  link: WANLinkConfig;
  onRemove$?: QRL<() => void>;
  canRemove: boolean;
  isExpanded?: boolean;
  errors?: string[];
}

export const LinkBox = component$<LinkBoxProps>(
  ({ link, onRemove$, canRemove, isExpanded = true, errors = [] }) => {
    const expanded = useSignal(isExpanded);

    const toggleExpanded$ = $(() => {
      expanded.value = !expanded.value;
    });

    return (
      <div
        class={`
        rounded-lg border transition-all duration-200
        ${
          errors.length > 0
            ? "border-error-500 dark:border-error-400"
            : "border-border dark:border-border-dark"
        }
        bg-surface shadow-sm dark:bg-surface-dark
      `}
        data-link-id={link.id}
      >
        <LinkBoxHeader
          link={link}
          onRemove$={onRemove$}
          canRemove={canRemove}
          isExpanded={expanded.value}
          onToggleExpanded$={toggleExpanded$}
          hasErrors={errors.length > 0}
        />

        {expanded.value && (
          <div class="border-t border-border p-4 dark:border-border-dark">
            <Slot />

            {errors.length > 0 && (
              <div class="mt-4 space-y-1">
                {errors.map((error, index) => (
                  <div
                    key={index}
                    class="flex items-center gap-1 text-sm text-error-500 dark:text-error-400"
                  >
                    <svg
                      class="h-4 w-4"
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
                    {error}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
