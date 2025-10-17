import { useContext, useSignal, useStore } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type { TimeConfig } from "./type";
import type { FrequencyValue } from "~/components/Core";


export const useRebootUpdate = () => {
  const ctx = useContext(StarContext);

  const autoRebootEnabled = useSignal(
    !!ctx.state.ExtraConfig.RUI.Reboot?.interval,
  );

  const autoUpdateEnabled = useSignal(
    !!ctx.state.ExtraConfig.RUI.Update?.interval,
  );

  const ipAddressUpdateEnabled = useSignal(true);

  const selectedTimezone = useSignal(ctx.state.ExtraConfig.RUI.Timezone);

  const updateInterval = useSignal<FrequencyValue | undefined>(
    ctx.state.ExtraConfig.RUI.Update?.interval === "Daily" || 
    ctx.state.ExtraConfig.RUI.Update?.interval === "Weekly" || 
    ctx.state.ExtraConfig.RUI.Update?.interval === "Monthly"
      ? ctx.state.ExtraConfig.RUI.Update.interval as FrequencyValue
      : "Weekly",
  );

  const rebootInterval = useSignal<FrequencyValue | undefined>(
    ctx.state.ExtraConfig.RUI.Reboot?.interval === "Daily" || 
    ctx.state.ExtraConfig.RUI.Reboot?.interval === "Weekly" || 
    ctx.state.ExtraConfig.RUI.Reboot?.interval === "Monthly"
      ? ctx.state.ExtraConfig.RUI.Reboot.interval as FrequencyValue
      : "Daily",
  );


  const rebootTime = useStore<TimeConfig>({
    hour: ctx.state.ExtraConfig.RUI.Reboot?.time.split(":")[0] || "02",
    minute: ctx.state.ExtraConfig.RUI.Reboot?.time.split(":")[1] || "00",
  });

  const updateTime = useStore<TimeConfig>({
    hour: ctx.state.ExtraConfig.RUI.Update?.time.split(":")[0] || "03",
    minute: ctx.state.ExtraConfig.RUI.Update?.time.split(":")[1] || "00",
  });

  const ipAddressUpdateTime = useStore<TimeConfig>({
    hour: ctx.state.ExtraConfig.RUI.IPAddressUpdate.time.split(":")[0] || "03",
    minute: ctx.state.ExtraConfig.RUI.IPAddressUpdate.time.split(":")[1] || "00",
  });

  const ipAddressUpdateInterval = useSignal<FrequencyValue | undefined>(
    ctx.state.ExtraConfig.RUI.IPAddressUpdate.interval === "Daily" || 
    ctx.state.ExtraConfig.RUI.IPAddressUpdate.interval === "Weekly" || 
    ctx.state.ExtraConfig.RUI.IPAddressUpdate.interval === "Monthly"
      ? ctx.state.ExtraConfig.RUI.IPAddressUpdate.interval as FrequencyValue
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
