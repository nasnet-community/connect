import { component$, type QRL, useContext } from "@builder.io/qwik";
import type { BaseNetworksType } from "~/components/Star/StarContext";
import { UnifiedSelect as Select } from "~/components/Core/Select/UnifiedSelect";
import { StarContext } from "~/components/Star/StarContext";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export type ExtendedNetworks =
  | BaseNetworksType
  | "Wireguard"
  | "OpenVPN"
  | "L2TP"
  | "PPTP"
  | "SSTP"
  | "IKev2";

interface NetworkDropdownProps {
  selectedNetwork: ExtendedNetworks;
  onNetworkChange$: QRL<(network: ExtendedNetworks) => void>;
  disabled?: boolean;
  label?: string;
  _vpnType?: string; // Optional VPN type to filter relevant subnets
}

export const NetworkDropdown = component$<NetworkDropdownProps>(
  ({
    selectedNetwork,
    onNetworkChange$,
    disabled = false,
    label,
    _vpnType,
  }) => {
    const starContext = useContext(StarContext);
    const locale = useMessageLocale();
    const subnets = starContext.state.LAN.Subnets || {};
    const baseNetworks = (subnets as any)?.BaseNetworks || {};
    const vpnNetworks = (subnets as any)?.VPNNetworks || {};

    // Base network options
    const networkOptions = [
      {
        value: "VPN",
        label: semanticMessages.vpn_server_network_option(
          {
            label: semanticMessages.subnets_label_vpn({}, { locale }),
            subnet: baseNetworks.VPN?.subnet || "192.168.40.0/24",
          },
          { locale },
        ),
      },
      {
        value: "Split",
        label: semanticMessages.vpn_server_network_option(
          {
            label: semanticMessages.subnets_label_split({}, { locale }),
            subnet: baseNetworks.Split?.subnet || "192.168.10.0/24",
          },
          { locale },
        ),
      },
      {
        value: "Domestic",
        label: semanticMessages.vpn_server_network_option(
          {
            label: semanticMessages.subnets_label_domestic({}, { locale }),
            subnet: baseNetworks.Domestic?.subnet || "192.168.20.0/24",
          },
          { locale },
        ),
      },
      {
        value: "Foreign",
        label: semanticMessages.vpn_server_network_option(
          {
            label: semanticMessages.subnets_label_foreign({}, { locale }),
            subnet: baseNetworks.Foreign?.subnet || "192.168.30.0/24",
          },
          { locale },
        ),
      },
    ];

    // Add VPN-specific subnet options if they exist
    const vpnSubnetOptions = [
      {
        value: "Wireguard",
        label: semanticMessages.vpn_server_network_option(
          {
            label: semanticMessages.vpn_server_label_wireguard_network(
              {},
              { locale },
            ),
            subnet: vpnNetworks.Wireguard?.[0]?.subnet || "192.168.40.0/24",
          },
          { locale },
        ),
        show: !!(vpnNetworks.Wireguard && vpnNetworks.Wireguard.length > 0),
      },
      {
        value: "OpenVPN",
        label: semanticMessages.vpn_server_network_option(
          {
            label: semanticMessages.vpn_server_label_openvpn_network(
              {},
              { locale },
            ),
            subnet: vpnNetworks.OpenVPN?.[0]?.subnet || "192.168.41.0/24",
          },
          { locale },
        ),
        show: !!(vpnNetworks.OpenVPN && vpnNetworks.OpenVPN.length > 0),
      },
      {
        value: "L2TP",
        label: semanticMessages.vpn_server_network_option(
          {
            label: semanticMessages.subnets_label_l2tp_network({}, { locale }),
            subnet: vpnNetworks.L2TP?.subnet || "192.168.42.0/24",
          },
          { locale },
        ),
        show: !!vpnNetworks.L2TP,
      },
      {
        value: "PPTP",
        label: semanticMessages.vpn_server_network_option(
          {
            label: semanticMessages.subnets_label_pptp_network({}, { locale }),
            subnet: vpnNetworks.PPTP?.subnet || "192.168.43.0/24",
          },
          { locale },
        ),
        show: !!vpnNetworks.PPTP,
      },
      {
        value: "SSTP",
        label: semanticMessages.vpn_server_network_option(
          {
            label: semanticMessages.subnets_label_sstp_network({}, { locale }),
            subnet: vpnNetworks.SSTP?.subnet || "192.168.44.0/24",
          },
          { locale },
        ),
        show: !!vpnNetworks.SSTP,
      },
      {
        value: "IKev2",
        label: semanticMessages.vpn_server_network_option(
          {
            label: semanticMessages.subnets_label_ikev2_network({}, { locale }),
            subnet: vpnNetworks.IKev2?.subnet || "192.168.45.0/24",
          },
          { locale },
        ),
        show: !!vpnNetworks.IKev2,
      },
    ];

    // Add VPN subnet options that are configured
    vpnSubnetOptions.forEach((option) => {
      if (option.show) {
        networkOptions.push({
          value: option.value,
          label: option.label,
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
          value={selectedNetwork as string}
          onChange$={(value) => {
            const network = Array.isArray(value)
              ? (value[0] as ExtendedNetworks)
              : (value as ExtendedNetworks);
            onNetworkChange$(network);
          }}
          disabled={disabled}
          placeholder={semanticMessages.vpn_server_select_network(
            {},
            { locale },
          )}
        />
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {semanticMessages.vpn_server_network_helper({}, { locale })}
        </p>
      </div>
    );
  },
);
