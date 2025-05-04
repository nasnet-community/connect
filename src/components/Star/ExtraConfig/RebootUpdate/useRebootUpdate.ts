import { useContext, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type { TimeConfig } from "./type";
import type { UpdateInterval } from "../../StarContext/ExtraType";

export const useRebootUpdate = () => {
  const ctx = useContext(StarContext);

  // Initialize defaults if needed
  useTask$(() => {
    const needsUpdate = !ctx.state.ExtraConfig.AutoReboot || 
                       !ctx.state.ExtraConfig.Update || 
                       !ctx.state.ExtraConfig.Timezone;
    
    if (needsUpdate) {
      ctx.updateExtraConfig$({
        Timezone: ctx.state.ExtraConfig.Timezone || "GMT",
        AutoReboot: ctx.state.ExtraConfig.AutoReboot || {
          isAutoReboot: false,
          RebootTime: "00:00",
        },
        Update: ctx.state.ExtraConfig.Update || {
          isAutoReboot: false,
          UpdateTime: "00:00",
          UpdateInterval: "" as UpdateInterval,
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
  
  const selectedTimezone = useSignal(ctx.state.ExtraConfig.Timezone || "GMT");
  
  const updateInterval = useSignal<UpdateInterval>(
    ctx.state.ExtraConfig.Update?.UpdateInterval || "" as UpdateInterval
  );

  const rebootTime = useStore<TimeConfig>({
    hour: ctx.state.ExtraConfig.AutoReboot?.RebootTime?.split(":")[0] || "00",
    minute: ctx.state.ExtraConfig.AutoReboot?.RebootTime?.split(":")[1] || "00",
  });

  const updateTime = useStore<TimeConfig>({
    hour: ctx.state.ExtraConfig.Update?.UpdateTime?.split(":")[0] || "00",
    minute: ctx.state.ExtraConfig.Update?.UpdateTime?.split(":")[1] || "00",
  });

  return {
    ctx,
    autoRebootEnabled,
    autoUpdateEnabled,
    selectedTimezone,
    updateInterval,
    rebootTime,
    updateTime,
  };
};
