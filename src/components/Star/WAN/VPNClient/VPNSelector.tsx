import { component$, type QRL } from "@builder.io/qwik";
import type { VPNType } from "~/components/Star/StarContext/CommonType";

interface VPNSelectorProps {
  selectedType: string;
  onTypeChange$: QRL<(type: VPNType) => void>;
}

export const VPNSelector = component$<VPNSelectorProps>(
  ({ selectedType, onTypeChange$ }) => {
    return (
      <div class="space-y-2">
        <label class="text-text-secondary dark:text-text-dark-secondary text-sm font-medium">
          {$localize`Select VPN Type`}
        </label>
        <select
          value={selectedType}
          onChange$={(e, currentTarget) =>
            onTypeChange$(currentTarget.value as VPNType)
          }
          class="text-text-default w-full rounded-lg border border-border 
          bg-white px-4
          py-2 focus:ring-2
          focus:ring-primary-500 dark:border-border-dark
          dark:bg-surface-dark dark:text-text-dark-default"
        >
          <option value="">{$localize`Select VPN type`}</option>
          <option value="Wireguard">{$localize`Wireguard`}</option>
          <option value="OpenVPN">{$localize`OpenVPN`}</option>
          <option value="L2TP">{$localize`L2TP`}</option>
          <option value="IKeV2">{$localize`IKEv2`}</option>
          <option value="PPTP">{$localize`PPTP`}</option>
          <option value="SSTP">{$localize`SSTP`}</option>
        </select>
      </div>
    );
  },
);
