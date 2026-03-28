import {
  component$,
  type Signal,
  type QRL,
  useSignal,
  useTask$,
  $,
} from "@builder.io/qwik";
import { SegmentedControl } from "~/components/Core";
import { LuNetwork, LuZap, LuPowerOff, LuPower } from "@qwikest/icons/lucide";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface SubnetsHeaderProps {
  subnetsEnabled: Signal<boolean>;
  onToggle$?: QRL<(enabled: boolean) => void>;
}

export const SubnetsHeader = component$<SubnetsHeaderProps>(
  ({ subnetsEnabled, onToggle$ }) => {
    const locale = useMessageLocale();

    // Create a string signal for SegmentedControl
    const subnetState = useSignal(subnetsEnabled.value ? "enable" : "disable");

    // Sync the string signal with the boolean signal
    useTask$(({ track }) => {
      track(() => subnetsEnabled.value);
      subnetState.value = subnetsEnabled.value ? "enable" : "disable";
    });

    return (
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 via-blue-50 to-primary-100 p-8 dark:from-primary-900/20 dark:via-blue-900/20 dark:to-primary-800/20">
        {/* Background Pattern */}
        <div class="absolute inset-0 bg-grid-pattern opacity-5" />

        {/* Floating Elements */}
        <div class="absolute right-4 top-4 opacity-10">
          <LuZap class="h-12 w-12 animate-pulse text-primary-500" />
        </div>

        <div class="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Title Section */}
          <div class="flex items-center gap-6">
            {/* Animated Icon */}
            <div class="relative">
              <div class="absolute inset-0 animate-ping rounded-2xl bg-primary-500/20" />
              <div class="relative rounded-2xl bg-gradient-to-br from-primary-500 to-blue-600 p-4 shadow-lg">
                <LuNetwork class="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Text Content */}
            <div class="space-y-2">
              <h1 class="bg-gradient-to-r from-primary-700 via-blue-600 to-primary-800 bg-clip-text text-3xl font-bold text-transparent dark:from-primary-300 dark:via-blue-400 dark:to-primary-400">
                {semanticMessages.subnets_title({}, { locale })}
              </h1>
              <p class="max-w-md text-lg text-gray-600 dark:text-gray-300">
                {semanticMessages.subnets_description({}, { locale })}
              </p>
            </div>
          </div>

          {/* Modern Toggle Section */}
          <div class="flex flex-col items-end gap-4">
            {/* Status Indicator */}
            <div class="flex items-center gap-2">
              <div
                class={`h-3 w-3 rounded-full transition-colors duration-300 ${
                  subnetsEnabled.value
                    ? "bg-green-500 shadow-lg shadow-green-500/50"
                    : "bg-gray-400"
                }`}
              />
              <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                {subnetsEnabled.value
                  ? semanticMessages.gradient_header_status_active(
                      {},
                      { locale },
                    )
                  : semanticMessages.gradient_header_status_disabled(
                      {},
                      { locale },
                    )}
              </span>
            </div>

            {/* Segmented Control */}
            <div class="rounded-xl bg-white/80 p-3 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
              <SegmentedControl
                value={subnetState}
                options={[
                  {
                    value: "disable",
                    label: semanticMessages.shared_disable({}, { locale }),
                    icon: (<LuPowerOff class="h-5 w-5" />) as any,
                  },
                  {
                    value: "enable",
                    label: semanticMessages.shared_enable({}, { locale }),
                    icon: (<LuPower class="h-5 w-5" />) as any,
                  },
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
          <div class="relative z-10 mt-6 border-t border-primary-200/50 pt-6 dark:border-primary-800/50">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="h-2 w-2 rounded-full bg-primary-500" />
                {semanticMessages.subnets_feature_validation({}, { locale })}
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="h-2 w-2 rounded-full bg-green-500" />
                {semanticMessages.subnets_feature_conflicts({}, { locale })}
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="h-2 w-2 rounded-full bg-blue-500" />
                {semanticMessages.subnets_feature_suggestions({}, { locale })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);
