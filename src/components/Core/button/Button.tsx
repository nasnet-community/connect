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
  | "info"
  | "cta"
  | "gradient"
  | "glow"
  | "glass"
  | "motion"
  | "premium";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonIconSize = "auto" | "xs" | "sm" | "md" | "lg";
export type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

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
  iconOnly?: boolean;
  fullWidth?: boolean;
  responsive?: boolean;
  ripple?: boolean;
  iconSize?: ButtonIconSize;
  radius?: ButtonRadius;
  shadow?: boolean;
  pulse?: boolean;
  gradientDirection?: "to-r" | "to-l" | "to-t" | "to-b" | "to-br" | "to-bl" | "to-tr" | "to-tl";
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
    iconOnly = false,
    fullWidth = false,
    responsive = false,
    ripple = true,
    iconSize = "auto",
    radius = "md",
    shadow = false,
    pulse = false,
    gradientDirection = "to-r",
    ...props
  }) => {
    const isRippling = useSignal(false);
    const rippleCoords = useSignal({ x: 0, y: 0 });

    const handleRipple = $((e: MouseEvent) => {
      if (!ripple || disabled || loading) return;

      const button = e.currentTarget as HTMLButtonElement;
      if (!button || typeof button.getBoundingClientRect !== 'function') return;
      
      const rect = button.getBoundingClientRect();
      if (!rect) return;
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      rippleCoords.value = { x, y };
      isRippling.value = true;

      setTimeout(() => {
        isRippling.value = false;
      }, 600);
    });

    const radiusClasses = {
      none: "rounded-none",
      sm: "rounded",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    };

    const baseClasses = [
      "relative inline-flex items-center justify-center font-medium",
      radiusClasses[radius],
      "transition-all duration-300 ease-in-out transform-gpu",
      "focus-visible:ring-4 focus-visible:outline-none",
      !disabled && !loading ? "active:scale-[0.97]" : "",
      fullWidth ? "w-full" : "",
      responsive ? "max-sm:w-full" : "",
      shadow && !disabled ? "shadow-lg hover:shadow-xl" : "",
      pulse && !disabled && !loading ? "animate-pulse" : "",
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
      cta: "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 focus-visible:ring-orange-300/50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
      gradient: "text-white focus-visible:ring-purple-300/50 shadow-lg hover:shadow-xl",
      glow: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-300/50 shadow-lg shadow-primary-600/50 hover:shadow-xl hover:shadow-primary-600/50 dark:shadow-primary-dark-500/50 dark:hover:shadow-primary-dark-500/50",
      glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 focus-visible:ring-white/30 dark:bg-gray-900/10 dark:border-gray-700/20 dark:hover:bg-gray-900/20",
      motion: "bg-gradient-to-br from-secondary-600 to-secondary-800 text-white hover:from-secondary-700 hover:to-secondary-900 focus-visible:ring-secondary-400/50 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 dark:from-secondary-dark-600 dark:to-secondary-dark-800 dark:hover:from-secondary-dark-700 dark:hover:to-secondary-dark-900",
      premium: "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 text-gray-900 hover:from-amber-300 hover:via-yellow-500 hover:to-amber-300 focus-visible:ring-yellow-400/50 shadow-lg hover:shadow-xl font-semibold tracking-wide relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:-skew-x-12 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-1000 dark:from-yellow-600 dark:via-amber-500 dark:to-yellow-600 dark:text-white dark:hover:from-yellow-700 dark:hover:via-amber-600 dark:hover:to-yellow-700",
    };

    const sizeClasses = iconOnly ? {
      // Equal padding for icon-only buttons
      xs: "p-1.5",
      sm: "p-2",
      md: "p-2.5",
      lg: "p-3",
      xl: "p-3.5",
    } : {
      xs: [
        "text-xs px-2.5 py-1.5",
        "sm:text-xs sm:px-2.5 sm:py-1.5",
        "max-sm:text-xs max-sm:px-3 max-sm:py-2 max-sm:min-h-[36px]",
      ].join(" "),
      sm: [
        "text-xs px-3 py-2",
        "sm:text-xs sm:px-3 sm:py-2",
        "max-sm:text-sm max-sm:px-4 max-sm:py-2.5 max-sm:min-h-[40px]",
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
      xl: [
        "text-lg px-6 py-3.5",
        "sm:text-lg sm:px-6 sm:py-3.5",
        "max-sm:text-xl max-sm:px-7 max-sm:py-4 max-sm:min-h-[52px]",
      ].join(" "),
    };

    const iconSizeClasses = {
      auto: {
        xs: "h-3 w-3 max-sm:h-3.5 max-sm:w-3.5",
        sm: "h-3.5 w-3.5 max-sm:h-4 max-sm:w-4",
        md: "h-4 w-4 max-sm:h-5 max-sm:w-5",
        lg: "h-5 w-5 max-sm:h-6 max-sm:w-6",
        xl: "h-6 w-6 max-sm:h-7 max-sm:w-7",
      },
      xs: "h-3 w-3",
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

    const gradientClasses =
      variant === "gradient"
        ? `bg-gradient-${gradientDirection} from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700`
        : "";

    const classes = [
      baseClasses,
      variantClasses[variant],
      gradientClasses,
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
        onClick$={props.onClick$}
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
          <span class={`${!iconOnly ? 'mr-2' : ''} ${getIconClass()}`}>
            <Slot name="leftIcon" />
          </span>
        )}
        <Slot />
        {rightIcon && (
          <span class={`${!iconOnly ? 'ml-2' : ''} ${getIconClass()}`}>
            <Slot name="rightIcon" />
          </span>
        )}
        {loading && (
          <span class="absolute inset-0 flex items-center justify-center">
            <Spinner
              size={
                size === "xs"
                  ? "xs"
                  : size === "sm"
                    ? "xs"
                    : size === "lg"
                      ? "md"
                      : size === "xl"
                        ? "lg"
                        : "sm"
              }
              color={
                ["primary", "success", "error", "info", "cta", "gradient", "glow", "motion", "premium"].includes(
                  variant,
                )
                  ? "white"
                  : variant === "warning"
                    ? "warning"
                    : variant === "glass"
                      ? "secondary"
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
