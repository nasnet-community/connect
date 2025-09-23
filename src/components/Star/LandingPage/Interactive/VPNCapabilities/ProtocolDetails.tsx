import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/Core";
import { LuServer, LuSmartphone } from "@qwikest/icons/lucide";
import { getIcon, type IconName } from "../../utils/iconMapper";

interface ProtocolDetailsProps {
  currentProtocol: {
    name: string;
    icon: IconName;
    color: string;
    performance: {
      speed: number;
      security: number;
      ease: number;
    };
  };
}

export const ProtocolDetails = component$<ProtocolDetailsProps>(({ currentProtocol }) => {
  const CurrentProtocolIcon = getIcon(currentProtocol.icon);

  return (
    <div class="lg:sticky lg:top-8">
      <Card class="p-8 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20">
        {/* Protocol Header */}
        <div class="flex items-center gap-4 mb-6">
          <div class={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentProtocol.color} flex items-center justify-center shadow-xl`}>
            <CurrentProtocolIcon class="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              {currentProtocol.name}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {$localize`Protocol Details`}
            </p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div class="space-y-4 mb-8">
          {[
            { label: $localize`Speed`, value: currentProtocol.performance.speed, color: "blue" },
            { label: $localize`Security`, value: currentProtocol.performance.security, color: "green" },
            { label: $localize`Ease of Use`, value: currentProtocol.performance.ease, color: "purple" }
          ].map((metric) => (
            <div key={metric.label} class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {metric.label}
                </span>
                <span class="text-sm font-bold text-gray-900 dark:text-white">
                  {metric.value}%
                </span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  class={`h-2 rounded-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 transition-all duration-1000`}
                  style={`width: ${metric.value}%`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Configuration Types */}
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center p-4 bg-white/10 dark:bg-black/10 rounded-xl border border-white/20">
            <LuServer class="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
              {$localize`Server Mode`}
            </h4>
            <p class="text-xs text-gray-600 dark:text-gray-300">
              {$localize`Host VPN server`}
            </p>
          </div>
          <div class="text-center p-4 bg-white/10 dark:bg-black/10 rounded-xl border border-white/20">
            <LuSmartphone class="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
              {$localize`Client Mode`}
            </h4>
            <p class="text-xs text-gray-600 dark:text-gray-300">
              {$localize`Connect to VPN`}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
});