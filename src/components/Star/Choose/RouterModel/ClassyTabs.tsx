import { component$, type QRL } from "@builder.io/qwik";
import {
  LuWifi,
  LuSmartphone,
  LuRouter,
  LuCpu,
  LuZap,
} from "@qwikest/icons/lucide";
import { type RouterCategory } from "./RouterCategories";

interface ClassyTabsProps {
  categories: RouterCategory[];
  activeCategory: string;
  onSelect$: QRL<(categoryId: string) => void>;
}

interface TabItemProps {
  category: RouterCategory;
  isActive: boolean;
  onSelect$: QRL<(categoryId: string) => void>;
}

const ClassyTabItem = component$<TabItemProps>((props) => {
  const { category, isActive, onSelect$ } = props;

  const getIcon = (familyId: string) => {
    switch (familyId) {
      case "hAP":
        return <LuWifi class="h-4 w-4" />;
      case "Chateau":
        return <LuSmartphone class="h-4 w-4" />;
      case "cAP":
        return <LuZap class="h-4 w-4" />;
      case "RB":
        return <LuCpu class="h-4 w-4" />;
      default:
        return <LuRouter class="h-4 w-4" />;
    }
  };

  const getColorScheme = (familyId: string, isActive: boolean) => {
    if (isActive) {
      return {
        bg: "bg-gradient-to-r from-primary-500 to-secondary-500",
        text: "text-white",
        border: "border-primary-300/50",
        shadow: "shadow-primary",
      };
    }

    switch (familyId) {
      case "hAP":
        return {
          bg: "bg-secondary-50/50 dark:bg-secondary-900/20 hover:bg-secondary-100/60",
          text: "text-secondary-700 dark:text-secondary-300 hover:text-secondary-800",
          border:
            "border-secondary-200/40 dark:border-secondary-700/40 hover:border-secondary-300/60",
          shadow: "hover:shadow-secondary/20",
        };
      case "Chateau":
        return {
          bg: "bg-primary-50/50 dark:bg-primary-900/20 hover:bg-primary-100/60",
          text: "text-primary-700 dark:text-primary-300 hover:text-primary-800",
          border:
            "border-primary-200/40 dark:border-primary-700/40 hover:border-primary-300/60",
          shadow: "hover:shadow-primary/20",
        };
      case "cAP":
        return {
          bg: "bg-success-50/50 dark:bg-success-900/20 hover:bg-success-100/60",
          text: "text-success-700 dark:text-success-300 hover:text-success-800",
          border:
            "border-success-200/40 dark:border-success-700/40 hover:border-success-300/60",
          shadow: "hover:shadow-success/20",
        };
      case "RB":
        return {
          bg: "bg-warning-50/50 dark:bg-warning-900/20 hover:bg-warning-100/60",
          text: "text-warning-700 dark:text-warning-300 hover:text-warning-800",
          border:
            "border-warning-200/40 dark:border-warning-700/40 hover:border-warning-300/60",
          shadow: "hover:shadow-warning/20",
        };
      default:
        return {
          bg: "bg-gray-50/50 dark:bg-gray-800/20 hover:bg-gray-100/60",
          text: "text-gray-600 dark:text-gray-300 hover:text-gray-700",
          border:
            "border-gray-200/40 dark:border-gray-700/40 hover:border-gray-300/60",
          shadow: "hover:shadow-md",
        };
    }
  };

  const colorScheme = getColorScheme(category.id, isActive);

  return (
    <button
      type="button"
      onClick$={() => onSelect$(category.id)}
      class={`
        relative rounded-xl border px-4 py-2.5 text-sm
        font-semibold backdrop-blur-sm transition-all
        duration-300 ease-out
        ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} ${colorScheme.shadow}
        ${isActive ? "shadow-lg" : "hover:shadow-md"}
        group overflow-hidden
      `}
    >
      {/* Subtle Inner Glow for Active State */}
      {isActive && (
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-white/5" />
      )}

      {/* Content */}
      <div class="relative z-10 flex items-center gap-2.5">
        <div class={`${isActive ? "text-white" : "text-current"}`}>
          {getIcon(category.id)}
        </div>
        <span class="whitespace-nowrap">{category.label}</span>
        {category.routers.length > 0 && (
          <div
            class={`
              flex h-5 min-w-[20px] items-center justify-center rounded-full
              px-1.5 text-[11px] font-bold
              transition-all duration-300
              ${
                isActive
                  ? "border border-white/20 bg-white/20 text-white"
                  : "border border-gray-300/40 bg-white/40 text-gray-600 dark:border-gray-600/40 dark:bg-gray-700/40 dark:text-gray-300"
              }
            `}
          >
            {category.routers.length}
          </div>
        )}
      </div>
    </button>
  );
});

export const ClassyTabs = component$<ClassyTabsProps>((props) => {
  const { categories, activeCategory, onSelect$ } = props;

  return (
    <div class="flex flex-col items-center px-1 sm:px-0">
      {/* Tab Container */}
      <div class="relative flex items-center justify-center">
        {/* Elegant Background Panel */}
        <div class="absolute inset-0 rounded-2xl border border-white/30 bg-white/10 shadow-xl backdrop-blur-xl dark:border-white/20 dark:bg-black/20" />

        {/* Decorative Border Accents */}
        <div class="absolute left-1/2 top-0 h-0.5 w-24 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-primary-400 to-secondary-400" />
        <div class="absolute bottom-0 left-1/2 h-0.5 w-16 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-secondary-400 to-primary-400" />

        {/* Tab Items */}
        <div class="relative flex items-center gap-1.5 p-2">
          {categories.map((category, index) => (
            <div key={category.id} class="relative">
              <ClassyTabItem
                category={category}
                isActive={activeCategory === category.id}
                onSelect$={onSelect$}
              />

              {/* Elegant Separator */}
              {index < categories.length - 1 && (
                <div class="absolute -right-1 top-1/2 h-8 w-px -translate-y-1/2 transform bg-gradient-to-b from-transparent via-gray-300/40 to-transparent dark:via-gray-600/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
