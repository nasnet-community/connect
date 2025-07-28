import type { QRL } from "@builder.io/qwik";
import { component$, $ } from "@builder.io/qwik";
import type {
  TopNavigationItem,
  TopNavigationProps,
} from "./TopNavigation.types";
import { TopNavigationDropdown } from "./TopNavigationDropdown";
import { useTopNavigationStyles } from "./hooks/useTopNavigationStyles";
import { useDropdownState } from "./hooks/useDropdownState";

export interface TopNavigationItemComponentProps {
  item: TopNavigationItem;
  size: TopNavigationProps["size"];
  variant: TopNavigationProps["variant"];
  onItemClick$?: QRL<(item: TopNavigationItem) => void>;
}

export const TopNavigationItemComponent =
  component$<TopNavigationItemComponentProps>((props) => {
    const { item, size = "md", variant = "default", onItemClick$ } = props;

    // Extract primitive values to avoid serialization issues
    const hasItems = !!item.items?.length;
    const isDisabled = !!item.isDisabled;
    const isActive = !!item.isActive;
    const itemHref = item.href;
    const itemId = item.id;
    const itemLabel = item.label;
    const itemClass = item.class;
    const hasIcon = !!item.icon;

    // Pre-render the icon element to avoid serialization issues
    const iconElement = hasIcon ? item.icon : null;

    // Create a serializable item for use in $ functions
    const serializedItem = {
      id: itemId,
      label: itemLabel,
      href: itemHref,
      isActive,
      isDisabled,
    };

    // Use hooks for state and styling
    const { isDropdownOpen, handleDropdownEnter$, handleDropdownLeave$ } =
      useDropdownState({
        hasItems,
        isDisabled,
      });

    const { combinedClass } = useTopNavigationStyles({
      size,
      variant,
      isActive,
      isDisabled,
      hasDropdown: hasItems,
      customClass: itemClass,
    });

    // Handle item click
    const handleItemClick$ = $(() => {
      if (isDisabled) return;

      // If item has subitems, toggle dropdown
      if (hasItems) {
        isDropdownOpen.value = !isDropdownOpen.value;
      }

      // Use the parent's click handler if provided
      if (onItemClick$) {
        // Create a safe reference for the callback
        // This avoids serialization issues with non-serializable properties
        onItemClick$({
          ...serializedItem,
          // We can safely add references to primitive values
          items: hasItems ? [] : undefined, // Just indicate if it has items
        });
      }
    });

    return (
      <div
        class="relative"
        onMouseEnter$={handleDropdownEnter$}
        onMouseLeave$={handleDropdownLeave$}
      >
        {itemHref && !isDisabled && !hasItems ? (
          <a
            href={itemHref}
            class={combinedClass}
            id={itemId}
            aria-current={isActive ? "page" : undefined}
            aria-expanded={hasItems ? isDropdownOpen.value : undefined}
            onClick$={handleItemClick$}
          >
            {hasIcon && <span class="mr-1">{iconElement}</span>}
            <span>{itemLabel}</span>
            {hasItems && (
              <svg
                class="ml-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </a>
        ) : (
          <button
            type="button"
            class={combinedClass}
            id={itemId}
            disabled={isDisabled}
            aria-current={isActive ? "page" : undefined}
            aria-expanded={hasItems ? isDropdownOpen.value : undefined}
            aria-haspopup={hasItems ? "true" : undefined}
            onClick$={handleItemClick$}
          >
            {hasIcon && <span class="mr-1">{iconElement}</span>}
            <span>{itemLabel}</span>
            {hasItems && (
              <svg
                class="ml-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </button>
        )}

        {/* Dropdown menu */}
        {hasItems && isDropdownOpen.value && (
          <TopNavigationDropdown
            items={item.items || []}
            isOpen={isDropdownOpen.value}
            onItemClick$={onItemClick$}
          />
        )}
      </div>
    );
  });
