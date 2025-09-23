import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/Core";
import { LuWifi, LuZap, LuCpu, LuMemoryStick, LuNetwork, LuRouter } from "@qwikest/icons/lucide";

interface RouterCardProps {
  router: {
    name: string;
    category: string;
    image: string;
    isWireless: boolean;
    isLTE: boolean;
    specs: {
      cpu: string;
      ram: string;
      ethernet: string;
    };
    features: string[];
  };
  index: number;
}

export const RouterCard = component$<RouterCardProps>(({ router, index }) => {
  return (
    <Card
      class={`
        group relative overflow-hidden bg-white/10 dark:bg-black/10 backdrop-blur-md
        border border-white/20 hover:border-white/40 transition-all duration-500
        hover:transform hover:scale-105 hover:shadow-2xl cursor-pointer
        animate-fade-in-up
        ${index === 1 ? 'animation-delay-200' : ''}
        ${index === 2 ? 'animation-delay-500' : ''}
        ${index >= 3 ? 'animation-delay-1000' : ''}
      `}
    >
      {/* Router Image */}
      <div class="relative h-48 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-blue-800/50">
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={router.image}
            alt={router.name}
            class="max-w-full max-h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError$={(event) => {
              (event.target as HTMLImageElement).src = "/images/routers/placeholder.png";
            }}
          />
        </div>

        {/* Feature Badges */}
        <div class="absolute top-4 right-4 flex gap-1">
          {router.isWireless && (
            <div class="w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <LuWifi class="h-4 w-4 text-blue-500" />
            </div>
          )}
          {router.isLTE && (
            <div class="w-8 h-8 bg-orange-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <LuZap class="h-4 w-4 text-orange-500" />
            </div>
          )}
        </div>
      </div>

      {/* Router Info */}
      <div class="p-6">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {router.name}
        </h3>

        {/* Specs */}
        <div class="space-y-2 mb-4">
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <LuCpu class="h-4 w-4" />
            <span>{router.specs.cpu}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <LuMemoryStick class="h-4 w-4" />
            <span>{router.specs.ram}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <LuNetwork class="h-4 w-4" />
            <span>{router.specs.ethernet}</span>
          </div>
        </div>

        {/* Feature Tags */}
        <div class="flex flex-wrap gap-2">
          {router.features.map((feature, idx) => (
            <span
              key={idx}
              class="px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-white/20 text-gray-700 dark:text-gray-300"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Overlay */}
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div class="text-center text-white">
          <LuRouter class="h-8 w-8 mx-auto mb-2" />
          <span class="text-sm font-medium">{$localize`Configure Now`}</span>
        </div>
      </div>
    </Card>
  );
});