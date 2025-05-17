import type { SpinnerProps } from './Spinner.types';

export function useSpinner(props: SpinnerProps) {
  const {
    size = 'md',
    color = 'primary',
    variant = 'border',
    speed = 1000,
    showLabel = false,
    label = 'Loading...',
    labelPosition = 'right',
    class: className = '',
    ariaLabel = 'Loading',
    centered = false,
    labelClass = '',
  } = props;

  // Generate size classes for different variants
  const sizeClasses = {
    border: {
      xs: 'h-4 w-4 border-2',
      sm: 'h-5 w-5 border-2',
      md: 'h-8 w-8 border-[3px]',
      lg: 'h-12 w-12 border-4',
      xl: 'h-16 w-16 border-4',
    },
    grow: {
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    },
    dots: {
      xs: 'h-4',
      sm: 'h-5',
      md: 'h-8',
      lg: 'h-12',
      xl: 'h-16',
    },
    bars: {
      xs: 'h-4',
      sm: 'h-5',
      md: 'h-8',
      lg: 'h-12',
      xl: 'h-16',
    },
    circle: {
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    }
  }[variant][size];

  // Generate color classes for different variants
  const colorClasses = {
    border: {
      primary: 'border-primary-600 border-t-transparent dark:border-primary-500 dark:border-t-transparent',
      secondary: 'border-secondary-600 border-t-transparent dark:border-secondary-500 dark:border-t-transparent',
      success: 'border-green-600 border-t-transparent dark:border-green-500 dark:border-t-transparent',
      warning: 'border-yellow-600 border-t-transparent dark:border-yellow-500 dark:border-t-transparent',
      error: 'border-red-600 border-t-transparent dark:border-red-500 dark:border-t-transparent',
      info: 'border-blue-600 border-t-transparent dark:border-blue-500 dark:border-t-transparent',
      white: 'border-white border-t-transparent',
    },
    grow: {
      primary: 'bg-primary-600 dark:bg-primary-500',
      secondary: 'bg-secondary-600 dark:bg-secondary-500',
      success: 'bg-green-600 dark:bg-green-500',
      warning: 'bg-yellow-600 dark:bg-yellow-500',
      error: 'bg-red-600 dark:bg-red-500',
      info: 'bg-blue-600 dark:bg-blue-500',
      white: 'bg-white',
    },
    dots: {
      primary: 'text-primary-600 dark:text-primary-500',
      secondary: 'text-secondary-600 dark:text-secondary-500',
      success: 'text-green-600 dark:text-green-500',
      warning: 'text-yellow-600 dark:text-yellow-500',
      error: 'text-red-600 dark:text-red-500',
      info: 'text-blue-600 dark:text-blue-500',
      white: 'text-white',
    },
    bars: {
      primary: 'text-primary-600 dark:text-primary-500',
      secondary: 'text-secondary-600 dark:text-secondary-500',
      success: 'text-green-600 dark:text-green-500',
      warning: 'text-yellow-600 dark:text-yellow-500',
      error: 'text-red-600 dark:text-red-500',
      info: 'text-blue-600 dark:text-blue-500',
      white: 'text-white',
    },
    circle: {
      primary: 'text-primary-600 dark:text-primary-500',
      secondary: 'text-secondary-600 dark:text-secondary-500',
      success: 'text-green-600 dark:text-green-500',
      warning: 'text-yellow-600 dark:text-yellow-500',
      error: 'text-red-600 dark:text-red-500',
      info: 'text-blue-600 dark:text-blue-500',
      white: 'text-white',
    }
  }[variant][color];

  // Generate label position classes
  const labelPositionClasses = {
    top: 'flex-col items-center',
    right: 'flex-row items-center',
    bottom: 'flex-col-reverse items-center',
    left: 'flex-row-reverse items-center',
  }[labelPosition];

  // Generate label spacing classes based on position
  const labelSpacingClasses = {
    top: 'mt-2',
    right: 'ml-2',
    bottom: 'mb-2',
    left: 'mr-2',
  }[labelPosition];

  // Generate animation duration style
  const animationDuration = `${speed}ms`;

  // Generate centered class
  const centeredClass = centered ? 'mx-auto' : '';
  
  return {
    sizeClasses,
    colorClasses,
    labelPositionClasses,
    labelSpacingClasses,
    animationDuration,
    centeredClass,
    variant,
    showLabel,
    label,
    labelClass,
    className,
    ariaLabel,
    speed
  };
} 