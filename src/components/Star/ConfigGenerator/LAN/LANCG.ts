import type { StarState } from "~/components/Star/StarContext/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import { WirelessConfig } from "~/components/Star/ConfigGenerator";
import { DisableInterfaces } from "~/components/Star/ConfigGenerator";
import type { EthernetInterfaceConfig } from "~/components/Star/StarContext";
import { TunnelWrapper } from "~/components/Star/ConfigGenerator";
import { VPNServerWrapper } from "~/components/Star/ConfigGenerator";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";
import { hasWirelessInterfaces } from "~/components/Star/ConfigGenerator";
import { calculateSubnetInfo } from "~/components/Star/ConfigGenerator";

export const IPv6 = (): RouterConfig => {
    const config: RouterConfig = {
        "/ipv6 settings": ["set disable-ipv6=yes"],
        "/ipv6 firewall filter": [
            "add chain=input action=drop",
            "add chain=forward action=drop",
        ],
    };

    return config;
};

export const EthernetBridgePorts = ( Ethernet: EthernetInterfaceConfig[] ): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge port": [],
    };

    // Map network types to bridge names
    const bridgeNameMap: Record<string, string> = {
        Foreign: "FRN",
        Domestic: "DOM",
        VPN: "VPN",
        Split: "Split",
    };

    Ethernet.forEach((iface) => {
        const bridgeName = bridgeNameMap[iface.bridge] || iface.bridge;
        config["/interface bridge port"].push(
            `add bridge=LANBridge${bridgeName} interface=${iface.name}`,
        );
    });

    return config;
};

export const SubnetIPConfigurations = ( subnets: Record<string, string> | undefined ): RouterConfig => {
    if (!subnets) return {};

    const config: RouterConfig = {
        "/ip address": [],
    };

    // Map network types to bridge names
    const bridgeNameMap: Record<string, string> = {
        Foreign: "FRN",
        Domestic: "DOM",
        VPN: "VPN",
        Split: "Split",
    };

    Object.entries(subnets).forEach(([networkType, subnet]) => {
        const subnetInfo = calculateSubnetInfo(
            subnet.split("/")[0],
            subnet.split("/")[1],
        );
        if (!subnetInfo) return;

        // For base networks (DOM, FRN, VPN, Split)
        if (bridgeNameMap[networkType]) {
            const bridgeName = bridgeNameMap[networkType];
            config["/ip address"].push(
                `add address=${subnetInfo.firstHostAddress}/${subnetInfo.prefixLength} interface=LANBridge${bridgeName} network=${subnetInfo.networkAddress}`,
            );
        }
        // For VPN servers - these will be handled by VPNServerWrapper
        // For tunnels - these will be handled by TunnelWrapper
    });

    return config;
};

export const LANCG = (state: StarState): RouterConfig => {
    const configs: RouterConfig[] = [IPv6()];

    // Only configure wireless if router models have wireless interfaces AND LAN.Wireless is defined
    const hasWireless = hasWirelessInterfaces(state.Choose.RouterModels);

    if (hasWireless) {
        if (state.LAN.Wireless && Array.isArray(state.LAN.Wireless)) {
            configs.push(
                WirelessConfig(
                    state.LAN.Wireless,
                    state.WAN.WANLink,
                    state.Choose.RouterModels,
                ),
            );
        } else {
            // Only disable interfaces if the router actually has wireless interfaces
            configs.push(DisableInterfaces());
        }
    }

    if (state.LAN.Tunnel) {
        configs.push(TunnelWrapper(state.LAN.Tunnel, state.LAN.Subnets?.TunnelNetworks));
    }

    if (state.LAN.VPNServer) {
        configs.push(VPNServerWrapper(state.LAN.VPNServer, (state.LAN.Subnets?.VPNServerNetworks || {}) as any));
    }



    // Only add Ethernet bridge ports if LAN.Interface exists
    if (state.LAN.Interface && Array.isArray(state.LAN.Interface)) {
        configs.push(EthernetBridgePorts(state.LAN.Interface));
    }

    // Add subnet IP configurations if defined
    // For backward compatibility, convert to Record<string, string> if needed
    if (state.LAN.Subnets) {
        const subnets = state.LAN.Subnets as any;
        if (typeof subnets === "object" && !Array.isArray(subnets)) {
            configs.push(
                SubnetIPConfigurations(subnets as Record<string, string>),
            );
        }
    }

    return mergeMultipleConfigs(...configs);
};
