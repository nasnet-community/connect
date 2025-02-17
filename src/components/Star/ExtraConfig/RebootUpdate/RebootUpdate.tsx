import { component$, $ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { RebootHeader } from "./RebootHeader";
import { TimezoneCard } from "./TimezoneCard";
import { RebootCard } from "./RebootCard";
import { UpdateCard } from "./UpdateCard";
import { useRebootUpdate } from "./useRebootUpdate";

export const RebootUpdate = component$<StepProps>(({ onComplete$ }) => {
  const {
    ctx,
    autoRebootEnabled,
    autoUpdateEnabled,
    selectedTimezone,
    updateInterval,
    rebootTime,
    updateTime,
  } = useRebootUpdate();

  const handleSubmit = $(() => {
    ctx.updateExtraConfig$({
      Timezone: selectedTimezone.value,
      AutoReboot: {
        isAutoReboot: autoRebootEnabled.value,
        RebootTime: `${rebootTime.hour}:${rebootTime.minute}`,
      },
      Update: {
        isAutoReboot: autoUpdateEnabled.value,
        UpdateTime: `${updateTime.hour}:${updateTime.minute}`,
        UpdateInterval: updateInterval.value,
      },
    });
    onComplete$();
  });

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        <RebootHeader />
        <div class="space-y-6 p-6">
          <TimezoneCard selectedTimezone={selectedTimezone} />
          <RebootCard
            autoRebootEnabled={autoRebootEnabled}
            rebootTime={rebootTime}
          />
          <UpdateCard
            autoUpdateEnabled={autoUpdateEnabled}
            updateTime={updateTime}
            updateInterval={updateInterval}
          />
          <div class="flex justify-end">
            <button
              onClick$={handleSubmit}
              class="rounded-lg bg-primary-500 px-6 py-2.5 font-medium text-white shadow-md 
                     transition-all duration-200 hover:bg-primary-600"
            >
              {$localize`Save`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
