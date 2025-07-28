import { component$, Slot, type QRL, useSignal, $ } from "@builder.io/qwik";
import { Spinner } from "../DataDisplay/Progress/Spinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "success"
  | "error"
  | "warning"
  | "info";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonIconSize = "auto" | "sm" | "md" | "lg";

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
  fullWidth?: boolean;
  responsive?: boolean;
  ripple?: boolean;
  iconSize?: ButtonIconSize;
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
    fullWidth = false,
    responsive = false,
    ripple = true,
    iconSize = "auto",
    ...props
  }) => {
    const isRippling = useSignal(false);
    const rippleCoords = useSignal({ x: 0, y: 0 });

    const handleRipple = $((e: MouseEvent) => {
      if (!ripple || disabled || loading) return;

      const button = e.currentTarget as HTMLButtonElement;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      rippleCoords.value = { x, y };
      isRippling.value = true;

      setTimeout(() => {
        isRippling.value = false;
      }, 600);
    });

    const baseClasses = [
      "relative inline-flex items-center justify-center font-medium rounded-lg",
      "transition-all duration-200",
      "focus-visible:ring-4 focus-visible:outline-none",
      "active:scale-[0.97]",
      fullWidth ? "w-full" : "",
      responsive ? "max-sm:w-full" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const variantClasses = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-300/50 dark:bg-primary-dark-500 dark:hover:bg-primary-dark-400 dark:focus-visible:ring-primary-dark-300/50",
      secondary:
        "bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus-visible:ring-secondary-200/50 dark:bg-secondary-dark-200 dark:text-secondary-dark-900 dark:hover:bg-secondary-dark-300 dark:focus-visible:ring-secondary-dark-700/50",
      outline:
        "border-2 border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-200/50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700/50",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-200/50 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-700/50",
      success:
        "bg-success-600 text-white hover:bg-success-700 focus-visible:ring-success-300/50 dark:bg-success-dark dark:hover:bg-success-700 dark:focus-visible:ring-success-dark/50",
      error:
        "bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-300/50 dark:bg-error-dark dark:hover:bg-error-700 dark:focus-visible:ring-error-dark/50",
      warning:
        "bg-warning-600 text-warning-900 hover:bg-warning-700 focus-visible:ring-warning-300/50 dark:bg-warning-dark dark:text-warning-100 dark:hover:bg-warning-700 dark:focus-visible:ring-warning-dark/50",
      info: "bg-info-600 text-white hover:bg-info-700 focus-visible:ring-info-300/50 dark:bg-info-dark dark:hover:bg-info-700 dark:focus-visible:ring-info-dark/50",
    };

    const sizeClasses = {
      sm: [
        "text-xs px-3 py-2",
        "sm:text-xs sm:px-3 sm:py-2",
        "max-sm:text-sm max-sm:px-4 max-sm:py-2.5 max-sm:min-h-[44px]",
      ].join(" "),
      md: [
        "text-sm px-4 py-2.5",
        "sm:text-sm sm:px-4 sm:py-2.5",
        "max-sm:text-base max-sm:px-5 max-sm:py-3 max-sm:min-h-[44px]",
      ].join(" "),
      lg: [
        "text-base px-5 py-3",
        "sm:text-base sm:px-5 sm:py-3",
        "max-sm:text-lg max-sm:px-6 max-sm:py-3.5 max-sm:min-h-[48px]",
      ].join(" "),
    };

    const iconSizeClasses = {
      auto: {
        sm: "h-3.5 w-3.5 max-sm:h-4 max-sm:w-4",
        md: "h-4 w-4 max-sm:h-5 max-sm:w-5",
        lg: "h-5 w-5 max-sm:h-6 max-sm:w-6",
      },
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

    const loadingClasses = loading ? "relative text-transparent" : "";

    const getIconClass = () => {
      if (iconSize === "auto") {
        return iconSizeClasses.auto[size];
      }
      return iconSizeClasses[iconSize];
    };

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
        onMouseDown$={handleRipple}
      >
        {ripple && isRippling.value && (
          <span
            class="pointer-events-none absolute animate-ripple"
            style={{
              left: `${rippleCoords.value.x}px`,
              top: `${rippleCoords.value.y}px`,
              width: "20px",
              height: "20px",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              backgroundColor: "currentColor",
              opacity: "0.3",
            }}
          />
        )}
        {leftIcon && (
          <span class={`mr-2 ${getIconClass()}`}>
            <Slot name="leftIcon" />
          </span>
        )}
        <Slot />
        {rightIcon && (
          <span class={`ml-2 ${getIconClass()}`}>
            <Slot name="rightIcon" />
          </span>
        )}
        {loading && (
          <span class="absolute inset-0 flex items-center justify-center">
            <Spinner
              size={size === "sm" ? "xs" : size === "lg" ? "md" : "sm"}
              color={
                ["primary", "success", "error", "info"].includes(variant)
                  ? "white"
                  : variant === "warning"
                    ? "warning"
                    : "primary"
              }
              variant="circle"
            />
          </span>
        )}
      </button>
    );
  },
);
