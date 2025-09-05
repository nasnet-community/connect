import { $, component$, useContext } from "@builder.io/qwik";
import { StarContext } from "../../../StarContext/StarContext";
import { useWANInterface } from "./useWANInterface";
import { Header } from "./Header";
import { InterfaceTypeSelector } from "./InterfaceTypeSelector";
import { InterfaceSelector } from "./InterfaceSelector";
import { WirelessSettings } from "./WirelessSettings";
import { LTESettings } from "./LTESettings";
import { Button } from "~/components/Core";
import type { WANInterfaceProps } from "./types";

export const WANInterfaceEasy = component$<WANInterfaceProps>(
  ({ mode, isComplete, onComplete$ }) => {
    const starContext = useContext(StarContext);
    const {
      selectedInterfaceType,
      selectedInterface,
      ssid,
      password,
      apn,
      lteUsername,
      ltePassword,
      isValid,
      validateForm,
      handleInterfaceTypeSelect,
      handleInterfaceSelect,
      handleSSIDChange,
      handlePasswordChange,
      handleAPNChange,
      handleLTEUsernameChange,
      handleLTEPasswordChange,
    } = useWANInterface(mode);

    const masterRouter = starContext.state.Choose.RouterModels.find(
      (rm) => rm.isMaster,
    );

    const availableInterfaces = masterRouter
      ? {
          ethernet: masterRouter.Interfaces.ethernet || [],
          wireless: masterRouter.Interfaces.wireless || [],
          sfp: masterRouter.Interfaces.sfp || [],
          lte: masterRouter.Interfaces.lte || [],
        }
      : {
          ethernet: [],
          wireless: [],
          sfp: [],
          lte: [],
        };

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

            <InterfaceTypeSelector
              selectedType={selectedInterfaceType.value}
              onSelect$={handleInterfaceTypeSelect}
              availableInterfaces={availableInterfaces}
            />

            {selectedInterfaceType.value && (
              <InterfaceSelector
                selectedInterface={selectedInterface.value}
                selectedInterfaceType={selectedInterfaceType.value}
                availableInterfaces={availableInterfaces}
                onSelect={handleInterfaceSelect}
                isInterfaceSelectedInOtherMode={isInterfaceSelectedInOtherMode}
                mode={mode}
              />
            )}

            {selectedInterfaceType.value === "Wireless" && selectedInterface.value && (
              <WirelessSettings
                ssid={ssid.value}
                password={password.value}
                onSSIDChange={handleSSIDChange}
                onPasswordChange={handlePasswordChange}
              />
            )}

            {selectedInterfaceType.value === "LTE" && selectedInterface.value && (
              <LTESettings
                apn={apn.value}
                username={lteUsername.value}
                password={ltePassword.value}
                onAPNChange$={handleAPNChange}
                onUsernameChange$={handleLTEUsernameChange}
                onPasswordChange$={handleLTEPasswordChange}
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
              <Button
                onClick$={handleComplete}
                variant="primary"
                size="sm"
                disabled={!isValid.value || isComplete}
              >
                {isComplete ? $localize`Configured` : $localize`Save`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
