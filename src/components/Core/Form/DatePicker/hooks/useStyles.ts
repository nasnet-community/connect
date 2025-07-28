export interface UseStylesResult {
  containerClasses: string;
  inputClasses: string;
}

export function useStyles(
  size: string,
  disabled: boolean,
  fullWidth: boolean,
  errorMessage: string | undefined,
  isFocused: { value: boolean },
  containerClass?: string,
  inputClass?: string,
): UseStylesResult {
  // Size-specific styles
  const sizeStyles =
    {
      sm: "px-2 py-1.5 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base",
    }[size] || "px-3 py-2 text-sm";

  // Determine container classes
  const containerClasses = [
    "relative space-y-1",
    fullWidth ? "w-full" : "",
    disabled ? "opacity-60 cursor-not-allowed" : "",
    containerClass || "",
  ]
    .filter(Boolean)
    .join(" ");

  // Determine input classes with proper responsive and dark mode support
  const inputClasses = [
    // Base input styles
    "block w-full rounded-md border shadow-sm transition-colors duration-200",
    "bg-white dark:bg-surface-dark-secondary",
    "text-gray-900 dark:text-gray-50",
    "placeholder-gray-400 dark:placeholder-gray-500",
    "focus:outline-none focus:ring-1",

    // Size styles
    sizeStyles,

    // State-specific border and ring colors
    errorMessage
      ? "border-error-300 dark:border-error-600 focus:border-error-500 dark:focus:border-error-400 focus:ring-error-500 dark:focus:ring-error-400"
      : "border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400",

    // Hover and disabled states
    disabled
      ? "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
      : "hover:border-gray-400 dark:hover:border-gray-500",

    // Focus state (visual feedback for focused state)
    isFocused.value ? "ring-1" : "",

    // Custom class
    inputClass || "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    containerClasses,
    inputClasses,
  };
}
