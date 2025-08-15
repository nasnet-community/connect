import { component$ } from "@builder.io/qwik";
import { TimePicker } from "~/components/Core/TimePicker/Timepicker";
import type { TimeConfig } from "./type";

interface IPAddressUpdateCardProps {
  ipAddressUpdateTime: TimeConfig;
}

export const IPAddressUpdateCard = component$<IPAddressUpdateCardProps>(
  ({ ipAddressUpdateTime }) => {
    return (
      <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded-xl p-5">
        <div class="mb-4">
          <h3 class="font-medium">{$localize`IP Address List Updates`}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {$localize`Schedule automatic IP address list synchronization`}
          </p>
        </div>
        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium">
              {$localize`Update Time`}
            </label>
            <TimePicker
              time={ipAddressUpdateTime}
              onChange$={(type, value) => {
                if (type === 'hour' || type === 'minute') {
                  ipAddressUpdateTime[type] = value;
                }
              }}
            />
            <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">
              {$localize`Script will fetch and update domestic IP addresses daily at the specified time`}
            </p>
          </div>
        </div>
      </div>
    );
  },
);