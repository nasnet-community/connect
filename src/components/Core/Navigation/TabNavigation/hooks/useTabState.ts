import type { QRL } from "@builder.io/qwik";
import { useSignal, useTask$, $ } from "@builder.io/qwik";

export interface UseTabStateProps {
  activeTab: string;
  defaultTab?: string;
  onSelect$?: QRL<(tabId: string) => void>;
}

export function useTabState({
  activeTab,
  defaultTab,
  onSelect$,
}: UseTabStateProps) {
  // Internal state for controlling the tab
  const selectedTab = useSignal(activeTab || defaultTab || "");

  // Sync with external active tab if provided
  useTask$(({ track }) => {
    const newActiveTab = track(() => activeTab);
    if (newActiveTab) {
      selectedTab.value = newActiveTab;
    }
  });

  // Handler for tab selection
  const selectTab$ = $((tabId: string, disabled?: boolean) => {
    if (disabled) return;

    // Update the internal state
    if (tabId !== selectedTab.value) {
      selectedTab.value = tabId;

      // Call the external handler if provided
      if (onSelect$) {
        onSelect$(tabId);
      }
    }
  });

  return {
    selectedTab,
    selectTab$,
  };
}
