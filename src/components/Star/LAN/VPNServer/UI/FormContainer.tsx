import { Slot, component$ } from "@builder.io/qwik";

export interface FormContainerProps {
  title?: string;
  description?: string;
  bordered?: boolean;
  class?: string;
}

export const FormContainer = component$<FormContainerProps>(
  ({ title, description, bordered = false, class: className = "" }) => {
    return (
      <div
        class={`
      ${bordered ? "rounded-lg border border-border p-5 dark:border-border-dark" : ""} 
      ${className}`}
      >
        {title && (
          <div class="mb-4">
            <h3 class="text-md text-text-default font-medium dark:text-text-dark-default">
              {title}
            </h3>
            {description && (
              <p class="text-text-muted dark:text-text-dark-muted mt-1 text-sm">
                {description}
              </p>
            )}
          </div>
        )}
        <div class="space-y-4">
          <Slot />
        </div>
      </div>
    );
  },
);
