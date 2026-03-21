import { Slot, component$, type QRL } from "@builder.io/qwik";
import { LuPlus } from "@qwikest/icons/lucide";
import { ClassyRouterCard } from "./ClassyRouterCard";
import { type RouterData } from "./Constants";
import { type RouterCategory } from "./RouterCategories";
import { ClassyTabs } from "./ClassyTabs";

type RouterCardBadgeVariant = "default" | "primary" | "success" | "warning" | "info";

export interface RouterSelectionItem {
  router: RouterData;
  isSelected: boolean;
  badge?: string;
  badgeVariant?: RouterCardBadgeVariant;
  toggleOnSelect?: boolean;
}

interface RouterSelectionSectionProps {
  title: string;
  categories: RouterCategory[];
  activeCategory: string;
  onSelectCategory$: QRL<(categoryId: string) => void>;
  customCardTitle: string;
  customCardDescription: string;
  customCardTags?: string[];
  onCustomCardClick$: QRL<() => void>;
  routerItems: RouterSelectionItem[];
  onSelectRouter$: QRL<(model: string) => void>;
  onViewDetails$: QRL<(router: RouterData) => void>;
}

export const RouterSelectionSection = component$<RouterSelectionSectionProps>((props) => {
  const customCardTags = props.customCardTags ?? [];

  return (
    <div class="rounded-lg bg-surface shadow-md transition-all dark:bg-surface-dark">
      <div class="mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <header class="text-center">
          <h1 class="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            {props.title}
          </h1>
          <Slot name="header-content" />
        </header>

        <ClassyTabs
          categories={props.categories}
          activeCategory={props.activeCategory}
          onSelect$={props.onSelectCategory$}
        />

        <div class="grid auto-rows-fr grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          <div
            onClick$={props.onCustomCardClick$}
            class="group relative h-full min-h-[260px] cursor-pointer rounded-2xl border border-border/50 bg-white/40 backdrop-blur-xl transition-all duration-300 hover:bg-primary-500/5 dark:bg-surface-dark/40"
          >
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div class="relative flex h-full flex-col p-5 sm:p-6">
              <div class="flex flex-1 items-center justify-center rounded-xl border border-border/40 bg-surface-secondary/40 p-4 dark:border-border-dark/30 dark:bg-surface-dark-secondary/40">
                <div class="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500 dark:bg-primary-500/5 dark:text-primary-400">
                  <LuPlus class="h-8 w-8" />
                </div>
              </div>
              <div class="mt-4 space-y-2 text-center">
                <h3 class="text-xl font-semibold text-text transition-colors duration-300 dark:text-text-dark-default group-hover:text-primary-500 dark:group-hover:text-primary-400">
                  {props.customCardTitle}
                </h3>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  {props.customCardDescription}
                </p>
              </div>
              {customCardTags.length > 0 && (
                <div class="pt-4">
                  <div class="flex flex-wrap justify-center gap-1.5">
                    {customCardTags.map((tag) => (
                      <span
                        key={tag}
                        class="rounded-full bg-primary-500/10 px-2.5 py-1 text-xs font-medium text-primary-700 dark:text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {props.routerItems.map((item) => (
            <ClassyRouterCard
              key={item.router.model}
              router={item.router}
              isSelected={item.isSelected}
              badge={item.badge}
              badgeVariant={item.badgeVariant}
              toggleOnSelect={item.toggleOnSelect}
              onSelect$={props.onSelectRouter$}
              onViewDetails$={props.onViewDetails$}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
