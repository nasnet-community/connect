import { JSXChildren, QRL } from '@builder.io/qwik';

export type CardElevation = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CardRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type CardVariant = 'default' | 'outlined' | 'filled';
export type CardHoverEffect = 'none' | 'raise' | 'border' | 'shadow';

export interface CardProps {
  children?: JSXChildren;
  class?: string;
  id?: string;
  elevation?: CardElevation;
  radius?: CardRadius;
  variant?: CardVariant;
  hoverEffect?: CardHoverEffect;
  interactive?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  bgColor?: string;
  borderColor?: string;
  href?: string;
  target?: string;
  as?: string;
  onClick$?: QRL<(event: MouseEvent) => void>;
}

export interface CardHeaderProps {
  children?: JSXChildren;
  class?: string;
  bordered?: boolean;
  compact?: boolean;
}

export interface CardBodyProps {
  children?: JSXChildren;
  class?: string;
  compact?: boolean;
}

export interface CardFooterProps {
  children?: JSXChildren;
  class?: string;
  bordered?: boolean;
  compact?: boolean;
}

export interface CardMediaProps {
  src: string;
  alt?: string;
  class?: string;
  height?: string;
  width?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  isTop?: boolean;
  overlay?: JSXChildren;
  overlayOpacity?: number;
  overlayColor?: string;
}
