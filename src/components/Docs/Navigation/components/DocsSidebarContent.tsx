import { component$ } from "@builder.io/qwik";
import { PropFunction } from "@builder.io/qwik";
import { DocsSideNavigationCategory } from "../types";
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
export const DocsSidebarContent = component$<DocsSidebarContentProps>((props) => {
  const { 
    categories, 
    activeHref, 
    expandedCategories, 
    isCompact,
    title = "Documentation",
    class: className = "",
    onToggleCategory$
  } = props;
  
  return (
    <div class={`
      bg-white dark:bg-slate-800 
      rounded-lg shadow-sm 
      border border-slate-200 dark:border-slate-700 
      transition-all duration-300
      ${isCompact ? 'p-2' : 'p-4'}
      ${className}
    `}>
      {title && !isCompact && (
        <div class="text-lg font-semibold mb-4 text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3">
          {title}
        </div>
      )}
      
      <nav class="space-y-6">
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
}); 