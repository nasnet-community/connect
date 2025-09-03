import { $, component$, useSignal, type QRL } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import type { VPNType } from "~/components/Star/StarContext/CommonType";
import { useVPNConfig } from "../useVPNConfig";
import { VPNSelector } from "../VPNSelector";
import { ErrorMessage } from "../components/ErrorMessage";
import { ActionFooter } from "../ActionFooter";
import { PromoL2TPBanner } from "../PromoL2TPBanner";

import { WireguardConfig } from "../Protocols/Wireguard/WireguardConfig";
import { OpenVPNConfig } from "../Protocols/OpenVPN/OpenVPNConfig";
import { L2TPConfig } from "../Protocols/L2TP/L2TPConfig";
import { IKEv2Config } from "../Protocols/IKeV2/IKEv2Config";
import { PPTPConfig } from "../Protocols/PPTP/PPTPConfig";
import { SSTPConfig } from "../Protocols/SSTP/SSTPConfig";

interface VPNClientEasyProps {
  isComplete?: boolean;
  onComplete$?: QRL<() => Promise<void>>;
}

export const VPNClientEasy = component$<VPNClientEasyProps>(
  ({ isComplete, onComplete$ }) => {
    const { isValid, vpnType, errorMessage, saveVPNSelection$ } =
      useVPNConfig();

    const isSaving = useSignal(false);

    const handleVPNTypeChange = $((value: VPNType) => {
      // Track VPN type selection
      track("vpn_type_selected", {
        vpn_type: value,
        step: "wan_config",
        component: "vpn_client_easy",
      });

      vpnType.value = value;
      isValid.value = false;
    });

    const handleIsValidChange = $((valid: boolean) => {
      isValid.value = valid;
    });

    const handleComplete = $(async () => {
      if (!vpnType.value) {
        isValid.value = false;
        errorMessage.value = "Please select a VPN type";
        return;
      }

      if (isValid.value) {
        isSaving.value = true;

        await new Promise((resolve) => setTimeout(resolve, 0));

        isSaving.value = false;

        const saved = await saveVPNSelection$();

        if (saved && onComplete$) {
          // Track VPN client configuration completion
          track("vpn_client_configured", {
            vpn_protocol: vpnType.value,
            step: "wan_config",
            component: "vpn_client_easy",
            configuration_completed: true,
            success: true,
          });

          await onComplete$();
        } else if (!saved) {
          // Track failed VPN client configuration
          track("vpn_client_configured", {
            vpn_protocol: vpnType.value || "unknown",
            step: "wan_config",
            component: "vpn_client_easy",
            configuration_completed: false,
            success: false,
            error: "save_failed",
          });

          errorMessage.value =
            "Failed to save VPN configuration. Please check your inputs and try again.";
        }
      } else {
        errorMessage.value =
          "Please complete the VPN configuration correctly before proceeding.";
      }
    });

    return (
      <div class="w-full p-4">
        <div class="rounded-lg bg-surface p-6 shadow-md transition-all dark:bg-surface-dark">
          <div class="space-y-6">
            {/* Header */}
            <div class="flex items-center space-x-4">
              <div class="rounded-full bg-primary-100 p-3 dark:bg-primary-900">
                <svg
                  class="h-6 w-6 text-primary-600 dark:text-primary-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h2 class="text-text-default text-xl font-semibold dark:text-text-dark-default">
                  {$localize`VPN Client Configuration`}
                </h2>
                <p class="text-text-muted dark:text-text-dark-muted">
                  {$localize`Your use of Starlink can be traced back to your identity. To enhance security and privacy, please configure a VPN to conceal your Starlink IP.`}
                </p>
              </div>
            </div>

            {/* Promotional L2TP Banner */}
            <PromoL2TPBanner onVPNTypeChange$={handleVPNTypeChange} />

            <VPNSelector
              selectedType={vpnType.value}
              onTypeChange$={handleVPNTypeChange}
            />

            {/* Render protocol-specific component based on selected type */}
            {vpnType.value === "Wireguard" && (
              <WireguardConfig
                onIsValidChange$={handleIsValidChange}
              />
            )}

            {vpnType.value === "OpenVPN" && (
              <OpenVPNConfig
                onIsValidChange$={handleIsValidChange}
                isSaving={isSaving.value}
              />
            )}

            {vpnType.value === "L2TP" && (
              <L2TPConfig
                onIsValidChange$={handleIsValidChange}
                isSaving={isSaving.value}
              />
            )}

            {vpnType.value === "IKeV2" && (
              <IKEv2Config
                onIsValidChange$={handleIsValidChange}
                isSaving={isSaving.value}
              />
            )}

            {vpnType.value === "PPTP" && (
              <PPTPConfig
                onIsValidChange$={handleIsValidChange}
                isSaving={isSaving.value}
              />
            )}

            {vpnType.value === "SSTP" && (
              <SSTPConfig
                onIsValidChange$={handleIsValidChange}
                isSaving={isSaving.value}
              />
            )}

            <ErrorMessage message={errorMessage.value} />

            <ActionFooter
              isComplete={isComplete || false}
              isValid={isValid.value}
              onComplete$={handleComplete}
            />
          </div>
        </div>
      </div>
    );
  },
);
