import { component$, $, type QRL } from "@builder.io/qwik";
import type { TopNavigationItem } from "./TopNavigation.types";

export interface TopNavigationMobileMenuProps {
  items: TopNavigationItem[];
  isMobileMenuOpen: boolean;
  rightContent?: any;
  onItemClick$?: QRL<(item: TopNavigationItem) => void>;
}

export const TopNavigationMobileMenu = component$<TopNavigationMobileMenuProps>(
  (props) => {
    const { items, isMobileMenuOpen, rightContent, onItemClick$ } = props;

    if (!items.length) return null;

    return (
      <>
        {/* Backdrop overlay */}
        {isMobileMenuOpen && (
          <div
            class="
              fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-md
              motion-safe:animate-fade-in motion-safe:duration-300
              motion-reduce:bg-gray-900/80
              md:hidden
            "
            aria-hidden="true"
          />
        )}
        
        {/* Mobile menu panel */}
        <div
          class={`
            md:hidden fixed left-0 right-0 top-full z-50
            max-h-[calc(100vh-4rem)] overflow-y-auto
            ${isMobileMenuOpen 
              ? "motion-safe:animate-slide-down motion-safe:duration-300 opacity-100" 
              : "motion-reduce:hidden opacity-0 motion-safe:animate-slide-up motion-safe:duration-200"
            }
          `}
          id="mobile-menu"
        >
          <div class="
            space-y-2 border-t border-gray-200 bg-white/95 backdrop-blur-md
            px-4 pb-safe pt-4 shadow-xl
            mobile-nav-shadow
            dark:border-gray-700 dark:bg-gray-900/95
          ">
          {items.map((item, index) => {
            // Extract primitive values to avoid serialization issues
            const itemLabel = item.label;
            const itemHref = item.href;
            const isDisabled = !!item.isDisabled;
            const isActive = !!item.isActive;
            const hasIcon = !!item.icon;
            const hasItems = !!item.items?.length;
            const itemId = item.id;

            // Pre-render the icon element outside of the $ function
            const iconElement = hasIcon ? item.icon : null;

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

            // Handle item click
            const handleItemClick$ = $(() => {
              if (isDisabled) return;

              // Use the stored click handler if available
              if (itemOnClick$) {
                itemOnClick$();
              }

              if (onItemClick$) {
                onItemClick$(serializedItem);
              }
            });

            return (
              <div key={`mobile-${itemLabel}-${index}`}>
                {/* Regular menu item */}
                {!hasItems &&
                  (itemHref && !isDisabled ? (
                    <a
                      href={itemHref}
                      class={`
                        block rounded-lg min-h-[52px] px-4 py-3 text-base font-medium
                        flex items-center touch-manipulation
                        motion-safe:transition-all motion-safe:duration-200
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                        focus-visible:ring-primary-500 focus-visible:ring-offset-white
                        dark:focus-visible:ring-offset-gray-900
                        active:scale-95 motion-safe:active:transition-transform motion-safe:active:duration-100
                        ${
                          isActive
                            ? "bg-primary-50 text-primary-900 dark:bg-primary-900/30 dark:text-primary-100 border border-primary-200 dark:border-primary-700"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        }
                        ${isDisabled ? "cursor-not-allowed opacity-50" : ""}
                      `}
                      aria-current={isActive ? "page" : undefined}
                      onClick$={handleItemClick$}
                    >
                      <div class="flex items-center">
                        {hasIcon && <span class="mr-2">{iconElement}</span>}
                        <span>{itemLabel}</span>
                      </div>
                    </a>
                  ) : (
                    <button
                      type="button"
                      class={`
                        block w-full rounded-lg min-h-[52px] px-4 py-3 text-left text-base font-medium
                        flex items-center touch-manipulation
                        motion-safe:transition-all motion-safe:duration-200
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                        focus-visible:ring-primary-500 focus-visible:ring-offset-white
                        dark:focus-visible:ring-offset-gray-900
                        active:scale-95 motion-safe:active:transition-transform motion-safe:active:duration-100
                        ${
                          isActive
                            ? "bg-primary-50 text-primary-900 dark:bg-primary-900/30 dark:text-primary-100 border border-primary-200 dark:border-primary-700"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        }
                        ${isDisabled ? "cursor-not-allowed opacity-50" : ""}
                      `}
                      disabled={isDisabled}
                      aria-current={isActive ? "page" : undefined}
                      onClick$={handleItemClick$}
                    >
                      <div class="flex items-center">
                        {hasIcon && <span class="mr-2">{iconElement}</span>}
                        <span>{itemLabel}</span>
                      </div>
                    </button>
                  ))}

                {/* Mobile submenu items (flatten the structure for mobile) */}
                {hasItems && item.items && (
                  <div class="mt-4">
                    {/* Parent item as header */}
                    <div class="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      {itemLabel}
                    </div>

                    {/* Submenu items */}
                    <div class="mt-2 space-y-1">
                      {item.items.map((subItem, subIndex) => {
                        // Extract primitive values for subitem
                        const subItemLabel = subItem.label;
                        const subItemHref = subItem.href;
                        const subItemIsDisabled = !!subItem.isDisabled;
                        const subItemIsActive = !!subItem.isActive;
                        const subItemHasIcon = !!subItem.icon;
                        const subItemId = subItem.id;

                        // Pre-render the icon element outside of the $ function
                        const subIconElement = subItemHasIcon
                          ? subItem.icon
                          : null;

                        // Store the onClick$ handler (if any)
                        const subItemOnClick$ = subItem.onClick$;

                        // Create a serializable subitem for use in $ functions
                        const serializedSubItem = {
                          id: subItemId,
                          label: subItemLabel,
                          href: subItemHref,
                          isActive: subItemIsActive,
                          isDisabled: subItemIsDisabled,
                        };

                        // Handle subitem click
                        const handleSubItemClick$ = $(() => {
                          if (subItemIsDisabled) return;

                          // Use the stored click handler if available
                          if (subItemOnClick$) {
                            subItemOnClick$();
                          }

                          // Use the parent's click handler if provided
                          if (onItemClick$) {
                            onItemClick$(serializedSubItem);
                          }
                        });

                        return (
                          <div key={`mobile-sub-${subItemLabel}-${subIndex}`}>
                            {subItemHref && !subItemIsDisabled ? (
                              <a
                                href={subItemHref}
                                class={`
                                  block rounded-lg min-h-[52px] px-4 py-3 text-sm
                                  flex items-center touch-manipulation ml-4
                                  motion-safe:transition-all motion-safe:duration-200
                                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                                  focus-visible:ring-primary-500 focus-visible:ring-offset-white
                                  dark:focus-visible:ring-offset-gray-900
                                  active:scale-95 motion-safe:active:transition-transform motion-safe:active:duration-100
                                  ${
                                    subItemIsActive
                                      ? "bg-primary-25 text-primary-800 dark:bg-primary-900/20 dark:text-primary-200 border-l-4 border-primary-500"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                  }
                                  ${subItemIsDisabled ? "cursor-not-allowed opacity-50" : ""}
                                `}
                                aria-current={
                                  subItemIsActive ? "page" : undefined
                                }
                                onClick$={handleSubItemClick$}
                              >
                                <div class="flex items-center">
                                  {subItemHasIcon && (
                                    <span class="mr-2">{subIconElement}</span>
                                  )}
                                  <span>{subItemLabel}</span>
                                </div>
                              </a>
                            ) : (
                              <button
                                type="button"
                                class={`
                                  block w-full rounded-lg min-h-[52px] px-4 py-3 text-left text-sm
                                  flex items-center touch-manipulation ml-4
                                  motion-safe:transition-all motion-safe:duration-200
                                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                                  focus-visible:ring-primary-500 focus-visible:ring-offset-white
                                  dark:focus-visible:ring-offset-gray-900
                                  active:scale-95 motion-safe:active:transition-transform motion-safe:active:duration-100
                                  ${
                                    subItemIsActive
                                      ? "bg-primary-25 text-primary-800 dark:bg-primary-900/20 dark:text-primary-200 border-l-4 border-primary-500"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                  }
                                  ${subItemIsDisabled ? "cursor-not-allowed opacity-50" : ""}
                                `}
                                disabled={subItemIsDisabled}
                                aria-current={
                                  subItemIsActive ? "page" : undefined
                                }
                                onClick$={handleSubItemClick$}
                              >
                                <div class="flex items-center">
                                  {subItemHasIcon && (
                                    <span class="mr-2">{subIconElement}</span>
                                  )}
                                  <span>{subItemLabel}</span>
                                </div>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

            {/* Mobile right content */}
            {rightContent && (
              <div class="
                mt-4 border-t border-gray-200 bg-gray-50/50 backdrop-blur-sm
                px-4 py-4 pb-safe
                dark:border-gray-700 dark:bg-gray-800/50
                motion-safe:transition-colors motion-safe:duration-200
              ">
                <div class="space-y-3">
                  {rightContent}
                </div>
              </div>
            )}
      </div>
      </>
    );
  },
);
