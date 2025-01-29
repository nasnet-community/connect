import { useContext, useSignal, useStore } from "@builder.io/qwik";
import { StarContext } from "../../StarContext";
import type { TimeConfig } from "./type";

export const useRebootUpdate = () => {
  const ctx = useContext(StarContext);

  const autoRebootEnabled = useSignal(
    ctx.state.ExtraConfig.AutoReboot.isAutoReboot,
  );
  const autoUpdateEnabled = useSignal(
    ctx.state.ExtraConfig.Update.isAutoReboot,
  );
  const selectedTimezone = useSignal(ctx.state.ExtraConfig.Timezone);
  const updateInterval = useSignal(ctx.state.ExtraConfig.Update.UpdateInterval);

  const rebootTime = useStore<TimeConfig>({
    hour: ctx.state.ExtraConfig.AutoReboot.RebootTime.split(":")[0] || "00",
    minute: ctx.state.ExtraConfig.AutoReboot.RebootTime.split(":")[1] || "00",
  });

  const updateTime = useStore<TimeConfig>({
    hour: ctx.state.ExtraConfig.Update.UpdateTime.split(":")[0] || "00",
    minute: ctx.state.ExtraConfig.Update.UpdateTime.split(":")[1] || "00",
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
