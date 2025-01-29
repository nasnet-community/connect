import { component$, type QRL } from "@builder.io/qwik";

interface TimePickerProps {
  time: { hour: string; minute: string };
  onChange$: QRL<(type: "hour" | "minute", value: string) => void>;
}

export const TimePicker = component$<TimePickerProps>(({ time, onChange$ }) => {
  return (
    <div class="space-y-2">
      <div class="flex items-start gap-4">
        {/* Hours */}
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-text-secondary dark:text-text-dark-secondary">
            {$localize`Hours`}
          </label>
          <div class="relative">
            <select
              value={time.hour}
              onChange$={(e, currentTarget) =>
                onChange$("hour", currentTarget.value)
              }
              class="focus:ring-primary-500/50 w-24 cursor-pointer appearance-none
                     rounded-lg border border-border bg-surface
                     py-2 pl-3 pr-8 text-sm font-medium
                     text-text transition-colors
                     hover:border-primary-400 focus:border-primary-500 focus:ring-2
                     dark:border-border-dark dark:bg-surface-dark
                     dark:text-text-dark-default dark:hover:border-primary-600"
            >
              {[...Array(24)].map((_, i) => (
                <option key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                class="h-4 w-4 text-text-secondary dark:text-text-dark-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex items-end pb-2">
          <span class="text-lg font-medium text-text-secondary dark:text-text-dark-secondary">
            :
          </span>
        </div>

        {/* Minutes */}
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-text-secondary dark:text-text-dark-secondary">
            {$localize`Minutes`}
          </label>
          <div class="relative">
            <select
              value={time.minute}
              onChange$={(e, currentTarget) =>
                onChange$("minute", currentTarget.value)
              }
              class="focus:ring-primary-500/50 w-24 cursor-pointer appearance-none
                     rounded-lg border border-border bg-surface
                     py-2 pl-3 pr-8 text-sm font-medium
                     text-text transition-colors
                     hover:border-primary-400 focus:border-primary-500 focus:ring-2
                     dark:border-border-dark dark:bg-surface-dark
                     dark:text-text-dark-default dark:hover:border-primary-600"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i} value={(i * 5).toString().padStart(2, "0")}>
                  {(i * 5).toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                class="h-4 w-4 text-text-secondary dark:text-text-dark-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
