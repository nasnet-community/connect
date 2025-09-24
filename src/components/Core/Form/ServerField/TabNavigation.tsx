import { component$, $, type QRL } from "@builder.io/qwik";

export interface Tab {
  id: string;

  label: string;
}

export interface TabNavigationProps {
  tabs: Tab[];

  activeTab: string;

  onSelect$: QRL<(tabId: string) => void>;

  class?: string;
}

export const TabNavigation = component$<TabNavigationProps>(
  ({ tabs, activeTab, onSelect$, class: className = "" }) => {
    return (
      <div
        class={`mb-6 border-b border-gray-200 dark:border-gray-700 ${className}`}
      >
        <ul class="-mb-px flex flex-wrap">
          {tabs.map((tab) => (
            <li key={tab.id} class="mr-2">
              <button
                onClick$={$(() => onSelect$(tab.id))}
                class={`inline-block rounded-t-lg border-b-2 p-4 ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600 dark:border-primary-500 dark:text-primary-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                }`}
                type="button"
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
