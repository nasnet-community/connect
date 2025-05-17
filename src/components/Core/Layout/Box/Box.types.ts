import type { JSXNode, QwikIntrinsicElements } from '@builder.io/qwik';
export type BoxPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type BoxMargin = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';


export type BoxBorderRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type BoxBorderWidth = 'none' | 'thin' | 'normal' | 'thick';

export type BoxBorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'none';

export type BoxBorderColor = 
  | 'default'
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'muted';

export type BoxBackgroundColor = 
  | 'transparent' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'muted'
  | 'surface'
  | 'surface-alt';

export type BoxShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

export interface BoxBorderProps {

  borderRadius?: BoxBorderRadius;

  borderWidth?: BoxBorderWidth;

  borderStyle?: BoxBorderStyle;

  borderColor?: BoxBorderColor;
}

export interface BoxProps extends Omit<QwikIntrinsicElements['div'], 'children'>, BoxBorderProps {

  children?: JSXNode | string;

  as?: keyof QwikIntrinsicElements;

  padding?: BoxPadding | {
    all?: BoxPadding;
    x?: BoxPadding;
    y?: BoxPadding;
    top?: BoxPadding;
    right?: BoxPadding;
    bottom?: BoxPadding;
    left?: BoxPadding;
  };

  margin?: BoxMargin | {
    all?: BoxMargin;
    x?: BoxMargin;
    y?: BoxMargin;
    top?: BoxMargin;
    right?: BoxMargin;
    bottom?: BoxMargin;
    left?: BoxMargin;
  };

  backgroundColor?: BoxBackgroundColor;

  shadow?: BoxShadow;

  fullWidth?: boolean;

  fullHeight?: boolean;

  class?: string;

  role?: string;

  'aria-label'?: string;

  'aria-labelledby'?: string;

  'aria-describedby'?: string;
}
