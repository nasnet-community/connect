import { JSXNode } from '@builder.io/qwik';


export type StackDirection = 'row' | 'column';

export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type StackWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface StackProps {

  direction?: StackDirection | {
    base?: StackDirection;
    sm?: StackDirection;
    md?: StackDirection;
    lg?: StackDirection;
    xl?: StackDirection;
    '2xl'?: StackDirection;
  };

  spacing?: StackSpacing;

  justify?: StackJustify;

  align?: StackAlign;

  wrap?: StackWrap;

  dividers?: boolean;

  dividerColor?: 'default' | 'primary' | 'secondary' | 'muted';

  reverse?: boolean;

  supportRtl?: boolean;

  children?: JSXNode | string;

  class?: string;

  role?: string;

  'aria-label'?: string;
}
