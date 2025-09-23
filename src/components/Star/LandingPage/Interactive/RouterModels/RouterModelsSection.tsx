import { component$, useSignal } from "@builder.io/qwik";
import { Badge } from "~/components/Core";
import { routerModels, routerCategories, routerStats } from "../../data/routerModelsData";
import { CategoryFilter } from "./CategoryFilter";
import { RouterCard } from "./RouterCard";
import { BottomStats } from "./BottomStats";

export const RouterModelsSection = component$(() => {
  const selectedCategory = useSignal("all");

  const filteredRouters = selectedCategory.value === "all"
    ? routerModels
    : routerModels.filter(router => router.category === selectedCategory.value);

  return (
    <section class="relative py-24 px-4 bg-gradient-to-br from-slate-50/50 to-blue-50/50 dark:from-slate-900/50 dark:to-blue-900/50">
      <div class="max-w-7xl mx-auto">
        {/* Section Header */}
        <div class="text-center mb-16">
          <Badge color="secondary" variant="outline" size="lg" class="mb-4">
            {$localize`Hardware Support`}
          </Badge>
          <h2 class="text-3xl md:text-5xl font-bold mb-6">
            <span class="text-gray-900 dark:text-white">
              {$localize`Support for`}
            </span>
            <br />
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {$localize`17+ Router Models`}
            </span>
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {$localize`From entry-level home routers to enterprise-grade equipment, configure any MikroTik device with intelligent model detection.`}
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={routerCategories}
          selectedCategory={selectedCategory}
        />

        {/* Router Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRouters.map((router, index) => (
            <RouterCard
              key={router.name}
              router={router}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <BottomStats stats={routerStats} />
      </div>
    </section>
  );
});