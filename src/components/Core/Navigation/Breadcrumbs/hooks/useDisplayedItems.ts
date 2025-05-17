import { Signal } from '@builder.io/qwik';
import type { BreadcrumbItem } from '../Breadcrumbs.types';

export function useDisplayedItems(
  items: BreadcrumbItem[], 
  maxItems: number, 
  expanderLabel: string,
  screenWidth: Signal<number>
) {
  const shouldCollapse = maxItems > 0 && items.length > maxItems;
  
  const displayedItems = () => {
    if (!shouldCollapse || screenWidth.value > 768) {
      return items;
    }
    
    if (items.length <= 2) {
      return items;
    }
    
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    
    return [
      firstItem,
      {
        label: expanderLabel,
        id: 'breadcrumb-ellipsis',
        isCurrent: false,
      } as BreadcrumbItem,
      lastItem,
    ];
  };

  return { displayedItems: displayedItems() };
} 