
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type {
    WANLinkConfig,
    WANLink,
    WANLinks,
    LTE,
    RouterModels,
} from "~/components/Star/StarContext";
import type { Band } from "~/components/Star/StarContext";
import { StationMode } from "~/components/Star/ConfigGenerator";
import { detectAvailableBands } from "~/components/Star/ConfigGenerator/LAN/Wireless/WirelessUtil";




export const getInterfaceType = (interfaceName: string): "ethernet" | "wifi" | "sfp" | "lte" | null => {
    const name = interfaceName.toLowerCase();
    
    if (name.startsWith("ether")) return "ethernet";
    if (name.startsWith("wifi") || name.startsWith("wlan")) return "wifi";
    if (name.startsWith("sfp")) return "sfp";  // SFP uses ethernet config path
    if (name.startsWith("lte")) return "lte";
    
    return null;  // Not a physical interface
};

export const getInterfaceConfigPath = (interfaceType: "ethernet" | "wifi" | "sfp" | "lte"): string => {
    // SFP interfaces use ethernet configuration path
    return interfaceType === "sfp" ? "/interface ethernet" : `/interface ${interfaceType}`;
};

export type InterfaceInfo = {
    type: "ethernet" | "wifi" | "sfp" | "lte";
    networkTypes: Set<"Foreign" | "Domestic">;
    links: Array<{ name: string; networkType: "Foreign" | "Domestic" }>;
};

export const collectInterfaceInfo = (
    interfaceMap: Map<string, InterfaceInfo>,
    interfaceName: string,
    linkName: string,
    networkType: "Foreign" | "Domestic"
): void => {
    const interfaceType = getInterfaceType(interfaceName);
    
    if (!interfaceType) return;  // Skip non-physical interfaces

    if (interfaceMap.has(interfaceName)) {
        // Interface already exists, add the link with its network type
        const info = interfaceMap.get(interfaceName)!;
        info.links.push({ name: linkName, networkType });
        info.networkTypes.add(networkType);
    } else {
        // New interface, create entry
        interfaceMap.set(interfaceName, {
            type: interfaceType,
            networkTypes: new Set([networkType]),
            links: [{ name: linkName, networkType }],
        });
    }
};

export const InterfaceComment = (wanLinks: WANLinks): RouterConfig => {
    const config: RouterConfig = {
        "/interface ethernet": [],
        "/interface wifi": [],
        "/interface lte": [],
    };

    // Map to store interface comments: interfaceName -> { type, networkType, linkNames[] }
    const interfaceMap = new Map<string, InterfaceInfo>();

    // Process Foreign WAN links
    if (wanLinks.Foreign?.WANConfigs) {
        wanLinks.Foreign.WANConfigs.forEach((wanConfig) => {
            const interfaceName = wanConfig.InterfaceConfig.InterfaceName;
            // Skip wireless interfaces with credentials - they already get comments in wireless config
            if (wanConfig.InterfaceConfig.WirelessCredentials) {
                return;
            }
            // Skip LTE interfaces - they don't need comments
            if (interfaceName.toLowerCase().startsWith("lte")) {
                return;
            }
            collectInterfaceInfo(interfaceMap, interfaceName, wanConfig.name, "Foreign");
        });
    }

    // Process Domestic WAN links
    if (wanLinks.Domestic?.WANConfigs) {
        wanLinks.Domestic.WANConfigs.forEach((wanConfig) => {
            const interfaceName = wanConfig.InterfaceConfig.InterfaceName;
            // Skip wireless interfaces with credentials - they already get comments in wireless config
            if (wanConfig.InterfaceConfig.WirelessCredentials) {
                return;
            }
            // Skip LTE interfaces - they don't need comments
            if (interfaceName.toLowerCase().startsWith("lte")) {
                return;
            }
            collectInterfaceInfo(interfaceMap, interfaceName, wanConfig.name, "Domestic");
        });
    }

    // Generate comments for each interface
    interfaceMap.forEach((info, interfaceName) => {
        // Format each link with its network type
        const linkInfo = info.links
            .map(link => `${link.name}(${link.networkType})`)
            .join(", ");
        
        const comment = `WAN - ${linkInfo}`;
        
        const configPath = getInterfaceConfigPath(info.type);

        config[configPath].push(
            `set [ find default-name=${interfaceName} ] comment="${comment}"`
        );
    });

    // Remove empty arrays from config
    Object.keys(config).forEach((key) => {
        if (config[key].length === 0) {
            delete config[key];
        }
    });

    return config;
}

