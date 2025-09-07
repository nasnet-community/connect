import { $, component$, type QRL, useContext } from "@builder.io/qwik";
import { CompactNetworkCard } from "./CompactNetworkCard";
import { CompactHeader } from "./CompactHeader";
import type { NetworkKey, Networks } from "./type";
import { NETWORK_KEYS } from "./constants";
import { StarContext } from "../../StarContext/StarContext";
import { Grid } from "~/components/Core";

interface MultiSSIDFormProps {
  networks: Networks;
  isLoading: Record<string, boolean>;
  generateNetworkSSID: QRL<(network: NetworkKey) => Promise<void>>;
  generateNetworkPassword: QRL<(network: NetworkKey) => Promise<void>>;
  generateAllPasswords: QRL<() => Promise<void>>;
  toggleNetworkHide: QRL<(network: NetworkKey, value?: boolean) => void>;
  toggleNetworkDisabled: QRL<(network: NetworkKey, value?: boolean) => void>;
  toggleNetworkSplitBand: QRL<(network: NetworkKey, value?: boolean) => void>;
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
  }) => {
    const starContext = useContext(StarContext);
    const isDomesticLinkEnabled =
      (starContext.state.Choose.WANLinkType === "domestic-only" || starContext.state.Choose.WANLinkType === "both");

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
              onHideToggle={$((value: boolean) => toggleNetworkHide(networkKey, value))}
              onDisabledToggle={$((value: boolean) => toggleNetworkDisabled(networkKey, value))}
              onSplitBandToggle={$((value: boolean) => toggleNetworkSplitBand(networkKey, value))}
              generateNetworkSSID={$(() => generateNetworkSSID(networkKey))}
              generateNetworkPassword={$(() =>
                generateNetworkPassword(networkKey),
              )}
              isLoading={isLoading}
            />
          ))}
        </Grid>

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
