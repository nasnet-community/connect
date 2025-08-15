import { component$ } from "@builder.io/qwik";
import type { FeatureListProps } from "./FeatureList.types";

/**
 * FeatureList component for displaying a list of features with checkmark icons.
 * Commonly used in selection cards, product features, and option lists.
 * 
 * @example
 * <FeatureList 
 *   features={["Feature 1", "Feature 2", "Feature 3"]}
 *   iconColor="primary"
 *   size="sm"
 * />
 */
export const FeatureList = component$<FeatureListProps>((props) => {
  const {
    features,
    iconColor = "primary",
    size = "md",
    showIcon = true,
    spacing = "normal",
    class: className = "",
  } = props;

  const spacingClasses = {
    compact: "space-y-2",
    normal: "space-y-3",
    relaxed: "space-y-4",
  };

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6",
  };

  const iconColorClasses = {
    primary: "text-primary-500 dark:text-primary-400",
    secondary: "text-secondary-500 dark:text-secondary-400",
    success: "text-success dark:text-success-light",
    info: "text-info dark:text-info-light",
    inherit: "currentColor",
  };

  return (
    <div class={`${spacingClasses[spacing]} ${className}`}>
      {features.map((feature) => (
        <div
          key={feature}
          class={`flex items-center text-text-secondary/90 dark:text-text-dark-secondary/95 ${sizeClasses[size]}`}
        >
          {showIcon && (
            <svg
              class={`mr-3 flex-shrink-0 ${iconSizeClasses[size]} ${iconColorClasses[iconColor]}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
});