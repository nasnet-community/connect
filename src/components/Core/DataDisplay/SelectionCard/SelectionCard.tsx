import { component$, Slot } from "@builder.io/qwik";
import type { SelectionCardProps } from "./SelectionCard.types";
import { Card } from "../Card/Card";
import { CardBody } from "../Card/CardBody";

/**
 * SelectionCard component for interactive selection options.
 * Extends Card with selection state, badges, and icon support.
 * Commonly used for option selection, feature choices, and configuration steps.
 * 
 * @example
 * <SelectionCard
 *   isSelected={isSelected}
 *   title="Premium Plan"
 *   description="Best for growing teams"
 *   icon={<LuCrown class="h-8 w-8" />}
 *   badge="Popular"
 *   badgeVariant="primary"
 *   onClick$={() => handleSelect('premium')}
 * >
 *   <FeatureList features={premiumFeatures} />
 * </SelectionCard>
 */
export const SelectionCard = component$<SelectionCardProps>((props) => {
  const {
    isSelected = false,
    isDisabled = false,
    title,
    description,
    icon,
    badge,
    badgeVariant = "default",
    onClick$,
    class: className = "",
    cardProps = {},
    children,
  } = props;

  const badgeVariantClasses = {
    default: "bg-surface-secondary/50 text-text-secondary dark:bg-surface-dark-secondary/50 dark:text-text-dark-secondary",
    primary: "bg-primary-500/15 text-primary-500 dark:bg-primary-500/25 dark:text-primary-400",
    success: "bg-success/15 text-success dark:bg-success/25 dark:text-success-light",
    warning: "bg-warning/10 text-warning dark:text-warning-light",
    info: "bg-info/15 text-info dark:bg-info/25 dark:text-info-light",
  };

  return (
    <Card
      interactive={!isDisabled}
      disabled={isDisabled}
      onClick$={isDisabled ? undefined : onClick$}
      hoverEffect={isDisabled ? "none" : "shadow"}
      class={`
        relative overflow-hidden transition-all duration-300
        ${isSelected && !isDisabled ? "ring-2 ring-primary-500" : ""}
        ${isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      {...cardProps}
    >
      {/* Badges container */}
      <div class="absolute right-4 top-4 z-10 flex gap-2">
        {/* Custom badge */}
        {badge && (
          <div class={`rounded-full px-3 py-1 ${badgeVariantClasses[badgeVariant]}`}>
            <span class="text-xs font-medium">{badge}</span>
          </div>
        )}

        {/* Disabled badge */}
        {isDisabled && !badge && (
          <div class={`rounded-full px-3 py-1 ${badgeVariantClasses.warning}`}>
            <span class="text-xs font-medium">{$localize`Coming Soon`}</span>
          </div>
        )}

        {/* Selected indicator */}
        {isSelected && !isDisabled && (
          <div class={`rounded-full px-3 py-1 ${badgeVariantClasses.success}`}>
            <span class="text-xs font-medium">{$localize`Selected`}</span>
          </div>
        )}
      </div>

      <CardBody class="space-y-6">
        {/* Icon container */}
        {icon && (
          <div
            class={`
              flex h-16 w-16 items-center justify-center rounded-xl
              transition-all duration-300
              ${!isDisabled && "group-hover:scale-110"}
              ${
                isSelected && !isDisabled
                  ? "bg-primary-500 text-white"
                  : "bg-primary-500/15 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400"
              }
            `}
          >
            {icon}
          </div>
        )}

        {/* Title and description */}
        <div class="space-y-4">
          {(title || description) && (
            <div>
              {title && (
                <h3 class="mb-2 text-xl font-semibold text-text dark:text-text-dark-default">
                  {title}
                </h3>
              )}
              {description && (
                <p class="text-text-secondary/90 dark:text-text-dark-secondary/95">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Children slot for custom content like FeatureList */}
          {children && (
            <Slot />
          )}
        </div>
      </CardBody>

      {/* Gradient overlay for hover effect */}
      {!isDisabled && (
        <div
          class="absolute inset-0 bg-gradient-to-br from-primary-500/10 
          to-secondary-500/10 opacity-0 transition-opacity duration-300
          group-hover:opacity-100 dark:from-primary-500/15 dark:to-secondary-500/15
          pointer-events-none"
        />
      )}
    </Card>
  );
});