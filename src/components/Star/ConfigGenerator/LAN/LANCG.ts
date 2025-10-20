import type { 
    StarState,
    Networks as NetworksInterface,
    EthernetInterfaceConfig,
} from "~/components/Star/StarContext/";
import {
    type RouterConfig, 
    WirelessConfig,
    DisableInterfaces,
    TunnelWrapper,
    VPNServerWrapper,
    mergeMultipleConfigs,
    hasWirelessInterfaces,
    Networks,
    mapNetworkToBridgeName,
} from "~/components/Star/ConfigGenerator";


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

export const EthernetBridgePorts = ( Ethernet: EthernetInterfaceConfig[], networks: NetworksInterface ): RouterConfig => {
    const config: RouterConfig = {
        "/interface ethernet": [],
        "/interface bridge port": [],
    };

    Ethernet.forEach((iface) => {
        // Add comment to ethernet interface
        config["/interface ethernet"].push(
            `set [find default-name=${iface.name}] comment="${iface.bridge} Network"`,
        );

        // Map the network name to the actual bridge name
        const bridgeName = mapNetworkToBridgeName(iface.bridge, networks);
        
        if (bridgeName) {
            config["/interface bridge port"].push(
                `add bridge="${bridgeName}" interface="${iface.name}" comment="${iface.bridge}"`,
            );
        } else {
            // Fallback: if mapping fails, use the original bridge name with LANBridge prefix
            console.warn(`Network "${iface.bridge}" not found in Networks configuration for interface ${iface.name}`);
            config["/interface bridge port"].push(
                `add bridge="LANBridge${iface.bridge}" interface="${iface.name}" comment="${iface.bridge}"`,
            );
        }
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
        configs.push(TunnelWrapper(state.LAN.Tunnel, state.LAN.Subnets?.TunnelSubnets));
    }

    if (state.LAN.VPNServer) {
        configs.push(VPNServerWrapper(
            state.LAN.VPNServer, 
            (state.LAN.Subnets?.VPNServerSubnets || {}) as any,
            state.Choose.RouterModels
        ));
    }



    // Add network configurations using the Networks function
    if (state.LAN.Subnets) {
        configs.push(
            Networks(
                state.LAN.Subnets,
                state.WAN.WANLink,
                state.WAN.VPNClient
            )
        );
    }

    // Only add Ethernet bridge ports if LAN.Interface exists
    if (state.LAN.Interface && Array.isArray(state.LAN.Interface)) {
        configs.push(EthernetBridgePorts(state.LAN.Interface, state.Choose.Networks));
    }

    return mergeMultipleConfigs(...configs);
};