// MACVLAN
export const MACVLAN = ( name: string, interfaceName: string, macAddress?: string ): RouterConfig => {
    const config: RouterConfig = {
        "/interface macvlan": [],
    };

    const parts = [
        "add",
        `name="MacVLAN-${interfaceName}-${name}"`,
        `comment="${name} MACVLAN on ${interfaceName}"`,
        `interface=${interfaceName}`,
        "mode=private",
    ];

    if (macAddress) {
        parts.push(`mac-address="${macAddress}"`);
    }

    config["/interface macvlan"].push(parts.join(" "));

    return config;
};

// VLAN
export const VLAN = ( name: string, interfaceName: string, vlanId: number ): RouterConfig => {
    const config: RouterConfig = {
        "/interface vlan": [],
    };
    config["/interface vlan"].push(
        `add name="VLAN${vlanId}-${interfaceName}-${name}" comment="${name} VLAN ${vlanId} on ${interfaceName}" interface=${interfaceName} vlan-id=${vlanId}`,
    );

    return config;
};

// MACVLANOnVLAN
export const MACVLANOnVLAN = ( name: string, interfaceName: string, macAddress: string, vlanId: number ): RouterConfig => {
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
export const WirelessWAN = ( SSID: string, password: string, band: Band, routerModels?: RouterModels[], name?: string ): RouterConfig => {
    // Detect available bands if routerModels provided
    let availableBands = undefined;
    if (routerModels && routerModels.length > 0) {
        availableBands = detectAvailableBands(routerModels);
    }
    
    // Use StationMode function to configure wireless interface for WAN connection
    const stationConfig = StationMode(SSID, password, band, availableBands, name);

    return stationConfig;
};

export const requiresAutoMACVLAN = (interfaceName: string): boolean => {
    const isWireless =
        interfaceName.startsWith("wifi") || interfaceName.includes("wlan");
    const isSFP = interfaceName.startsWith("sfp");
    const isEthernet = interfaceName.startsWith("ether");
    return isWireless || isSFP || isEthernet;
};

export const getUnderlyingInterface = (WANLinkConfig: WANLinkConfig): string => {
    const { InterfaceConfig, name } = WANLinkConfig;
    const { InterfaceName, VLANID, MacAddress } = InterfaceConfig;
    let underlyingInterface: string = InterfaceName;
    
    // Build the underlying interface name using the same logic as interface creation
    if (MacAddress && VLANID) {
        // MACVLAN on VLAN
        const vlanName = `VLAN${VLANID}-${InterfaceName}-${name}`;
        underlyingInterface = `MacVLAN-${vlanName}-${name}`;
    } else if (MacAddress) {
        // MACVLAN only
        underlyingInterface = `MacVLAN-${InterfaceName}-${name}`;
    } else if (VLANID) {
        // VLAN with auto-MACVLAN
        const vlanName = `VLAN${VLANID}-${InterfaceName}-${name}`;
        underlyingInterface = `MacVLAN-${vlanName}-${name}`;
    } else if (requiresAutoMACVLAN(InterfaceName)) {
        // Auto MACVLAN for wireless, SFP, or Ethernet
        underlyingInterface = `MacVLAN-${InterfaceName}-${name}`;
    }

    return underlyingInterface;
};


export const GetWANInterface = (WANLink: WANLinkConfig): string => {
    const { name, InterfaceConfig, ConnectionConfig } = WANLink;
    const { InterfaceName, VLANID, MacAddress } =
        InterfaceConfig;

    let finalInterfaceName: string;

    // Check for PPPoE connection - PPPoE creates its own interface
    if (ConnectionConfig?.pppoe) {
        finalInterfaceName = `pppoe-client-${name}`;
    }
    // Check for LTE interface - LTE uses the interface directly
    else if (ConnectionConfig?.lteSettings || InterfaceName.startsWith("lte")) {
        finalInterfaceName = InterfaceName;
    }
    // Handle MACVLAN and VLAN combinations using the same logic as interface creation
    else if (MacAddress && VLANID) {
        // MACVLAN on VLAN: MacVLAN-VLAN{vlanId}-{interfaceName}-{name}-{name}
        const vlanName = `VLAN${VLANID}-${InterfaceName}-${name}`;
        finalInterfaceName = `MacVLAN-${vlanName}-${name}`;
    } else if (MacAddress) {
        // MACVLAN only: MacVLAN-{interfaceName}-{name}
        finalInterfaceName = `MacVLAN-${InterfaceName}-${name}`;
    } else if (VLANID) {
        // VLAN with auto-MACVLAN: MacVLAN-VLAN{vlanId}-{interfaceName}-{name}-{name}
        const vlanName = `VLAN${VLANID}-${InterfaceName}-${name}`;
        finalInterfaceName = `MacVLAN-${vlanName}-${name}`;
    } else if (requiresAutoMACVLAN(InterfaceName)) {
        // Auto MACVLAN for wireless, SFP, or Ethernet: MacVLAN-{interfaceName}-{name}
        finalInterfaceName = `MacVLAN-${InterfaceName}-${name}`;
    } else {
        // No transformations, return original interface name
        finalInterfaceName = InterfaceName;
    }

    return finalInterfaceName;
};

export const GetWANInterfaceWName = ( WANLinks: WANLinks, Name: string ): string => {
    // Search through Foreign WANConfigs first
    for (const config of WANLinks.Foreign?.WANConfigs || []) {
        if (config.name === Name) {
            return GetWANInterface(config);
        }
    }

    // Search through Domestic WANConfigs if it exists
    if (WANLinks.Domestic) {
        for (const config of WANLinks.Domestic.WANConfigs) {
            if (config.name === Name) {
                return GetWANInterface(config);
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
        const interfaceName = GetWANInterface(config);
        interfaces.push(interfaceName);
    });

    return interfaces;
};

export const CheckLTEInterface = (WANLinks: WANLinks, availableLTEInterfaces: LTE[]): RouterConfig => {
    const config: RouterConfig = {
        "/tool sms": [],
        "/interface lte": [],
    };
    
    // Return empty config if no LTE interfaces available
    if (availableLTEInterfaces.length === 0) {
        return {};
    }
    
    // Collect used LTE interfaces from WANLinks
    const usedLTEInterfaces = new Set<string>();
    
    // Check Foreign WANConfigs
    if (WANLinks.Foreign?.WANConfigs) {
        WANLinks.Foreign.WANConfigs.forEach((wanConfig) => {
            const interfaceName = wanConfig.InterfaceConfig.InterfaceName.toLowerCase();
            if (interfaceName.startsWith("lte")) {
                usedLTEInterfaces.add(wanConfig.InterfaceConfig.InterfaceName);
            }
        });
    }
    
    // Check Domestic WANConfigs
    if (WANLinks.Domestic?.WANConfigs) {
        WANLinks.Domestic.WANConfigs.forEach((wanConfig) => {
            const interfaceName = wanConfig.InterfaceConfig.InterfaceName.toLowerCase();
            if (interfaceName.startsWith("lte")) {
                usedLTEInterfaces.add(wanConfig.InterfaceConfig.InterfaceName);
            }
        });
    }
    
    // Enable SMS for used LTE interfaces
    usedLTEInterfaces.forEach((lteInterface) => {
        config["/tool sms"].push(
            `set port=${lteInterface} receive-enabled=yes`
        );
    });
    
    // Disable unused LTE interfaces from available interfaces
    availableLTEInterfaces.forEach((lteInterface) => {
        if (!usedLTEInterfaces.has(lteInterface)) {
            config["/interface lte"].push(
                `set ${lteInterface} disabled=yes`
            );
        }
    });
    
    // Remove empty arrays
    if (config["/tool sms"].length === 0) {
        delete config["/tool sms"];
    }
    if (config["/interface lte"].length === 0) {
        delete config["/interface lte"];
    }
    
    return config;
}