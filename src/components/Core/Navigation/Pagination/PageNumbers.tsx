import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { PaginationSize, PaginationVariant } from "./Pagination.types";
import { PaginationButton } from "./PaginationButton";

export interface PageNumbersProps {
  visiblePages: (number | string)[];
  currentPage: number;
  size: PaginationSize;
  variant: PaginationVariant;
  onPageClick$: QRL<(page: number) => void>;
}

export const PageNumbers = component$<PageNumbersProps>(
  ({ visiblePages, currentPage, size, variant, onPageClick$ }) => {
    const sizeClasses = {
      sm: "text-xs h-7 min-w-7",
      md: "text-sm h-8 min-w-8",
      lg: "text-base h-10 min-w-10",
    };

    return (
      <div class="flex items-center">
        {visiblePages.map((page, index) =>
          typeof page === "number" ? (
            <PaginationButton
              key={`page-${page}`}
              page={page}
              currentPage={currentPage}
              size={size}
              variant={variant}
              onClick$={onPageClick$}
            />
          ) : (
            <span
              key={`ellipsis-${index}`}
              class={`${sizeClasses[size]} flex items-center justify-center px-2 text-gray-500 dark:text-gray-400`}
              aria-hidden="true"
            >
              …
            </span>
          ),
        )}
      </div>
    );
  },
);
