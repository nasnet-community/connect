import type { QRL, Signal } from "@builder.io/qwik";

/**
 * The size variants for the Pagination component.
 */
export type PaginationSize = "sm" | "md" | "lg";

/**
 * The appearance variants for the Pagination component.
 */
export type PaginationVariant = "default" | "outlined" | "minimal";

/**
 * Props for the Pagination component.
 */
export interface PaginationProps {
  /**
   * The current page number (1-based).
   * Can be a Signal (for reactive updates) or a number.
   */
  currentPage: Signal<number> | number;

  /**
   * Total number of items across all pages.
   */
  totalItems: number;

  /**
   * Total number of pages.
   * Alternative to totalItems for direct page count specification.
   */
  totalPages?: number;

  /**
   * Number of items to show per page.
   * @default 10
   */
  itemsPerPage?: number;

  /**
   * Maximum number of page buttons to show.
   * If there are more pages than this number, ellipsis will be shown.
   * @default 5
   */
  maxVisiblePages?: number;

  /**
   * Show item range text (e.g., "Showing 1-10 of 50 items").
   * @default true
   */
  showItemRange?: boolean;

  /**
   * Custom handler for page changes.
   * If provided, the component becomes controlled and you must update the currentPage value yourself.
   * Using $ suffix for proper serialization in Qwik.
   */
  onPageChange$?: QRL<(page: number) => void>;

  /**
   * Custom handler for page size changes.
   * Called when the user changes the items per page using the page size selector.
   * Using $ suffix for proper serialization in Qwik.
   */
  onPageSizeChange$?: QRL<(size: number) => void>;

  /**
   * The size of the pagination component.
   * @default "md"
   */
  size?: PaginationSize;

  /**
   * The visual style variant of the pagination component.
   * @default "default"
   */
  variant?: PaginationVariant;

  /**
   * Whether to include a page input that allows directly jumping to a specific page.
   * @default false
   */
  showPageInput?: boolean;

  /**
   * Whether to show individual page number buttons.
   * @default true
   */
  showPageNumbers?: boolean;

  /**
   * Whether to show item count information.
   * @default true
   */
  showItemCount?: boolean;

  /**
   * Whether to show page size selector dropdown.
   * @default false
   */
  showPageSizeSelector?: boolean;

  /**
   * Available page size options for the page size selector.
   */
  pageSizeOptions?: number[];

  /**
   * Number of items per page (alias for itemsPerPage for compatibility).
   */
  pageSize?: number;

  /**
   * Whether to use compact display mode.
   * @default false
   */
  compact?: boolean;

  /**
   * Whether the pagination is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom label for the pagination navigation.
   * @default "Pagination"
   */
  ariaLabel?: string;

  /**
   * Custom labels for previous and next buttons.
   */
  labels?: {
    /**
     * Label for the previous page button.
     * @default "Previous"
     */
    previous?: string;

    /**
     * Label for the next page button.
     * @default "Next"
     */
    next?: string;

    /**
     * Label for the page input (if showPageInput is true).
     * @default "Go to page"
     */
    goToPage?: string;

    /**
     * Text template for showing item range.
     * Use placeholders {start}, {end}, and {total}.
     * @default "Showing {start}-{end} of {total} items"
     */
    itemRange?: string;
  };

  /**
   * Additional CSS classes to apply to the pagination container.
   */
  class?: string;

  /**
   * ID for the pagination container.
   */
  id?: string;
}
