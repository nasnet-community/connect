import { component$, $ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { Alert } from "~/components/Core";
import { RebootHeader } from "./RebootHeader";
import { TimezoneCard } from "./TimezoneCard";
import { RebootCard } from "./RebootCard";
import { UpdateCard } from "./UpdateCard";
import { IPAddressUpdateCard } from "./IPAddressUpdateCard";
import { useRebootUpdate } from "./useRebootUpdate";

export const RebootUpdate = component$<StepProps>(({ onComplete$ }) => {
  const {
    ctx,
    autoRebootEnabled,
    autoUpdateEnabled,
    ipAddressUpdateEnabled,
    selectedTimezone,
    updateInterval,
    rebootTime,
    updateTime,
    ipAddressUpdateTime,
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
      IPAddressUpdate: {
        isIPAddressUpdate: ipAddressUpdateEnabled.value,
        IPAddressUpdateTime: `${ipAddressUpdateTime.hour}:${ipAddressUpdateTime.minute}`,
      },
    });
    onComplete$();
  });

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        <RebootHeader />
        <div class="space-y-6 overflow-visible p-6 pb-20">
          <Alert 
            status="warning" 
            title={$localize`Important Notice`}
          >
            {$localize`Internet connectivity may be temporarily interrupted during scheduled reboot, update, and IP address list synchronization times. Please plan accordingly.`}
          </Alert>
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
          <IPAddressUpdateCard
            ipAddressUpdateTime={ipAddressUpdateTime}
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
