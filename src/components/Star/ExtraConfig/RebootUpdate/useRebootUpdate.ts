import { useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type { TimeConfig } from "./type";
import type { UpdateInterval, RebootInterval } from "../../StarContext/ExtraType";
import type { FrequencyValue } from "~/components/Core";


export const useRebootUpdate = () => {
  const ctx = useContext(StarContext);

  // Initialize defaults if needed
  useTask$(() => {
    const needsUpdate =
      !ctx.state.ExtraConfig.AutoReboot ||
      !ctx.state.ExtraConfig.Update ||
      !ctx.state.ExtraConfig.IPAddressUpdate ||
      !ctx.state.ExtraConfig.Timezone;

    if (needsUpdate) {
      ctx.updateExtraConfig$({
        Timezone: ctx.state.ExtraConfig.Timezone,
        AutoReboot: ctx.state.ExtraConfig.AutoReboot || {
          isAutoReboot: false,
          RebootTime: "00:00",
          RebootInterval: "Daily" as RebootInterval,
        },
        Update: ctx.state.ExtraConfig.Update || {
          isAutoReboot: false,
          UpdateTime: "00:00",
          UpdateInterval: "Weekly" as UpdateInterval,
        },
        IPAddressUpdate: ctx.state.ExtraConfig.IPAddressUpdate || {
          isIPAddressUpdate: true,
          IPAddressUpdateTime: "03:00",
          IPAddressUpdateInterval: "Daily" as UpdateInterval,
        },
      });
    }
  });

  const autoRebootEnabled = useSignal(
    ctx.state.ExtraConfig.AutoReboot?.isAutoReboot ?? false,
  );

  const autoUpdateEnabled = useSignal(
    ctx.state.ExtraConfig.Update?.isAutoReboot ?? false,
  );

  const ipAddressUpdateEnabled = useSignal(true);

  const selectedTimezone = useSignal(ctx.state.ExtraConfig.Timezone);

  // Track changes to selectedTimezone
  useTask$(({ track }) => {
    const timezone = track(() => selectedTimezone.value);

    // Update the context when timezone changes
    if (timezone && timezone !== ctx.state.ExtraConfig.Timezone) {
      ctx.updateExtraConfig$({
        ...ctx.state.ExtraConfig,
        Timezone: timezone,
      });
    }
  });

  const updateInterval = useSignal<FrequencyValue | undefined>(
    ctx.state.ExtraConfig.Update?.UpdateInterval === "Daily" || 
    ctx.state.ExtraConfig.Update?.UpdateInterval === "Weekly" || 
    ctx.state.ExtraConfig.Update?.UpdateInterval === "Monthly"
      ? ctx.state.ExtraConfig.Update.UpdateInterval 
      : "Weekly",
  );

  const rebootInterval = useSignal<FrequencyValue | undefined>(
    ctx.state.ExtraConfig.AutoReboot?.RebootInterval === "Daily" || 
    ctx.state.ExtraConfig.AutoReboot?.RebootInterval === "Weekly" || 
    ctx.state.ExtraConfig.AutoReboot?.RebootInterval === "Monthly"
      ? ctx.state.ExtraConfig.AutoReboot.RebootInterval 
      : "Daily",
  );


  const rebootTime = useStore<TimeConfig>({
    hour: ctx.state.ExtraConfig.AutoReboot?.RebootTime.split(":")[0] || "00",
    minute: ctx.state.ExtraConfig.AutoReboot?.RebootTime.split(":")[1] || "00",
  });

  const updateTime = useStore<TimeConfig>({
    hour: ctx.state.ExtraConfig.Update?.UpdateTime.split(":")[0] || "00",
    minute: ctx.state.ExtraConfig.Update?.UpdateTime.split(":")[1] || "00",
  });

  const ipAddressUpdateTime = useStore<TimeConfig>({
    hour: ctx.state.ExtraConfig.IPAddressUpdate?.IPAddressUpdateTime.split(":")[0] || "03",
    minute: ctx.state.ExtraConfig.IPAddressUpdate?.IPAddressUpdateTime.split(":")[1] || "00",
  });

  const ipAddressUpdateInterval = useSignal<FrequencyValue | undefined>(
    ctx.state.ExtraConfig.IPAddressUpdate?.IPAddressUpdateInterval === "Daily" || 
    ctx.state.ExtraConfig.IPAddressUpdate?.IPAddressUpdateInterval === "Weekly" || 
    ctx.state.ExtraConfig.IPAddressUpdate?.IPAddressUpdateInterval === "Monthly"
      ? ctx.state.ExtraConfig.IPAddressUpdate.IPAddressUpdateInterval 
      : "Daily",
  );

  return {
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
  };
};
