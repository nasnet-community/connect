import { component$, Slot } from "@builder.io/qwik";
import { Toggle } from "~/components/Core";
import type { GradientHeaderProps } from "./GradientHeader.types";

/**
 * GradientHeader - Modern gradient header component with icon, title, and optional controls
 * 
 * A flexible header component featuring:
 * - Customizable gradient backgrounds
 * - Animated icons with glow effects
 * - Toggle controls with status indicators
 * - Feature highlights section
 * - Responsive layout options
 * 
 * @example
 * <GradientHeader
 *   title="Network Configuration"
 *   description="Configure your network settings with smart validation"
 *   icon={<LuNetwork class="h-10 w-10 text-white" />}
 *   toggleConfig={{
 *     enabled: configEnabled,
 *     label: "Enable Configuration",
 *     onChange$: handleToggleChange
 *   }}
 * />
 */
export const GradientHeader = component$<GradientHeaderProps>(({
  title,
  description,
  icon,
  iconAnimation = true,
  gradient = {
    direction: "to-br",
    from: "primary-50",
    via: "blue-50",
    to: "primary-100"
  },
  backgroundPattern = true,
  floatingIcon,
  features = [],
  showFeaturesWhen = true,
  toggleConfig,
  statusIndicator,
  layout = "default",
  size = "md",
  class: className = "",
  titleClass = "",
  descriptionClass = "",
  children,
  rightContent,
}) => {
  
  // Size configurations
  const sizeConfig = {
    sm: {
      container: "p-4",
      icon: "p-2",
      iconSize: "h-6 w-6",
      title: "text-xl",
      description: "text-sm",
      spacing: "gap-3",
      gridGap: "gap-3"
    },
    md: {
      container: "p-8", 
      icon: "p-4",
      iconSize: "h-10 w-10",
      title: "text-3xl",
      description: "text-lg",
      spacing: "gap-6",
      gridGap: "gap-4"
    },
    lg: {
      container: "p-12",
      icon: "p-6", 
      iconSize: "h-12 w-12",
      title: "text-4xl",
      description: "text-xl",
      spacing: "gap-8",
      gridGap: "gap-6"
    }
  };

  const config = sizeConfig[size];
  
  // Build gradient classes
  const gradientClasses = `bg-gradient-${gradient.direction} from-${gradient.from} ${
    gradient.via ? `via-${gradient.via}` : ""
  } to-${gradient.to} dark:from-${gradient.from.replace("50", "900/20")} ${
    gradient.via ? `dark:via-${gradient.via.replace("50", "900/20")}` : ""
  } dark:to-${gradient.to.replace("100", "800/20")}`;

  return (
    <div class={`relative overflow-hidden rounded-2xl ${gradientClasses} ${config.container} ${className}`}>
      {/* Background Pattern */}
      {backgroundPattern && (
        <div class="absolute inset-0 bg-grid-pattern opacity-5" />
      )}
      
      {/* Floating Elements */}
      {floatingIcon && (
        <div class="absolute top-4 right-4 opacity-10">
          {floatingIcon}
        </div>
      )}

      <div class={`relative z-10 flex ${
        layout === "centered" 
          ? "flex-col items-center text-center" 
          : "flex-col lg:flex-row lg:items-center lg:justify-between"
      } ${config.spacing}`}>
        
        {/* Main Content Section */}
        <div class={`flex ${layout === "centered" ? "flex-col" : "items-center"} ${config.spacing}`}>
          {/* Animated Icon */}
          {icon && (
            <div class="relative">
              {iconAnimation && (
                <div class="absolute inset-0 rounded-2xl bg-primary-500/20 animate-ping" />
              )}
              <div class={`relative rounded-2xl bg-gradient-to-br from-primary-500 to-blue-600 shadow-lg ${config.icon}`}>
                <div class={config.iconSize}>
                  {icon}
                </div>
              </div>
            </div>
          )}

          {/* Text Content */}
          <div class={`space-y-2 ${layout === "centered" ? "text-center" : ""}`}>
            <h1 class={`font-bold bg-gradient-to-r from-primary-700 via-blue-600 to-primary-800 bg-clip-text text-transparent dark:from-primary-300 dark:via-blue-400 dark:to-primary-400 ${config.title} ${titleClass}`}>
              {title}
            </h1>
            {description && (
              <p class={`text-gray-600 dark:text-gray-300 ${layout === "centered" ? "mx-auto" : "max-w-md"} ${config.description} ${descriptionClass}`}>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Content / Controls Section */}
        <div class={`flex flex-col ${layout === "centered" ? "items-center" : "items-end"} gap-4`}>
          {/* Status Indicator */}
          {statusIndicator && (
            <div class="flex items-center gap-2">
              {statusIndicator.showDot !== false && (
                <div class={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  statusIndicator.active 
                    ? `${statusIndicator.activeColor || "bg-green-500"} shadow-lg shadow-green-500/50` 
                    : statusIndicator.inactiveColor || "bg-gray-400"
                }`} />
              )}
              <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                {statusIndicator.active 
                  ? statusIndicator.activeText 
                  : statusIndicator.inactiveText
                }
              </span>
            </div>
          )}

          {/* Toggle Control */}
          {toggleConfig && (
            <div class="flex items-center gap-4 group">
              <div class="flex items-center gap-2">
                {/* Status indicator dot */}
                <div class={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  toggleConfig.enabled.value 
                    ? 'bg-green-500 shadow-lg shadow-green-500/50 scale-100' 
                    : 'bg-gray-300 dark:bg-gray-600 scale-75'
                }`} />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {toggleConfig.label}
                </span>
              </div>
              <div class="relative">
                {/* Subtle toggle background glow */}
                <div class={`absolute inset-0 rounded-full transition-all duration-300 opacity-75 ${
                  toggleConfig.enabled.value 
                    ? 'bg-primary-400/15 blur-sm scale-105' 
                    : 'bg-gray-300/10 blur-sm scale-100'
                }`} />
                <Toggle
                  checked={toggleConfig.enabled.value}
                  onChange$={toggleConfig.onChange$}
                  size={toggleConfig.size || "lg"}
                  color={toggleConfig.color || "primary"}
                  class="relative z-10"
                />
              </div>
            </div>
          )}

          {/* Custom Right Content */}
          {rightContent && rightContent}
        </div>
      </div>

      {/* Feature Highlights */}
      {features.length > 0 && showFeaturesWhen && (
        <div class="relative z-10 mt-6 pt-6 border-t border-primary-200/50 dark:border-primary-800/50">
          <div class={`grid grid-cols-1 md:grid-cols-${Math.min(features.length, 3)} ${config.gridGap}`}>
            {features.map((feature, index) => (
              <div key={index} class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div class={`w-2 h-2 rounded-full ${feature.color}`} />
                <span>{feature.label}</span>
                {feature.description && (
                  <span class="text-xs text-gray-500 dark:text-gray-500">
                    - {feature.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Children Slot */}
      {children && (
        <div class="relative z-10 mt-6">
          <Slot />
        </div>
      )}
    </div>
  );
});