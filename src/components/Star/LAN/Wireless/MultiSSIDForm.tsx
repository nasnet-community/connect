import { $, component$, type QRL, useContext } from "@builder.io/qwik";
import { HiPlusOutline } from "@qwikest/icons/heroicons";
import { CompactNetworkCard } from "./CompactNetworkCard";
import { CompactHeader } from "./CompactHeader";
import { ExtraWirelessCard } from "./ExtraWirelessCard";
import type { NetworkKey, Networks, ExtraWirelessInterface } from "./type";
import { NETWORK_KEYS } from "./constants";
import { StarContext } from "../../StarContext/StarContext";
import { Grid, Button } from "~/components/Core";
import type { Mode } from "../../StarContext/ChooseType";
import { getExtraNetworks, getAvailableNetworks } from "./networkUtils";

interface MultiSSIDFormProps {
  networks: Networks;
  isLoading: Record<string, boolean>;
  generateNetworkSSID: QRL<(network: NetworkKey) => Promise<void>>;
  generateNetworkPassword: QRL<(network: NetworkKey) => Promise<void>>;
  generateAllPasswords: QRL<() => Promise<void>>;
  toggleNetworkHide: QRL<(network: NetworkKey, value?: boolean) => void>;
  toggleNetworkDisabled: QRL<(network: NetworkKey, value?: boolean) => void>;
  toggleNetworkSplitBand: QRL<(network: NetworkKey, value?: boolean) => void>;
  mode?: Mode;
  // Extra wireless interfaces
  extraInterfaces?: ExtraWirelessInterface[];
  addExtraInterface?: QRL<() => void>;
  removeExtraInterface?: QRL<(id: string) => void>;
  updateExtraInterfaceField?: QRL<(id: string, field: keyof ExtraWirelessInterface, value: any) => void>;
  selectExtraNetwork?: QRL<(id: string, networkName: string) => void>;
  generateExtraSSID?: QRL<(id: string) => Promise<void>>;
  generateExtraPassword?: QRL<(id: string) => Promise<void>>;
}

export const MultiSSIDForm = component$<MultiSSIDFormProps>(
  ({
    networks,
    isLoading,
    generateNetworkSSID,
    generateNetworkPassword,
    generateAllPasswords,
    toggleNetworkHide,
    toggleNetworkDisabled,
    toggleNetworkSplitBand,
    mode = "advance",
    extraInterfaces = [],
    addExtraInterface,
    removeExtraInterface,
    updateExtraInterfaceField,
    selectExtraNetwork,
    generateExtraSSID,
    generateExtraPassword,
  }) => {
    const starContext = useContext(StarContext);
    const isDomesticLinkEnabled =
      (starContext.state.Choose.WANLinkType === "domestic" || starContext.state.Choose.WANLinkType === "both");

    // Filter network keys based on DomesticLink value
    const filteredNetworkKeys = NETWORK_KEYS.filter(
      (key) => isDomesticLinkEnabled || (key !== "domestic" && key !== "split"),
    );

    // Count active networks
    const activeNetworksCount = filteredNetworkKeys.filter(
      key => !networks[key].isDisabled
    ).length;

    return (
      <div class="space-y-4">
        {/* Compact Header with unified controls */}
        <CompactHeader
          generateAllPasswords={generateAllPasswords}
          isLoading={isLoading.allPasswords}
          activeNetworksCount={activeNetworksCount}
          totalNetworksCount={filteredNetworkKeys.length}
        />

        {/* Networks Grid - Always 2 columns on desktop */}
        <Grid
          columns={{ base: "1", lg: "2" }}
          gap="md"
        >
          {filteredNetworkKeys.map((networkKey) => (
            <CompactNetworkCard
              key={networkKey}
              networkKey={networkKey}
              ssid={networks[networkKey].ssid}
              password={networks[networkKey].password}
              isHide={networks[networkKey].isHide}
              isDisabled={networks[networkKey].isDisabled}
              splitBand={networks[networkKey].splitBand}
              onSSIDChange={$((value: string) => {
                networks[networkKey].ssid = value;
              })}
              onPasswordChange={$((value: string) => {
                networks[networkKey].password = value;
              })}
              onHideToggle={$((value?: boolean) => toggleNetworkHide(networkKey, value))}
              onDisabledToggle={$((value?: boolean) => toggleNetworkDisabled(networkKey, value))}
              onSplitBandToggle={$((value?: boolean) => toggleNetworkSplitBand(networkKey, value))}
              generateNetworkSSID={$(() => generateNetworkSSID(networkKey))}
              generateNetworkPassword={$(() =>
                generateNetworkPassword(networkKey),
              )}
              isLoading={isLoading}
              mode={mode}
            />
          ))}
        </Grid>

        {/* Extra Wireless Interfaces Section - Advanced Mode Only */}
        {mode === "advance" && (
          <div class="mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                {$localize`Extra Wireless Interfaces`}
              </h3>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {extraInterfaces.length} {extraInterfaces.length === 1 ? $localize`interface` : $localize`interfaces`}
              </span>
            </div>

            {/* Show message if no extra networks available */}
            {getExtraNetworks(starContext.state.Choose.Networks).length === 0 && (
              <div class="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <p>
                  {$localize`No additional networks available. Configure extra WAN links, VPN clients, or tunnels to add more wireless interfaces.`}
                </p>
              </div>
            )}

            {/* Extra interface cards */}
            {extraInterfaces.length > 0 && (
              <div class="space-y-3">
                {extraInterfaces.map((extraInterface) => (
                  <ExtraWirelessCard
                    key={extraInterface.id}
                    extraInterface={extraInterface}
                    availableNetworks={getAvailableNetworks(starContext.state.Choose.Networks)}
                    assignedNetworks={extraInterfaces.map(i => i.targetNetworkName)}
                    onNetworkSelect$={selectExtraNetwork || $(() => {})}
                    onFieldChange$={updateExtraInterfaceField || $(() => {})}
                    onDelete$={removeExtraInterface || $(() => {})}
                    generateSSID$={generateExtraSSID || $(() => Promise.resolve())}
                    generatePassword$={generateExtraPassword || $(() => Promise.resolve())}
                    isLoading={isLoading}
                    mode={mode}
                  />
                ))}
              </div>
            )}

            {/* Add button - only show if networks available */}
            {getExtraNetworks(starContext.state.Choose.Networks).length > extraInterfaces.length && (
              <Button
                onClick$={addExtraInterface || $(() => {})}
                variant="outline"
                leftIcon
                class="w-full sm:w-auto"
              >
                <HiPlusOutline q:slot="leftIcon" class="h-4 w-4" />
                {$localize`Add Extra Wireless Interface`}
              </Button>
            )}
          </div>
        )}

        {/* Info Note */}
        <div class="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>
            {$localize`Note: At least one network must remain enabled. Fill all required fields for enabled networks.`}
          </p>
        </div>
      </div>
    );
  },
);
