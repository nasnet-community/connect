import type { RouterConfig } from "../../ConfigGenerator";
import { StationMode } from "../../LAN/Wireless/WirelessUtil";
import type {
    LTESettings,
    PPPoEConfig,
    StaticIPConfig,
    // ConnectionConfig,
    // InterfaceConfig,
    WANLinkConfig,
    WANLink,
    WANLinks,
} from "../../../StarContext/Utils/WANLinkType";
// import { mergeRouterConfigs } from "../../utils/ConfigGeneratorUtil"

export const WANIfaceList = (
    InterfaceName: string,
    Network: string,
): RouterConfig => {
    const config: RouterConfig = {
        "/interface list member": [],
    };
    config["/interface list member"].push(
        `add interface=${InterfaceName} list="WAN"`,
        `add interface=${InterfaceName} list="${Network}-WAN"`,
    );
    return config;
};

// MACVLAN
export const MACVLAN = (
    name: string,
    interfaceName: string,
    macAddress?: string,
): RouterConfig => {
    const config: RouterConfig = {
        "/interface macvlan": [],
    };

    const parts = [
        "add",
        `name="MacVLAN-${interfaceName}-${name}"`,
        `comment="MacVLAN-${interfaceName}-${name}"`,
        `interface=${interfaceName}`,
        "mode=private",
    ];

    if (macAddress) {
        parts.push(`mac-address=${macAddress}`);
    }

    config["/interface macvlan"].push(parts.join(" "));

    return config;
};

// VLAN
export const VLAN = (
    name: string,
    interfaceName: string,
    vlanId: number,
): RouterConfig => {
    const config: RouterConfig = {
        "/interface vlan": [],
    };
    config["/interface vlan"].push(
        `add name="VLAN${vlanId}-${interfaceName}-${name}" comment="VLAN${vlanId}-${interfaceName}-${name}" interface=${interfaceName} vlan-id=${vlanId}`,
    );

    return config;
};

// MACVLANOnVLAN
export const MACVLANOnVLAN = (
    name: string,
    interfaceName: string,
    macAddress: string,
    vlanId: number,
): RouterConfig => {
    // First create VLAN interface
    const vlanConfig = VLAN(name, interfaceName, vlanId);

    // Get the VLAN interface name that was created
    const vlanInterfaceName = `VLAN${vlanId}-${interfaceName}-${name}`;

    // Create MACVLAN on top of the VLAN interface
    const macvlanConfig = MACVLAN(name, vlanInterfaceName, macAddress);

    // Merge the configurations
    const config: RouterConfig = {
        "/interface vlan": [...vlanConfig["/interface vlan"]],
        "/interface macvlan": [...macvlanConfig["/interface macvlan"]],
    };

    return config;
};

// WirelessWAN
export const WirelessWAN = (
    SSID: string,
    password: string,
    band: string,
    name?: string,
): RouterConfig => {
    // Use StationMode function to configure wireless interface for WAN connection
    const stationConfig = StationMode(SSID, password, band, name);

    return stationConfig;
};

// LTE
export const LTE = (LTESettings: LTESettings): RouterConfig => {
    const config: RouterConfig = {
        "/interface lte": [],
        "/interface lte apn": [],
    };
    const { apn } = LTESettings;

    config["/interface lte"].push(
        `set [ find default-name=lte1 ] allow-roaming=yes apn-profiles=${apn} band=""`,
    );
    config["/interface lte apn"].push(
        `add add-default-route=no apn=${apn} name=${apn} use-network-apn=yes use-peer-dns=no`,
    );

    return config;
};

// DHCPClient
export const DHCPClient = (
    name: string,
    Network: string,
    Interface: string,
): RouterConfig => {
    const config: RouterConfig = {
        "/ip dhcp-client": [],
    };

    config["/ip dhcp-client"].push(
        `add add-default-route=no comment="${name} to ${Network}" interface=${Interface} script=":if (\\$bound=1) do={\\r\\
            \\n:local gw (\\$\\"gateway-address\\" . \\"%\\" . \\$interface)\\r\\
            \\n:local routeCount [/ip route print count-only where comment=\\"Route-to-${Network}\\"]\\r\\
            \\n:if (\\$routeCount > 0) do={\\r\\
            \\n    /ip route set [ find comment=\\"Route-to-${Network}\\" gateway!=\\$gw ] gateway=\\$gw\\r\\
            \\n} else={\\r\\
            \\n    /ip route add dst-address=0.0.0.0/0 gateway=\\$gw comment=\\"Route-to-${Network}\\"\\r\\
            \\n}\\r\\
            \\n} else={\\r\\
            \\n/ip route remove [ find comment=\\"Route-to-${Network}\\" ]\\r\\
            \\n}" use-peer-dns=no use-peer-ntp=no`,
    );

    return config;
};

