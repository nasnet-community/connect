import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/Core";
import {
  LuWifi,
  LuZap,
  LuCpu,
  LuMemoryStick,
  LuNetwork,
  LuRouter,
} from "@qwikest/icons/lucide";

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
        group relative animate-fade-in-up cursor-pointer overflow-hidden border
        border-white/20 bg-white/10 backdrop-blur-md transition-all duration-500
        hover:scale-105 hover:transform hover:border-white/40 hover:shadow-2xl
        dark:bg-black/10
        ${index === 1 ? "animation-delay-200" : ""}
        ${index === 2 ? "animation-delay-500" : ""}
        ${index >= 3 ? "animation-delay-1000" : ""}
      `}
    >
      {/* Router Image */}
      <div class="relative flex h-48 items-center justify-center bg-gradient-to-br from-gray-50/50 to-blue-50/50 p-6 dark:from-gray-800/50 dark:to-blue-800/50">
        <div class="group relative">
          <div class="absolute inset-0 scale-110 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <img
            src={router.image}
            alt={router.name}
            class="h-32 w-auto object-contain drop-shadow-lg filter transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError$={(event) => {
              // Fallback to a generic router image if the specific one doesn't load
              (event.target as HTMLImageElement).src =
                "/images/routers/hap-ax3/hap-ax3-1.png";
            }}
          />
        </div>

        {/* Feature Badges */}
        <div class="absolute right-4 top-4 flex gap-1">
          {router.isWireless && (
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 backdrop-blur-sm">
              <LuWifi class="h-4 w-4 text-blue-500" />
            </div>
          )}
          {router.isLTE && (
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 backdrop-blur-sm">
              <LuZap class="h-4 w-4 text-orange-500" />
            </div>
          )}
        </div>
      </div>

      {/* Router Info */}
      <div class="p-6">
        <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          {router.name}
        </h3>

        {/* Specs */}
        <div class="mb-4 space-y-2">
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
              class="rounded-full border border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm dark:text-gray-300"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Overlay */}
      <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div class="text-center text-white">
          <LuRouter class="mx-auto mb-2 h-8 w-8" />
          <span class="text-sm font-medium">{$localize`Configure Now`}</span>
        </div>
      </div>
    </Card>
  );
});
