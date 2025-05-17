export { Table } from './Table';
export { TableHead } from './components/TableHead';
export { TableBody } from './components/TableBody';
export { TableRow } from './components/TableRow';
export { TableCell } from './components/TableCell';
export { TableFooter } from './components/TableFooter';

export { useTable, getCellValue, getValueByPath } from './hooks/useTable';

export type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableFooterProps,
  TableColumn,
  TableSize,
  TableVariant,
  TableCellAlign,
  SortDirection,
  SortState
} from './Table.types';

export type {
  UseTableReturn
} from './hooks/useTable';
