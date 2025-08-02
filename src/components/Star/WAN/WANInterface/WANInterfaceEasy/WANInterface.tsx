import { $, component$, useContext } from "@builder.io/qwik";
import { StarContext } from "../../../StarContext/StarContext";
import { useWANInterface } from "./useWANInterface";
import { Header } from "./Header";
import { InterfaceSelector } from "./InterfaceSelector";
import { WirelessSettings } from "./WirelessSettings";
import type { WANInterfaceProps } from "./types";

export const WANInterface = component$<WANInterfaceProps>(
  ({ mode, isComplete, onComplete$ }) => {
    const starContext = useContext(StarContext);
    const {
      selectedInterface,
      ssid,
      password,
      isValid,
      validateForm,
      handleInterfaceSelect,
      handleSSIDChange,
      handlePasswordChange,
    } = useWANInterface(mode);

    const masterRouter = starContext.state.Choose.RouterModels.find(
      (rm) => rm.isMaster,
    );

    const availableInterfaces = masterRouter
      ? [
          ...(masterRouter.Interfaces.ethernet || []),
          ...(masterRouter.Interfaces.wireless || []),
          ...(masterRouter.Interfaces.sfp || []),
          ...(masterRouter.Interfaces.lte || []),
        ]
      : [];

    const isInterfaceSelectedInOtherMode = $((iface: string) => {
      const otherMode = mode === "Foreign" ? "Domestic" : "Foreign";
      return starContext.state.WAN.WANLink[otherMode]?.InterfaceName === iface;
    });

    const handleComplete = $(async () => {
      if (await validateForm()) {
        onComplete$();
      }
    });

    return (
      <div class="w-full p-4">
        <div class="rounded-lg bg-surface p-6 shadow-md transition-all dark:bg-surface-dark">
          <div class="space-y-6">
            <Header mode={mode} />

            <InterfaceSelector
              selectedInterface={selectedInterface.value}
              availableInterfaces={availableInterfaces}
              onSelect={handleInterfaceSelect}
              isInterfaceSelectedInOtherMode={isInterfaceSelectedInOtherMode}
              mode={mode}
            />

            {selectedInterface.value.startsWith("wifi") && (
              <WirelessSettings
                ssid={ssid.value}
                password={password.value}
                onSSIDChange={handleSSIDChange}
                onPasswordChange={handlePasswordChange}
              />
            )}

            <div class="flex items-center justify-between border-t border-border pt-4 dark:border-border-dark">
              <span
                class={`text-sm ${isComplete ? "text-success" : "text-warning"}`}
              >
                {isComplete
                  ? $localize`Configuration Complete`
                  : $localize`Configuration Incomplete`}
              </span>
              <button
                onClick$={handleComplete}
                class="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium 
                text-white transition-colors hover:bg-primary-600
                disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isValid.value || isComplete}
              >
                {isComplete ? $localize`Configured` : $localize`Save`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
