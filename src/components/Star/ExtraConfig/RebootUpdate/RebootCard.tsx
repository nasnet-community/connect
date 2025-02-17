import { component$ } from "@builder.io/qwik";
import {
  HiCheckCircleOutline,
  HiXCircleOutline,
} from "@qwikest/icons/heroicons";
import { TimePicker } from "~/components/Core/TimePicker/Timepicker";
import type { Signal } from "@builder.io/qwik";
import type { TimeConfig } from "./type";

interface RebootCardProps {
  autoRebootEnabled: Signal<boolean>;
  rebootTime: TimeConfig;
}

export const RebootCard = component$<RebootCardProps>(
  ({ autoRebootEnabled, rebootTime }) => {
    return (
      <div class="rounded-xl bg-surface-secondary p-5 dark:bg-surface-dark-secondary">
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
          <TimePicker
            time={rebootTime}
            onChange$={(type, value) => {
              rebootTime[type] = value;
            }}
          />
        )}
      </div>
    );
  },
);
