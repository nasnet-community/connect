import { component$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Badge } from "~/components/Core";
import {
  routerModels,
  getRouterCategories,
  getRouterStats,
} from "../../data/routerModelsData";
import { CategoryFilter } from "./CategoryFilter";
import { RouterCard } from "./RouterCard";
import { BottomStats } from "./BottomStats";
import { semanticMessages } from "~/i18n/semantic";
import { normalizeLocale } from "~/i18n/config";

export const RouterModelsSection = component$(() => {
  const location = useLocation();
  const locale = normalizeLocale(location.params.locale);
  const selectedCategory = useSignal("all");
  const routerCategories = getRouterCategories(locale);
  const routerStats = getRouterStats(locale);

  const filteredRouters =
    selectedCategory.value === "all"
      ? routerModels
      : routerModels.filter(
          (router) => router.category === selectedCategory.value,
        );

  return (
    <section class="relative bg-gradient-to-br from-slate-50/50 to-blue-50/50 px-4 py-24 dark:from-slate-900/50 dark:to-blue-900/50">
      <div class="mx-auto max-w-7xl">
        {/* Section Header */}
        <div class="mb-16 text-center">
          <Badge color="secondary" variant="outline" size="lg" class="mb-4">
            {semanticMessages.landing_router_models_section_badge(
              {},
              { locale },
            )}
          </Badge>
          <h2 class="mb-6 text-3xl font-bold md:text-5xl">
            <span class="text-gray-900 dark:text-white">
              {semanticMessages.landing_router_models_section_title(
                {},
                { locale },
              )}
            </span>
            <br />
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {semanticMessages.landing_router_models_section_highlight(
                {},
                { locale },
              )}
            </span>
          </h2>
          <p class="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            {semanticMessages.landing_router_models_section_description(
              {},
              { locale },
            )}
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={routerCategories}
          selectedCategory={selectedCategory}
        />

        {/* Router Grid */}
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredRouters.map((router, index) => (
            <RouterCard key={router.name} router={router} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <BottomStats stats={routerStats} />
      </div>
    </section>
  );
});
