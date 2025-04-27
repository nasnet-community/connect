import { component$, type QRL } from "@builder.io/qwik";
import type { VPNType } from "~/components/Star/StarContext/StarContext";

interface VPNSelectorProps {
  selectedType: string;
  onTypeChange$: QRL<(type: VPNType) => void>;
}

export const VPNSelector = component$<VPNSelectorProps>(
  ({ selectedType, onTypeChange$ }) => {
    return (
      <div class="space-y-2">
        <label class="text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
          {$localize`Select VPN Type`}
        </label>
        <select
          value={selectedType}
          onChange$={(e, currentTarget) =>
            onTypeChange$(currentTarget.value as VPNType)
          }
          class="text-text-default focus:ring-primary-500 w-full rounded-lg border 
          border-border bg-white
          px-4 py-2
          focus:ring-2 dark:border-border-dark
          dark:bg-surface-dark dark:text-text-dark-default"
        >
          <option value="">{$localize`Select VPN type`}</option>
          <option value="Wireguard">{$localize`Wireguard`}</option>
          <option
            value="OpenVPN"
            disabled
          >{$localize`OpenVPN (Coming Soon)`}</option>
          <option value="PPTP" disabled>{$localize`PPTP (Coming Soon)`}</option>
          <option value="L2TP" disabled>{$localize`L2TP (Coming Soon)`}</option>
          <option value="SSTP" disabled>{$localize`SSTP (Coming Soon)`}</option>
          <option
            value="IKeV2"
            disabled
          >{$localize`IKeV2 (Coming Soon)`}</option>
        </select>
      </div>
    );
  },
);
