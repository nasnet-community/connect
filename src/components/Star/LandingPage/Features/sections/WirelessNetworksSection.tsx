import { component$ } from "@builder.io/qwik";
import { LuWifi, LuArrowRight } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";

export const WirelessNetworksSection = component$(() => {
  const networks = [
    { name: $localize`Foreign Network`, color: "from-purple-500 to-violet-500", icon: "🌍" },
    { name: $localize`Domestic Network`, color: "from-green-500 to-emerald-500", icon: "🏠" },
    { name: $localize`Split Network`, color: "from-blue-500 to-cyan-500", icon: "🔀" },
    { name: $localize`VPN Network`, color: "from-orange-500 to-red-500", icon: "🔒" },
  ];

  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-slate-900 dark:via-orange-900 dark:to-red-900">
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Side */}
          <div class="relative animate-fade-in-left order-2 lg:order-1">
            <div class="grid grid-cols-2 gap-4">
              {networks.map((network, index) => (
                <div
                  key={network.name}
                  class={`bg-gradient-to-br ${network.color} rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 animate-fade-in-up`}
                  style={`animation-delay: ${index * 100}ms`}
                >
                  <div class="text-3xl mb-3">{network.icon}</div>
                  <h4 class="font-bold text-lg mb-2">{network.name}</h4>
                  <div class="flex items-center gap-2">
                    <LuWifi class="w-4 h-4" />
                    <span class="text-sm opacity-90">{$localize`Isolated`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-right order-1 lg:order-2">
            <Badge color="warning" variant="outline" size="lg">
              {$localize`Network Segmentation`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {$localize`Multiple Wireless`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Networks`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Purpose-built networks with intelligent segmentation. Create isolated networks for different purposes with bandwidth control and routing rules.`}
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg" class="group">
                {$localize`Configure Networks`}
                <LuArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});