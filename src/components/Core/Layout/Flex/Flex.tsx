import { component$, Slot, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { FlexProps, FlexItemProps, ResponsiveValue } from './Flex.types';

/**
 * Flex component - an advanced layout component for creating flexible box layouts.
 *
 * The Flex component provides a comprehensive API for creating complex layouts
 * with flexbox, offering full control over flex direction, alignment, wrapping,
 * and spacing.
 */
const Flex = component$<FlexProps>((props) => {
  const {
    direction = 'row',
    wrap = 'nowrap',
    justify = 'start',
    align = 'stretch',
    alignContent,
    gap = 'none',
    columnGap,
    rowGap,
    supportRtl = true,
    as: Element = 'div',
    ...rest
  } = props;

  // Signal to track if we're in RTL mode
  const isRtl = useSignal(false);

  // Check for RTL mode on component mount
  useVisibleTask$(() => {
    const dir = document.documentElement.dir || document.dir;
    isRtl.value = dir === 'rtl';
  });

  // Helper function to generate responsive classes
  const generateResponsiveClasses = <T,>(
    value: T | ResponsiveValue<T> | undefined,
    classMap: Record<string, Record<string, boolean>>,
  ) => {
    if (value === undefined) return {};

    if (typeof value === 'object') {
      return {
        ...(value.base !== undefined ? classMap.base[value.base as unknown as string] : {}),
        ...(value.sm !== undefined ? classMap.sm[value.sm as unknown as string] : {}),
        ...(value.md !== undefined ? classMap.md[value.md as unknown as string] : {}),
        ...(value.lg !== undefined ? classMap.lg[value.lg as unknown as string] : {}),
        ...(value.xl !== undefined ? classMap.xl[value.xl as unknown as string] : {}),
        ...(value['2xl'] !== undefined ? classMap['2xl'][value['2xl'] as unknown as string] : {}),
      };
    }

    return classMap.base[value as unknown as string] || {};
  };

  // Generate direction classes
  const directionClassMap = {
    base: {
      'row': { 'flex-row': true },
      'column': { 'flex-col': true },
      'row-reverse': { 'flex-row-reverse': true },
      'column-reverse': { 'flex-col-reverse': true },
    },
    sm: {
      'row': { 'sm:flex-row': true },
      'column': { 'sm:flex-col': true },
      'row-reverse': { 'sm:flex-row-reverse': true },
      'column-reverse': { 'sm:flex-col-reverse': true },
    },
    md: {
      'row': { 'md:flex-row': true },
      'column': { 'md:flex-col': true },
      'row-reverse': { 'md:flex-row-reverse': true },
      'column-reverse': { 'md:flex-col-reverse': true },
    },
    lg: {
      'row': { 'lg:flex-row': true },
      'column': { 'lg:flex-col': true },
      'row-reverse': { 'lg:flex-row-reverse': true },
      'column-reverse': { 'lg:flex-col-reverse': true },
    },
    xl: {
      'row': { 'xl:flex-row': true },
      'column': { 'xl:flex-col': true },
      'row-reverse': { 'xl:flex-row-reverse': true },
      'column-reverse': { 'xl:flex-col-reverse': true },
    },
    '2xl': {
      'row': { '2xl:flex-row': true },
      'column': { '2xl:flex-col': true },
      'row-reverse': { '2xl:flex-row-reverse': true },
      'column-reverse': { '2xl:flex-col-reverse': true },
    },
  };

  // Generate wrap classes
  const wrapClassMap = {
    base: {
      'nowrap': { 'flex-nowrap': true },
      'wrap': { 'flex-wrap': true },
      'wrap-reverse': { 'flex-wrap-reverse': true },
    },
    sm: {
      'nowrap': { 'sm:flex-nowrap': true },
      'wrap': { 'sm:flex-wrap': true },
      'wrap-reverse': { 'sm:flex-wrap-reverse': true },
    },
    md: {
      'nowrap': { 'md:flex-nowrap': true },
      'wrap': { 'md:flex-wrap': true },
      'wrap-reverse': { 'md:flex-wrap-reverse': true },
    },
    lg: {
      'nowrap': { 'lg:flex-nowrap': true },
      'wrap': { 'lg:flex-wrap': true },
      'wrap-reverse': { 'lg:flex-wrap-reverse': true },
    },
    xl: {
      'nowrap': { 'xl:flex-nowrap': true },
      'wrap': { 'xl:flex-wrap': true },
      'wrap-reverse': { 'xl:flex-wrap-reverse': true },
    },
    '2xl': {
      'nowrap': { '2xl:flex-nowrap': true },
      'wrap': { '2xl:flex-wrap': true },
      'wrap-reverse': { '2xl:flex-wrap-reverse': true },
    },
  };

  // Generate justify classes
  const justifyClassMap = {
    base: {
      'start': { 'justify-start': true },
      'center': { 'justify-center': true },
      'end': { 'justify-end': true },
      'between': { 'justify-between': true },
      'around': { 'justify-around': true },
      'evenly': { 'justify-evenly': true },
    },
    sm: {
      'start': { 'sm:justify-start': true },
      'center': { 'sm:justify-center': true },
      'end': { 'sm:justify-end': true },
      'between': { 'sm:justify-between': true },
      'around': { 'sm:justify-around': true },
      'evenly': { 'sm:justify-evenly': true },
    },
    md: {
      'start': { 'md:justify-start': true },
      'center': { 'md:justify-center': true },
      'end': { 'md:justify-end': true },
      'between': { 'md:justify-between': true },
      'around': { 'md:justify-around': true },
      'evenly': { 'md:justify-evenly': true },
    },
    lg: {
      'start': { 'lg:justify-start': true },
      'center': { 'lg:justify-center': true },
      'end': { 'lg:justify-end': true },
      'between': { 'lg:justify-between': true },
      'around': { 'lg:justify-around': true },
      'evenly': { 'lg:justify-evenly': true },
    },
    xl: {
      'start': { 'xl:justify-start': true },
      'center': { 'xl:justify-center': true },
      'end': { 'xl:justify-end': true },
      'between': { 'xl:justify-between': true },
      'around': { 'xl:justify-around': true },
      'evenly': { 'xl:justify-evenly': true },
    },
    '2xl': {
      'start': { '2xl:justify-start': true },
      'center': { '2xl:justify-center': true },
      'end': { '2xl:justify-end': true },
      'between': { '2xl:justify-between': true },
      'around': { '2xl:justify-around': true },
      'evenly': { '2xl:justify-evenly': true },
    },
  };

  // Generate align classes
  const alignClassMap = {
    base: {
      'start': { 'items-start': true },
      'center': { 'items-center': true },
      'end': { 'items-end': true },
      'stretch': { 'items-stretch': true },
      'baseline': { 'items-baseline': true },
    },
    sm: {
      'start': { 'sm:items-start': true },
      'center': { 'sm:items-center': true },
      'end': { 'sm:items-end': true },
      'stretch': { 'sm:items-stretch': true },
      'baseline': { 'sm:items-baseline': true },
    },
    md: {
      'start': { 'md:items-start': true },
      'center': { 'md:items-center': true },
      'end': { 'md:items-end': true },
      'stretch': { 'md:items-stretch': true },
      'baseline': { 'md:items-baseline': true },
    },
    lg: {
      'start': { 'lg:items-start': true },
      'center': { 'lg:items-center': true },
      'end': { 'lg:items-end': true },
      'stretch': { 'lg:items-stretch': true },
      'baseline': { 'lg:items-baseline': true },
    },
    xl: {
      'start': { 'xl:items-start': true },
      'center': { 'xl:items-center': true },
      'end': { 'xl:items-end': true },
      'stretch': { 'xl:items-stretch': true },
      'baseline': { 'xl:items-baseline': true },
    },
    '2xl': {
      'start': { '2xl:items-start': true },
      'center': { '2xl:items-center': true },
      'end': { '2xl:items-end': true },
      'stretch': { '2xl:items-stretch': true },
      'baseline': { '2xl:items-baseline': true },
    },
  };

  // Generate align content classes
  const alignContentClassMap = {
    base: {
      'start': { 'content-start': true },
      'center': { 'content-center': true },
      'end': { 'content-end': true },
      'between': { 'content-between': true },
      'around': { 'content-around': true },
      'stretch': { 'content-stretch': true },
    },
    sm: {
      'start': { 'sm:content-start': true },
      'center': { 'sm:content-center': true },
      'end': { 'sm:content-end': true },
      'between': { 'sm:content-between': true },
      'around': { 'sm:content-around': true },
      'stretch': { 'sm:content-stretch': true },
    },
    md: {
      'start': { 'md:content-start': true },
      'center': { 'md:content-center': true },
      'end': { 'md:content-end': true },
      'between': { 'md:content-between': true },
      'around': { 'md:content-around': true },
      'stretch': { 'md:content-stretch': true },
    },
    lg: {
      'start': { 'lg:content-start': true },
      'center': { 'lg:content-center': true },
      'end': { 'lg:content-end': true },
      'between': { 'lg:content-between': true },
      'around': { 'lg:content-around': true },
      'stretch': { 'lg:content-stretch': true },
    },
    xl: {
      'start': { 'xl:content-start': true },
      'center': { 'xl:content-center': true },
      'end': { 'xl:content-end': true },
      'between': { 'xl:content-between': true },
      'around': { 'xl:content-around': true },
      'stretch': { 'xl:content-stretch': true },
    },
    '2xl': {
      'start': { '2xl:content-start': true },
      'center': { '2xl:content-center': true },
      'end': { '2xl:content-end': true },
      'between': { '2xl:content-between': true },
      'around': { '2xl:content-around': true },
      'stretch': { '2xl:content-stretch': true },
    },
  };

  // Generate gap classes
  const generateGapClasses = (gap: FlexProps['gap'], prefix: string = '') => {
    const prefixStr = prefix ? `${prefix}-` : '';
    
    const gapClassMap = {
      base: {
        'none': { [`${prefixStr}gap-0`]: true },
        'xs': { [`${prefixStr}gap-1`]: true },
        'sm': { [`${prefixStr}gap-2`]: true },
        'md': { [`${prefixStr}gap-4`]: true },
        'lg': { [`${prefixStr}gap-6`]: true },
        'xl': { [`${prefixStr}gap-8`]: true },
        '2xl': { [`${prefixStr}gap-10`]: true },
        '3xl': { [`${prefixStr}gap-12`]: true },
      },
      sm: {
        'none': { [`sm:${prefixStr}gap-0`]: true },
        'xs': { [`sm:${prefixStr}gap-1`]: true },
        'sm': { [`sm:${prefixStr}gap-2`]: true },
        'md': { [`sm:${prefixStr}gap-4`]: true },
        'lg': { [`sm:${prefixStr}gap-6`]: true },
        'xl': { [`sm:${prefixStr}gap-8`]: true },
        '2xl': { [`sm:${prefixStr}gap-10`]: true },
        '3xl': { [`sm:${prefixStr}gap-12`]: true },
      },
      md: {
        'none': { [`md:${prefixStr}gap-0`]: true },
        'xs': { [`md:${prefixStr}gap-1`]: true },
        'sm': { [`md:${prefixStr}gap-2`]: true },
        'md': { [`md:${prefixStr}gap-4`]: true },
        'lg': { [`md:${prefixStr}gap-6`]: true },
        'xl': { [`md:${prefixStr}gap-8`]: true },
        '2xl': { [`md:${prefixStr}gap-10`]: true },
        '3xl': { [`md:${prefixStr}gap-12`]: true },
      },
      lg: {
        'none': { [`lg:${prefixStr}gap-0`]: true },
        'xs': { [`lg:${prefixStr}gap-1`]: true },
        'sm': { [`lg:${prefixStr}gap-2`]: true },
        'md': { [`lg:${prefixStr}gap-4`]: true },
        'lg': { [`lg:${prefixStr}gap-6`]: true },
        'xl': { [`lg:${prefixStr}gap-8`]: true },
        '2xl': { [`lg:${prefixStr}gap-10`]: true },
        '3xl': { [`lg:${prefixStr}gap-12`]: true },
      },
      xl: {
        'none': { [`xl:${prefixStr}gap-0`]: true },
        'xs': { [`xl:${prefixStr}gap-1`]: true },
        'sm': { [`xl:${prefixStr}gap-2`]: true },
        'md': { [`xl:${prefixStr}gap-4`]: true },
        'lg': { [`xl:${prefixStr}gap-6`]: true },
        'xl': { [`xl:${prefixStr}gap-8`]: true },
        '2xl': { [`xl:${prefixStr}gap-10`]: true },
        '3xl': { [`xl:${prefixStr}gap-12`]: true },
      },
      '2xl': {
        'none': { [`2xl:${prefixStr}gap-0`]: true },
        'xs': { [`2xl:${prefixStr}gap-1`]: true },
        'sm': { [`2xl:${prefixStr}gap-2`]: true },
        'md': { [`2xl:${prefixStr}gap-4`]: true },
        'lg': { [`2xl:${prefixStr}gap-6`]: true },
        'xl': { [`2xl:${prefixStr}gap-8`]: true },
        '2xl': { [`2xl:${prefixStr}gap-10`]: true },
        '3xl': { [`2xl:${prefixStr}gap-12`]: true },
      },
    };

    return generateResponsiveClasses(gap, gapClassMap);
  };

  // Generate RTL support classes
  const rtlClasses = (() => {
    if (!supportRtl || isRtl.value !== true) {
      return {};
    }

    const baseDirection = typeof direction === 'object' ? direction.base : direction;
    
    // Only apply RTL changes to row-based directions
    if (baseDirection === 'row') {
      return { 'rtl:flex-row-reverse': true };
    }
    
    if (baseDirection === 'row-reverse') {
      return { 'rtl:flex-row': true };
    }
    
    return {};
  })();

  // Combine all classes
  const allClasses = {
    'flex': true,
    ...generateResponsiveClasses(direction, directionClassMap),
    ...generateResponsiveClasses(wrap, wrapClassMap),
    ...generateResponsiveClasses(justify, justifyClassMap),
    ...generateResponsiveClasses(align, alignClassMap),
    ...generateResponsiveClasses(alignContent, alignContentClassMap),
    ...(columnGap || rowGap ? {} : generateGapClasses(gap)),
    ...(columnGap ? generateGapClasses(columnGap, 'x') : {}),
    ...(rowGap ? generateGapClasses(rowGap, 'y') : {}),
    ...rtlClasses,
  };

  // Filter out undefined/null classes
  const classNames = Object.entries(allClasses)
    .filter(([, valueObj]) => {
      // Check if the value object has a true property
      return Object.values(valueObj).includes(true);
    })
    .map(([className]) => className)
    .join(' ');

  // Combine with user-provided classes
  const combinedClassNames = props.class
    ? `${classNames} ${props.class}`
    : classNames;

  return (
    <Element 
      {...rest}
      class={combinedClassNames}
    >
      <Slot />
    </Element>
  );
});

/**
 * FlexItem component - An individual item within a Flex layout.
 * 
 * The FlexItem component provides control over how an item behaves within
 * a flex container, including growth, shrinking, basis, and alignment.
 */
export const FlexItem = component$<FlexItemProps>((props) => {
  const {
    order,
    grow,
    shrink,
    basis,
    alignSelf,
    as: Element = 'div',
    ...rest
  } = props;

  // Helper function to generate responsive classes
  const generateResponsiveClasses = <T,>(
    value: T | ResponsiveValue<T> | undefined,
    classPrefix: string,
    valueTransform?: (val: T) => string | number | boolean,
  ) => {
    if (value === undefined) return {};

    const transform = valueTransform || ((val: T) => val);

    if (typeof value === 'object') {
      return {
        ...(value.base !== undefined ? { [`${classPrefix}-${transform(value.base)}`]: true } : {}),
        ...(value.sm !== undefined ? { [`sm:${classPrefix}-${transform(value.sm)}`]: true } : {}),
        ...(value.md !== undefined ? { [`md:${classPrefix}-${transform(value.md)}`]: true } : {}),
        ...(value.lg !== undefined ? { [`lg:${classPrefix}-${transform(value.lg)}`]: true } : {}),
        ...(value.xl !== undefined ? { [`xl:${classPrefix}-${transform(value.xl)}`]: true } : {}),
        ...(value['2xl'] !== undefined ? { [`2xl:${classPrefix}-${transform(value['2xl'])}`]: true } : {}),
      };
    }

    return { [`${classPrefix}-${transform(value)}`]: true };
  };

  // Generate order classes
  const orderClasses = generateResponsiveClasses(order, 'order');

  // Generate grow classes
  const growClasses = generateResponsiveClasses(grow, 'flex-grow', (val) => 
    typeof val === 'boolean' ? (val ? '1' : '0') : val
  );

  // Generate shrink classes
  const shrinkClasses = generateResponsiveClasses(shrink, 'flex-shrink', (val) => 
    typeof val === 'boolean' ? (val ? '1' : '0') : val
  );

  // Generate basis classes
  const basisClasses = generateResponsiveClasses(basis, 'flex-basis', (val) => 
    val === 'auto' ? 'auto' : val
  );

  // Generate align self classes
  const alignSelfClassMap = {
    base: {
      'start': { 'self-start': true },
      'center': { 'self-center': true },
      'end': { 'self-end': true },
      'stretch': { 'self-stretch': true },
      'baseline': { 'self-baseline': true },
    },
    sm: {
      'start': { 'sm:self-start': true },
      'center': { 'sm:self-center': true },
      'end': { 'sm:self-end': true },
      'stretch': { 'sm:self-stretch': true },
      'baseline': { 'sm:self-baseline': true },
    },
    md: {
      'start': { 'md:self-start': true },
      'center': { 'md:self-center': true },
      'end': { 'md:self-end': true },
      'stretch': { 'md:self-stretch': true },
      'baseline': { 'md:self-baseline': true },
    },
    lg: {
      'start': { 'lg:self-start': true },
      'center': { 'lg:self-center': true },
      'end': { 'lg:self-end': true },
      'stretch': { 'lg:self-stretch': true },
      'baseline': { 'lg:self-baseline': true },
    },
    xl: {
      'start': { 'xl:self-start': true },
      'center': { 'xl:self-center': true },
      'end': { 'xl:self-end': true },
      'stretch': { 'xl:self-stretch': true },
      'baseline': { 'xl:self-baseline': true },
    },
    '2xl': {
      'start': { '2xl:self-start': true },
      'center': { '2xl:self-center': true },
      'end': { '2xl:self-end': true },
      'stretch': { '2xl:self-stretch': true },
      'baseline': { '2xl:self-baseline': true },
    },
  };

  const alignSelfClasses = (() => {
    if (typeof alignSelf === 'object') {
      return {
        ...(alignSelf.base ? alignSelfClassMap.base[alignSelf.base] : {}),
        ...(alignSelf.sm ? alignSelfClassMap.sm[alignSelf.sm] : {}),
        ...(alignSelf.md ? alignSelfClassMap.md[alignSelf.md] : {}),
        ...(alignSelf.lg ? alignSelfClassMap.lg[alignSelf.lg] : {}),
        ...(alignSelf.xl ? alignSelfClassMap.xl[alignSelf.xl] : {}),
        ...(alignSelf['2xl'] ? alignSelfClassMap['2xl'][alignSelf['2xl']] : {}),
      };
    }

    return alignSelf ? alignSelfClassMap.base[alignSelf] : {};
  })();

  // Combine all classes
  const allClasses = {
    ...orderClasses,
    ...growClasses,
    ...shrinkClasses,
    ...basisClasses,
    ...alignSelfClasses,
  };

  // Filter out undefined/null classes
  const classNames = Object.entries(allClasses)
    .filter(([, value]) => value)
    .map(([className]) => className)
    .join(' ');

  // Combine with user-provided classes
  const combinedClassNames = props.class
    ? `${classNames} ${props.class}`
    : classNames;

  return (
    <Element 
      {...rest}
      class={combinedClassNames}
    >
      <Slot />
    </Element>
  );
});

export default Flex;
