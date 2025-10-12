import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { getIcon, type IconName } from "../../utils/iconMapper";

interface Category {
  id: string;
  name: string;
  icon: IconName;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Signal<string>;
}

export const CategoryFilter = component$<CategoryFilterProps>(({ categories, selectedCategory }) => {
  return (
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => {
        const IconComponent = getIcon(category.icon);
        const categoryId = category.id;
        const categoryName = category.name;

        return (
          <button
            key={categoryId}
            onClick$={() => selectedCategory.value = categoryId}
            class={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
              ${selectedCategory.value === categoryId
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/20'
              }
            `}
          >
            <IconComponent class="h-4 w-4" />
            {categoryName}
          </button>
        );
      })}
    </div>
  );
});