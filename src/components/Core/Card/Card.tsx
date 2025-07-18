import { component$, Slot } from "@builder.io/qwik";

export type CardVariant = "default" | "bordered" | "elevated";

export interface CardProps {
  variant?: CardVariant;
  class?: string;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasActions?: boolean;
  loading?: boolean;
  noPadding?: boolean;
}

export const Card = component$<CardProps>(
  ({
    variant = "default",
    hasHeader = false,
    hasFooter = false,
    hasActions = false,
    loading = false,
    noPadding = false,
    ...props
  }) => {
    const baseClasses = "overflow-hidden rounded-lg bg-white dark:bg-gray-800 transition-all";

    const variantClasses = {
      default: "border border-gray-200 dark:border-gray-700",
      bordered: "border-2 border-gray-300 dark:border-gray-600",
      elevated: "border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-gray-900/20",
    };

    const loadingClasses = loading ? "relative" : "";
    const paddingClasses = noPadding ? "" : "p-4 md:p-6";

    const cardClasses = [
      baseClasses,
      variantClasses[variant],
      loadingClasses,
      props.class,
    ]
      .filter(Boolean)
      .join(" ");

    const headerClasses = "border-b border-gray-200 dark:border-gray-700 px-4 py-3 md:px-6 md:py-4";
    const bodyClasses = !noPadding ? paddingClasses : "";
    const footerClasses = "border-t border-gray-200 dark:border-gray-700 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center";
    const actionsClasses = "flex items-center gap-2";

    return (
      <div class={cardClasses}>
        {loading && (
          <div class="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-800/70 z-10">
            <div class="h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
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
    );
  }
); 