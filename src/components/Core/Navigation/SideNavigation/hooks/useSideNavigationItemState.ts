import { useSignal, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { SideNavigationItem } from "../SideNavigation.types";

export interface UseSideNavigationItemStateProps {
  item: SideNavigationItem;
  isCollapsed: boolean;
  depth: number;
  onItemClick$?: QRL<(item: SideNavigationItem) => void>;
}

export function useSideNavigationItemState(
  props: UseSideNavigationItemStateProps,
) {
  const { item, isCollapsed, depth = 0, onItemClick$ } = props;

  // Expansion state
  const isExpanded = useSignal(!!item.isExpanded);

  // Extract primitive values to avoid serialization issues
  const hasItems = !!item.items?.length;
  const isDisabled = !!item.isDisabled;
  const itemOnClick$ = item.onClick$;

  // Create a serializable item reference with primitive properties
  const itemId = item.id;
  const itemLabel = item.label;
  const itemHref = item.href;
  const itemIsActive = !!item.isActive;

  // Create a serializable version of the item with only primitive properties
  const serializableItem = {
    id: itemId,
    label: itemLabel,
    href: itemHref,
    isActive: itemIsActive,
    isDisabled: isDisabled,
  };

  // Handle item click with extracted values
  const handleItemClick$ = $(() => {
    if (isDisabled) return;

    // For items with children, toggle expansion
    if (hasItems) {
      isExpanded.value = !isExpanded.value;
    }

    // Run the item's click handler if provided
    if (itemOnClick$) {
      itemOnClick$();
    }

    // Run the parent's click handler if provided
    if (onItemClick$) {
      // Pass the serializable version of the item
      onItemClick$(serializableItem as SideNavigationItem);
    }
  });

  // Compute padding based on depth
  const paddingLeft = isCollapsed ? 0 : depth * 8 + 16;

  return {
    isExpanded,
    hasItems,
    isDisabled,
    paddingLeft,
    handleItemClick$,
    itemId,
    itemLabel,
  };
}
