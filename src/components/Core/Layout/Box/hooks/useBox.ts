import type { BoxProps } from '../Box.types';

export function useBox(props: BoxProps) {
  const {
    padding = 'none',
    margin = 'none',
    borderRadius = 'none',
    borderWidth = 'none',
    borderStyle = 'solid',
    borderColor = 'default',
    backgroundColor = 'transparent',
    shadow = 'none',
    fullWidth = false,
    fullHeight = false,
  } = props;

  // Generate padding classes
  const paddingClasses = (() => {
    if (typeof padding === 'string') {
      return {
        'p-0': padding === 'none',
        'p-1': padding === 'xs',
        'p-2': padding === 'sm',
        'p-4': padding === 'md',
        'p-6': padding === 'lg',
        'p-8': padding === 'xl',
        'p-10': padding === '2xl',
        'p-12': padding === '3xl',
      };
    }

    return {
      'p-0': padding.all === 'none',
      'p-1': padding.all === 'xs',
      'p-2': padding.all === 'sm',
      'p-4': padding.all === 'md',
      'p-6': padding.all === 'lg',
      'p-8': padding.all === 'xl',
      'p-10': padding.all === '2xl',
      'p-12': padding.all === '3xl',
      'px-0': padding.x === 'none',
      'px-1': padding.x === 'xs',
      'px-2': padding.x === 'sm',
      'px-4': padding.x === 'md',
      'px-6': padding.x === 'lg',
      'px-8': padding.x === 'xl',
      'px-10': padding.x === '2xl',
      'px-12': padding.x === '3xl',
      'py-0': padding.y === 'none',
      'py-1': padding.y === 'xs',
      'py-2': padding.y === 'sm',
      'py-4': padding.y === 'md',
      'py-6': padding.y === 'lg',
      'py-8': padding.y === 'xl',
      'py-10': padding.y === '2xl',
      'py-12': padding.y === '3xl',
      'pt-0': padding.top === 'none',
      'pt-1': padding.top === 'xs',
      'pt-2': padding.top === 'sm',
      'pt-4': padding.top === 'md',
      'pt-6': padding.top === 'lg',
      'pt-8': padding.top === 'xl',
      'pt-10': padding.top === '2xl',
      'pt-12': padding.top === '3xl',
      'pr-0': padding.right === 'none',
      'pr-1': padding.right === 'xs',
      'pr-2': padding.right === 'sm',
      'pr-4': padding.right === 'md',
      'pr-6': padding.right === 'lg',
      'pr-8': padding.right === 'xl',
      'pr-10': padding.right === '2xl',
      'pr-12': padding.right === '3xl',
      'pb-0': padding.bottom === 'none',
      'pb-1': padding.bottom === 'xs',
      'pb-2': padding.bottom === 'sm',
      'pb-4': padding.bottom === 'md',
      'pb-6': padding.bottom === 'lg',
      'pb-8': padding.bottom === 'xl',
      'pb-10': padding.bottom === '2xl',
      'pb-12': padding.bottom === '3xl',
      'pl-0': padding.left === 'none',
      'pl-1': padding.left === 'xs',
      'pl-2': padding.left === 'sm',
      'pl-4': padding.left === 'md',
      'pl-6': padding.left === 'lg',
      'pl-8': padding.left === 'xl',
      'pl-10': padding.left === '2xl',
      'pl-12': padding.left === '3xl',
    };
  })();

  // Generate margin classes
  const marginClasses = (() => {
    if (typeof margin === 'string') {
      return {
        'm-0': margin === 'none',
        'm-1': margin === 'xs',
        'm-2': margin === 'sm',
        'm-4': margin === 'md',
        'm-6': margin === 'lg',
        'm-8': margin === 'xl',
        'm-10': margin === '2xl',
        'm-12': margin === '3xl',
      };
    }

    return {
      'm-0': margin.all === 'none',
      'm-1': margin.all === 'xs',
      'm-2': margin.all === 'sm',
      'm-4': margin.all === 'md',
      'm-6': margin.all === 'lg',
      'm-8': margin.all === 'xl',
      'm-10': margin.all === '2xl',
      'm-12': margin.all === '3xl',
      'mx-0': margin.x === 'none',
      'mx-1': margin.x === 'xs',
      'mx-2': margin.x === 'sm',
      'mx-4': margin.x === 'md',
      'mx-6': margin.x === 'lg',
      'mx-8': margin.x === 'xl',
      'mx-10': margin.x === '2xl',
      'mx-12': margin.x === '3xl',
      'my-0': margin.y === 'none',
      'my-1': margin.y === 'xs',
      'my-2': margin.y === 'sm',
      'my-4': margin.y === 'md',
      'my-6': margin.y === 'lg',
      'my-8': margin.y === 'xl',
      'my-10': margin.y === '2xl',
      'my-12': margin.y === '3xl',
      'mt-0': margin.top === 'none',
      'mt-1': margin.top === 'xs',
      'mt-2': margin.top === 'sm',
      'mt-4': margin.top === 'md',
      'mt-6': margin.top === 'lg',
      'mt-8': margin.top === 'xl',
      'mt-10': margin.top === '2xl',
      'mt-12': margin.top === '3xl',
      'mr-0': margin.right === 'none',
      'mr-1': margin.right === 'xs',
      'mr-2': margin.right === 'sm',
      'mr-4': margin.right === 'md',
      'mr-6': margin.right === 'lg',
      'mr-8': margin.right === 'xl',
      'mr-10': margin.right === '2xl',
      'mr-12': margin.right === '3xl',
      'mb-0': margin.bottom === 'none',
      'mb-1': margin.bottom === 'xs',
      'mb-2': margin.bottom === 'sm',
      'mb-4': margin.bottom === 'md',
      'mb-6': margin.bottom === 'lg',
      'mb-8': margin.bottom === 'xl',
      'mb-10': margin.bottom === '2xl',
      'mb-12': margin.bottom === '3xl',
      'ml-0': margin.left === 'none',
      'ml-1': margin.left === 'xs',
      'ml-2': margin.left === 'sm',
      'ml-4': margin.left === 'md',
      'ml-6': margin.left === 'lg',
      'ml-8': margin.left === 'xl',
      'ml-10': margin.left === '2xl',
      'ml-12': margin.left === '3xl',
    };
  })();

  // Generate border radius classes
  const borderRadiusClasses = {
    'rounded-none': borderRadius === 'none',
    'rounded-sm': borderRadius === 'xs',
    'rounded': borderRadius === 'sm',
    'rounded-md': borderRadius === 'md',
    'rounded-lg': borderRadius === 'lg',
    'rounded-xl': borderRadius === 'xl',
    'rounded-full': borderRadius === 'full',
  };

  // Generate border width classes
  const borderWidthClasses = {
    'border-0': borderWidth === 'none',
    'border': borderWidth === 'thin',
    'border-2': borderWidth === 'normal',
    'border-4': borderWidth === 'thick',
  };

  // Generate border style classes
  const borderStyleClasses = {
    'border-solid': borderStyle === 'solid',
    'border-dashed': borderStyle === 'dashed',
    'border-dotted': borderStyle === 'dotted',
    'border-double': borderStyle === 'double',
    'border-none': borderStyle === 'none',
  };

  // Generate border color classes
  const borderColorClasses = {
    'border-gray-300 dark:border-gray-700': borderColor === 'default',
    'border-primary': borderColor === 'primary',
    'border-secondary': borderColor === 'secondary',
    'border-success': borderColor === 'success',
    'border-warning': borderColor === 'warning',
    'border-error': borderColor === 'error',
    'border-info': borderColor === 'info',
    'border-muted': borderColor === 'muted',
  };

  // Generate background color classes
  const backgroundColorClasses = {
    'bg-transparent': backgroundColor === 'transparent',
    'bg-primary': backgroundColor === 'primary',
    'bg-secondary': backgroundColor === 'secondary',
    'bg-success': backgroundColor === 'success',
    'bg-warning': backgroundColor === 'warning',
    'bg-error': backgroundColor === 'error',
    'bg-info': backgroundColor === 'info',
    'bg-muted': backgroundColor === 'muted',
    'bg-white dark:bg-gray-800': backgroundColor === 'surface',
    'bg-gray-50 dark:bg-gray-900': backgroundColor === 'surface-alt',
  };

  // Generate shadow classes
  const shadowClasses = {
    'shadow-none': shadow === 'none',
    'shadow-sm': shadow === 'sm',
    'shadow': shadow === 'md',
    'shadow-lg': shadow === 'lg',
    'shadow-xl': shadow === 'xl',
    'shadow-2xl': shadow === '2xl',
    'shadow-inner': shadow === 'inner',
  };

  // Generate width and height classes
  const dimensionClasses = {
    'w-full': fullWidth,
    'h-full': fullHeight,
  };

  // Combine all classes
  const allClasses = {
    ...paddingClasses,
    ...marginClasses,
    ...borderRadiusClasses,
    ...borderWidthClasses,
    ...borderStyleClasses,
    ...borderColorClasses,
    ...backgroundColorClasses,
    ...shadowClasses,
    ...dimensionClasses,
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

  return {
    combinedClassNames
  };
} 