import { $, component$, useContext } from "@builder.io/qwik";
import { useWirelessForm, determineWirelessNetwork } from "./useWireless";
import { WirelessHeader } from "./WirelessHeader";
import { SSIDModeSelector } from "./SSIDModeSelector";
import { SingleSSIDForm } from "./SingleSSIDForm";
import { MultiSSIDForm } from "./MultiSSIDForm";
import { ActionButtons } from "./ActionButtons";
import { StarContext } from "../../StarContext/StarContext";
import type { StepProps } from "~/types/step";
import { determineWifiTarget } from "./networkUtils";

export const Wireless = component$<StepProps>(
  ({ onComplete$, onDisabled$ }) => {
    const starContext = useContext(StarContext);
    const {
      wirelessEnabled,
      isMultiSSID,
      ssid,
      password,
      isHide,
      isDisabled,
      splitBand,
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
      toggleNetworkSplitBand,
      toggleSingleHide,
      toggleSingleDisabled,
      toggleSingleSplitBand,
      extraInterfaces,
      addExtraInterface,
      removeExtraInterface,
      updateExtraInterfaceField,
      selectExtraNetwork,
      generateExtraSSID,
      generateExtraPassword,
      hasBothBands,
    } = useWirelessForm();

    const handleSave = $(async () => {
      if (!wirelessEnabled.value) {
        // If wireless is disabled, remove any wireless config
        starContext.updateLAN$({
          Wireless: undefined,
        });
      } else if (!isMultiSSID.value) {
        // Determine network based on enabled base networks
        const { wifiTarget, networkName } = determineWirelessNetwork(starContext.state.Choose.Networks);

        starContext.updateLAN$({
          Wireless: [{
            SSID: ssid.value,
            Password: password.value,
            isHide: isHide.value,
            isDisabled: isDisabled.value,
            SplitBand: splitBand.value,
            WifiTarget: wifiTarget,
            NetworkName: networkName,
          }],
        });
      } else {
        const isDomesticLinkEnabled = (starContext.state.Choose.WANLinkType === "domestic" || starContext.state.Choose.WANLinkType === "both");
        const enabledNetworks: import("~/components/Star/StarContext").WirelessConfig[] = [];

        if (!networks.foreign.isDisabled) {
          enabledNetworks.push({
            SSID: networks.foreign.ssid,
            Password: networks.foreign.password,
            isHide: networks.foreign.isHide,
            isDisabled: networks.foreign.isDisabled,
            SplitBand: networks.foreign.splitBand,
            WifiTarget: "Foreign",
            NetworkName: "Foreign",
          });
        }

        // Only include domestic and split networks if DomesticLink is enabled
        if (isDomesticLinkEnabled && !networks.domestic.isDisabled) {
          enabledNetworks.push({
            SSID: networks.domestic.ssid,
            Password: networks.domestic.password,
            isHide: networks.domestic.isHide,
            isDisabled: networks.domestic.isDisabled,
            SplitBand: networks.domestic.splitBand,
            WifiTarget: "Domestic",
            NetworkName: "Domestic",
          });
        }

        if (isDomesticLinkEnabled && !networks.split.isDisabled) {
          enabledNetworks.push({
            SSID: networks.split.ssid,
            Password: networks.split.password,
            isHide: networks.split.isHide,
            isDisabled: networks.split.isDisabled,
            SplitBand: networks.split.splitBand,
            WifiTarget: "Split",
            NetworkName: "Split",
          });
        }

        if (!networks.vpn.isDisabled) {
          enabledNetworks.push({
            SSID: networks.vpn.ssid,
            Password: networks.vpn.password,
            isHide: networks.vpn.isHide,
            isDisabled: networks.vpn.isDisabled,
            SplitBand: networks.vpn.splitBand,
            WifiTarget: "VPN",
            NetworkName: "VPN",
          });
        }

        // Add extra wireless interfaces
        extraInterfaces.forEach((extraInterface) => {
          if (!extraInterface.isDisabled && extraInterface.targetNetworkName) {
            const wifiTarget = determineWifiTarget(
              extraInterface.targetNetworkName,
              starContext.state.Choose.Networks
            );

            enabledNetworks.push({
              SSID: extraInterface.ssid,
              Password: extraInterface.password,
              isHide: extraInterface.isHide,
              isDisabled: extraInterface.isDisabled,
              SplitBand: extraInterface.splitBand,
              WifiTarget: wifiTarget,
              NetworkName: extraInterface.targetNetworkName,
            });
          }
        });

        starContext.updateLAN$({
          Wireless: enabledNetworks,
        });
      }

      // Always call onComplete$ when saving
      await onComplete$();
    });

    return (
      <div class="mx-auto w-full max-w-4xl p-4">
        <div class="rounded-lg bg-surface p-6 shadow-lg dark:bg-surface-dark">
          <WirelessHeader
            wirelessEnabled={wirelessEnabled}
            onToggle$={$(async (enabled: boolean) => {
              if (!enabled && onDisabled$) {
                await onDisabled$();
              }
            })}
          />

          {/* Message when wireless is disabled */}
          {!wirelessEnabled.value && (
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
              <p class="text-gray-700 dark:text-gray-300">
                {$localize`Wireless networking is currently disabled. Enable it using the toggle above to configure wireless settings.`}
              </p>
            </div>
          )}

          {/* Only show wireless configuration when enabled */}
          {wirelessEnabled.value && (
            <>
              {starContext.state.Choose.Mode === "advance" && (
                <SSIDModeSelector isMultiSSID={isMultiSSID} />
              )}

              {!isMultiSSID.value ? (
                <SingleSSIDForm
                  ssid={ssid}
                  password={password}
                  isHide={isHide}
                  isDisabled={isDisabled}
                  splitBand={splitBand}
                  generateSSID={generateSSID}
                  generatePassword={generatePassword}
                  toggleHide={toggleSingleHide}
                  toggleDisabled={toggleSingleDisabled}
                  toggleSplitBand={toggleSingleSplitBand}
                  isLoading={isLoading}
                  mode={starContext.state.Choose.Mode}
                  hasBothBands={hasBothBands.value}
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
                  toggleNetworkSplitBand={toggleNetworkSplitBand}
                  mode={starContext.state.Choose.Mode}
                  hasBothBands={hasBothBands.value}
                  extraInterfaces={extraInterfaces}
                  addExtraInterface={addExtraInterface}
                  removeExtraInterface={removeExtraInterface}
                  updateExtraInterfaceField={updateExtraInterfaceField}
                  selectExtraNetwork={selectExtraNetwork}
                  generateExtraSSID={generateExtraSSID}
                  generateExtraPassword={generateExtraPassword}
                />
              )}
            </>
          )}

          <ActionButtons
            onSubmit={handleSave}
            isValid={wirelessEnabled.value ? isFormValid.value : true}
          />
        </div>
      </div>
    );
  },
);
