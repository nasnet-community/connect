import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { PaginationSize, PaginationVariant } from "./Pagination.types";

export interface PageInputFormProps {
  inputValue: string;
  onSubmit$: QRL<(e: Event) => void>;
  onInput$: QRL<(value: string) => void>;
  size: PaginationSize;
  variant: PaginationVariant;
  goToPageLabel: string;
}

export const PageInputForm = component$<PageInputFormProps>(
  ({ inputValue, onSubmit$, onInput$, size, variant, goToPageLabel }) => {
    const sizeClasses = {
      sm: "text-xs h-7 min-w-7",
      md: "text-sm h-8 min-w-8",
      lg: "text-base h-10 min-w-10",
    };

    const baseButtonClasses =
      "inline-flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1";

    const variantClasses = {
      default: {
        button: `${baseButtonClasses} bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800`,
      },
      outlined: {
        button: `${baseButtonClasses} border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`,
      },
      minimal: {
        button: `${baseButtonClasses} text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700`,
      },
    };

    return (
      <form
        class="ml-2 flex items-center"
        preventdefault:submit
        onSubmit$={onSubmit$}
      >
        <label class="sr-only" for="go-to-page">
          {goToPageLabel}
        </label>
        <span class="mr-2 text-sm text-gray-600 dark:text-gray-400">
          {goToPageLabel}:
        </span>
        <input
          id="go-to-page"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          class={`w-14 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${sizeClasses[size]}`}
          value={inputValue}
          onInput$={(e: any) => {
            onInput$(e.target.value);
          }}
          aria-label={goToPageLabel}
        />
        <button
          type="submit"
          class={`ml-1 ${baseButtonClasses} ${sizeClasses[size]} ${variantClasses[variant].button}`}
          aria-label="Go to specified page"
        >
          Go
        </button>
      </form>
    );
  },
);
