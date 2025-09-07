import { component$ } from "@builder.io/qwik";

export interface EmptyStateProps {
  searchQuery?: string;
  message?: string;
  icon?: string;
}

export const EmptyState = component$<EmptyStateProps>(
  ({ searchQuery, message, icon }) => {
    const defaultIcon = "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z";
    const displayMessage = message || (searchQuery 
      ? `No results found matching "${searchQuery}"`
      : "No items to display");
    
    return (
      <div class="text-center py-12">
        <svg 
          class="mx-auto h-12 w-12 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d={icon || defaultIcon} 
          />
        </svg>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {displayMessage}
        </p>
      </div>
    );
  }
);