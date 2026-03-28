import { component$, $, useSignal, useContext } from "@builder.io/qwik";
import type {
  VPNClientAdvancedState,
  VPNConfig,
  VPNClientConfig,
} from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { VPNBox } from "../components/VPNBox/VPNBox";
import { VPNBoxContent } from "../components/VPNBox/VPNBoxContent";
import { StarContext } from "../../../../StarContext/StarContext";

// Protocol-specific configuration components
import { WireguardConfig } from "../../Protocols/Wireguard/WireguardConfig";
import { OpenVPNConfig } from "../../Protocols/OpenVPN/OpenVPNConfig";
import { L2TPConfig } from "../../Protocols/L2TP/L2TPConfig";
import { PPTPConfig } from "../../Protocols/PPTP/PPTPConfig";
import { SSTPConfig } from "../../Protocols/SSTP/SSTPConfig";
import { IKEv2Config } from "../../Protocols/IKeV2/IKEv2Config";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export interface StepVPNConfigProps {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
  vpnId: string;
}

export const StepVPNConfig = component$<StepVPNConfigProps>(
  ({ wizardState, wizardActions, vpnId }) => {
    const starContext = useContext(StarContext);
    const locale = useMessageLocale();
    const isConfigValid = useSignal(false);
    const vpn = wizardState.vpnConfigs.find((v) => v.id === vpnId);

    if (!vpn) {
      return (
        <div class="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <p class="text-sm text-red-700 dark:text-red-300">
            {semanticMessages.vpn_client_advanced_config_not_found(
              {},
              { locale },
            )}
          </p>
        </div>
      );
    }

    if (!vpn.type) {
      return (
        <div class="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <p class="text-sm text-yellow-700 dark:text-yellow-300">
            {semanticMessages.vpn_client_advanced_select_protocol_first(
              {},
              { locale },
            )}
          </p>
        </div>
      );
    }

    // Removed unused getFieldErrors function

    const handleValidChange = $((isValid: boolean) => {
      isConfigValid.value = isValid;

      // Update validation state in wizard
      if (isValid) {
        // Clear any validation errors for this VPN
        const newErrors = { ...wizardState.validationErrors };
        Object.keys(newErrors).forEach((key) => {
          if (key.startsWith(`vpn-${vpnId}`)) {
            delete newErrors[key];
          }
        });
        wizardState.validationErrors = newErrors;

        // Extract config from StarContext based on VPN type
        let configData = {};
        switch (vpn.type) {
          case "Wireguard":
            configData = starContext.state.WAN.VPNClient?.Wireguard || {};
            break;
          case "OpenVPN":
            configData = starContext.state.WAN.VPNClient?.OpenVPN || {};
            break;
          case "L2TP":
            configData = starContext.state.WAN.VPNClient?.L2TP || {};
            break;
          case "PPTP":
            configData = starContext.state.WAN.VPNClient?.PPTP || {};
            break;
          case "SSTP":
            configData = starContext.state.WAN.VPNClient?.SSTP || {};
            break;
          case "IKeV2":
            configData = starContext.state.WAN.VPNClient?.IKeV2 || {};
            break;
        }

        // Update VPN config in wizard state
        const updatedVPN: Partial<VPNConfig> = {
          ...vpn,
          config: configData as any, // The type will be correct based on vpn.type
        };
        wizardActions.updateVPN$(vpnId, updatedVPN);
      } else {
        // Add validation error
        wizardState.validationErrors[`vpn-${vpnId}-config`] = [
          semanticMessages.vpn_client_advanced_invalid_configuration(
            {},
            { locale },
          ),
        ];
      }
    });

    const renderProtocolConfig = () => {
      switch (vpn.type) {
        case "Wireguard":
          return <WireguardConfig onIsValidChange$={handleValidChange} />;

        case "OpenVPN":
          return (
            <OpenVPNConfig
              onIsValidChange$={handleValidChange}
              isSaving={false}
            />
          );

        case "L2TP":
          return (
            <L2TPConfig onIsValidChange$={handleValidChange} isSaving={false} />
          );

        case "PPTP":
          return (
            <PPTPConfig onIsValidChange$={handleValidChange} isSaving={false} />
          );

        case "SSTP":
          return (
            <SSTPConfig onIsValidChange$={handleValidChange} isSaving={false} />
          );

        case "IKeV2":
          return (
            <IKEv2Config
              onIsValidChange$={handleValidChange}
              isSaving={false}
            />
          );

        default:
          return (
            <div class="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {semanticMessages.vpn_client_advanced_select_type_first(
                  {},
                  { locale },
                )}
              </p>
            </div>
          );
      }
    };

    return (
      <div class="space-y-6">
        {/* Header */}
        <div>
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {semanticMessages.vpn_client_advanced_configure_title(
              { name: vpn.name || "VPN" },
              { locale },
            )}
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {semanticMessages.vpn_client_advanced_configure_description(
              { type: vpn.type },
              { locale },
            )}
          </p>
        </div>

        {/* VPN Box with configuration */}
        <VPNBox
          vpn={vpn as VPNClientConfig}
          index={0}
          isExpanded={true}
          canRemove={false}
          validationErrors={{}}
        >
          <VPNBoxContent
            vpn={vpn as VPNClientConfig}
            validationErrors={{}}
            onUpdate$={$((updates: any) =>
              wizardActions.updateVPN$(vpnId, updates),
            )}
          >
            {/* VPN Name (read-only in this step) */}
            <div class="mb-4 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {semanticMessages.vpn_client_advanced_vpn_name(
                      {},
                      { locale },
                    )}
                  </p>
                  <p class="text-sm text-gray-900 dark:text-gray-100">
                    {vpn.name}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {semanticMessages.vpn_client_advanced_protocol(
                      {},
                      { locale },
                    )}
                  </p>
                  <p class="text-sm text-gray-900 dark:text-gray-100">
                    {vpn.type}
                  </p>
                </div>
              </div>
            </div>

            {/* Protocol-specific configuration */}
            {renderProtocolConfig()}
          </VPNBoxContent>
        </VPNBox>

        {/* Help text */}
        <div class="mt-4 rounded-lg bg-info-50 p-4 dark:bg-info-900/20">
          <p class="text-sm text-info-700 dark:text-info-300">
            {semanticMessages.vpn_client_advanced_required_fields(
              { type: vpn.type },
              { locale },
            )}
          </p>
        </div>
      </div>
    );
  },
);
