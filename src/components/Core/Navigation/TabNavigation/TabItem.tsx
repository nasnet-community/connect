import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Tab, TabSize, TabVariant } from "./TabNavigation.types";

export interface TabItemProps {
  tab: Tab;
  isActive: boolean;
  navigationId: string;
  size: TabSize;
  variant: TabVariant;
  showIcons: boolean;
  fullWidth: boolean;
  sizeClasses: Record<
    TabSize,
    {
      tab: string;
      icon: string;
      count: string;
    }
  >;
  variantClasses: Record<
    TabVariant,
    {
      container: string;
      list: string;
      tab: {
        base: string;
        active: string;
        inactive: string;
        disabled: string;
      };
    }
  >;
  animationClass: string;
  onSelect$: QRL<(tabId: string, disabled?: boolean) => void>;
}

export const TabItem = component$<TabItemProps>(
  ({
    tab,
    isActive,
    navigationId,
    size,
    variant,
    showIcons,
    fullWidth,
    sizeClasses,
    variantClasses,
    animationClass,
    onSelect$,
  }) => {
    const tabState = tab.disabled
      ? "disabled"
      : isActive
        ? "active"
        : "inactive";

    // Build the tab classes
    const tabClass = [
      variantClasses[variant].tab.base,
      variantClasses[variant].tab[tabState],
      sizeClasses[size].tab,
      animationClass,
      "whitespace-nowrap",
      tab.disabled ? "pointer-events-none" : "",
      // Mobile-first responsive classes
      "min-h-[44px] touch-manipulation",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-primary-500 focus-visible:ring-offset-2",
      "dark:focus-visible:ring-offset-gray-900",
      // Remove active scale to avoid layout shift/scrollbar flicker on hover/press
      // "active:scale-95 motion-safe:active:transition-transform",
      tab.class,
    ]
      .filter(Boolean)
      .join(" ");

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <li
        class={`
          ${widthClass} 
          ${variant === "underline" 
            ? "mr-1 last:mr-0 mobile:mr-0.5 tablet:mr-1 desktop:mr-2" 
            : ""
          }
          flex-shrink-0
        `}
        role="presentation"
      >
        <button
          onClick$={$(() => onSelect$(tab.id, tab.disabled))}
          class={tabClass}
          role="tab"
          id={`${navigationId}-${tab.id}`}
          aria-selected={isActive}
          aria-disabled={tab.disabled}
          aria-controls={`${navigationId}-panel-${tab.id}`}
          tabIndex={isActive ? 0 : -1}
          type="button"
          {...Object.fromEntries(
            Object.entries(tab).filter(([key]) => key.startsWith("data-")),
          )}
        >
          <span class="flex items-center">
            {showIcons && tab.icon && (
              <span class={sizeClasses[size].icon}>{tab.icon}</span>
            )}

            <span>{tab.label}</span>

            {typeof tab.count === "number" && (
              <span
                class={`
                  ${sizeClasses[size].count}
                  rounded-full text-center font-medium
                  px-1.5 py-0.5 mobile:px-1 mobile:py-0.5
                  ${isActive 
                    ? "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300" 
                    : "bg-surface-secondary dark:bg-surface-dark-secondary text-gray-600 dark:text-gray-400"
                  }
                  motion-safe:transition-colors
                `}
              >
                {tab.count > 99 ? "99+" : tab.count}
              </span>
            )}
          </span>
        </button>
      </li>
    );
  },
);
