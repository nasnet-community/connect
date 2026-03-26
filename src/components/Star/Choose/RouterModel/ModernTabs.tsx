import { $, component$, useSignal, useTask$, type QRL } from "@builder.io/qwik";
import {
  LuWifi,
  LuSmartphone,
  LuRouter,
  LuCpu,
  LuZap,
} from "@qwikest/icons/lucide";
import { type RouterCategory } from "./RouterCategories";

interface ModernTabsProps {
  categories: RouterCategory[];
  activeCategory: string;
  onSelect$: QRL<(categoryId: string) => void>;
}

interface TabItemProps {
  category: RouterCategory;
  isActive: boolean;
  onSelect$: QRL<(categoryId: string) => void>;
  index: number;
}

const ModernTabItem = component$<TabItemProps>((props) => {
  const { category, isActive, onSelect$, index } = props;

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

  const getGradient = (familyId: string) => {
    switch (familyId) {
      case "hAP":
        return "from-blue-500 to-cyan-500";
      case "Chateau":
        return "from-purple-500 to-pink-500";
      case "cAP":
        return "from-green-500 to-teal-500";
      case "RB":
        return "from-orange-500 to-red-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <button
      type="button"
      onClick$={() => onSelect$(category.id)}
      class={`
        group relative transform-gpu overflow-hidden rounded-2xl px-6
        py-3 text-sm font-medium
        transition-all duration-300
        ease-out hover:scale-[1.02]
        ${
          isActive
            ? "text-white shadow-lg hover:shadow-xl"
            : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        }
      `}
      style={`animation-delay: ${index * 100}ms`}
    >
      {/* Background Effects */}
      <div
        class={`
          absolute inset-0 rounded-2xl transition-all duration-500
          ${
            isActive
              ? `bg-gradient-to-r ${getGradient(category.id)} animate-gradient-shift opacity-100`
              : "bg-white/10 opacity-0 backdrop-blur-sm group-hover:opacity-100 dark:bg-white/5"
          }
        `}
      />

      {/* Glow Effect for Active Tab */}
      {isActive && (
        <div
          class={`
            absolute inset-0 scale-110 rounded-2xl bg-gradient-to-r opacity-50
            blur-xl ${getGradient(category.id)}
            animate-pulse-glow
          `}
        />
      )}

      {/* Border */}
      <div
        class={`
          absolute inset-0 rounded-2xl border transition-all duration-300
          ${
            isActive
              ? "border-white/30"
              : "border-white/20 group-hover:border-white/30 dark:border-white/10"
          }
        `}
      />

      {/* Content */}
      <div class="relative z-10 flex items-center gap-2">
        <div
          class={`
            transition-all duration-300
            ${isActive ? "animate-bounce-subtle text-white" : "text-current"}
          `}
        >
          {getIcon(category.id)}
        </div>
        <span class="whitespace-nowrap font-semibold">{category.label}</span>
        {category.routers.length > 0 && (
          <div
            class={`
              flex h-5 min-w-[20px] items-center justify-center rounded-full
              px-1.5 text-xs font-bold
              transition-all duration-300
              ${
                isActive
                  ? "animate-pulse bg-white/25 text-white"
                  : "bg-gray-200 text-gray-600 group-hover:bg-white/20 dark:bg-gray-700 dark:text-gray-300"
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

export const ModernTabs = component$<ModernTabsProps>((props) => {
  const { categories, activeCategory, onSelect$ } = props;
  const containerRef = useSignal<HTMLDivElement>();
  const indicatorRef = useSignal<HTMLDivElement>();

  // Update indicator position
  const updateIndicator = $(() => {
    if (!containerRef.value || !indicatorRef.value) return;

    const activeButton = containerRef.value.querySelector(
      `[data-category="${activeCategory}"]`,
    ) as HTMLElement | null;
    if (!activeButton) return;

    const containerRect = containerRef.value.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    const left = buttonRect.left - containerRect.left;
    const width = buttonRect.width;

    indicatorRef.value.style.transform = `translateX(${left}px)`;
    indicatorRef.value.style.width = `${width}px`;
  });

  useTask$(({ track }) => {
    if (typeof window === "undefined") {
      return;
    }

    track(() => activeCategory);
    track(() => containerRef.value);
    track(() => indicatorRef.value);
    updateIndicator();
  });

  return (
    <div class="flex flex-col items-center space-y-6">
      {/* Tab Container */}
      <div ref={containerRef} class="relative flex items-center justify-center">
        {/* Background Panel */}
        <div class="absolute inset-0 rounded-3xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20" />

        {/* Animated Indicator */}
        <div
          ref={indicatorRef}
          class="absolute top-0 h-full rounded-2xl transition-all duration-500 ease-out"
        >
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-sm" />
        </div>

        {/* Tab Items */}
        <div class="relative flex items-center gap-1 p-2">
          {categories.map((category, index) => (
            <div
              key={category.id}
              data-category={category.id}
              class="animate-fade-in-up"
            >
              <ModernTabItem
                category={category}
                isActive={activeCategory === category.id}
                onSelect$={onSelect$}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Active Category Description */}
      <div class="animate-fade-in text-center">
        {categories.find((cat) => cat.id === activeCategory) && (
          <div class="mx-auto max-w-md">
            <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {categories.find((cat) => cat.id === activeCategory)?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
