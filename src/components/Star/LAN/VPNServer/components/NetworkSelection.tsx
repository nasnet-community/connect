import { component$, type QRL, useContext } from "@builder.io/qwik";
import type { Networks } from "../../../StarContext/CommonType";
import { UnifiedSelect as Select } from "~/components/Core/Select/UnifiedSelect";
import { StarContext } from "../../../StarContext/StarContext";

export type ExtendedNetworks = Networks | "Wireguard" | "OpenVPN" | "L2TP" | "PPTP" | "SSTP" | "IKev2";

interface NetworkDropdownProps {
  selectedNetwork: ExtendedNetworks;
  onNetworkChange$: QRL<(network: ExtendedNetworks) => void>;
  disabled?: boolean;
  label?: string;
  _vpnType?: string; // Optional VPN type to filter relevant subnets
}

export const NetworkDropdown = component$<NetworkDropdownProps>(
  ({ selectedNetwork, onNetworkChange$, disabled = false, label, _vpnType }) => {
    const starContext = useContext(StarContext);
    const subnets = starContext.state.LAN.Subnets || {};
    
    // Base network options
    const networkOptions = [
      {
        value: "VPN",
        label: subnets.VPN ? 
          $localize`VPN Network (${subnets.VPN})` : 
          $localize`VPN Network (192.168.40.0/24)`,
      },
      {
        value: "Split",
        label: subnets.Split ? 
          $localize`Split Network (${subnets.Split})` : 
          $localize`Split Network (192.168.10.0/24)`,
      },
      {
        value: "Domestic",
        label: subnets.Domestic ? 
          $localize`Domestic Network (${subnets.Domestic})` : 
          $localize`Domestic Network (192.168.20.0/24)`,
      },
      {
        value: "Foreign",
        label: subnets.Foreign ? 
          $localize`Foreign Network (${subnets.Foreign})` : 
          $localize`Foreign Network (192.168.30.0/24)`,
      },
    ];
    
    // Add VPN-specific subnet options if they exist
    const vpnSubnetOptions = [
      {
        value: "Wireguard",
        label: subnets.Wireguard ? 
          $localize`WireGuard Network (${subnets.Wireguard})` : 
          $localize`WireGuard Network (192.168.40.0/24)`,
        show: !!subnets.Wireguard
      },
      {
        value: "OpenVPN",
        label: subnets.OpenVPN ? 
          $localize`OpenVPN Network (${subnets.OpenVPN})` : 
          $localize`OpenVPN Network (192.168.41.0/24)`,
        show: !!subnets.OpenVPN
      },
      {
        value: "L2TP",
        label: subnets.L2TP ? 
          $localize`L2TP Network (${subnets.L2TP})` : 
          $localize`L2TP Network (192.168.42.0/24)`,
        show: !!subnets.L2TP
      },
      {
        value: "PPTP",
        label: subnets.PPTP ? 
          $localize`PPTP Network (${subnets.PPTP})` : 
          $localize`PPTP Network (192.168.43.0/24)`,
        show: !!subnets.PPTP
      },
      {
        value: "SSTP",
        label: subnets.SSTP ? 
          $localize`SSTP Network (${subnets.SSTP})` : 
          $localize`SSTP Network (192.168.44.0/24)`,
        show: !!subnets.SSTP
      },
      {
        value: "IKev2",
        label: subnets.IKev2 ? 
          $localize`IKEv2 Network (${subnets.IKev2})` : 
          $localize`IKEv2 Network (192.168.45.0/24)`,
        show: !!subnets.IKev2
      },
    ];
    
    // Add VPN subnet options that are configured
    vpnSubnetOptions.forEach(option => {
      if (option.show) {
        networkOptions.push({
          value: option.value,
          label: option.label
        });
      }
    });

    return (
      <div class="space-y-2">
        {label && (
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <Select
          options={networkOptions}
          value={selectedNetwork}
          onChange$={(value) => {
            const network = Array.isArray(value) ? value[0] as ExtendedNetworks : value as ExtendedNetworks;
            onNetworkChange$(network);
          }}
          disabled={disabled}
          placeholder={$localize`Select network`}
        />
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {$localize`Choose which network segment this VPN protocol should be accessible from.`}
        </p>
      </div>
    );
  }
);