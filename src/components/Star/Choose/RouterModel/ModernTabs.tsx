import { $, component$, useSignal, useVisibleTask$, type QRL } from "@builder.io/qwik";
import { 
  LuWifi, 
  LuSmartphone, 
  LuRouter, 
  LuCpu, 
  LuZap 
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
        relative px-6 py-3 rounded-2xl font-medium text-sm
        transition-all duration-300 ease-out
        transform-gpu hover:scale-[1.02]
        group overflow-hidden
        ${isActive 
          ? 'text-white shadow-lg hover:shadow-xl' 
          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }
      `}
      style={`animation-delay: ${index * 100}ms`}
    >
      {/* Background Effects */}
      <div
        class={`
          absolute inset-0 rounded-2xl transition-all duration-500
          ${isActive 
            ? `bg-gradient-to-r ${getGradient(category.id)} opacity-100 animate-gradient-shift` 
            : 'bg-white/10 dark:bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100'
          }
        `}
      />
      
      {/* Glow Effect for Active Tab */}
      {isActive && (
        <div
          class={`
            absolute inset-0 rounded-2xl blur-xl scale-110 opacity-50
            bg-gradient-to-r ${getGradient(category.id)}
            animate-pulse-glow
          `}
        />
      )}

      {/* Border */}
      <div
        class={`
          absolute inset-0 rounded-2xl border transition-all duration-300
          ${isActive 
            ? 'border-white/30' 
            : 'border-white/20 dark:border-white/10 group-hover:border-white/30'
          }
        `}
      />

      {/* Content */}
      <div class="relative flex items-center gap-2 z-10">
        <div
          class={`
            transition-all duration-300
            ${isActive ? 'text-white animate-bounce-subtle' : 'text-current'}
          `}
        >
          {getIcon(category.id)}
        </div>
        <span class="font-semibold whitespace-nowrap">
          {category.label}
        </span>
        {category.routers.length > 0 && (
          <div
            class={`
              min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold
              flex items-center justify-center
              transition-all duration-300
              ${isActive 
                ? 'bg-white/25 text-white animate-pulse' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-white/20'
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

    const activeButton = containerRef.value.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
    if (!activeButton) return;

    const containerRect = containerRef.value.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();
    
    const left = buttonRect.left - containerRect.left;
    const width = buttonRect.width;

    indicatorRef.value.style.transform = `translateX(${left}px)`;
    indicatorRef.value.style.width = `${width}px`;
  });

  useVisibleTask$(({ track }) => {
    track(() => activeCategory);
    updateIndicator();
  });

  return (
    <div class="flex flex-col items-center space-y-6">
      {/* Tab Container */}
      <div
        ref={containerRef}
        class="relative flex items-center justify-center"
      >
        {/* Background Panel */}
        <div class="absolute inset-0 bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl" />
        
        {/* Animated Indicator */}
        <div
          ref={indicatorRef}
          class="absolute top-0 h-full rounded-2xl transition-all duration-500 ease-out"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-2xl blur-sm" />
        </div>

        {/* Tab Items */}
        <div class="relative flex items-center p-2 gap-1">
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
      <div class="text-center animate-fade-in">
        {categories.find(cat => cat.id === activeCategory) && (
          <div class="max-w-md mx-auto">
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {categories.find(cat => cat.id === activeCategory)?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});