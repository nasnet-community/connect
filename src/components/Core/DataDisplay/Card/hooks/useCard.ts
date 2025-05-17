import { useSignal, $ } from '@builder.io/qwik';
import type { Signal, QRL } from '@builder.io/qwik';
import type { CardVariant } from '../Card.types';

// Define size type to match the object keys
export type CardSize = 'sm' | 'md' | 'lg' | 'xl';

export interface UseCardParams {
  variant?: CardVariant;
  size?: CardSize;
  bordered?: boolean;
  hoverable?: boolean;
  disabled?: boolean;
  selected?: boolean;
  clickable?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface UseCardReturn {
  isHovered: Signal<boolean>;
  handleMouseEnter$: QRL<() => void>;
  handleMouseLeave$: QRL<() => void>;
  handleClick$: QRL<(e: MouseEvent) => void>;
  cardClasses: string;
}

export function useCard(params: UseCardParams, className = ''): UseCardReturn {
  const {
    variant = 'default',
    size = 'md',
    bordered = false,
    hoverable = false,
    disabled = false,
    selected = false,
    clickable = false,
    rounded = 'md',
  } = params;

  // State for hover effects
  const isHovered = useSignal(false);

  // Mouse event handlers
  const handleMouseEnter$ = $(() => {
    if (!disabled && (hoverable || clickable)) {
      isHovered.value = true;
    }
  });

  const handleMouseLeave$ = $(() => {
    if (!disabled && (hoverable || clickable)) {
      isHovered.value = false;
    }
  });

  const handleClick$ = $((e: MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // Base classes
  const baseClasses = [
    'relative',
    'overflow-hidden',
    'transition-all',
    'duration-200',
  ];

  // Size classes
  const sizeMap: Record<CardSize, string> = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
    xl: 'p-6',
  };
  const sizeClasses = sizeMap[size];

  // Border radius classes
  const roundedMap: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };
  const roundedClasses = roundedMap[rounded];

  // Variant classes
  const variantMap: Record<string, string> = {
    default: 'bg-white dark:bg-gray-800',
    outlined: 'bg-transparent',
    filled: 'bg-gray-100 dark:bg-gray-900',
  };
  const variantClasses = variantMap[variant];

  // Border classes
  const borderClasses = bordered || variant === 'outlined' 
    ? 'border border-gray-200 dark:border-gray-700' 
    : '';

  // Hover classes
  const hoverClasses = hoverable && !disabled
    ? 'hover:shadow-md dark:hover:shadow-gray-900/30'
    : '';

  // Selected state
  const selectedClasses = selected
    ? 'ring-2 ring-primary-500 dark:ring-primary-400'
    : '';

  // Disabled state
  const disabledClasses = disabled
    ? 'opacity-60 cursor-not-allowed'
    : '';

  // Clickable state
  const clickableClasses = clickable && !disabled
    ? 'cursor-pointer hover:shadow-md dark:hover:shadow-gray-900/30'
    : '';

  // Combine all classes
  const cardClasses = [
    ...baseClasses,
    sizeClasses,
    roundedClasses,
    variantClasses,
    borderClasses,
    hoverClasses,
    selectedClasses,
    disabledClasses,
    clickableClasses,
    className,
  ].filter(Boolean).join(' ');

  return {
    isHovered,
    handleMouseEnter$,
    handleMouseLeave$,
    handleClick$,
    cardClasses,
  };
} 