import type { AvatarSize, AvatarShape } from "../Avatar.types";

export interface UseAvatarGroupParams {
  max?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
  bordered?: boolean;
  spacing?: "sm" | "md" | "lg";
  total?: number;
}

export interface UseAvatarGroupReturn {
  spacingClasses: string;
  avatarGroupClasses: string;
  moreAvatarClasses: string;
  remainingCount: number | undefined;
}

export function useAvatarGroup(
  params: UseAvatarGroupParams,
  className = "",
): UseAvatarGroupReturn {
  const {
    max = 5,
    size = "md",
    shape = "circle",
    bordered = true,
    spacing = "md",
    total,
  } = params;

  // Calculate the negative margin for overlapping avatars
  const spacingClasses = {
    sm: "-ml-1",
    md: "-ml-2",
    lg: "-ml-3",
  }[spacing];

  // Calculate remaining count
  const remainingCount = total && total > max ? total - max : undefined;

  // Create classes for the avatar group
  const avatarGroupClasses = ["flex items-center", className]
    .filter(Boolean)
    .join(" ");

  // Create classes for the "more" avatar
  const moreAvatarClasses = [
    "flex items-center justify-center font-medium",
    {
      circle: "rounded-full",
      square: "rounded-none",
      rounded: "rounded-md",
    }[shape],
    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    bordered ? "border-2 border-white dark:border-gray-800" : "",
    {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-lg",
      "2xl": "h-20 w-20 text-xl",
    }[size],
  ]
    .filter(Boolean)
    .join(" ");

  return {
    spacingClasses,
    avatarGroupClasses,
    moreAvatarClasses,
    remainingCount,
  };
}
