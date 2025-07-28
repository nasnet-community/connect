import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { PaginationSize, PaginationVariant } from "./Pagination.types";

export interface NavigationButtonProps {
  direction: "previous" | "next";
  currentPage: number;
  totalPages: number;
  size: PaginationSize;
  variant: PaginationVariant;
  onClick$: QRL<(page: number) => void>;
  label: string;
}

export const NavigationButton = component$<NavigationButtonProps>(
  ({ direction, currentPage, totalPages, size, variant, onClick$, label }) => {
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
        disabled: "opacity-50 cursor-not-allowed",
      },
      outlined: {
        button: `${baseButtonClasses} border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`,
        disabled: "opacity-50 cursor-not-allowed",
      },
      minimal: {
        button: `${baseButtonClasses} text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700`,
        disabled: "opacity-50 cursor-not-allowed",
      },
    };

    const isDisabled =
      direction === "previous" ? currentPage <= 1 : currentPage >= totalPages;

    const buttonClass = `${baseButtonClasses} ${sizeClasses[size]} ${variantClasses[variant].button} ${
      isDisabled ? variantClasses[variant].disabled : ""
    }`;

    const targetPage =
      direction === "previous" ? currentPage - 1 : currentPage + 1;

    return (
      <button
        onClick$={() => onClick$(targetPage)}
        disabled={isDisabled}
        class={buttonClass}
        aria-label={`Go to ${direction} page`}
        title={`${direction.charAt(0).toUpperCase() + direction.slice(1)} page`}
      >
        <span aria-hidden="true" class="sr-only sm:not-sr-only">
          {label}
        </span>
        {direction === "previous" ? (
          <svg
            class="h-5 w-5 sm:mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        ) : (
          <svg
            class="h-5 w-5 sm:ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </button>
    );
  },
);
