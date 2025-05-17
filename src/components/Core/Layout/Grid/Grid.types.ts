import type { JSXChildren } from '@builder.io/qwik';
export type GridTemplateColumns = 
  | 'none'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | '7' | '8' | '9' | '10' | '11' | '12'
  | 'auto-fill' | 'auto-fit';


export type GridTemplateRows = 
  | 'none'
  | '1' | '2' | '3' | '4' | '5' | '6'
  | 'auto';

export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type GridAutoFlow = 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense';

export type GridPlacement = 'auto' | 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type GridBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ResponsiveGridTemplateColumns = {
  base?: GridTemplateColumns;
  sm?: GridTemplateColumns;
  md?: GridTemplateColumns;
  lg?: GridTemplateColumns;
  xl?: GridTemplateColumns;
  '2xl'?: GridTemplateColumns;
};


export interface GridProps {

  columns?: GridTemplateColumns | ResponsiveGridTemplateColumns;

  rows?: GridTemplateRows;

  minColumnWidth?: string;

  gap?: GridGap;

  columnGap?: GridGap;

  rowGap?: GridGap;

  autoFlow?: GridAutoFlow;

  justifyItems?: GridPlacement;

  alignItems?: GridPlacement;

  columnTemplate?: string;

  rowTemplate?: string;

  role?: string;

  'aria-label'?: string;

  children?: JSXChildren;

  class?: string;
}

export interface GridItemProps {

  colSpan?: number | string;

  rowSpan?: number | string;

  colStart?: number | string;

  colEnd?: number | string;

  rowStart?: number | string;

  rowEnd?: number | string;

  justifySelf?: GridPlacement;

  alignSelf?: GridPlacement;

  role?: string;

  class?: string;

  children?: JSXChildren;
}
