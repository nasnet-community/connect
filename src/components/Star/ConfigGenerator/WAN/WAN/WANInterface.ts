import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type {
    WANLinkConfig,
    WANLinks,
    WANLink,
} from "~/components/Star/StarContext";
import { mergeRouterConfigs, mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";
import { DHCPClient, PPPOEClient, StaticIP, LTE } from "~/components/Star/ConfigGenerator";
import { WirelessWAN, MACVLANOnVLAN, MACVLAN, VLAN } from "~/components/Star/ConfigGenerator";
import { GetWANInterface, requiresAutoMACVLAN, getUnderlyingInterface, InterfaceComment } from "~/components/Star/ConfigGenerator";
import { WANIfaceList, Route } from "~/components/Star/ConfigGenerator";
import {
    convertWANLinkToMultiWAN,
    FailoverRecursive,
    LoadBalanceRoute,
    PCCMangle,
    NTHMangle,
} from "~/components/Star/ConfigGenerator";

type Network = "Foreign" | "Domestic";




export const generateConnectionConfig = ( WANLinkConfig: WANLinkConfig, Network: Network ): RouterConfig => {
    let config: RouterConfig = {};
    const { ConnectionConfig, name } = WANLinkConfig;

    if (!ConnectionConfig) {
        return config;
    }

    // Get the final interface name (e.g., pppoe-client-WAN-1 for PPPoE, MacVLAN-ether1-WAN-1 for others)
    const finalInterfaceName = GetWANInterface(WANLinkConfig);

    // Get the underlying interface name (for PPPoE creation)
    const underlyingInterface = getUnderlyingInterface(WANLinkConfig);

    if (ConnectionConfig.isDHCP) {
        const dhcpConfig = DHCPClient(name, Network, finalInterfaceName);
        config = mergeRouterConfigs(config, dhcpConfig);
    }

    if (ConnectionConfig.pppoe) {
        // PPPoE needs the underlying interface, not the pppoe-client- name
        const pppoeConfig = PPPOEClient(
            name,
            underlyingInterface,
            ConnectionConfig.pppoe,
        );
        config = mergeRouterConfigs(config, pppoeConfig);
    }

    if (ConnectionConfig.static) {
        const staticConfig = StaticIP(
            name,
            finalInterfaceName,
            ConnectionConfig.static,
        );
        config = mergeRouterConfigs(config, staticConfig);
    }

    if (ConnectionConfig.lteSettings) {
        const lteConfig = LTE(ConnectionConfig.lteSettings);
        config = mergeRouterConfigs(config, lteConfig);
    }

    return config;
};

export const generateInterfaceConfig = ( WANLinkConfig: WANLinkConfig ): RouterConfig => {
    let config: RouterConfig = {};
    const { InterfaceConfig, name } = WANLinkConfig;

    const { InterfaceName, WirelessCredentials, MacAddress, VLANID } =
        InterfaceConfig;
    const currentInterfaceName = InterfaceName;

    // Handle wireless interface configuration
    if (
        WirelessCredentials &&
        (InterfaceName.startsWith("wifi") || InterfaceName.includes("wlan"))
    ) {
        const { SSID, Password } = WirelessCredentials;
        // Determine band from interface name
        const band = InterfaceName.includes("2.4") ? "2.4" : "5";
        const wirelessConfig = WirelessWAN(SSID, Password, band, name);
        config = mergeRouterConfigs(config, wirelessConfig);
    }

    // Handle MACVLAN and VLAN combinations
    if (MacAddress && VLANID) {
        // Create MACVLAN on VLAN
        const macvlanOnVlanConfig = MACVLANOnVLAN(
            name,
            currentInterfaceName,
            MacAddress,
            parseInt(VLANID),
        );
        config = mergeRouterConfigs(config, macvlanOnVlanConfig);
    } else if (MacAddress) {
        // Create MACVLAN only
        const macvlanConfig = MACVLAN(name, currentInterfaceName, MacAddress);
        config = mergeRouterConfigs(config, macvlanConfig);
    } else if (VLANID) {
        // Create VLAN first, then MACVLAN on top of VLAN
        const vlanConfig = VLAN(name, currentInterfaceName, parseInt(VLANID));
        config = mergeRouterConfigs(config, vlanConfig);

        // Create MACVLAN on top of the VLAN interface
        const vlanInterfaceName = `VLAN${VLANID}-${currentInterfaceName}-${name}`;
        const macvlanConfig = MACVLAN(name, vlanInterfaceName);
        config = mergeRouterConfigs(config, macvlanConfig);
    } else if (requiresAutoMACVLAN(InterfaceName)) {
        // Auto-create MACVLAN for wireless, SFP, or Ethernet interfaces
        const autoMacvlanConfig = MACVLAN(name, currentInterfaceName);
        config = mergeRouterConfigs(config, autoMacvlanConfig);
    }

    return config;
};

export const generateWANLinkConfig = ( wanLinkConfig: WANLinkConfig, Network: Network ): RouterConfig => {
    let config: RouterConfig = {};

    // 1. Generate interface configuration (VLAN, MACVLAN, Wireless, etc.)
    const interfaceConfig = generateInterfaceConfig(wanLinkConfig );
    config = mergeRouterConfigs(config, interfaceConfig);

    // 2. Get the final interface name after transformations
    const finalInterfaceName = GetWANInterface(wanLinkConfig);

    // 3. Add interface to WAN list
    const wanListConfig = WANIfaceList(finalInterfaceName, Network);
    config = mergeRouterConfigs(config, wanListConfig);

    // 4. Generate connection configuration if provided (DHCP, PPPoE, Static, LTE)
    const connectionConfig = generateConnectionConfig(
        wanLinkConfig,
        Network,
    );
    config = mergeRouterConfigs(config, connectionConfig);

    // 5. Generate routing configuration
    const routeConfig = Route(wanLinkConfig, Network, 1);
    config = mergeRouterConfigs(config, routeConfig);

    return config;
};

export const DFSingleLink = ( wanLink: WANLink, networkType: "Foreign" | "Domestic" ): RouterConfig => {
    // Check if there's exactly one WAN link configured
    if (wanLink.WANConfigs.length !== 1) {
        return {};
    }

    const wanLinkConfig = wanLink.WANConfigs[0];
    const linkName = wanLinkConfig.name;
    const { ConnectionConfig } = wanLinkConfig;
    
    // Get the final interface name after transformations
    const finalInterfaceName = GetWANInterface(wanLinkConfig);
    
    // Determine the gateway based on connection type
    let gateway: string;
    
    if (ConnectionConfig?.pppoe) {
        // PPPoE: Use interface name only as gateway
        gateway = finalInterfaceName;
    } else if (ConnectionConfig?.lteSettings || wanLinkConfig.InterfaceConfig.InterfaceName.startsWith("lte")) {
        // LTE: Use interface name only as gateway
        gateway = finalInterfaceName;
    } else if (ConnectionConfig?.static) {
        // Static: Use gateway from static config + interface
        gateway = `${ConnectionConfig.static.gateway}%${finalInterfaceName}`;
    } else {
        // DHCP (default): Use default IPs based on network type
        const defaultGateway = networkType === "Foreign" ? "100.64.0.1" : "192.168.2.1";
        gateway = `${defaultGateway}%${finalInterfaceName}`;
    }

    // Use full network name for routing table to match Networks.ts
    const routingTable = `to-${networkType}`;
    
    const config: RouterConfig = {
        "/ip route": [
            `add dst-address="0.0.0.0/0" gateway="${gateway}" routing-table="${routingTable}" comment="Route-to-${networkType}-${linkName}"`,
        ],
    };

    return config;
};

export const DFMultiLink = ( wanLink: WANLink, networkType: "Foreign" | "Domestic" ): RouterConfig => {
    const configs: RouterConfig[] = [];
    
    // Check if there are multiple WAN links configured
    if (wanLink.WANConfigs.length === 0) {
        return {};
    }

    // If only one WAN link, no multi-link configuration needed
    if (wanLink.WANConfigs.length === 1) {
        return {};
    }

    // Convert WANLinkConfigs to MultiWANInterface format
    const interfaces = convertWANLinkToMultiWAN(
        wanLink.WANConfigs,
        networkType === "Domestic",
        networkType
    );

    if (interfaces.length === 0) {
        return {};
    }

    // Use full network name for routing table to match Networks.ts
    const routingTable = `to-${networkType}`;
    
    // Get actual WAN interface names for mangle rules
    const wanInterfaceNames = wanLink.WANConfigs.map(config => GetWANInterface(config));
    const linkCount = wanInterfaceNames.length;
    
    // Address list and routing mark for mangle rules
    const addressList = `${networkType}-LAN`;
    const routingMark = routingTable;

    // Check if MultiLinkConfig is defined
    const multiLinkConfig = wanLink.MultiLinkConfig;

    if (!multiLinkConfig) {
        // Default behavior: use failover with recursive gateway checking
        return FailoverRecursive(interfaces, routingTable);
    }

    // Handle different strategies based on configuration
    switch (multiLinkConfig.strategy) {
        case "LoadBalance": {
            const loadBalanceMethod = multiLinkConfig.loadBalanceMethod || "PCC";
            // Only PCC and NTH are supported for LoadBalanceRoute
            if (loadBalanceMethod === "PCC") {
                // Generate PCC mangle rules
                configs.push(PCCMangle(linkCount, wanInterfaceNames, addressList, routingMark));
                // Generate PCC routing rules
                configs.push(LoadBalanceRoute(interfaces, "PCC", routingTable));
            } else if (loadBalanceMethod === "NTH") {
                // Generate NTH mangle rules
                configs.push(NTHMangle(linkCount, wanInterfaceNames, addressList, routingMark));
                // Generate NTH routing rules
                configs.push(LoadBalanceRoute(interfaces, "NTH", routingTable));
            } else if (loadBalanceMethod === "ECMP") {
                // ECMP would be handled differently - for now fallback to PCC
                configs.push(PCCMangle(linkCount, wanInterfaceNames, addressList, routingMark));
                configs.push(LoadBalanceRoute(interfaces, "PCC", routingTable));
            }
            break;
        }

        case "Failover":
            // Use recursive failover with correct routing table
            configs.push(FailoverRecursive(interfaces, routingTable));
            break;

        case "RoundRobin":
            // Round-robin using NTH method
            configs.push(NTHMangle(linkCount, wanInterfaceNames, addressList, routingMark));
            configs.push(LoadBalanceRoute(interfaces, "NTH", routingTable));
            break;

        case "Both": {
            // Combine load balancing with failover
            const loadBalanceMethod = multiLinkConfig.loadBalanceMethod || "PCC";
            // Only PCC and NTH are supported for LoadBalanceRoute
            if (loadBalanceMethod === "PCC") {
                configs.push(PCCMangle(linkCount, wanInterfaceNames, addressList, routingMark));
                configs.push(LoadBalanceRoute(interfaces, "PCC", routingTable));
            } else if (loadBalanceMethod === "NTH") {
                configs.push(NTHMangle(linkCount, wanInterfaceNames, addressList, routingMark));
                configs.push(LoadBalanceRoute(interfaces, "NTH", routingTable));
            } else if (loadBalanceMethod === "ECMP") {
                // ECMP would be handled differently - for now fallback to PCC
                configs.push(PCCMangle(linkCount, wanInterfaceNames, addressList, routingMark));
                configs.push(LoadBalanceRoute(interfaces, "PCC", routingTable));
            }
            configs.push(FailoverRecursive(interfaces, routingTable));
            break;
        }

        default:
            configs.push(FailoverRecursive(interfaces, routingTable));
    }

    return mergeMultipleConfigs(...configs);
}

export const generateWANLinksConfig = (wanLinks: WANLinks): RouterConfig => {
    let config: RouterConfig = {};
    const { Foreign, Domestic } = wanLinks;

    // Generate interface configurations for Foreign WAN links
    if (Foreign) {
        Foreign.WANConfigs.forEach((wanLinkConfig) => {
            const linkConfig = generateWANLinkConfig(wanLinkConfig, "Foreign");
            config = mergeRouterConfigs(config, linkConfig);
        });

        // Add Foreign routing configuration (single or multi-link)
        if (Foreign.WANConfigs.length === 1) {
            const foreignRoutingConfig = DFSingleLink(Foreign, "Foreign");
            config = mergeRouterConfigs(config, foreignRoutingConfig);
        } else if (Foreign.WANConfigs.length > 1) {
            const foreignRoutingConfig = DFMultiLink(Foreign, "Foreign");
            config = mergeRouterConfigs(config, foreignRoutingConfig);
        }
    }

    // Generate interface configurations for Domestic WAN links
    if (Domestic) {
        Domestic.WANConfigs.forEach((wanLinkConfig) => {
            const linkConfig = generateWANLinkConfig(wanLinkConfig, "Domestic");
            config = mergeRouterConfigs(config, linkConfig);
        });

        // Add Domestic routing configuration (single or multi-link)
        if (Domestic.WANConfigs.length === 1) {
            const domesticRoutingConfig = DFSingleLink(Domestic, "Domestic");
            config = mergeRouterConfigs(config, domesticRoutingConfig);
        } else if (Domestic.WANConfigs.length > 1) {
            const domesticRoutingConfig = DFMultiLink(Domestic, "Domestic");
            config = mergeRouterConfigs(config, domesticRoutingConfig);
        }
    }

    // Add interface comments for all physical WAN interfaces
    const interfaceCommentConfig = InterfaceComment(wanLinks);
    config = mergeRouterConfigs(config, interfaceCommentConfig);

    return config;
};