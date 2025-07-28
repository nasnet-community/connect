import type { QRL } from "@builder.io/qwik";
import { component$, $ } from "@builder.io/qwik";
import type { TopNavigationItem } from "./TopNavigation.types";

export interface TopNavigationDropdownProps {
  items: TopNavigationItem[];
  isOpen: boolean;
  onItemClick$?: QRL<(item: TopNavigationItem) => void>;
}

export const TopNavigationDropdown = component$<TopNavigationDropdownProps>(
  (props) => {
    const { items, isOpen, onItemClick$ } = props;

    if (!items.length || !isOpen) return null;

    return (
      <div
        class="
      absolute left-0 z-10 mt-1 w-48 origin-top-left
      overflow-hidden rounded-md 
      bg-white shadow-lg ring-1 ring-black ring-opacity-5
      focus:outline-none dark:bg-gray-800
    "
      >
        <div class="py-1" role="menu" aria-orientation="vertical">
          {items.map((item, index) => {
            // Extract primitive values to avoid serialization issues
            const itemLabel = item.label;
            const itemHref = item.href;
            const isDisabled = !!item.isDisabled;
            const isActive = !!item.isActive;
            const hasIcon = !!item.icon;
            const hasBadge = !!item.badge;
            const itemClass = item.class;
            const itemId = item.id;

            // Pre-render icon and badge elements outside of $ function
            const iconElement = hasIcon ? item.icon : null;
            const badgeElement = hasBadge ? item.badge : null;

            // Store the onClick$ handler (if any)
            const itemOnClick$ = item.onClick$;

            // Create a serializable item for use in $ functions
            const serializedItem = {
              id: itemId,
              label: itemLabel,
              href: itemHref,
              isActive,
              isDisabled,
            };

            // Handle item click using only the extracted values
            const handleItemClick$ = $(() => {
              if (isDisabled) return;

              // Use the stored click handler if available
              if (itemOnClick$) {
                itemOnClick$();
              }

              // Use the parent's click handler if provided
              if (onItemClick$) {
                onItemClick$(serializedItem);
              }
            });

            const itemStateClass = isActive
              ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white";

            const disabledStateClass = isDisabled
              ? "opacity-50 cursor-not-allowed"
              : "";

            return (
              <div key={`dropdown-${itemLabel}-${index}`}>
                {itemHref && !isDisabled ? (
                  <a
                    href={itemHref}
                    class={`
                    block px-4 py-2 text-sm
                    ${itemStateClass}
                    ${disabledStateClass}
                    ${itemClass || ""}
                  `}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    onClick$={handleItemClick$}
                  >
                    <div class="flex items-center">
                      {hasIcon && <span class="mr-2">{iconElement}</span>}
                      <span>{itemLabel}</span>
                      {hasBadge && <span class="ml-auto">{badgeElement}</span>}
                    </div>
                  </a>
                ) : (
                  <button
                    type="button"
                    class={`
                    block w-full px-4 py-2 text-left text-sm
                    ${itemStateClass}
                    ${disabledStateClass}
                    ${itemClass || ""}
                  `}
                    role="menuitem"
                    disabled={isDisabled}
                    aria-current={isActive ? "page" : undefined}
                    onClick$={handleItemClick$}
                  >
                    <div class="flex items-center">
                      {hasIcon && <span class="mr-2">{iconElement}</span>}
                      <span>{itemLabel}</span>
                      {hasBadge && <span class="ml-auto">{badgeElement}</span>}
                    </div>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
