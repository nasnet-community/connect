import { component$, type QRL } from "@builder.io/qwik";

export interface TabOption {
  /**
   * Unique identifier for the tab
   */
  id: string;
  
  /**
   * Display label for the tab
   */
  label: string;
}

export interface TabNavigationProps {
  /**
   * Available tabs
   */
  tabs: TabOption[];
  
  /**
   * The ID of the currently active tab
   */
  activeTab: string;
  
  /**
   * CSS class for the component
   */
  class?: string;
  
  /**
   * Handler for when a tab is selected
   */
  onSelect$: QRL<(tabId: string) => void>;
}

export const TabNavigation = component$<TabNavigationProps>(({
  tabs,
  activeTab,
  class: className = "",
  onSelect$,
}) => {
  return (
    <div class={`mb-6 border-b border-border dark:border-border-dark ${className}`}>
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const activeClasses = isActive
            ? "border-primary-500 text-primary-600 dark:border-primary-500 dark:text-primary-500"
            : "border-transparent text-text-muted hover:border-border hover:text-text-default dark:text-text-dark-muted dark:hover:text-text-dark-default";
            
          return (
            <li key={tab.id} class="mr-2">
              <button
                class={`inline-block p-4 border-b-2 rounded-t-lg ${activeClasses}`}
                onClick$={() => onSelect$(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}); 