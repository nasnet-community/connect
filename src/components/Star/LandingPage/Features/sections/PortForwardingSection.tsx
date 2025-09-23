import { component$ } from "@builder.io/qwik";
import { LuPlug, LuShare2, LuServer, LuArrowRight } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";

export const PortForwardingSection = component$(() => {
  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-left">
            <Badge color="info" variant="outline" size="lg">
              {$localize`Connectivity`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {$localize`Port Forwarding`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Features`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Seamless device access with UPNP, NAT-PMP, and manual configuration. Auto discovery, manual rules, and comprehensive port management.`}
            </p>

            <div class="space-y-3">
              {[
                { icon: LuShare2, name: "UPNP", desc: $localize`Automatic port mapping` },
                { icon: LuServer, name: "NAT-PMP", desc: $localize`Apple protocol support` },
                { icon: LuPlug, name: "Manual", desc: $localize`Custom port rules` },
              ].map((feature) => (
                <div key={feature.name} class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <feature.icon class="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">{feature.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div class="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg" class="group">
                {$localize`Configure Port Forwarding`}
                <LuArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Visual Side */}
          <div class="relative animate-fade-in-right">
            <div class="relative w-full h-[400px] flex items-center justify-center">
              <div class="grid grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold animate-fade-in-up"
                    style={`animation-delay: ${i * 100}ms`}
                  >
                    {8080 + i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});