import type { JSXChildren, QRL, Signal } from '@builder.io/qwik';

export type TableCellAlign = 'left' | 'center' | 'right';
export type TableSize = 'sm' | 'md' | 'lg';
export type TableVariant = 'default' | 'bordered' | 'striped' | 'bordered-striped';

export interface TableColumn<T = any> {
  id: string;
  header: string;
  description?: string;
  accessor?: QRL<(row: T, index: number) => unknown> ;
  field?: string;
  renderCell?: QRL<(value: unknown, row: T, index: number) => JSXChildren> ;
  renderHeader?: QRL<(column: TableColumn<T>) => JSXChildren> ;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  sortable?: boolean;
  truncate?: boolean;
  align?: TableCellAlign;
  fixed?: 'left' | 'right';
  hideOn?: {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
  };
  headerClass?: string;
  cellClass?: string;
}

export type SortDirection = 'asc' | 'desc' | 'none';

export interface SortState {
  column: string;
  direction: SortDirection;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  caption?: string;
  responsive?: boolean;
  variant?: TableVariant;
  size?: TableSize;
  hoverable?: boolean;
  dense?: boolean;
  horizontalScroll?: boolean;
  stickyHeader?: boolean;
  height?: string;
  sortState?: Signal<SortState> | SortState;
  onSortChange$?: QRL<(sortState: SortState) => void>;
  loading?: boolean;
  loadingContent?: JSXChildren;
  emptyContent?: JSXChildren;
  rowId?: QRL<(row: T, index: number) => string> ;
  onRowClick$?: QRL<(row: T, index: number, event: MouseEvent) => void>;
  rowClass?: QRL<(row: T, index: number) => string> ;
  getRowAriaLabel?: QRL<(row: T, index: number) => string> ;
  pagination?: JSXChildren;
  class?: string;
  tableClass?: string;
  headerClass?: string;
  bodyClass?: string;
  id?: string;
}

export interface TableHeadProps {
  children?: JSXChildren;
  sticky?: boolean;
  class?: string;
}

export interface TableBodyProps {
  children?: JSXChildren;
  class?: string;
}

export interface TableRowProps {
  children?: JSXChildren;
  selected?: boolean;
  clickable?: boolean;
  onClick$?: QRL<(event: MouseEvent) => void>;
  class?: string;
  ariaLabel?: string;
}

export interface TableCellProps {
  children?: JSXChildren;
  isHeader?: boolean;
  align?: TableCellAlign;
  truncate?: boolean;
  width?: string;
  colSpan?: number;
  rowSpan?: number;
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
  class?: string;
  style?: Record<string, string>;
  onClick$?: QRL<(event: MouseEvent) => void>;
}

export interface TableFooterProps {
  children?: JSXChildren;
  class?: string;
}
