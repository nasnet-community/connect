import { useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type { TimeConfig } from "./type";
import type { UpdateInterval } from "../../StarContext/ExtraType";

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
        },
        Update: ctx.state.ExtraConfig.Update || {
          isAutoReboot: false,
          UpdateTime: "00:00",
          UpdateInterval: "Daily" as UpdateInterval,
        },
        IPAddressUpdate: ctx.state.ExtraConfig.IPAddressUpdate || {
          isIPAddressUpdate: false,
          IPAddressUpdateTime: "03:00",
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

  const ipAddressUpdateEnabled = useSignal(
    ctx.state.ExtraConfig.IPAddressUpdate?.isIPAddressUpdate ?? false,
  );

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

  const updateInterval = useSignal<UpdateInterval>(
    ctx.state.ExtraConfig.Update?.UpdateInterval || ("Daily" as UpdateInterval),
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

  return {
    ctx,
    autoRebootEnabled,
    autoUpdateEnabled,
    ipAddressUpdateEnabled,
    selectedTimezone,
    updateInterval,
    rebootTime,
    updateTime,
    ipAddressUpdateTime,
  };
};
