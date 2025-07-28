import { useComputed$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

export interface UseItemRangeProps {
  currentPageValue: Signal<number>;
  totalItems: number;
  itemsPerPage: number;
  showItemRange: boolean;
  itemRangeTemplate: string;
}

export function useItemRange({
  currentPageValue,
  totalItems,
  itemsPerPage,
  showItemRange,
  itemRangeTemplate,
}: UseItemRangeProps) {
  return useComputed$(() => {
    if (!showItemRange) return "";

    const current = currentPageValue.value;
    const start = (current - 1) * itemsPerPage + 1;
    const end = Math.min(start + itemsPerPage - 1, totalItems);

    return itemRangeTemplate
      .replace("{start}", start.toString())
      .replace("{end}", end.toString())
      .replace("{total}", totalItems.toString());
  });
}
