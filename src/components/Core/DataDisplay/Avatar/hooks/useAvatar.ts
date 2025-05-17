import { useSignal, useTask$, $ } from '@builder.io/qwik';
import type { Signal, QRL } from '@builder.io/qwik';
import type { 
  AvatarSize, 
  AvatarShape, 
  AvatarVariant, 
  AvatarStatus,
  AvatarStatusPosition
} from '../Avatar.types';

export interface UseAvatarParams {
  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;
  src?: string;
  status?: AvatarStatus;
  statusPosition?: AvatarStatusPosition;
  bordered?: boolean;
  borderColor?: string;
  loading?: boolean;
  clickable?: boolean;
  color?: string;
}

export interface UseAvatarReturn {
  imageLoaded: Signal<boolean>;
  imageError: Signal<boolean>;
  handleImageLoad$: QRL<() => void>;
  handleImageError$: QRL<() => void>;
  handleClick$: QRL<(e: MouseEvent) => void>;
  avatarClasses: string;
  sizeClasses: string;
  statusClasses: string;
  statusPositionClasses: string;
  statusSize: string;
}

export function useAvatar(
  params: UseAvatarParams,
  onClick$?: QRL<(event: MouseEvent) => void>
): UseAvatarReturn {
  const {
    size = 'md',
    shape = 'circle',
    variant = 'image',
    src,
    status = 'none',
    statusPosition = 'bottom-right',
    bordered = false,
    borderColor = 'white',
    loading = false,
    clickable = false,
    color = 'primary',
  } = params;

  // Handle image loading states
  const imageLoaded = useSignal(false);
  const imageError = useSignal(false);

  // Reset image states when src changes
  useTask$(({ track }) => {
    track(() => src);
    imageLoaded.value = false;
    imageError.value = false;
  });

  // Handle image load event
  const handleImageLoad$ = $(() => {
    imageLoaded.value = true;
  });

  // Handle image error event
  const handleImageError$ = $(() => {
    imageError.value = true;
  });

  // Store whether component is loading or disabled for click handler
  const isLoadingOrDisabled = loading;
  const handleClickFn = onClick$;

  // Click handler
  const handleClick$ = $((e: MouseEvent) => {
    if (isLoadingOrDisabled) return;
    if (handleClickFn) handleClickFn(e);
  });

  // Generate size classes for the avatar
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl',
  }[size];

  // Generate shape classes for the avatar
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-md',
  }[shape];

  // Generate color classes for initials and icon variants
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  }[color as string];

  // Generate border classes
  const borderClasses = bordered
    ? `border-2 ${
        borderColor === 'white'
          ? 'border-white dark:border-gray-800'
          : `border-${borderColor}`
      }`
    : '';
  
  // Generate status indicator classes
  const statusClasses = status !== 'none' 
    ? {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        away: 'bg-yellow-500',
        busy: 'bg-red-500',
      }[status]
    : '';
  
  // Generate status position classes
  const statusPositionClasses = status !== 'none'
    ? {
        'top-right': 'top-0 right-0',
        'top-left': 'top-0 left-0',
        'bottom-right': 'bottom-0 right-0',
        'bottom-left': 'bottom-0 left-0',
      }[statusPosition]
    : '';

  // Determine the status indicator size based on the avatar size
  const statusSize = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3.5 w-3.5',
    '2xl': 'h-4 w-4',
  }[size];

  // Generate loading state classes
  const loadingClasses = loading ? 'animate-pulse bg-gray-200 dark:bg-gray-700' : '';

  // Generate clickable classes
  const clickableClasses = clickable && !loading
    ? 'cursor-pointer hover:opacity-80 transition-opacity duration-200'
    : '';

  // Combined classes for the avatar
  const avatarClasses = [
    'relative inline-flex items-center justify-center overflow-hidden',
    sizeClasses,
    shapeClasses,
    variant !== 'image' || imageError.value || !src ? colorClasses : '',
    borderClasses,
    loadingClasses,
    clickableClasses,
  ].filter(Boolean).join(' ');

  return {
    imageLoaded,
    imageError,
    handleImageLoad$,
    handleImageError$,
    handleClick$,
    avatarClasses,
    sizeClasses,
    statusClasses,
    statusPositionClasses,
    statusSize
  };
} 