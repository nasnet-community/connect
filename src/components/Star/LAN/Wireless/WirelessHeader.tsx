import {
  component$,
  type Signal,
  type QRL,
  $,
  useSignal,
  useTask$,
  type JSXNode,
} from "@builder.io/qwik";
import {
  HiWifiOutline,
  HiExclamationTriangleOutline,
  HiCheckCircleOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";
import { SegmentedControl } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface WirelessHeaderProps {
  wirelessEnabled: Signal<boolean>;
  onToggle$?: QRL<(enabled: boolean) => void>;
}

export const WirelessHeader = component$<WirelessHeaderProps>(
  ({ wirelessEnabled, onToggle$ }) => {
    const locale = useMessageLocale();
    // Create a mutable string signal for SegmentedControl
    const enabledState = useSignal(
      wirelessEnabled.value ? "enabled" : "disabled",
    );

    // Keep the string signal in sync with the boolean signal
    useTask$(({ track }) => {
      track(() => wirelessEnabled.value);
      enabledState.value = wirelessEnabled.value ? "enabled" : "disabled";
    });

    const enabledOptions = [
      {
        value: "disabled",
        label: semanticMessages.shared_disabled({}, { locale }),
        icon: (<HiXCircleOutline />) as JSXNode,
      },
      {
        value: "enabled",
        label: semanticMessages.shared_enabled({}, { locale }),
        icon: (<HiCheckCircleOutline />) as JSXNode,
      },
    ];

    return (
      <div class="mb-6 space-y-4">
        <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div class="flex items-center">
            <HiWifiOutline class="h-8 w-8 text-primary-500 dark:text-primary-400" />
            <div class="ml-4">
              <h2 class="text-2xl font-bold text-text dark:text-text-dark-default">
                {semanticMessages.wan_easy_wireless_settings({}, { locale })}
              </h2>
              <p class="text-text-secondary dark:text-text-dark-secondary">
                {semanticMessages.wireless_header_description({}, { locale })}
              </p>
            </div>
          </div>

          {/* Enable/Disable SegmentedControl */}
          <SegmentedControl
            value={enabledState}
            options={enabledOptions}
            onChange$={$(async (value: string) => {
              const enabled = value === "enabled";
              wirelessEnabled.value = enabled;
              if (onToggle$) {
                await onToggle$(enabled);
              }
            })}
            color="primary"
            size="md"
          />
        </div>

        <div class="flex items-center space-x-2 rounded-lg bg-yellow-50 px-4 py-3 dark:bg-yellow-900/30">
          <HiExclamationTriangleOutline class="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
          <p class="text-sm text-yellow-700 dark:text-yellow-300">
            {semanticMessages.wireless_header_ssid_warning({}, { locale })}
          </p>
        </div>
      </div>
    );
  },
);
