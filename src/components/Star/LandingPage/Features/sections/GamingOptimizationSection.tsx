import { component$ } from "@builder.io/qwik";
import { LuGamepad2, LuZap, LuTrophy, LuArrowRight } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";

export const GamingOptimizationSection = component$(() => {
  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-violet-50 dark:from-slate-900 dark:via-pink-900 dark:to-purple-900">
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Side */}
          <div class="relative animate-fade-in-left order-2 lg:order-1">
            <div class="relative w-full h-[400px] flex items-center justify-center">
              <div class="absolute w-64 h-64 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
              <LuGamepad2 class="w-48 h-48 text-pink-500 relative z-10" />
              <div class="absolute top-10 right-10">
                <LuZap class="w-16 h-16 text-purple-500 animate-bounce" />
              </div>
              <div class="absolute bottom-10 left-10">
                <LuTrophy class="w-16 h-16 text-violet-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-right order-1 lg:order-2">
            <Badge color="secondary" variant="outline" size="lg">
              {$localize`Gaming Performance`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {$localize`Gaming`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Optimization`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Zero-lag gaming with comprehensive game database. Automatic port forwarding, traffic prioritization, and ping optimization for competitive gaming.`}
            </p>

            <div class="grid grid-cols-3 gap-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-pink-600">3MB+</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{$localize`Game DB`}</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600">1000+</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{$localize`Games`}</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-violet-600">&lt;10ms</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{$localize`Latency`}</div>
              </div>
            </div>

            <div class="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg" class="group">
                {$localize`Optimize for Gaming`}
                <LuArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});