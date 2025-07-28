import type { Signal } from "@builder.io/qwik";
import type { BreadcrumbItem } from "../Breadcrumbs.types";

export function useDisplayedItems(
  items: BreadcrumbItem[],
  maxItems: number,
  expanderLabel: string,
  screenWidth: Signal<number>,
) {
  const displayedItems = () => {
    // Responsive max items based on screen size
    const getResponsiveMaxItems = () => {
      if (screenWidth.value < 475) { // mobile
        return Math.min(maxItems, 2);
      } else if (screenWidth.value < 768) { // mobile-md to tablet
        return Math.min(maxItems, 3);
      } else if (screenWidth.value < 1024) { // tablet to laptop
        return Math.min(maxItems, 4);
      }
      return maxItems; // desktop and above
    };

    const responsiveMaxItems = getResponsiveMaxItems();
    const shouldCollapse = responsiveMaxItems > 0 && items.length > responsiveMaxItems;

    if (!shouldCollapse) {
      return items;
    }

    if (items.length <= 2) {
      return items;
    }

    // For mobile, show first and last only
    if (screenWidth.value < 475 && items.length > 2) {
      return [
        items[0],
        {
          label: expanderLabel,
          id: "breadcrumb-ellipsis",
          isCurrent: false,
          class: "mobile:px-0.5",
        } as BreadcrumbItem,
        items[items.length - 1],
      ];
    }

    // For larger screens, show more items
    const numToShow = Math.min(responsiveMaxItems, items.length);
    if (numToShow === items.length) {
      return items;
    }

    const firstItems = items.slice(0, Math.floor(numToShow / 2));
    const lastItems = items.slice(-(Math.ceil(numToShow / 2) - 1));

    return [
      ...firstItems,
      {
        label: expanderLabel,
        id: "breadcrumb-ellipsis",
        isCurrent: false,
        class: "tablet:px-1",
      } as BreadcrumbItem,
      ...lastItems,
    ];
  };

  return { displayedItems: displayedItems() };
}
