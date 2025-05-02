import { $, component$, useContext } from "@builder.io/qwik";
import { useWirelessForm } from "./useWireless";
import { WirelessHeader } from "./WirelessHeader";
import { SSIDModeSelector } from "./SSIDModeSelector";
import { SingleSSIDForm } from "./SingleSSIDForm";
import { MultiSSIDForm } from "./MultiSSIDForm";
import { ActionButtons } from "./ActionButtons";
import { StarContext } from "../../StarContext/StarContext";
import type { StepProps } from "~/types/step";

export const Wireless = component$<StepProps>(({ onComplete$ }) => {
  const starContext = useContext(StarContext);
  const {
    isMultiSSID,
    ssid,
    password,
    isHide,
    isDisabled,
    networks,
    isLoading,
    generateSSID,
    generatePassword,
    generateNetworkSSID,
    generateNetworkPassword,
    generateAllPasswords,
    isFormValid,
    toggleNetworkHide,
    toggleNetworkDisabled,
    toggleSingleHide,
    toggleSingleDisabled,
  } = useWirelessForm();

  return (
    <div class="mx-auto w-full max-w-4xl p-4">
      <div class="rounded-lg bg-surface p-6 shadow-lg dark:bg-surface-dark">
        <WirelessHeader />
        <SSIDModeSelector isMultiSSID={isMultiSSID} />

        {!isMultiSSID.value ? (
          <SingleSSIDForm
            ssid={ssid}
            password={password}
            isHide={isHide}
            isDisabled={isDisabled}
            generateSSID={generateSSID}
            generatePassword={generatePassword}
            toggleHide={toggleSingleHide}
            toggleDisabled={toggleSingleDisabled}
            isLoading={isLoading}
          />
        ) : (
          <MultiSSIDForm
            networks={networks}
            isLoading={isLoading.value}
            generateNetworkSSID={generateNetworkSSID}
            generateNetworkPassword={generateNetworkPassword}
            generateAllPasswords={generateAllPasswords}
            toggleNetworkHide={toggleNetworkHide}
            toggleNetworkDisabled={toggleNetworkDisabled}
          />
        )}

        <ActionButtons
          onSubmit={$(async () => {
            if (!isMultiSSID.value) {
              starContext.updateLAN$({
                Wireless: {
                  SingleMode: {
                    SSID: ssid.value,
                    Password: password.value,
                    isHide: isHide.value,
                    isDisabled: isDisabled.value,
                  }
                }
              });
            } else {
              const enabledNetworks: Record<string, { SSID: string; Password: string; isHide: boolean; isDisabled: boolean }> = {};
              
              if (!networks.foreign.isDisabled) {
                enabledNetworks.foreign = {
                  SSID: networks.foreign.ssid,
                  Password: networks.foreign.password,
                  isHide: networks.foreign.isHide,
                  isDisabled: networks.foreign.isDisabled,
                };
              }
              
              if (!networks.domestic.isDisabled) {
                enabledNetworks.Domestic = {
                  SSID: networks.domestic.ssid,
                  Password: networks.domestic.password,
                  isHide: networks.domestic.isHide,
                  isDisabled: networks.domestic.isDisabled,
                };
              }
              
              if (!networks.split.isDisabled) {
                enabledNetworks.Split = {
                  SSID: networks.split.ssid,
                  Password: networks.split.password,
                  isHide: networks.split.isHide,
                  isDisabled: networks.split.isDisabled,
                };
              }
              
              if (!networks.vpn.isDisabled) {
                enabledNetworks.VPN = {
                  SSID: networks.vpn.ssid,
                  Password: networks.vpn.password,
                  isHide: networks.vpn.isHide,
                  isDisabled: networks.vpn.isDisabled,
                };
              }

              starContext.updateLAN$({
                Wireless: {
                  MultiMode: enabledNetworks
                }
              });
            }

            await onComplete$();
          })}
          isValid={isFormValid.value}
        />
      </div>
    </div>
  );
});
