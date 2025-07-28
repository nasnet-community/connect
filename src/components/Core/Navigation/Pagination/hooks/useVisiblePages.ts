import { useComputed$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

export interface UseVisiblePagesProps {
  currentPageValue: Signal<number>;
  totalPages: number;
  maxVisiblePages: number;
}

export function useVisiblePages({
  currentPageValue,
  totalPages,
  maxVisiblePages,
}: UseVisiblePagesProps) {
  return useComputed$(() => {
    const current = currentPageValue.value;
    const pages: (number | string)[] = [];

    // If few enough pages, just show all of them
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    // Calculate range of middle pages to show
    let startPage = Math.max(2, current - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

    // Adjust if we're near the end
    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3));
    }

    // Add ellipsis if needed at start
    if (startPage > 2) {
      pages.push("...");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed at end
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page if not already included
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  });
}
