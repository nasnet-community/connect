import type { QRL } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type {
  SideNavigationItem,
  SideNavigationProps,
} from "./SideNavigation.types";
import { useSideNavigationItemState } from "./hooks/useSideNavigationItemState";
import { useSideNavigationItemStyles } from "./hooks/useSideNavigationItemStyles";

/**
 * SideNavigationItemComponent renders an individual navigation item
 */
export interface SideNavigationItemComponentProps {
  item: SideNavigationItem;
  isCollapsed: boolean;
  depth: number;
  size: SideNavigationProps["size"];
  variant: SideNavigationProps["variant"];
  onItemClick$?: QRL<(item: SideNavigationItem) => void>;
}

export const SideNavigationItemComponent =
  component$<SideNavigationItemComponentProps>((props) => {
    const {
      item,
      isCollapsed,
      depth = 0,
      size = "md",
      variant = "default",
      onItemClick$,
    } = props;

    // Use item state hook for state management
    const { isExpanded, hasItems, isDisabled, paddingLeft, handleItemClick$ } =
      useSideNavigationItemState({
        item,
        isCollapsed,
        depth,
        onItemClick$,
      });

    // Use styling hook for class generation
    const { containerClass, iconSizeClass } = useSideNavigationItemStyles({
      isActive: !!item.isActive,
      isDisabled,
      size,
      variant,
      customClass: item.class,
    });

    // Pre-render the item content to avoid serialization issues
    const iconContent = item.icon ? (
      <span
        class={`flex-shrink-0 ${isCollapsed ? "mx-auto" : "mr-3"} ${iconSizeClass.value}`}
      >
        {item.icon}
      </span>
    ) : null;

    const labelContent = !isCollapsed ? (
      <span class="flex-grow truncate">{item.label}</span>
    ) : null;

    const badgeContent =
      !isCollapsed && item.badge ? (
        <span class="ml-auto flex-shrink-0 text-xs">{item.badge}</span>
      ) : null;

    const expansionIndicator =
      !isCollapsed && hasItems ? (
        <span
          class={`ml-auto flex-shrink-0 transition-transform duration-200 ${isExpanded.value ? "rotate-90" : ""}`}
        >
          <svg
            class={`${iconSizeClass.value} text-gray-400`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      ) : null;

    return (
      <li class={`${isCollapsed ? "flex justify-center" : ""}`}>
        {/* Render as a link if href is provided, otherwise as a button */}
        {item.href && !isDisabled ? (
          <a
            href={item.href}
            class={containerClass.value}
            style={{ paddingLeft: `${isCollapsed ? 0 : paddingLeft}px` }}
            title={isCollapsed ? item.label : item.tooltip}
            onClick$={handleItemClick$}
            id={item.id}
            aria-current={item.isActive ? "page" : undefined}
            aria-expanded={hasItems ? isExpanded.value : undefined}
          >
            {iconContent}
            {labelContent}
            {badgeContent}
            {expansionIndicator}
          </a>
        ) : (
          <button
            type="button"
            class={containerClass.value}
            style={{ paddingLeft: `${isCollapsed ? 0 : paddingLeft}px` }}
            title={isCollapsed ? item.label : item.tooltip}
            onClick$={handleItemClick$}
            id={item.id}
            disabled={isDisabled}
            aria-current={item.isActive ? "page" : undefined}
            aria-expanded={hasItems ? isExpanded.value : undefined}
          >
            {iconContent}
            {labelContent}
            {badgeContent}
            {expansionIndicator}
          </button>
        )}

        {/* Render child items if they exist and are expanded */}
        {hasItems && !isCollapsed && isExpanded.value && (
          <ul class="mt-1">
            {item.items!.map((childItem, index) => (
              <SideNavigationItemComponent
                key={`${childItem.label}-${index}`}
                item={childItem}
                isCollapsed={isCollapsed}
                depth={depth + 1}
                size={size}
                variant={variant}
                onItemClick$={onItemClick$}
              />
            ))}
          </ul>
        )}
      </li>
    );
  });
