import type { 
  ListVariant, 
  ListSize, 
  ListSpacing, 
  ListMarker 
} from '../List.types';

export interface UseListParams {
  variant?: ListVariant;
  size?: ListSize;
  spacing?: ListSpacing;
  marker?: ListMarker;
  nested?: boolean;
}

export interface UseListReturn {
  baseClasses: string;
}

export function useList(
  params: UseListParams,
  className = ''
): UseListReturn {
  const {
    variant = 'unordered',
    size = 'md',
    spacing = 'normal',
    marker = variant === 'ordered' ? 'decimal' : 'disc',
    nested = false,
  } = params;

  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[size];

  // Spacing classes
  const spacingClasses = {
    compact: 'space-y-1',
    normal: 'space-y-2',
    relaxed: 'space-y-3',
  }[spacing];

  // Marker classes for unordered lists
  const markerClasses = variant === 'unordered' 
    ? {
        disc: 'list-disc',
        circle: 'list-circle',
        square: 'list-square',
        none: 'list-none',
        // These are not valid for unordered lists but included for type safety
        decimal: 'list-disc',
        roman: 'list-disc',
        alpha: 'list-disc',
      }[marker]
    : variant === 'ordered'
      ? {
          decimal: 'list-decimal',
          roman: 'list-roman',
          alpha: 'list-alpha',
          disc: 'list-decimal',
          circle: 'list-decimal',
          square: 'list-decimal',
          none: 'list-none',
        }[marker]
      : '';

  // Base classes
  const baseClasses = [
    sizeClasses,
    spacingClasses,
    variant !== 'definition' ? markerClasses : '',
    nested ? 'mt-2' : '',
    variant !== 'definition' ? 'pl-6' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return {
    baseClasses
  };
} 