// PPPOEClient
export const PPPOEClient = (
    name: string,
    interfaceName: string,
    pppoeConfig: PPPoEConfig,
    // username: string,
    // password: string,
): RouterConfig => {
    const config: RouterConfig = {
        "/interface pppoe-client": [],
    };
    const { username, password } = pppoeConfig;

    config["/interface pppoe-client"].push(
        `add name="pppoe-client-${name}" comment="PPPoE client for ${name}" interface=${interfaceName} user=${username} \\
        password=${password} dial-on-demand=yes add-default-route=no allow=chap,pap,mschap1,mschap2 disabled=no`,
    );

    return config;
};

export function calculateCIDR(subnet: string): number {
    const subnetParts = subnet.split(".").map(Number);
    let cidr = 0;

    for (let i = 0; i < 4; i++) {
        const octet = subnetParts[i];
        if (octet === 255) {
            cidr += 8;
        } else if (octet === 0) {
            break;
        } else {
            // Convert octet to binary and count consecutive 1s from left
            let temp = octet;
            while (temp & 0x80) {
                // Check if leftmost bit is 1
                cidr++;
                temp <<= 1;
            }
            break;
        }
    }

    return cidr;
}

// StaticIP
export const StaticIP = (
    name: string,
    interfaceName: string,
    staticIPConfig: StaticIPConfig,
    // gateway?: string,
): RouterConfig => {
    const config: RouterConfig = {
        "/ip address": [],
    };

    const { ipAddress, subnet } = staticIPConfig;

    const cidr = calculateCIDR(subnet);

    config["/ip address"].push(
        `add address=${ipAddress}/${cidr} interface=${interfaceName} comment="${name}"`,
    );

    return config;
};

export const Gateway = (
    gateway: string,
    interfaceName: string,
    network: string = "0.0.0.0/0",
    distance: number = 1,
): RouterConfig => {
    const config: RouterConfig = {
        "/ip route": [],
    };

    // Use RouterOS notation: gateway%interface when both are available
    const gatewayValue = interfaceName
        ? `${gateway}%${interfaceName}`
        : gateway;
    let routeCommand = `add dst-address=${network} gateway=${gatewayValue}`;

    // Add distance if not default
    if (distance !== 1) {
        routeCommand += ` distance=${distance}`;
    }

    // Add comment with standard format
    routeCommand += ` comment="Route-to-${network}"`;

    config["/ip route"].push(routeCommand);

    return config;
};

export const GetWANInterface = (WANLink: WANLinkConfig): string[] => {
    const { name, InterfaceConfig, ConnectionConfig } = WANLink;
    const { InterfaceName, VLANID, MacAddress, WirelessCredentials } =
        InterfaceConfig;

    let finalInterfaceName: string;

    // Check for PPPoE connection
    if (ConnectionConfig?.pppoe) {
        // PPPoE creates its own interface
        finalInterfaceName = `pppoe-client-${name}`;
    }
    // Check for LTE interface
    else if (ConnectionConfig?.lteSettings || InterfaceName.startsWith("lte")) {
        // LTE interface uses the LTE interface directly
        finalInterfaceName = InterfaceName;
    }
    // Handle VLAN and MACVLAN configurations
    else if (VLANID && MacAddress) {
        // MACVLAN on VLAN: Create VLAN first, then MACVLAN on top
        finalInterfaceName = `${name}-VLAN${VLANID}-MACVLAN`;
    } else if (VLANID) {
        // VLAN only
        finalInterfaceName = `${name}-VLAN${VLANID}`;
    } else if (MacAddress) {
        // MACVLAN only
        finalInterfaceName = `${name}-MACVLAN`;
    } else if (WirelessCredentials) {
        // Wireless interface in station mode
        finalInterfaceName = `${InterfaceName}-station`;
    } else {
        // Physical interface
        finalInterfaceName = InterfaceName;
    }

    return [finalInterfaceName];
};

export const GetWANInterfaceWName = (
    WANLinks: WANLinks,
    Name: string,
): string => {
    // Search through Foreign WANConfigs first
    for (const config of WANLinks.Foreign.WANConfigs) {
        if (config.name === Name) {
            const interfaceNames = GetWANInterface(config);
            return interfaceNames[0]; // Return the first interface name
        }
    }

    // Search through Domestic WANConfigs if it exists
    if (WANLinks.Domestic) {
        for (const config of WANLinks.Domestic.WANConfigs) {
            if (config.name === Name) {
                const interfaceNames = GetWANInterface(config);
                return interfaceNames[0]; // Return the first interface name
            }
        }
    }

    // Return the name itself if not found (fallback)
    return Name;
};

export const GetWANInterfaces = (WANLinks: WANLink): string[] => {
    // Handle empty WANConfigs
    if (WANLinks.WANConfigs.length === 0) {
        return [];
    }

    const interfaces: string[] = [];

    WANLinks.WANConfigs.forEach((config) => {
        const interfaceNames = GetWANInterface(config);
        interfaces.push(...interfaceNames);
    });

    return interfaces;
};
