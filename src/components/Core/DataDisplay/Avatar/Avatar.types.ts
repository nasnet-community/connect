import type { JSXChildren, QRL } from "@builder.io/qwik";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ResponsiveAvatarSize =
  | AvatarSize
  | {
      mobile?: AvatarSize;
      tablet?: AvatarSize;
      desktop?: AvatarSize;
    };
export type AvatarShape = "circle" | "square" | "rounded";
export type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";
export type AvatarVariant = "image" | "initials" | "icon";
export type AvatarStatusPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface AvatarProps {
  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;
  src?: string;
  alt?: string;
  initials?: string;
  icon?: JSXChildren;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "gray";
  status?: AvatarStatus;
  statusPosition?: AvatarStatusPosition;
  bordered?: boolean;
  borderColor?: string;
  loading?: boolean;
  clickable?: boolean;
  onClick$?: QRL<(event: MouseEvent) => void>;
  href?: string;
  target?: string;
  class?: string;
  id?: string;
  ariaLabel?: string;
}

export interface AvatarGroupProps {
  children?: JSXChildren;
  max?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
  bordered?: boolean;
  spacing?: "sm" | "md" | "lg";
  class?: string;
  total?: number;
}
