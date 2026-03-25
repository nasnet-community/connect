import type { QRL } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import type { Tab } from "../TabNavigation.types";

export interface UseTabKeyboardNavigationProps {
  tabs: Tab[];
  selectTab$: QRL<(tabId: string, disabled?: boolean) => void>;
}

export function useTabKeyboardNavigation({
  tabs,
  selectTab$,
}: UseTabKeyboardNavigationProps) {
  // Filter out disabled tabs
  const enabledTabs = tabs.filter((tab) => !tab.disabled);

  // Handle keyboard navigation
  const handleKeyDown$ = $((event: KeyboardEvent, currentTabId: string) => {
    // Find the current tab index
    const currentIndex = enabledTabs.findIndex(
      (tab) => tab.id === currentTabId,
    );
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;

    switch (event.key) {
      // Arrow right or down: move to next tab
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % enabledTabs.length;
        break;

      // Arrow left or up: move to previous tab
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex =
          (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
        break;

      // Home: move to first tab
      case "Home":
        nextIndex = 0;
        break;

      // End: move to last tab
      case "End":
        nextIndex = enabledTabs.length - 1;
        break;
    }

    // If we have a new index, select that tab
    if (nextIndex !== null) {
      const nextTab = enabledTabs[nextIndex];
      const tabButton = document.getElementById(`tab-${nextTab.id}`);
      if (tabButton) {
        tabButton.click();
        tabButton.focus();
      } else {
        selectTab$(nextTab.id);
      }
    }
  });

  return { handleKeyDown$ };
}
