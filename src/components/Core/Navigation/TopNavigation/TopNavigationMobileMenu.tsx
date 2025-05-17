import { component$, $, type QRL } from '@builder.io/qwik';
import type { TopNavigationItem } from './TopNavigation.types';

export interface TopNavigationMobileMenuProps {
  items: TopNavigationItem[];
  isMobileMenuOpen: boolean;
  rightContent?: any;
  onItemClick$?: QRL<(item: TopNavigationItem) => void>;
}

export const TopNavigationMobileMenu = component$<TopNavigationMobileMenuProps>((props) => {
  const { items, isMobileMenuOpen, rightContent, onItemClick$ } = props;
  
  if (!items.length) return null;
  
  return (
    <div
      class={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
      id="mobile-menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800">
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
            isDisabled
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
              {!hasItems && (
                itemHref && !isDisabled ? (
                  <a
                    href={itemHref}
                    class={`
                      block px-3 py-2 rounded-md text-base font-medium
                      ${isActive 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    aria-current={isActive ? 'page' : undefined}
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
                      block w-full text-left px-3 py-2 rounded-md text-base font-medium
                      ${isActive 
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={isDisabled}
                    aria-current={isActive ? 'page' : undefined}
                    onClick$={handleItemClick$}
                  >
                    <div class="flex items-center">
                      {hasIcon && <span class="mr-2">{iconElement}</span>}
                      <span>{itemLabel}</span>
                    </div>
                  </button>
                )
              )}
              
              {/* Mobile submenu items (flatten the structure for mobile) */}
              {hasItems && item.items && (
                <div>
                  {/* Parent item as header */}
                  <div class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {itemLabel}
                  </div>
                  
                  {/* Submenu items */}
                  <div class="pl-4">
                    {item.items.map((subItem, subIndex) => {
                      // Extract primitive values for subitem
                      const subItemLabel = subItem.label;
                      const subItemHref = subItem.href;
                      const subItemIsDisabled = !!subItem.isDisabled;
                      const subItemIsActive = !!subItem.isActive;
                      const subItemHasIcon = !!subItem.icon;
                      const subItemId = subItem.id;
                      
                      // Pre-render the icon element outside of the $ function
                      const subIconElement = subItemHasIcon ? subItem.icon : null;
                      
                      // Store the onClick$ handler (if any)
                      const subItemOnClick$ = subItem.onClick$;
                      
                      // Create a serializable subitem for use in $ functions
                      const serializedSubItem = {
                        id: subItemId,
                        label: subItemLabel,
                        href: subItemHref,
                        isActive: subItemIsActive,
                        isDisabled: subItemIsDisabled
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
                                block px-3 py-2 rounded-md text-sm
                                ${subItemIsActive 
                                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }
                                ${subItemIsDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                              `}
                              aria-current={subItemIsActive ? 'page' : undefined}
                              onClick$={handleSubItemClick$}
                            >
                              <div class="flex items-center">
                                {subItemHasIcon && <span class="mr-2">{subIconElement}</span>}
                                <span>{subItemLabel}</span>
                              </div>
                            </a>
                          ) : (
                            <button
                              type="button"
                              class={`
                                block w-full text-left px-3 py-2 rounded-md text-sm
                                ${subItemIsActive 
                                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }
                                ${subItemIsDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                              `}
                              disabled={subItemIsDisabled}
                              aria-current={subItemIsActive ? 'page' : undefined}
                              onClick$={handleSubItemClick$}
                            >
                              <div class="flex items-center">
                                {subItemHasIcon && <span class="mr-2">{subIconElement}</span>}
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
        <div class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800">
          <div class="px-4">
            {rightContent}
          </div>
        </div>
      )}
    </div>
  );
}); 