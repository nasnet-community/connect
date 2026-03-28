import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { VPNClientType } from "../../types/AdvancedVPNState";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface VPNTypeSelectorProps {
  selectedType: VPNClientType;
  onTypeChange$: QRL<(type: VPNClientType) => Promise<void>>;
  disabled?: boolean;
}

const VPN_TYPES: {
  value: VPNClientType;
  label: string;
  description: string;
}[] = [
  {
    value: "Wireguard",
    label: "WireGuard",
    description: "Modern, fast, and secure VPN protocol",
  },
  {
    value: "OpenVPN",
    label: "OpenVPN",
    description: "Widely supported and highly configurable",
  },
  {
    value: "L2TP",
    label: "L2TP/IPSec",
    description: "Built-in support on most devices",
  },
  {
    value: "IKeV2",
    label: "IKEv2/IPSec",
    description: "Fast reconnection and mobile-friendly",
  },
  {
    value: "SSTP",
    label: "SSTP",
    description: "Works well with restrictive firewalls",
  },
  {
    value: "PPTP",
    label: "PPTP",
    description: "Legacy protocol (not recommended)",
  },
];

export const VPNTypeSelector = component$<VPNTypeSelectorProps>((props) => {
  const { selectedType, disabled = false, onTypeChange$ } = props;
  const locale = useMessageLocale();

  const vpnTypes = VPN_TYPES.map((vpnType) => ({
    ...vpnType,
    description:
      vpnType.value === "Wireguard"
        ? semanticMessages.vpn_selector_wireguard_description({}, { locale })
        : vpnType.value === "OpenVPN"
          ? semanticMessages.vpn_selector_openvpn_description({}, { locale })
          : vpnType.value === "L2TP"
            ? semanticMessages.vpn_selector_l2tp_description({}, { locale })
            : vpnType.value === "IKeV2"
              ? semanticMessages.vpn_selector_ikev2_description({}, { locale })
              : vpnType.value === "SSTP"
                ? semanticMessages.vpn_selector_sstp_description({}, { locale })
                : semanticMessages.vpn_selector_pptp_description(
                    {},
                    {
                      locale,
                    },
                  ),
  }));

  return (
    <div class="space-y-3">
      <label class="text-text-default block text-sm font-medium dark:text-text-dark-default">
        {semanticMessages.vpn_client_advanced_protocol({}, { locale })}
      </label>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        {vpnTypes.map((vpnType) => (
          <button
            key={vpnType.value}
            onClick$={$(() => onTypeChange$(vpnType.value))}
            disabled={disabled}
            class={`
              rounded-lg border p-4 text-left transition-all
              ${
                selectedType === vpnType.value
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-border hover:border-primary-300 dark:border-border-dark dark:hover:border-primary-700"
              }
              ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            `}
          >
            <div class="text-text-default font-medium dark:text-text-dark-default">
              {vpnType.label}
            </div>
            <div class="text-text-muted dark:text-text-dark-muted mt-1 text-sm">
              {vpnType.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});
