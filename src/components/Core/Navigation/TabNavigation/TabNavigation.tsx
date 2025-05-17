import { component$, $ } from "@builder.io/qwik";
import type { TabNavigationProps } from "./TabNavigation.types";
import { useTabStyles } from "./hooks/useTabStyles";
import { TabItem } from "./TabItem";

/**
 * TabNavigation component for switching between different views or sections.
 * 
 * This component provides a flexible, accessible tab interface with various styling options
 * and support for icons, badges, and different layout configurations.
 */
export const TabNavigation = component$<TabNavigationProps>(({
  tabs,
  activeTab,
  onSelect$,
  size = "md",
  variant = "underline",
  showIcons = true,
  fullWidth = false,
  align = "left",
  animated = true,
  class: className = "",
  id,
  "aria-label": ariaLabel,
}) => {
  // Generate unique ID if not provided
  const navigationId = id || `tabs-${Math.random().toString(36).substring(2, 9)}`;
  
  // Get all styles using our hook
  const { 
    sizeClasses, 
    variantClasses, 
    alignClasses, 
    animationClass
  } = useTabStyles({
    size,
    variant,
    align,
    fullWidth,
    animated
  });
  
  // Handle tab selection with a barrier for disabled tabs
  const selectTab$ = $((tabId: string, disabled?: boolean) => {
    if (!disabled && tabId !== activeTab) {
      onSelect$(tabId);
    }
  });
  
  return (
    <div 
      class={`${variantClasses[variant].container} ${className}`}
      id={navigationId}
      role="navigation"
      aria-label={ariaLabel || "Tab Navigation"}
    >
      <ul 
        class={`${variantClasses[variant].list} ${alignClasses[align]} flex-wrap`}
        role="tablist"
      >
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          
          return (
            <TabItem
              key={tab.id}
              tab={tab}
              isActive={isActive}
              navigationId={navigationId}
              size={size}
              variant={variant}
              showIcons={showIcons}
              fullWidth={fullWidth}
              sizeClasses={sizeClasses}
              variantClasses={variantClasses}
              animationClass={animationClass}
              onSelect$={selectTab$}
            />
          );
        })}
      </ul>
    </div>
  );
});

export * from "./TabNavigation.types";
