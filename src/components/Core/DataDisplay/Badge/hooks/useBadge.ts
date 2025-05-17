import { useSignal, $ } from '@builder.io/qwik';
import type { Signal, QRL } from '@builder.io/qwik';
import type { BadgeSize, BadgeVariant } from '../Badge.types';

// Define colors to match the object keys
export type BadgeColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark';

export interface UseBadgeParams {
  size?: BadgeSize;
  variant?: BadgeVariant;
  color?: BadgeColor;
  closable?: boolean;
  disabled?: boolean;
  onDismiss$?: QRL<() => void>;
}

export interface UseBadgeReturn {
  visible: Signal<boolean>;
  handleClose$: QRL<(event: MouseEvent) => void>;
  badgeClasses: string;
  handleDismiss$: QRL<() => void>;
}

export function useBadge(params: UseBadgeParams, className = ''): UseBadgeReturn {
  const {
    size = 'md',
    variant = 'solid',
    color = 'primary',
    disabled = false,
    onDismiss$,
    closable = false,
  } = params;

  // Visibility state
  const visible = useSignal(true);

  // Handle dismiss button click
  const handleDismiss$ = $(() => {
    if (onDismiss$) {
      onDismiss$();
    }
  });

  // Handle close event
  const handleClose$ = $((event: MouseEvent) => {
    event.stopPropagation();
    if (!disabled) {
      visible.value = false;
    }
  });

  // Determine badge classes based on props
  const colorMap = {
    solid: {
      primary: 'bg-primary-500 text-white',
      secondary: 'bg-secondary-500 text-white',
      info: 'bg-blue-500 text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white',
      error: 'bg-red-500 text-white',
      light: 'bg-gray-100 text-gray-800',
      dark: 'bg-gray-900 text-white',
    },
    outline: {
      primary: 'border border-primary-500 text-primary-500 bg-transparent',
      secondary: 'border border-secondary-500 text-secondary-500 bg-transparent',
      info: 'border border-blue-500 text-blue-500 bg-transparent',
      success: 'border border-green-500 text-green-500 bg-transparent',
      warning: 'border border-yellow-500 text-yellow-500 bg-transparent',
      error: 'border border-red-500 text-red-500 bg-transparent',
      light: 'border border-gray-200 text-gray-800 bg-transparent',
      dark: 'border border-gray-700 text-gray-800 bg-transparent',
    },
    soft: {
      primary: 'bg-primary-100 text-primary-800',
      secondary: 'bg-secondary-100 text-secondary-800',
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      light: 'bg-gray-50 text-gray-800',
      dark: 'bg-gray-200 text-gray-800',
    },
  };

  const variantClasses = colorMap[variant][color];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  }[size];

  const stateClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const closeableClasses = closable ? 'pr-1' : '';

  const badgeClasses = [
    'inline-flex items-center font-medium rounded-full',
    variantClasses,
    sizeClasses,
    stateClasses,
    closeableClasses,
    className,
  ].filter(Boolean).join(' ');

  return {
    visible,
    handleClose$,
    badgeClasses,
    handleDismiss$,
  };
} 