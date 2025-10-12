import { component$, $, useSignal } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { Alert } from "~/components/Core";
import { RebootHeader } from "./RebootHeader";
import { TimezoneCard } from "./TimezoneCard";
import { RebootCard } from "./RebootCard";
import { UpdateCard } from "./UpdateCard";
import { IPAddressUpdateCard } from "./IPAddressUpdateCard";
import { useRebootUpdate } from "./useRebootUpdate";
import type { Interval, RUIConfig } from "../../StarContext/ExtraType";

export const RebootUpdate = component$<StepProps>(({ onComplete$ }) => {
  const {
    ctx,
    autoRebootEnabled,
    autoUpdateEnabled,
    ipAddressUpdateEnabled,
    selectedTimezone,
    updateInterval,
    rebootInterval,
    rebootTime,
    updateTime,
    ipAddressUpdateTime,
    ipAddressUpdateInterval,
  } = useRebootUpdate();

  const validationError = useSignal<string>("");

  const handleSubmit = $(() => {
    // Clear previous validation error
    validationError.value = "";
    
    // Helper function to convert time to minutes
    const timeToMinutes = (time: { hour: string; minute: string }): number => {
      const hour = parseInt(time.hour);
      const minute = parseInt(time.minute);
      return hour * 60 + minute;
    };

    // Validate time gaps - inline validation logic
    const times: { name: string; minutes: number; enabled: boolean }[] = [
      { name: "Reboot", minutes: timeToMinutes(rebootTime), enabled: autoRebootEnabled.value },
      { name: "Update", minutes: timeToMinutes(updateTime), enabled: autoUpdateEnabled.value },
      { name: "IP Address Update", minutes: timeToMinutes(ipAddressUpdateTime), enabled: true },
    ];

    const enabledTimes = times.filter(t => t.enabled);
    
    // Check for time conflicts
    for (let i = 0; i < enabledTimes.length; i++) {
      for (let j = i + 1; j < enabledTimes.length; j++) {
        const time1 = enabledTimes[i];
        const time2 = enabledTimes[j];
        const diff = Math.abs(time1.minutes - time2.minutes);
        const minDiff = Math.min(diff, 1440 - diff); // Account for day wrap-around
        
        if (minDiff < 15) {
          validationError.value = `${time1.name} and ${time2.name} must be at least 15 minutes apart.`;
          return; // Don't proceed with saving
        }
      }
    }

    // Update RUI configuration
    const updatedRUI: RUIConfig = {
      Timezone: selectedTimezone.value || "UTC",
      IPAddressUpdate: {
        interval: (ipAddressUpdateInterval.value || "Daily") as Interval,
        time: `${ipAddressUpdateTime.hour}:${ipAddressUpdateTime.minute}`,
      },
    };

    // Only include Reboot if enabled
    if (autoRebootEnabled.value) {
      updatedRUI.Reboot = {
        interval: (rebootInterval.value || "Weekly") as Interval,
        time: `${rebootTime.hour}:${rebootTime.minute}`,
      };
    }

    // Only include Update if enabled
    if (autoUpdateEnabled.value) {
      updatedRUI.Update = {
        interval: (updateInterval.value || "Monthly") as Interval,
        time: `${updateTime.hour}:${updateTime.minute}`,
      };
    }

    ctx.updateExtraConfig$({
      RUI: updatedRUI
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
          {validationError.value && (
            <Alert 
              status="error" 
              title={$localize`Validation Error`}
            >
              {validationError.value}
            </Alert>
          )}
          <TimezoneCard selectedTimezone={selectedTimezone} />
          <RebootCard
            autoRebootEnabled={autoRebootEnabled}
            rebootTime={rebootTime}
            rebootInterval={rebootInterval}
          />
          <UpdateCard
            autoUpdateEnabled={autoUpdateEnabled}
            updateTime={updateTime}
            updateInterval={updateInterval}
          />
          <IPAddressUpdateCard
            ipAddressUpdateEnabled={ipAddressUpdateEnabled}
            ipAddressUpdateTime={ipAddressUpdateTime}
            ipAddressUpdateInterval={ipAddressUpdateInterval}
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
