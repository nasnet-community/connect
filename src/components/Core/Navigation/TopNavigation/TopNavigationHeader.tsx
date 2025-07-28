import type { QRL } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { JSXChildren } from "@builder.io/qwik";
import type { TopNavigationItem } from "./TopNavigation.types";
import { TopNavigationItemComponent } from "./TopNavigationItem";

export interface TopNavigationHeaderProps {
  logo?: JSXChildren;
  items: TopNavigationItem[];
  rightContent?: JSXChildren;
  isMobileMenuOpen: boolean;
  size: "sm" | "md" | "lg";
  variant: "default" | "bordered" | "transparent" | "filled" | "minimal";
  mobileMenuEnabled: boolean;
  onItemClick$?: QRL<(item: TopNavigationItem) => void>;
  toggleMobileMenu$: QRL<() => void>;
}

export const TopNavigationHeader = component$<TopNavigationHeaderProps>(
  (props) => {
    const {
      logo,
      items,
      rightContent,
      isMobileMenuOpen,
      size,
      variant,
      mobileMenuEnabled,
      onItemClick$,
      toggleMobileMenu$,
    } = props;

    return (
      <div class="flex items-center justify-between">
        {/* Logo/Brand */}
        {logo && <div class="flex-shrink-0">{logo}</div>}

        {/* Menu items */}
        <div class="ml-4 hidden md:block">
          <div class="flex space-x-2 lg:space-x-4">
            {items.map((item, index) => (
              <TopNavigationItemComponent
                key={`${item.label}-${index}`}
                item={item}
                size={size}
                variant={variant}
                onItemClick$={onItemClick$}
              />
            ))}
          </div>
        </div>

        {/* Right content */}
        {rightContent && (
          <div class="hidden md:flex md:items-center">{rightContent}</div>
        )}

        {/* Mobile menu button */}
        {mobileMenuEnabled && (
          <div class="flex md:hidden">
            <button
              type="button"
              class="
              inline-flex items-center justify-center rounded-md p-2 
              text-gray-700 hover:bg-gray-100 
              hover:text-gray-900 focus:outline-none 
              focus:ring-2 focus:ring-inset
              focus:ring-primary-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100
            "
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick$={toggleMobileMenu$}
            >
              <span class="sr-only">
                {isMobileMenuOpen ? "Close menu" : "Open menu"}
              </span>

              {/* Icon when menu is closed */}
              <svg
                class={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              {/* Icon when menu is open */}
              <svg
                class={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  },
);
