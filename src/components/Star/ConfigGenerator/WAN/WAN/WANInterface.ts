import type { RouterConfig } from "../../ConfigGenerator";
import type {
    ConnectionConfig,
    InterfaceConfig,
    WANLinkConfig,
    WANLink,
} from "../../../StarContext/Utils/WANLinkType";
import { mergeRouterConfigs } from "../../utils/ConfigGeneratorUtil";
import { DHCPClient, PPPOEClient, StaticIP, LTE } from "./WANUtils";
import { WirelessWAN, MACVLANOnVLAN, MACVLAN, VLAN } from "./WANUtils";
import { WANIfaceList } from "./WANUtils";

const requiresAutoMACVLAN = (interfaceName: string): boolean => {
    const isWireless =
        interfaceName.startsWith("wifi") || interfaceName.includes("wlan");
    const isSFP = interfaceName.startsWith("sfp");
    const isEthernet = interfaceName.startsWith("ether");
    return isWireless || isSFP || isEthernet;
};

export const generateConnectionConfig = (
    connectionConfig: ConnectionConfig,
    name: string,
    interfaceName: string,
    Network: string,
): RouterConfig => {
    let config: RouterConfig = {};

    if (connectionConfig.isDHCP) {
        const dhcpConfig = DHCPClient(name, Network, interfaceName);
        config = mergeRouterConfigs(config, dhcpConfig);
    }

    if (connectionConfig.pppoe) {
        const pppoeConfig = PPPOEClient(
            name,
            interfaceName,
            connectionConfig.pppoe,
        );
        config = mergeRouterConfigs(config, pppoeConfig);
    }

    if (connectionConfig.static) {
        const staticConfig = StaticIP(
            name,
            interfaceName,
            connectionConfig.static,
        );
        config = mergeRouterConfigs(config, staticConfig);
    }

    if (connectionConfig.lteSettings) {
        const lteConfig = LTE(connectionConfig.lteSettings);
        config = mergeRouterConfigs(config, lteConfig);
    }

    return config;
};

export const getInterfaceName = (
    interfaceConfig: InterfaceConfig,
    name: string = "WAN",
): string => {
    const { InterfaceName, MacAddress, VLANID } = interfaceConfig;

    // Handle MACVLAN and VLAN combinations
    if (MacAddress && VLANID) {
        // MACVLAN on VLAN: MacVLAN-VLAN{vlanId}-{interfaceName}-{name}-{name}
        const vlanName = `VLAN${VLANID}-${InterfaceName}-${name}`;
        return `MacVLAN-${vlanName}-${name}`;
    } else if (MacAddress) {
        // MACVLAN only: MacVLAN-{interfaceName}-{name}
        return `MacVLAN-${InterfaceName}-${name}`;
    } else if (VLANID) {
        // MACVLAN on VLAN: MacVLAN-VLAN{vlanId}-{interfaceName}-{name}-{name}
        const vlanName = `VLAN${VLANID}-${InterfaceName}-${name}`;
        return `MacVLAN-${vlanName}-${name}`;
    } else if (requiresAutoMACVLAN(InterfaceName)) {
        // Auto MACVLAN for wireless, SFP, or Ethernet: MacVLAN-{interfaceName}-{name}
        return `MacVLAN-${InterfaceName}-${name}`;
    }

    // No transformations, return original interface name
    return InterfaceName;
};

export const generateInterfaceConfig = (
    interfaceConfig: InterfaceConfig,
    name: string = "WAN",
): RouterConfig => {
    let config: RouterConfig = {};

    const { InterfaceName, WirelessCredentials, MacAddress, VLANID } =
        interfaceConfig;
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

export const generateWANLinkConfig = (
    wanLinkConfig: WANLinkConfig,
): RouterConfig => {
    let config: RouterConfig = {};

    const { name, InterfaceConfig, ConnectionConfig } = wanLinkConfig;

    // 1. Generate interface configuration (VLAN, MACVLAN, Wireless, etc.)
    const interfaceConfig = generateInterfaceConfig(InterfaceConfig, name);
    config = mergeRouterConfigs(config, interfaceConfig);

    // 2. Get the final interface name after transformations
    const finalInterfaceName = getInterfaceName(InterfaceConfig, name);

    // 3. Add interface to WAN list
    const wanListConfig = WANIfaceList(finalInterfaceName, name);
    config = mergeRouterConfigs(config, wanListConfig);

    // 4. Generate connection configuration if provided (DHCP, PPPoE, Static, LTE)
    if (ConnectionConfig) {
        const connectionConfig = generateConnectionConfig(
            ConnectionConfig,
            name,
            finalInterfaceName,
            name,
        );
        config = mergeRouterConfigs(config, connectionConfig);
    }

    return config;
};

export const WANLinks = (wanLinks: WANLink[]): RouterConfig => {
    let config: RouterConfig = {};

    // Process each WANLink in the array
    wanLinks.forEach((wanLink) => {
        // Process each WANConfig within the WANLink
        wanLink.WANConfigs.forEach((wanLinkConfig) => {
            const linkConfig = generateWANLinkConfig(wanLinkConfig);
            config = mergeRouterConfigs(config, linkConfig);
        });

        // TODO: Handle MultiLinkConfig if present
        // if (wanLink.MultiLinkConfig) {
        //   // Process multi-link configuration (load balancing, failover, etc.)
        //   // This would require additional implementation in MultiWANUtil.ts
        // }
    });

    return config;
};
