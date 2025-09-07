import { component$, type Signal, type QRL, useSignal, useTask$, $ } from "@builder.io/qwik";
import { SegmentedControl } from "~/components/Core";
import { LuNetwork, LuZap, LuPowerOff, LuPower } from "@qwikest/icons/lucide";

interface SubnetsHeaderProps {
  subnetsEnabled: Signal<boolean>;
  onToggle$?: QRL<(enabled: boolean) => void>;
}

export const SubnetsHeader = component$<SubnetsHeaderProps>(
  ({ subnetsEnabled, onToggle$ }) => {
    // Create a string signal for SegmentedControl
    const subnetState = useSignal(subnetsEnabled.value ? "enable" : "disable");
    
    // Sync the string signal with the boolean signal
    useTask$(({ track }) => {
      track(() => subnetsEnabled.value);
      subnetState.value = subnetsEnabled.value ? "enable" : "disable";
    });
    
    return (
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 via-blue-50 to-primary-100 dark:from-primary-900/20 dark:via-blue-900/20 dark:to-primary-800/20 p-8">
        {/* Background Pattern */}
        <div class="absolute inset-0 bg-grid-pattern opacity-5" />
        
        {/* Floating Elements */}
        <div class="absolute top-4 right-4 opacity-10">
          <LuZap class="h-12 w-12 text-primary-500 animate-pulse" />
        </div>

        <div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title Section */}
          <div class="flex items-center gap-6">
            {/* Animated Icon */}
            <div class="relative">
              <div class="absolute inset-0 rounded-2xl bg-primary-500/20 animate-ping" />
              <div class="relative rounded-2xl bg-gradient-to-br from-primary-500 to-blue-600 p-4 shadow-lg">
                <LuNetwork class="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Text Content */}
            <div class="space-y-2">
              <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-700 via-blue-600 to-primary-800 bg-clip-text text-transparent dark:from-primary-300 dark:via-blue-400 dark:to-primary-400">
                {$localize`Network Subnets`}
              </h1>
              <p class="text-lg text-gray-600 dark:text-gray-300 max-w-md">
                {$localize`Configure IP subnets for your network segments with smart validation and conflict detection`}
              </p>
            </div>
          </div>

          {/* Modern Toggle Section */}
          <div class="flex flex-col items-end gap-4">
            {/* Status Indicator */}
            <div class="flex items-center gap-2">
              <div class={`w-3 h-3 rounded-full transition-colors duration-300 ${
                subnetsEnabled.value 
                  ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                  : 'bg-gray-400'
              }`} />
              <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                {subnetsEnabled.value 
                  ? $localize`Configuration Active` 
                  : $localize`Configuration Disabled`
                }
              </span>
            </div>

            {/* Segmented Control */}
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <SegmentedControl
                value={subnetState}
                options={[
                  { 
                    value: "disable", 
                    label: $localize`Disable`,
                    icon: <LuPowerOff class="h-5 w-5" /> as any
                  },
                  { 
                    value: "enable", 
                    label: $localize`Enable`,
                    icon: <LuPower class="h-5 w-5" /> as any
                  }
                ]}
                onChange$={$((value: string) => {
                  const enabled = value === "enable";
                  subnetsEnabled.value = enabled;
                  if (onToggle$) {
                    onToggle$(enabled);
                  }
                })}
                size="md"
                color="primary"
              />
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        {subnetsEnabled.value && (
          <div class="relative z-10 mt-6 pt-6 border-t border-primary-200/50 dark:border-primary-800/50">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="w-2 h-2 rounded-full bg-primary-500" />
                {$localize`Smart IP validation`}
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="w-2 h-2 rounded-full bg-green-500" />
                {$localize`Conflict detection`}
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="w-2 h-2 rounded-full bg-blue-500" />
                {$localize`Auto-suggestions`}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);