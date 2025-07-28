import { useSignal, $ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import type {
  TableProps,
  TableColumn,
  SortState,
  SortDirection,
} from "../Table.types";

export interface UseTableReturn<T = any> {
  tableData: Signal<T[]>;
  sortedData: T[];
  currentSort: Signal<SortState>;
  isLoading: Signal<boolean>;
  handleSort$: (columnId: string) => void;
  getColumnAlignment: (column: TableColumn<T>) => string;
  getSortDirection: (columnId: string) => SortDirection;
  getRowId: (row: T, index: number) => string;
  isEmpty: boolean;
}

export function useTable<T = any>(props: TableProps<T>): UseTableReturn<T> {
  const { data, columns, sortState, loading = false, rowId } = props;

  // Initialize table data
  const tableData = useSignal<T[]>(data);
  const isLoading = useSignal<boolean>(loading);

  // Initialize sort state (controlled or uncontrolled)
  const currentSort = useSignal<SortState>(
    sortState
      ? typeof sortState === "object" && "value" in sortState
        ? sortState.value
        : sortState
      : { column: "", direction: "none" },
  );

  // Update table data when props.data changes
  $(() => {
    tableData.value = data;
  })();

  // Update loading state when props.loading changes
  $(() => {
    isLoading.value = loading;
  })();

  // Create a map of sortable columns to avoid serialization issues
  const sortableColumns = new Set(
    columns.filter((col) => col.sortable).map((col) => col.id),
  );

  // Handle sorting
  const handleSort$ = $((columnId: string) => {
    // Check if column is sortable using our pre-computed set
    if (!sortableColumns.has(columnId)) {
      return;
    }

    // Calculate next sort direction
    const currentDirection =
      currentSort.value.column === columnId
        ? currentSort.value.direction
        : "none";

    const nextDirection: SortDirection =
      currentDirection === "none"
        ? "asc"
        : currentDirection === "asc"
          ? "desc"
          : "none";

    // Update sort state
    const newSortState: SortState = {
      column: nextDirection === "none" ? "" : columnId,
      direction: nextDirection,
    };

    currentSort.value = newSortState;
  });

  // Get column alignment class
  const getColumnAlignment = (column: TableColumn<T>): string => {
    switch (column.align) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  // Get sort direction for a column
  const getSortDirection = (columnId: string): SortDirection => {
    return currentSort.value.column === columnId
      ? currentSort.value.direction
      : "none";
  };

  // Generate row ID
  const getRowId = (row: T, index: number): string => {
    if (rowId) {
      try {
        const result = rowId(row, index);
        return String(result);
      } catch (error) {
        console.error("Error generating row ID", error);
        return `row-${index}`;
      }
    }

    // Default to using index if no rowId function is provided
    return `row-${index}`;
  };

  // Manually calculate sorted data instead of using useComputed$ to avoid deep instantiation
  const getSortedData = (): T[] => {
    const { column, direction } = currentSort.value;

    // If no sorting or data is loading, return original data
    if (direction === "none" || !column || isLoading.value) {
      return [...tableData.value];
    }

    // Find column definition for sorting
    const columnDef = columns.find((col) => col.id === column);
    if (!columnDef || !columnDef.sortable) {
      return [...tableData.value];
    }

    // Create a copy of the data for sorting
    const dataCopy = [...tableData.value];

    // Sort the data
    return dataCopy.sort((a, b) => {
      // Get values to compare
      const aValue = getCellValue(a, columnDef, 0);
      const bValue = getCellValue(b, columnDef, 0);

      // Compare values based on direction
      if (direction === "asc") {
        return compareValues(aValue, bValue);
      } else {
        return compareValues(bValue, aValue);
      }
    });
  };

  // Check if table is empty
  const isEmpty = !isLoading.value && tableData.value.length === 0;

  // Get sorted data on demand
  const sortedData = getSortedData();

  return {
    tableData,
    sortedData,
    currentSort,
    isLoading,
    handleSort$,
    getColumnAlignment,
    getSortDirection,
    getRowId,
    isEmpty,
  };
}

// Helper function to get cell value from a row
export function getCellValue<T>(
  row: T,
  column: TableColumn<T>,
  rowIndex: number,
): any {
  // If column has an accessor function, use it
  if (column.accessor) {
    return column.accessor(row, rowIndex);
  }

  // If column has a field, get the value from the row using the field path
  if (column.field) {
    return getValueByPath(row, column.field);
  }

  // Return undefined if no value can be determined
  return undefined;
}

// Helper function to get a value from an object using a dot-notation path
export function getValueByPath(obj: any, path: string): any {
  return path.split(".").reduce((o, p) => (o ? o[p] : undefined), obj);
}

// Compare function for sorting
function compareValues(a: any, b: any): number {
  // Handle null/undefined values
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;

  // Compare dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }

  // Compare numbers
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  // Compare strings case-insensitive
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }

  // Convert to string for any other types
  return String(a).localeCompare(String(b));
}
