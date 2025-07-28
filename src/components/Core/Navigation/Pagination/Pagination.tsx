import { component$ } from "@builder.io/qwik";
import type { PaginationProps } from "./Pagination.types";
import { usePaginationState } from "./hooks/usePaginationState";
import { useVisiblePages } from "./hooks/useVisiblePages";
import { useItemRange } from "./hooks/useItemRange";
import { NavigationButton } from "./NavigationButton";
import { PageNumbers } from "./PageNumbers";
import { PageInputForm } from "./PageInputForm";

export const Pagination = component$<PaginationProps>((props) => {
  // Set default values for props
  const {
    totalItems,
    itemsPerPage = 10,
    maxVisiblePages = 5,
    showItemRange = true,
    size = "md",
    variant = "default",
    showPageInput = false,
    ariaLabel = "Pagination",
    labels = {
      previous: "Previous",
      next: "Next",
      goToPage: "Go to page",
      itemRange: "Showing {start}-{end} of {total} items",
    },
    class: className = "",
    id,
  } = props;

  // Use hooks for state management
  const {
    currentPageValue,
    pageInputValue,
    totalPages,
    goToPage$,
    handlePageInputSubmit$,
    handleInput$,
  } = usePaginationState({
    currentPage: props.currentPage,
    totalItems,
    totalPages: props.totalPages,
    itemsPerPage,
    onPageChange$: props.onPageChange$,
  });

  // Get visible pages and item range text
  const visiblePages = useVisiblePages({
    currentPageValue,
    totalPages,
    maxVisiblePages,
  });

  const itemRangeText = useItemRange({
    currentPageValue,
    totalItems,
    itemsPerPage,
    showItemRange,
    itemRangeTemplate:
      labels.itemRange || "Showing {start}-{end} of {total} items",
  });

  return (
    <nav
      aria-label={ariaLabel}
      class={`flex flex-wrap items-center justify-between ${className}`}
      id={id}
    >
      {/* Item range text */}
      {showItemRange && (
        <div class="mb-2 text-sm text-gray-600 sm:mb-0 dark:text-gray-400">
          {itemRangeText.value}
        </div>
      )}

      <div class="flex flex-wrap items-center">
        {/* Previous button */}
        <NavigationButton
          direction="previous"
          currentPage={currentPageValue.value}
          totalPages={totalPages}
          size={size}
          variant={variant}
          onClick$={goToPage$}
          label={labels.previous || "Previous"}
        />

        {/* Page buttons */}
        <PageNumbers
          visiblePages={visiblePages.value}
          currentPage={currentPageValue.value}
          size={size}
          variant={variant}
          onPageClick$={goToPage$}
        />

        {/* Next button */}
        <NavigationButton
          direction="next"
          currentPage={currentPageValue.value}
          totalPages={totalPages}
          size={size}
          variant={variant}
          onClick$={goToPage$}
          label={labels.next || "Next"}
        />

        {/* Page jump input */}
        {showPageInput && (
          <PageInputForm
            inputValue={pageInputValue.value}
            onSubmit$={handlePageInputSubmit$}
            onInput$={handleInput$}
            size={size}
            variant={variant}
            goToPageLabel={labels.goToPage || "Go to page"}
          />
        )}
      </div>
    </nav>
  );
});
