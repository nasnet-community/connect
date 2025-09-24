import { component$, $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { TabNavigationProps } from "./TabNavigation.types";
import { useTabStyles } from "./hooks/useTabStyles";
import { TabItem } from "./TabItem";

/**
 * TabNavigation component for switching between different views or sections.
 *
 * This component provides a flexible, accessible tab interface with various styling options
 * and support for icons, badges, and different layout configurations.
 */
export const TabNavigation = component$<TabNavigationProps>(
  ({
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
    const navigationId =
      id || `tabs-${Math.random().toString(36).substring(2, 9)}`;

    // Refs for scrollable container
    const containerRef = useSignal<HTMLDivElement>();
    const showLeftGradient = useSignal(false);
    const showRightGradient = useSignal(false);

    // Get all styles using our hook
    const { sizeClasses, variantClasses, alignClasses, animationClass } =
      useTabStyles({
        size,
        variant,
        align,
        fullWidth,
        animated,
      });

    // Handle tab selection (always invoke when not disabled)
    const selectTab$ = $((tabId: string, disabled?: boolean) => {
      if (!disabled) {
        onSelect$(tabId);
      }
    });

    // Check scroll position for gradient indicators
    const checkScroll$ = $(() => {
      if (!containerRef.value) return;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.value;
      showLeftGradient.value = scrollLeft > 0;
      showRightGradient.value = scrollLeft < scrollWidth - clientWidth - 1;
    });

    // Initialize scroll check on mount
    useVisibleTask$(() => {
      checkScroll$();
      const container = containerRef.value;
      if (container) {
        container.addEventListener("scroll", checkScroll$);
        window.addEventListener("resize", checkScroll$);
        return () => {
          container.removeEventListener("scroll", checkScroll$);
          window.removeEventListener("resize", checkScroll$);
        };
      }
    });

    // Scroll to active tab on mount and when active tab changes
    useVisibleTask$(({ track }) => {
      track(() => activeTab);
      if (containerRef.value) {
        const activeElement = containerRef.value.querySelector(
          `[aria-selected="true"]`
        ) as HTMLElement;
        if (activeElement) {
          activeElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    });

    return (
      <div
        class={`
          relative
          ${variantClasses[variant].container} 
          ${className}
        `}
        id={navigationId}
        role="navigation"
        aria-label={ariaLabel || "Tab Navigation"}
      >
        {/* Left gradient indicator for scrollable tabs */}
        {showLeftGradient.value && (
          <div
            class="
              pointer-events-none absolute left-0 top-0 z-10 h-full w-8
              bg-gradient-to-r from-white to-transparent
              dark:from-gray-900
              mobile:hidden
            "
            aria-hidden="true"
          />
        )}

        {/* Scrollable container */}
        <div
          ref={containerRef}
          class="
            overflow-x-hidden
            touch-pan-x
            mobile:-mx-4 mobile:px-4
            tablet:-mx-2 tablet:px-2
          "
        >
          <ul
            class={`
              ${variantClasses[variant].list} 
              ${alignClasses[align]}
              ${!fullWidth ? "inline-flex min-w-full" : "flex"}
              mobile:gap-1 tablet:gap-2
            `}
            role="tablist"
          >
            {tabs.map((tab) => {
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

        {/* Right gradient indicator for scrollable tabs */}
        {showRightGradient.value && (
          <div
            class="
              pointer-events-none absolute right-0 top-0 z-10 h-full w-8
              bg-gradient-to-l from-white to-transparent
              dark:from-gray-900
              mobile:hidden
            "
            aria-hidden="true"
          />
        )}
      </div>
    );
  },
);

export * from "./TabNavigation.types";
