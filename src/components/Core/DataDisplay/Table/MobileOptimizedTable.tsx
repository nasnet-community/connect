import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { TableProps, TableColumn } from "./Table.types";
import { useTable } from "./hooks/useTable";
import { TableHead } from "./components/TableHead";
import { TableBody } from "./components/TableBody";
import { TableCell } from "./components/TableCell";
import { TableRow } from "./components/TableRow";
import { MobileTableCard } from "./components/MobileTableCard";

/**
 * Helper function to get the value from a row using a column definition
 */
function getCellValueHelper<T>(
  row: T,
  column: TableColumn<T>,
  index: number,
): unknown {
  if (column.accessor) {
    return column.accessor(row, index);
  }

  if (column.field) {
    return getValueByPath(row, column.field);
  }

  return undefined;
}

/**
 * Helper function to get a nested property value using a path string
 */
function getValueByPath(obj: any, path: string): any {
  return path.split(".").reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
}

/**
 * Mobile-optimized Table component
 */
export const MobileOptimizedTable = component$<TableProps>((props) => {
  const {
    columns,
    caption,
    loadingContent,
    emptyContent,
    variant = "default",
    size = "md",
    dense = false,
    hoverable = false,
    id,
    headerClass,
    bodyClass,
    rowClass,
    stickyHeader = false,
    horizontalScroll = false,
    height,
    class: className = "",
    tableClass = "",
    getRowAriaLabel,
    pagination,
    mobileLayout = "card",
    mobileSafeArea = true,
  } = props;

  const isMobile = useSignal(false);

  // Check if we're on mobile
  useVisibleTask$(() => {
    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });

  const { sortedData, currentSort, isLoading, handleSort$, getRowId } =
    useTable(props);

  // Container classes with mobile optimizations
  const containerClasses = [
    horizontalScroll ? "overflow-x-auto" : "",
    mobileSafeArea ? "pb-safe-bottom" : "",
    "animate-fade-in",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Table classes
  const tableClasses = [
    "w-full table-auto",
    variant === "bordered" || variant === "bordered-striped"
      ? "border-collapse border border-gray-200 dark:border-gray-700"
      : "border-collapse",
    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base",
    tableClass,
  ]
    .filter(Boolean)
    .join(" ");

  // Container style
  const containerStyle: Record<string, string> = {};
  if (height) {
    containerStyle.height = height;
    containerStyle.overflowY = "auto";
  }

  // Mobile card layout
  if (mobileLayout === "card" && isMobile.value) {
    return (
      <div class={containerClasses}>
        {caption && (
          <h3 class="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            {caption}
          </h3>
        )}

        {isLoading.value && (
          <div class="flex items-center justify-center py-8">
            {loadingContent || (
              <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-500" />
            )}
          </div>
        )}

        {!isLoading.value && sortedData.length === 0 && (
          <div class="rounded-lg bg-white p-4 text-center text-gray-500 shadow-mobile-card dark:bg-gray-800 dark:text-gray-400">
            {emptyContent || "No data available"}
          </div>
        )}

        {!isLoading.value &&
          sortedData.map((row, rowIndex) => (
            <MobileTableCard
              key={String(getRowId(row, rowIndex))}
              row={row}
              rowIndex={rowIndex}
              columns={columns}
              getCellValue={getCellValueHelper}
              onClick$={
                props.onRowClick$
                  ? () =>
                      props.onRowClick$!(row, rowIndex, new MouseEvent("click"))
                  : undefined
              }
            />
          ))}

        {pagination && (
          <div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
            {pagination}
          </div>
        )}
      </div>
    );
  }

  // Desktop table layout
  return (
    <div class={containerClasses} style={containerStyle}>
      <table class={tableClasses} id={id}>
        {caption && (
          <caption class="mb-2 caption-top text-sm text-gray-600 dark:text-gray-400">
            {caption}
          </caption>
        )}

        <TableHead sticky={stickyHeader} class={headerClass}>
          <tr>
            {columns.map((column) => {
              const isSorted = currentSort.value.column === column.id;
              const sortDirection = isSorted
                ? currentSort.value.direction
                : "none";

              // Determine header cell classes
              const headerCellClasses = [
                "font-medium",
                variant === "bordered" || variant === "bordered-striped"
                  ? "border border-gray-200 dark:border-gray-700"
                  : "",
                size === "sm"
                  ? "px-2 py-1"
                  : size === "lg"
                    ? "px-6 py-4"
                    : "px-4 py-3",
                dense ? "py-1" : "",
                column.align === "center"
                  ? "text-center"
                  : column.align === "right"
                    ? "text-right"
                    : "text-left",
                column.sortable ? "cursor-pointer select-none" : "",
                column.width ? "" : "whitespace-nowrap",
                column.headerClass || "",
              ]
                .filter(Boolean)
                .join(" ");

              // Set column styling
              const colStyle: Record<string, string> = {};
              if (column.width) colStyle.width = column.width;
              if (column.minWidth) colStyle.minWidth = column.minWidth;
              if (column.maxWidth) colStyle.maxWidth = column.maxWidth;

              // Responsive visibility classes
              const hideClasses = [];
              if (column.hideOn?.sm) hideClasses.push("hidden sm:table-cell");
              else if (column.hideOn?.md)
                hideClasses.push("hidden md:table-cell");
              else if (column.hideOn?.lg)
                hideClasses.push("hidden lg:table-cell");

              const visibilityClass = hideClasses.join(" ");

              return (
                <TableCell
                  key={column.id}
                  isHeader
                  align={column.align}
                  class={`${headerCellClasses} ${visibilityClass}`}
                  style={colStyle}
                  scope="col"
                  onClick$={
                    column.sortable ? () => handleSort$(column.id) : undefined
                  }
                >
                  <div class="flex items-center gap-1">
                    {column.renderHeader ? (
                      column.renderHeader(column)
                    ) : (
                      <span>{column.header}</span>
                    )}

                    {column.sortable && <SortIcon direction={sortDirection} />}

                    {column.description && (
                      <InfoIcon description={column.description} />
                    )}
                  </div>
                </TableCell>
              );
            })}
          </tr>
        </TableHead>

        <TableBody class={bodyClass}>
          {isLoading.value && (
            <LoadingIndicator
              colSpan={columns.length}
              content={loadingContent}
            />
          )}

          {!isLoading.value && sortedData.length === 0 && (
            <EmptyState colSpan={columns.length} content={emptyContent} />
          )}

          {!isLoading.value &&
            sortedData.map((row, rowIndex) => {
              const id = getRowId(row, rowIndex);
              const isClickable = !!props.onRowClick$;

              // Define row classes
              const customRowClass =
                typeof rowClass === "function" ? rowClass(row, rowIndex) : "";
              const rowClasses = getRowClasses(
                variant,
                rowIndex,
                hoverable,
                isClickable,
                customRowClass,
              );

              // Get aria label for the row
              const ariaLabel = getRowAriaLabel
                ? String(getRowAriaLabel(row, rowIndex))
                : undefined;

              return (
                <TableRow
                  key={String(id)}
                  class={rowClasses}
                  clickable={isClickable}
                  ariaLabel={ariaLabel}
                >
                  {columns.map((column) =>
                    renderTableCell(
                      column,
                      row,
                      rowIndex,
                      variant,
                      size,
                      dense,
                    ),
                  )}
                </TableRow>
              );
            })}
        </TableBody>

        {pagination && (
          <tfoot>
            <tr>
              <td colSpan={columns.length} class="px-4 py-3">
                {pagination}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
});

// Sort icon component
const SortIcon = component$<{ direction: string }>((props) => {
  const { direction } = props;

  if (direction === "none") {
    return (
      <span class="ms-1">
        <svg
          class="h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </span>
    );
  }

  if (direction === "asc") {
    return (
      <span class="ms-1">
        <svg
          class="h-4 w-4 text-gray-900 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </span>
    );
  }

  return (
    <span class="ms-1">
      <svg
        class="h-4 w-4 text-gray-900 dark:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </span>
  );
});

// Info icon component
const InfoIcon = component$<{ description: string }>((props) => {
  const { description } = props;

  return (
    <span class="ms-1 cursor-help text-gray-400" title={description}>
      <svg
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>
  );
});

// Loading indicator component
const LoadingIndicator = component$<{ colSpan: number; content?: any }>(
  (props) => {
    const { colSpan, content } = props;

    return (
      <tr>
        <td colSpan={colSpan} class="p-4 text-center">
          {content || (
            <div class="flex items-center justify-center py-8">
              <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-500" />
            </div>
          )}
        </td>
      </tr>
    );
  },
);

// Empty state component
const EmptyState = component$<{ colSpan: number; content?: any }>((props) => {
  const { colSpan, content } = props;

  return (
    <tr>
      <td
        colSpan={colSpan}
        class="p-4 text-center text-gray-500 dark:text-gray-400"
      >
        {content || "No data available"}
      </td>
    </tr>
  );
});

// Helper function to get row classes
function getRowClasses(
  variant: string,
  rowIndex: number,
  hoverable: boolean,
  isClickable: boolean,
  customRowClass: string,
): string {
  return [
    variant === "striped" || variant === "bordered-striped"
      ? rowIndex % 2 === 0
        ? "bg-white dark:bg-gray-800"
        : "bg-gray-50 dark:bg-gray-900"
      : "bg-white dark:bg-gray-800",
    hoverable ? "hover:bg-gray-100 dark:hover:bg-gray-700" : "",
    isClickable ? "cursor-pointer" : "",
    customRowClass,
  ]
    .filter(Boolean)
    .join(" ");
}

// Helper function to render a table cell
function renderTableCell(
  column: any,
  row: any,
  rowIndex: number,
  variant: string,
  size: string,
  dense: boolean,
) {
  // Get cell value
  const value = getCellValueHelper(row, column, rowIndex);

  // Define cell classes
  const cellClasses = [
    variant === "bordered" || variant === "bordered-striped"
      ? "border border-gray-200 dark:border-gray-700"
      : "",
    size === "sm" ? "px-2 py-1" : size === "lg" ? "px-6 py-4" : "px-4 py-3",
    dense ? "py-1" : "",
    column.truncate ? "truncate" : "",
    column.cellClass || "",

    // Fixed columns
    column.fixed === "left"
      ? "sticky left-0 z-10"
      : column.fixed === "right"
        ? "sticky right-0 z-10"
        : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Responsive visibility classes
  const hideClasses = [];
  if (column.hideOn?.sm) hideClasses.push("hidden sm:table-cell");
  else if (column.hideOn?.md) hideClasses.push("hidden md:table-cell");
  else if (column.hideOn?.lg) hideClasses.push("hidden lg:table-cell");

  const visibilityClass = hideClasses.join(" ");

  return (
    <TableCell
      key={`${rowIndex}-${column.id}`}
      align={column.align}
      truncate={column.truncate}
      class={`${cellClasses} ${visibilityClass}`}
    >
      {column.renderCell
        ? column.renderCell(value, row, rowIndex)
        : value !== undefined && value !== null
          ? String(value)
          : "—"}
    </TableCell>
  );
}
