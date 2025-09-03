import { component$, $ } from "@builder.io/qwik";
// Removed unused icon imports
import { TimePicker } from "~/components/Core/TimePicker/Timepicker";
import { FrequencySelector, type FrequencyValue } from "~/components/Core";
import type { Signal } from "@builder.io/qwik";
import type { TimeConfig } from "./type";

interface IPAddressUpdateCardProps {
  ipAddressUpdateEnabled: Signal<boolean>;
  ipAddressUpdateTime: TimeConfig;
  ipAddressUpdateInterval: Signal<FrequencyValue | undefined>;
}

export const IPAddressUpdateCard = component$<IPAddressUpdateCardProps>(
  ({ ipAddressUpdateEnabled: _ipAddressUpdateEnabled, ipAddressUpdateTime, ipAddressUpdateInterval }) => {
    const handleIntervalChange = $((value: FrequencyValue) => {
      ipAddressUpdateInterval.value = value;
    });
    return (
      <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded-xl p-5">
        <div class="mb-4">
          <div>
            <h3 class="font-medium">{$localize`IP Address List Updates`}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {$localize`Automatic IP address list synchronization`}
            </p>
          </div>
        </div>
        <div class="space-y-4">
          <TimePicker
            time={ipAddressUpdateTime}
            onChange$={(type, value) => {
              if (type === 'hour' || type === 'minute') {
                ipAddressUpdateTime[type] = value;
              }
            }}
          />
          <FrequencySelector
            value={ipAddressUpdateInterval.value || "Daily"}
            onChange$={handleIntervalChange}
            label={$localize`IP Address Update frequency`}
            recommendedOption="Daily"
          />
        </div>
      </div>
    );
  },
);