import { component$, Slot } from "@builder.io/qwik";
import type { SideNavigationProps } from "./SideNavigation.types";
import { SideNavigationItemComponent } from "./SideNavigationItem";
import { useSideNavigationState } from "./hooks/useSideNavigationState";
import { useSideNavigationStyles } from "./hooks/useSideNavigationStyles";
import { useSideNavigationClasses } from "./hooks/useSideNavigationClasses";
import { SideNavigationHeader } from "./SideNavigationHeader";
import { SideNavigationBackdrop } from "./SideNavigationBackdrop";

/**
 * SideNavigation component provides vertical navigation with support for nested items,
 * collapsible sections, and different visual styles.
 */
export const SideNavigation = component$<SideNavigationProps>((props) => {
  const {
    items,
    title,
    isCollapsed: propIsCollapsed = false,
    isCollapsible = true,
    size = "md",
    variant = "default",
    isMobileModal = false,
    isMobileOpen = false,
    ariaLabel = "Side navigation",
    class: className = "",
    id,
  } = props;

  // Use hooks for state and styling
  const { isCollapsed, handleToggleCollapse$, handleCloseMobile$ } =
    useSideNavigationState({
      isCollapsed: propIsCollapsed,
      onToggleCollapse$: props.onToggleCollapse$,
      isMobileOpen,
      onCloseMobile$: props.onCloseMobile$,
    });

  const { widthClass } = useSideNavigationStyles({
    isCollapsed: isCollapsed.value,
    size,
  });

  const { containerClass, backdropClass, headerClass, toggleButtonClass } =
    useSideNavigationClasses({
      widthClass: widthClass.value,
      variant,
      isCollapsed: isCollapsed.value,
      isMobileModal,
      isMobileOpen,
      className,
    });

  return (
    <>
      {/* Mobile backdrop */}
      <SideNavigationBackdrop
        isMobileModal={isMobileModal}
        backdropClass={backdropClass.value}
        onClose$={handleCloseMobile$}
      />

      {/* Navigation container */}
      <nav class={containerClass.value} aria-label={ariaLabel} id={id}>
        {/* Header section */}
        {(title || props.header || isCollapsible) && (
          <SideNavigationHeader
            title={title}
            header={props.header}
            isCollapsed={isCollapsed.value}
            isCollapsible={isCollapsible}
            headerClass={headerClass.value}
            toggleButtonClass={toggleButtonClass.value}
            onToggleCollapse$={handleToggleCollapse$}
          />
        )}

        {/* Navigation items */}
        <ul class="flex-grow py-2">
          {items.map((item, index) => (
            <SideNavigationItemComponent
              key={`${item.label}-${index}`}
              item={item}
              isCollapsed={isCollapsed.value}
              depth={0}
              size={size}
              variant={variant}
              onItemClick$={props.onNavItemClick$}
            />
          ))}
        </ul>

        {/* Footer section */}
        {!isCollapsed.value && props.footer && (
          <div class="border-t border-gray-200 px-4 py-3 dark:border-gray-800">
            {props.footer}
          </div>
        )}

        {/* Slot for additional content */}
        <Slot />
      </nav>
    </>
  );
});
