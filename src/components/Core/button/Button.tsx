import { component$, Slot, type QRL } from "@builder.io/qwik";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  class?: string;
  onClick$?: QRL<() => void>;
  "aria-label"?: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
}

export const Button = component$<ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    type = "button",
    disabled = false,
    loading = false,
    "aria-label": ariaLabel,
    leftIcon = false,
    rightIcon = false,
    ...props
  }) => {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg focus:ring-4 transition-colors";
    
    const variantClasses = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700",
      outline:
        "border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-200 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
    };

    const sizeClasses = {
      sm: "text-xs px-3 py-2",
      md: "text-sm px-4 py-2.5",
      lg: "text-base px-5 py-3",
    };

    const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

    const loadingClasses = loading ? "relative text-transparent" : "";

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabled || loading ? disabledClasses : "",
      loadingClasses,
      props.class,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        type={type}
        disabled={disabled || loading}
        {...props}
        aria-label={ariaLabel}
        class={classes}
      >
        {leftIcon && <span class="mr-2"><Slot name="leftIcon" /></span>}
        <Slot />
        {rightIcon && <span class="ml-2"><Slot name="rightIcon" /></span>}
        {loading && (
          <span class="absolute inset-0 flex items-center justify-center">
            <svg
              class="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
      </button>
    );
  }
);
