import type { JSXNode, QwikIntrinsicElements } from '@builder.io/qwik';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexAlignContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch';
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type FlexBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ResponsiveValue<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};
export interface FlexProps extends Omit<QwikIntrinsicElements['div'], 'children'> {
  direction?: FlexDirection | ResponsiveValue<FlexDirection>;
  wrap?: FlexWrap | ResponsiveValue<FlexWrap>;
  justify?: FlexJustify | ResponsiveValue<FlexJustify>;
  align?: FlexAlign | ResponsiveValue<FlexAlign>;
  alignContent?: FlexAlignContent | ResponsiveValue<FlexAlignContent>;
  gap?: FlexGap | ResponsiveValue<FlexGap>;
  columnGap?: FlexGap | ResponsiveValue<FlexGap>;
  rowGap?: FlexGap | ResponsiveValue<FlexGap>;
  supportRtl?: boolean;
  as?: keyof QwikIntrinsicElements;
  children?: JSXNode | string;
  class?: string;
}
export interface FlexItemProps extends Omit<QwikIntrinsicElements['div'], 'children'> {
  order?: number | ResponsiveValue<number>;
  grow?: number | boolean | ResponsiveValue<number | boolean>;
  shrink?: number | boolean | ResponsiveValue<number | boolean>;
  basis?: string | 'auto' | ResponsiveValue<string | 'auto'>;
  alignSelf?: FlexAlign | ResponsiveValue<FlexAlign>;
  as?: keyof QwikIntrinsicElements;
  children?: JSXNode | string;
  class?: string;
}
