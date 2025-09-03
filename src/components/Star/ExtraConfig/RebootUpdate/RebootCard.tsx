import { component$, $ } from "@builder.io/qwik";
import {
  HiCheckCircleOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";
import { TimePicker } from "~/components/Core/TimePicker/Timepicker";
import { FrequencySelector, type FrequencyValue } from "~/components/Core";
import type { Signal } from "@builder.io/qwik";
import type { TimeConfig } from "./type";

interface RebootCardProps {
  autoRebootEnabled: Signal<boolean>;
  rebootTime: TimeConfig;
  rebootInterval: Signal<FrequencyValue | undefined>;
}


export const RebootCard = component$<RebootCardProps>(
  ({ autoRebootEnabled, rebootTime, rebootInterval }) => {
    const handleIntervalChange = $((value: FrequencyValue) => {
      rebootInterval.value = value;
    });
    return (
      <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded-xl p-5">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h3 class="font-medium">{$localize`Automatic Reboot`}</h3>
            <p class="text-sm text-gray-600">{$localize`Schedule system reboots`}</p>
          </div>
          <div class="flex gap-4 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
            <label
              class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
            ${!autoRebootEnabled.value ? "bg-white shadow-sm dark:bg-gray-700" : ""}`}
            >
              <input
                type="radio"
                name="autoReboot"
                checked={!autoRebootEnabled.value}
                onChange$={() => (autoRebootEnabled.value = false)}
                class="hidden"
              />
              <HiXCircleOutline class="h-5 w-5" />
              <span>{$localize`Off`}</span>
            </label>
            <label
              class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
            ${autoRebootEnabled.value ? "bg-white shadow-sm dark:bg-gray-700" : ""}`}
            >
              <input
                type="radio"
                name="autoReboot"
                checked={autoRebootEnabled.value}
                onChange$={() => (autoRebootEnabled.value = true)}
                class="hidden"
              />
              <HiCheckCircleOutline class="h-5 w-5" />
              <span>{$localize`On`}</span>
            </label>
          </div>
        </div>
        {autoRebootEnabled.value && (
          <div class="space-y-4">
            <TimePicker
              time={rebootTime}
              onChange$={(type, value) => {
                if (type === 'hour' || type === 'minute') {
                  rebootTime[type] = value;
                }
              }}
            />

            <FrequencySelector
              value={rebootInterval.value || "Daily"}
              onChange$={handleIntervalChange}
              label={$localize`Reboot frequency`}
              recommendedOption="Daily"
            />
          </div>
        )}
      </div>
    );
  },
);
