import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { VPNClientType } from "../../types/AdvancedVPNState";

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

  return (
    <div class="space-y-3">
      <label class="text-text-default block text-sm font-medium dark:text-text-dark-default">
        {$localize`VPN Protocol`}
      </label>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        {VPN_TYPES.map((vpnType) => (
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
