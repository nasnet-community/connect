import { useSignal, useComputed$, useTask$, $ } from "@builder.io/qwik";
import type { Signal, QRL } from "@builder.io/qwik";

export interface UsePaginationStateProps {
  currentPage: Signal<number> | number;
  totalItems?: number;
  totalPages?: number;
  itemsPerPage: number;
  onPageChange$?: QRL<(page: number) => void>;
}

export function usePaginationState({
  currentPage,
  totalItems,
  totalPages: totalPagesFromProps,
  itemsPerPage,
  onPageChange$,
}: UsePaginationStateProps) {
  // Handle both Signal<number> and number types for currentPage
  const isControlled = typeof currentPage !== "number";
  const internalPage = useSignal(1);
  const pageInputValue = useSignal("");

  // Calculate total pages - use provided totalPages or calculate from totalItems
  const totalPages =
    totalPagesFromProps ||
    (totalItems ? Math.max(1, Math.ceil(totalItems / itemsPerPage)) : 1);

  // Keep track of current page correctly whether controlled or uncontrolled
  const currentPageValue = useComputed$(() => {
    if (isControlled) {
      return (currentPage as Signal<number>).value;
    } else {
      return internalPage.value;
    }
  });

  // Sync page input value with current page
  useTask$(({ track }) => {
    const current = track(() => currentPageValue.value);
    pageInputValue.value = current.toString();
  });

  // Handle changing to a specific page
  const goToPage$ = $((pageNumber: number) => {
    // Ensure page is within valid range
    const validPage = Math.max(1, Math.min(pageNumber, totalPages));

    // If controlled, use handler; otherwise update internal state
    if (onPageChange$) {
      onPageChange$(validPage);
    } else if (isControlled) {
      (currentPage as Signal<number>).value = validPage;
    } else {
      internalPage.value = validPage;
    }

    // Reset page input
    pageInputValue.value = "";
  });

  // Handle page input submission
  const handlePageInputSubmit$ = $((e: Event) => {
    e.preventDefault();
    const page = parseInt(pageInputValue.value, 10);
    if (!isNaN(page)) {
      goToPage$(page);
    }
  });

  // Handle page input value changes
  const handleInput$ = $((value: string) => {
    pageInputValue.value = value;
  });

  return {
    currentPageValue,
    pageInputValue,
    totalPages,
    goToPage$,
    handlePageInputSubmit$,
    handleInput$,
  };
}
