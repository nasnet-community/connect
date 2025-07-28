export interface UseListItemParams {
  active?: boolean;
  disabled?: boolean;
}

export interface UseListItemReturn {
  classes: string;
}

export function useListItem(
  params: UseListItemParams,
  className = "",
): UseListItemReturn {
  const { active = false, disabled = false } = params;

  const classes = [
    active ? "text-primary-600 dark:text-primary-400 font-medium" : "",
    disabled ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    classes,
  };
}
