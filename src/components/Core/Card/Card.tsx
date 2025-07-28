import { component$, Slot } from "@builder.io/qwik";
import { Spinner } from "~/components/Core/DataDisplay/Progress/Spinner";

export type CardVariant =
  | "default"
  | "bordered"
  | "elevated"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "glass"
  | "gradient";

export interface CardProps {
  variant?: CardVariant;
  class?: string;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasActions?: boolean;
  loading?: boolean;
  noPadding?: boolean;
  // Accessibility props
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  // Data attributes for styling hooks
  "data-testid"?: string;
  "data-card-variant"?: string;
  // Container query support
  containerClass?: string;
}

export const Card = component$<CardProps>(
  ({
    variant = "default",
    hasHeader = false,
    hasFooter = false,
    hasActions = false,
    loading = false,
    noPadding = false,
    role = "article",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "data-testid": dataTestId,
    "data-card-variant": dataCardVariant,
    containerClass,
    ...props
  }) => {
    // Base classes with mobile-first responsive design and container query support
    const baseClasses = [
      "overflow-hidden",
      "rounded-lg",
      "transition-all duration-200",
      // Mobile-first responsive border radius
      "mobile:rounded-md tablet:rounded-lg desktop:rounded-xl",
      // Focus visible states for accessibility
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      // Container query support
      "@container",
    ].join(" ");

    // Enhanced variant classes with semantic colors and mobile optimizations
    const variantClasses = {
      default: [
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      ].join(" "),
      bordered: [
        "bg-white dark:bg-gray-800",
        "border-2 border-gray-300 dark:border-gray-600",
        "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      ].join(" "),
      elevated: [
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "shadow-md dark:shadow-gray-900/20",
        "mobile:shadow-sm tablet:shadow-md desktop:shadow-lg",
        "hover:shadow-lg dark:hover:shadow-gray-900/30 transition-shadow",
        "focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
      ].join(" "),
      success: [
        "bg-success-50 dark:bg-success-950",
        "border border-success-200 dark:border-success-800",
        "text-success-900 dark:text-success-100",
        "focus-visible:ring-success-500 dark:focus-visible:ring-success-400",
      ].join(" "),
      warning: [
        "bg-warning-50 dark:bg-warning-950",
        "border border-warning-200 dark:border-warning-800",
        "text-warning-900 dark:text-warning-100",
        "focus-visible:ring-warning-500 dark:focus-visible:ring-warning-400",
      ].join(" "),
      error: [
        "bg-error-50 dark:bg-error-950",
        "border border-error-200 dark:border-error-800",
        "text-error-900 dark:text-error-100",
        "focus-visible:ring-error-500 dark:focus-visible:ring-error-400",
      ].join(" "),
      info: [
        "bg-info-50 dark:bg-info-950",
        "border border-info-200 dark:border-info-800",
        "text-info-900 dark:text-info-100",
        "focus-visible:ring-info-500 dark:focus-visible:ring-info-400",
      ].join(" "),
      glass: [
        "bg-white/80 dark:bg-gray-800/80",
        "backdrop-blur-md",
        "border border-white/20 dark:border-gray-700/30",
        "shadow-xl dark:shadow-gray-900/30",
        "focus-visible:ring-white/50 dark:focus-visible:ring-gray-400/50",
      ].join(" "),
      gradient: [
        "bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600",
        "dark:from-primary-600 dark:via-primary-700 dark:to-primary-800",
        "text-white",
        "border border-transparent",
        "shadow-lg shadow-primary/30 dark:shadow-primary/20",
        "focus-visible:ring-primary-300 dark:focus-visible:ring-primary-600",
      ].join(" "),
    };

    const loadingClasses = loading ? "relative" : "";

    // Enhanced responsive padding with fluid spacing
    const paddingClasses = noPadding
      ? ""
      : [
          // Mobile-first responsive padding
          "p-3 mobile:p-4 tablet:p-5 desktop:p-6",
          // Container query based padding
          "@[20rem]:p-4 @[40rem]:p-6 @[60rem]:p-8",
        ].join(" ");

    const cardClasses = [
      baseClasses,
      variantClasses[variant],
      loadingClasses,
      props.class,
    ]
      .filter(Boolean)
      .join(" ");

    // Enhanced header classes with mobile touch targets
    const headerClasses = [
      "border-b border-gray-200 dark:border-gray-700",
      // Responsive padding
      "px-3 py-2 mobile:px-4 mobile:py-3 tablet:px-5 tablet:py-4 desktop:px-6 desktop:py-4",
      // Minimum touch target height (44px)
      "min-h-[44px] flex items-center",
      // Container query based padding
      "@[20rem]:px-4 @[20rem]:py-3 @[40rem]:px-6 @[40rem]:py-4",
    ].join(" ");

    const bodyClasses = !noPadding ? paddingClasses : "";

    // Enhanced footer classes with mobile-friendly layout
    const footerClasses = [
      "border-t border-gray-200 dark:border-gray-700",
      // Responsive padding
      "px-3 py-2 mobile:px-4 mobile:py-3 tablet:px-5 tablet:py-4 desktop:px-6 desktop:py-4",
      // Minimum touch target height (44px)
      "min-h-[44px]",
      // Responsive flex layout
      "flex flex-col mobile:flex-row justify-between items-center",
      "gap-3 mobile:gap-4",
      // Container query based layout
      "@[30rem]:flex-row @[30rem]:gap-4",
    ].join(" ");

    // Enhanced actions classes with proper spacing for touch
    const actionsClasses = [
      "flex items-center",
      "gap-2 mobile:gap-3",
      // Ensure minimum touch target size for action buttons
      "[&>*]:min-w-[44px] [&>*]:min-h-[44px]",
    ].join(" ");

    // Container wrapper for container queries
    const containerClasses = [
      containerClass,
      // Enable container queries
      "@container/card",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div class={containerClasses}>
        <div
          class={cardClasses}
          role={role}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          data-testid={dataTestId}
          data-card-variant={dataCardVariant || variant}
          tabIndex={0}
        >
          {loading && (
            <div class="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-gray-800/70">
              <Spinner size="lg" variant="border" color="primary" />
            </div>
          )}

          {hasHeader && (
            <div class={headerClasses}>
              <Slot name="header" />
            </div>
          )}

          <div class={bodyClasses}>
            <Slot />
          </div>

          {hasFooter && (
            <div class={footerClasses}>
              <Slot name="footer" />

              {hasActions && (
                <div class={actionsClasses}>
                  <Slot name="actions" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);
