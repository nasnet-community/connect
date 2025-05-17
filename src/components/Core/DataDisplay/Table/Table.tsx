import { component$, $ } from '@builder.io/qwik';
import type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableFooterProps,
  TableColumn
} from './Table.types';
import { useTable, getCellValue } from './hooks/useTable';
import { TableHead } from './components/TableHead';
import { TableBody } from './components/TableBody';
import { TableCell } from './components/TableCell';
import { TableRow } from './components/TableRow';
import { TableFooter } from './components/TableFooter';
import { Slot } from '@builder.io/qwik';

/**
 * Helper function to get the value from a row using a column definition
 */
function getCellValue<T>(row: T, column: TableColumn<T>, index: number): unknown {
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
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
}

/**
 * Table component for displaying tabular data
 */
export const Table = component$<TableProps>((props) => {
  const {
    columns,
    caption,
    loading,
    loadingContent,
    emptyContent,
    variant,
    size,
    dense,
    hoverable,
    id,
    headerClass,
    bodyClass,
    currentSortState,
    displayData,
    containerClasses,
    tableClasses,
    containerStyle,
    handleSort$,
    getRowId,
    getRowAriaLabel,
    rowClass,
    onRowClick$,
    pagination
  } = useTable(props);

  return (
    <div class={containerClasses} style={containerStyle}>
      <table class={tableClasses} id={id}>
        {caption && (
          <caption class="caption-top mb-2 text-sm text-gray-600 dark:text-gray-400">
            {caption}
          </caption>
        )}
        
        <TableHead
          sticky={props.stickyHeader}
          class={headerClass}
        >
          <tr>
            {columns.map((column) => {
              const isSorted = currentSortState.value.column === column.id;
              const sortDirection = isSorted ? currentSortState.value.direction : 'none';
              
              // Determine header cell classes
              const headerCellClasses = [
                'font-medium',
                variant === 'bordered' || variant === 'bordered-striped' 
                  ? 'border border-gray-200 dark:border-gray-700' : '',
                size === 'sm' 
                  ? 'px-2 py-1' 
                  : size === 'lg' 
                    ? 'px-6 py-4' 
                    : 'px-4 py-3',
                dense ? 'py-1' : '',
                column.align === 'center' 
                  ? 'text-center' 
                  : column.align === 'right' 
                    ? 'text-right' 
                    : 'text-left',
                column.sortable ? 'cursor-pointer select-none' : '',
                column.width ? '' : 'whitespace-nowrap',
                column.headerClass || ''
              ].filter(Boolean).join(' ');
              
              // Set column styling
              const colStyle: Record<string, string> = {};
              if (column.width) colStyle.width = column.width;
              if (column.minWidth) colStyle.minWidth = column.minWidth;
              if (column.maxWidth) colStyle.maxWidth = column.maxWidth;
              
              // Responsive visibility classes
              const hideClasses = [];
              if (column.hideOn?.sm) hideClasses.push('hidden sm:table-cell');
              else if (column.hideOn?.md) hideClasses.push('hidden md:table-cell');
              else if (column.hideOn?.lg) hideClasses.push('hidden lg:table-cell');
              
              const visibilityClass = hideClasses.join(' ');
              
              return (
                <TableCell
                  key={column.id}
                  isHeader
                  align={column.align}
                  class={`${headerCellClasses} ${visibilityClass}`}
                  style={colStyle}
                  scope="col"
                  onClick$={column.sortable ? () => handleSort$(column.id) : undefined}
                >
                  <div class="flex items-center gap-1">
                    {column.renderHeader ? (
                      column.renderHeader(column)
                    ) : (
                      <span>{column.header}</span>
                    )}
                    
                    {column.sortable && (
                      <SortIcon direction={sortDirection} />
                    )}
                    
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
          {loading && (
            <LoadingIndicator 
              colSpan={columns.length} 
              content={loadingContent}
            />
          )}
          
          {!loading && displayData.value.length === 0 && (
            <EmptyState 
              colSpan={columns.length}
              content={emptyContent} 
            />
          )}
          
          {!loading && displayData.value.map((row, rowIndex) => {
            const id = getRowId(row, rowIndex);
            const isClickable = !!onRowClick$;
            
            // Define row classes
            const customRowClass = typeof rowClass === 'function' ? rowClass(row, rowIndex) : '';
            const rowClasses = getRowClasses(variant, rowIndex, hoverable, isClickable, customRowClass);
            
            // Get aria label for the row
            const ariaLabel = getRowAriaLabel ? getRowAriaLabel(row, rowIndex) : undefined;
            
            return (
              <TableRow
                key={id}
                class={rowClasses}
                clickable={isClickable}
                onClick$={isClickable ? (e) => onRowClick$?.(row, rowIndex, e) : undefined}
                ariaLabel={ariaLabel}
              >
                {columns.map((column) => renderTableCell(column, row, rowIndex, variant, size, dense))}
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
        
        <Slot />
      </table>
    </div>
  );
});

/**
 * TableHead component for the table header
 */
export const TableHead = component$<TableHeadProps>((props) => {
  const { 
    sticky = false,
    class: className = '',
  } = props;
  
  const classes = [
    'bg-gray-50 dark:bg-gray-800',
    sticky ? 'sticky top-0 z-10' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <thead class={classes}>
      <Slot />
    </thead>
  );
});

/**
 * TableBody component for the table body
 */
export const TableBody = component$<TableBodyProps>((props) => {
  const {
    class: className = '',
  } = props;
  
  const classes = [
    'divide-y divide-gray-200 dark:divide-gray-700',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <tbody class={classes}>
      <Slot />
    </tbody>
  );
});

/**
 * TableRow component for table rows
 */
export const TableRow = component$<TableRowProps>((props) => {
  const {
    selected = false,
    clickable = false,
    onClick$,
    class: className = '',
    ariaLabel,
  } = props;
  
  const classes = [
    selected ? 'bg-blue-50 dark:bg-blue-900/20' : '',
    clickable ? 'cursor-pointer' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <tr 
      class={classes} 
      onClick$={onClick$}
      aria-label={ariaLabel}
    >
      <Slot />
    </tr>
  );
});

/**
 * TableCell component for table cells
 */
export const TableCell = component$<TableCellProps>((props) => {
  const {
    isHeader = false,
    align = 'left',
    truncate = false,
    width,
    colSpan,
    rowSpan,
    scope,
    class: className = '',
    ...rest
  } = props;
  
  const classes = [
    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
    truncate ? 'truncate' : '',
    className
  ].filter(Boolean).join(' ');
  
  const style: Record<string, string> = {};
  if (width) {
    style.width = width;
  }
  
  if (isHeader) {
    return (
      <th 
        class={classes} 
        style={style}
        colSpan={colSpan}
        rowSpan={rowSpan}
        scope={scope}
        {...rest}
      >
        <Slot />
      </th>
    );
  }
  
  return (
    <td 
      class={classes} 
      style={style}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {...rest}
    >
      <Slot />
    </td>
  );
});

/**
 * TableFooter component for the table footer
 */
export const TableFooter = component$<TableFooterProps>((props) => {
  const {
    class: className = '',
  } = props;
  
  const classes = [
    'bg-gray-50 dark:bg-gray-800',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <tfoot class={classes}>
      <Slot />
    </tfoot>
  );
});

// Sort icon component
const SortIcon = component$<{ direction: string }>((props) => {
  const { direction } = props;
  
  if (direction === 'none') {
    return (
      <span class="ml-1">
        <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </span>
    );
  }
  
  if (direction === 'asc') {
    return (
      <span class="ml-1">
        <svg class="h-4 w-4 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </span>
    );
  }
  
  return (
    <span class="ml-1">
      <svg class="h-4 w-4 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  );
});

// Info icon component
const InfoIcon = component$<{ description: string }>((props) => {
  const { description } = props;
  
  return (
    <span 
      class="ml-1 text-gray-400 cursor-help"
      title={description}
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
  );
});

// Loading indicator component
const LoadingIndicator = component$<{ colSpan: number, content?: any }>((props) => {
  const { colSpan, content } = props;
  
  return (
    <tr>
      <td 
        colSpan={colSpan} 
        class="text-center p-4"
      >
        {content || (
          <div class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
          </div>
        )}
      </td>
    </tr>
  );
});

// Empty state component
const EmptyState = component$<{ colSpan: number, content?: any }>((props) => {
  const { colSpan, content } = props;
  
  return (
    <tr>
      <td 
        colSpan={colSpan} 
        class="text-center p-4 text-gray-500 dark:text-gray-400"
      >
        {content || 'No data available'}
      </td>
    </tr>
  );
});

// Helper function to get row classes
const getRowClasses = $(
  (
    variant: string, 
    rowIndex: number, 
    hoverable: boolean, 
    isClickable: boolean, 
    customRowClass: string
  ): string => {
    return [
      variant === 'striped' || variant === 'bordered-striped' 
        ? rowIndex % 2 === 0 
          ? 'bg-white dark:bg-gray-800' 
          : 'bg-gray-50 dark:bg-gray-900' 
        : 'bg-white dark:bg-gray-800',
      hoverable ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : '',
      isClickable ? 'cursor-pointer' : '',
      customRowClass
    ].filter(Boolean).join(' ');
  }
);

// Helper function to render a table cell
const renderTableCell = $((column: any, row: any, rowIndex: number, variant: string, size: string, dense: boolean) => {
  // Get cell value
  const value = getCellValue(row, column, rowIndex);
  
  // Define cell classes
  const cellClasses = [
    variant === 'bordered' || variant === 'bordered-striped' 
      ? 'border border-gray-200 dark:border-gray-700' : '',
    size === 'sm' 
      ? 'px-2 py-1' 
      : size === 'lg' 
        ? 'px-6 py-4' 
        : 'px-4 py-3',
    dense ? 'py-1' : '',
    column.truncate ? 'truncate' : '',
    column.cellClass || '',
    
    // Fixed columns
    column.fixed === 'left' 
      ? 'sticky left-0 z-10' 
      : column.fixed === 'right' 
        ? 'sticky right-0 z-10' 
        : ''
  ].filter(Boolean).join(' ');
  
  // Responsive visibility classes
  const hideClasses = [];
  if (column.hideOn?.sm) hideClasses.push('hidden sm:table-cell');
  else if (column.hideOn?.md) hideClasses.push('hidden md:table-cell');
  else if (column.hideOn?.lg) hideClasses.push('hidden lg:table-cell');
  
  const visibilityClass = hideClasses.join(' ');
  
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
          : '—'}
    </TableCell>
  );
});
