import { component$, $ } from "@builder.io/qwik";
import {
  HiCheckCircleOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";
import { TimePicker } from "~/components/Core/TimePicker/Timepicker";
import { FrequencySelector, type FrequencyValue } from "~/components/Core";
import type { Signal } from "@builder.io/qwik";
import type { TimeConfig } from "./type";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface UpdateCardProps {
  autoUpdateEnabled: Signal<boolean>;
  updateTime: TimeConfig;
  updateInterval: Signal<FrequencyValue | undefined>;
}

export const UpdateCard = component$<UpdateCardProps>(
  ({ autoUpdateEnabled, updateTime, updateInterval }) => {
    const locale = useMessageLocale();
    const handleIntervalChange = $((value: FrequencyValue) => {
      updateInterval.value = value;
    });

    return (
      <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded-xl p-5">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h3 class="font-medium">
              {semanticMessages.reboot_update_card_title({}, { locale })}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {semanticMessages.reboot_update_card_description({}, { locale })}
            </p>
          </div>
          <div class="flex gap-4 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
            <label
              class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-colors
              ${!autoUpdateEnabled.value ? "bg-white shadow-sm dark:bg-gray-700" : ""}`}
            >
              <input
                type="radio"
                name="autoUpdate"
                checked={!autoUpdateEnabled.value}
                onChange$={() => (autoUpdateEnabled.value = false)}
                class="hidden"
              />
              <HiXCircleOutline class="h-5 w-5" />
              <span>{semanticMessages.shared_off({}, { locale })}</span>
            </label>
            <label
              class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-colors
              ${autoUpdateEnabled.value ? "bg-white shadow-sm dark:bg-gray-700" : ""}`}
            >
              <input
                type="radio"
                name="autoUpdate"
                checked={autoUpdateEnabled.value}
                onChange$={() => (autoUpdateEnabled.value = true)}
                class="hidden"
              />
              <HiCheckCircleOutline class="h-5 w-5" />
              <span>{semanticMessages.shared_on({}, { locale })}</span>
            </label>
          </div>
        </div>
        {autoUpdateEnabled.value && (
          <div class="space-y-4">
            <TimePicker
              time={updateTime}
              onChange$={(type, value) => {
                if (type === "hour" || type === "minute") {
                  updateTime[type] = value;
                }
              }}
            />

            <FrequencySelector
              value={updateInterval.value || "Weekly"}
              onChange$={handleIntervalChange}
              label={semanticMessages.reboot_update_card_frequency(
                {},
                { locale },
              )}
              recommendedOption="Weekly"
            />
          </div>
        )}
      </div>
    );
  },
);
