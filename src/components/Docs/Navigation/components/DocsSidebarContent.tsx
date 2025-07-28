import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import type { DocsSideNavigationCategory } from "../types";
import { CategoryItem } from "./CategoryItem";

export interface DocsSidebarContentProps {
  categories: DocsSideNavigationCategory[];
  activeHref: string;
  expandedCategories: Record<string, boolean>;
  isCompact: boolean;
  title?: string;
  class?: string;
  onToggleCategory$: PropFunction<(categoryId: string) => void>;
}

/**
 * The main navigation content with categories and links
 */
export const DocsSidebarContent = component$<DocsSidebarContentProps>(
  (props) => {
    const {
      categories,
      activeHref,
      expandedCategories,
      isCompact,
      title = "Documentation",
      class: className = "",
      onToggleCategory$,
    } = props;

    return (
      <div
        class={`
      rounded-lg border 
      border-gray-200 bg-surface-light-DEFAULT 
      shadow-sm transition-all duration-300 
      dark:border-gray-700 dark:bg-surface-dark-secondary
      ${isCompact ? "p-2" : "p-4"}
      ${className}
    `}
      >
        {title && !isCompact && (
          <div class="mb-4 border-b border-gray-100 pb-3 text-lg font-semibold text-gray-800 dark:border-gray-700 dark:text-white">
            {title}
          </div>
        )}

        <nav class="space-y-6" role="navigation" aria-label="Documentation navigation">
          {categories.map((category) => (
            <div key={category.id}>
              <CategoryItem
                category={category}
                activeHref={activeHref}
                isCompact={isCompact}
                expandedCategories={expandedCategories}
                onToggleCategory$={onToggleCategory$}
              />
            </div>
          ))}
        </nav>
      </div>
    );
  },
);
