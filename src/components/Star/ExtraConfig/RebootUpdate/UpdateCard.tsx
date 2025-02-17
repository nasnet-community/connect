import { component$ } from "@builder.io/qwik";
import {
  HiCheckCircleOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";
import { TimePicker } from "~/components/Core/TimePicker/Timepicker";
import type { Signal } from "@builder.io/qwik";
import type { TimeConfig } from "./type";

interface UpdateCardProps {
  autoUpdateEnabled: Signal<boolean>;
  updateTime: TimeConfig;
  updateInterval: Signal<string>;
}

export const UpdateCard = component$<UpdateCardProps>(
  ({ autoUpdateEnabled, updateTime, updateInterval }) => {
    return (
      <div class="rounded-xl bg-surface-secondary p-5 dark:bg-surface-dark-secondary">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h3 class="font-medium">{$localize`Automatic Updates`}</h3>
            <p class="text-sm text-gray-600">{$localize`Schedule system updates`}</p>
          </div>
          <div class="flex gap-4 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
            <label
              class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
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
              <span>{$localize`Off`}</span>
            </label>
            <label
              class={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2
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
              <span>{$localize`On`}</span>
            </label>
          </div>
        </div>
        {autoUpdateEnabled.value && (
          <div class="space-y-4">
            <TimePicker
              time={updateTime}
              onChange$={(type, value) => {
                updateTime[type] = value;
              }}
            />
            <select
              value={updateInterval.value}
              onChange$={(e, currentTarget) =>
                (updateInterval.value = currentTarget.value)
              }
              class="w-full rounded-lg border bg-surface px-4 py-2.5 dark:bg-surface-dark"
            >
              <option value="Daily">{$localize`Daily`}</option>
              <option value="Weekly">{$localize`Weekly`}</option>
              <option value="Monthly">{$localize`Monthly`}</option>
            </select>
          </div>
        )}
      </div>
    );
  },
);
