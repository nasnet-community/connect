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
    const baseNetworks = (subnets as any)?.BaseNetworks || {};
    const vpnNetworks = (subnets as any)?.VPNNetworks || {};
    
    // Base network options
    const networkOptions = [
      {
        value: "VPN",
        label: baseNetworks.VPN?.subnet ? 
          $localize`VPN Network (${baseNetworks.VPN.subnet})` : 
          $localize`VPN Network (192.168.40.0/24)`,
      },
      {
        value: "Split",
        label: baseNetworks.Split?.subnet ? 
          $localize`Split Network (${baseNetworks.Split.subnet})` : 
          $localize`Split Network (192.168.10.0/24)`,
      },
      {
        value: "Domestic",
        label: baseNetworks.Domestic?.subnet ? 
          $localize`Domestic Network (${baseNetworks.Domestic.subnet})` : 
          $localize`Domestic Network (192.168.20.0/24)`,
      },
      {
        value: "Foreign",
        label: baseNetworks.Foreign?.subnet ? 
          $localize`Foreign Network (${baseNetworks.Foreign.subnet})` : 
          $localize`Foreign Network (192.168.30.0/24)`,
      },
    ];
    
    // Add VPN-specific subnet options if they exist
    const vpnSubnetOptions = [
      {
        value: "Wireguard",
        label: vpnNetworks.Wireguard?.[0]?.subnet ? 
          $localize`WireGuard Network (${vpnNetworks.Wireguard[0].subnet})` : 
          $localize`WireGuard Network (192.168.40.0/24)`,
        show: !!(vpnNetworks.Wireguard && vpnNetworks.Wireguard.length > 0)
      },
      {
        value: "OpenVPN",
        label: vpnNetworks.OpenVPN?.[0]?.subnet ? 
          $localize`OpenVPN Network (${vpnNetworks.OpenVPN[0].subnet})` : 
          $localize`OpenVPN Network (192.168.41.0/24)`,
        show: !!(vpnNetworks.OpenVPN && vpnNetworks.OpenVPN.length > 0)
      },
      {
        value: "L2TP",
        label: vpnNetworks.L2TP?.subnet ? 
          $localize`L2TP Network (${vpnNetworks.L2TP.subnet})` : 
          $localize`L2TP Network (192.168.42.0/24)`,
        show: !!vpnNetworks.L2TP
      },
      {
        value: "PPTP",
        label: vpnNetworks.PPTP?.subnet ? 
          $localize`PPTP Network (${vpnNetworks.PPTP.subnet})` : 
          $localize`PPTP Network (192.168.43.0/24)`,
        show: !!vpnNetworks.PPTP
      },
      {
        value: "SSTP",
        label: vpnNetworks.SSTP?.subnet ? 
          $localize`SSTP Network (${vpnNetworks.SSTP.subnet})` : 
          $localize`SSTP Network (192.168.44.0/24)`,
        show: !!vpnNetworks.SSTP
      },
      {
        value: "IKev2",
        label: vpnNetworks.IKev2?.subnet ? 
          $localize`IKEv2 Network (${vpnNetworks.IKev2.subnet})` : 
          $localize`IKEv2 Network (192.168.45.0/24)`,
        show: !!vpnNetworks.IKev2
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