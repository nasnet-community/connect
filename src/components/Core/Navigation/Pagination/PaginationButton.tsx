import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { PaginationSize, PaginationVariant } from "./Pagination.types";

export interface PaginationButtonProps {
  page: number;
  currentPage: number;
  size: PaginationSize;
  variant: PaginationVariant;
  onClick$: QRL<(page: number) => void>;
}

export const PaginationButton = component$<PaginationButtonProps>(
  ({ page, currentPage, size, variant, onClick$ }) => {
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
        currentPage:
          "bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500",
      },
      outlined: {
        button: `${baseButtonClasses} border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`,
        currentPage:
          "border-primary-500 bg-white text-primary-600 dark:border-primary-500 dark:bg-gray-800 dark:text-primary-400",
      },
      minimal: {
        button: `${baseButtonClasses} text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700`,
        currentPage:
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      },
    };

    const isCurrentPage = page === currentPage;
    const buttonClass = `${baseButtonClasses} ${sizeClasses[size]} mx-0.5 ${
      isCurrentPage
        ? variantClasses[variant].currentPage
        : variantClasses[variant].button
    }`;

    return (
      <button
        onClick$={() => onClick$(page)}
        class={buttonClass}
        aria-current={isCurrentPage ? "page" : undefined}
        aria-label={`Page ${page}`}
        title={`Page ${page}`}
      >
        {page}
      </button>
    );
  },
);
