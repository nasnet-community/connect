import type {
    WirelessConfig,
    WifiTarget, 
    Band,
    RouterModels,
    WANLinks,
} from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import { CommandShortner } from "~/components/Star/ConfigGenerator";

export interface AvailableBands {
    has2_4: boolean;
    has5: boolean;
    has5_2: boolean; // For dual 5GHz routers
    bands5GHz: string[]; // List of 5GHz interface names like ["wifi5", "wifi5-2"]
}

export const detectAvailableBands = (routerModels: RouterModels[]): AvailableBands => {
    const bands: AvailableBands = {
        has2_4: false,
        has5: false,
        has5_2: false,
        bands5GHz: []
    };
    
    routerModels.forEach(model => {
        const wireless = model.Interfaces.Interfaces.wireless;
        if (!wireless) return;
        
        wireless.forEach(iface => {
            if (iface === "wifi2.4") {
                bands.has2_4 = true;
            } else if (iface === "wifi5") {
                bands.has5 = true;
                if (!bands.bands5GHz.includes("wifi5")) {
                    bands.bands5GHz.push("wifi5");
                }
            } else if (iface === "wifi5-2") {
                bands.has5_2 = true;
                if (!bands.bands5GHz.includes("wifi5-2")) {
                    bands.bands5GHz.push("wifi5-2");
                }
            }
        });
    });
    
    return bands;
};

export const DefaultBandToInterfaceName = (band: Band, availableBands: AvailableBands): string => {
    const totalBands = (availableBands.has2_4 ? 1 : 0) + availableBands.bands5GHz.length;
    
    // Single-band routers always use wifi1
    if (totalBands === 1) {
        return "wifi1";
    }
    
    // Multi-band routers use standard mapping
    return band === "2.4" ? "wifi2" : "wifi1";
};

export const hasWirelessInterfaces = ( routerModels: RouterModels[] ): boolean => {
    return routerModels.some(
        (model: RouterModels) =>
            model.Interfaces.Interfaces.wireless &&
            model.Interfaces.Interfaces.wireless.length > 0,
    );
};

export const CheckWireless = (wirelessConfigs: WirelessConfig[]): boolean => {
    if (wirelessConfigs.length === 0) {
        return false;
    }

    // Check if at least one wireless config is enabled
    return wirelessConfigs.some(config => !config.isDisabled);
};

export const DisableInterfaces = (routerModels: RouterModels[]): RouterConfig => {
    const config: RouterConfig = {
        "/interface wifi": [],
    };
    
    const availableBands = detectAvailableBands(routerModels);
    const totalBands = (availableBands.has2_4 ? 1 : 0) + availableBands.bands5GHz.length;
    
    // Only disable interfaces that exist on the router
    if (availableBands.has2_4) {
        const defaultName = totalBands === 1 ? "wifi1" : "wifi2";
        config["/interface wifi"].push(`set [ find default-name=${defaultName} ] disabled=yes`);
    }
    if (availableBands.has5) {
        config["/interface wifi"].push(`set [ find default-name=wifi1 ] disabled=yes`);
    }
    if (availableBands.has5_2) {
        config["/interface wifi"].push(`set [ find default-name=wifi3 ] disabled=yes`);
    }

    return config;
};

export const CheckWANMaster = ( WANLinks: WANLinks ): { wifi2_4: boolean, wifi5: boolean } => {
    // Check all WAN interfaces to see if any use wireless
    const interfaces: string[] = [];
    
    // Collect Domestic WAN interfaces
    if (WANLinks.Domestic) {
        WANLinks.Domestic.WANConfigs.forEach(config => {
            interfaces.push(config.InterfaceConfig.InterfaceName);
        });
    }
    
    // Collect Foreign WAN interfaces
    if (WANLinks.Foreign) {
        WANLinks.Foreign.WANConfigs.forEach(config => {
            interfaces.push(config.InterfaceConfig.InterfaceName);
        });
    }
    
    // Check both bands (don't return early)
    const hasWifi24 = interfaces.some(iface => iface.includes("wifi2.4"));
    const hasWifi5 = interfaces.some(iface => iface.includes("wifi5") || iface.includes("wifi1"));
    
    return {
        wifi2_4: hasWifi24,
        wifi5: hasWifi5,
    };
}

export const CheckTrunkMaster = ( routerModels: RouterModels[] ): { wifi2_4: boolean, wifi5: boolean } => {
    // Find the master router
    const masterRouter = routerModels.find(router => router.isMaster === true);
    
    // If no master router or no MasterSlaveInterface defined, return false for both
    if (!masterRouter || !masterRouter.MasterSlaveInterface) {
        return { wifi2_4: false, wifi5: false };
    }
    
    // Check if the MasterSlaveInterface is a wireless type
    const interfaceStr = String(masterRouter.MasterSlaveInterface);
    
    // Check for both bands
    const isWifi24 = interfaceStr.includes("wifi2.4") || interfaceStr === "wifi2";
    const isWifi5 = interfaceStr.includes("wifi5") || interfaceStr === "wifi1" || interfaceStr.includes("wifi5-2");
    
    return {
        wifi2_4: isWifi24,
        wifi5: isWifi5,
    };
}

export function CheckMasters(WANLink: WANLinks, _routerModels: RouterModels[]) {
    const wanMaster = CheckWANMaster(WANLink);
    
    // Only check WAN usage, not Trunk
    const isWifi2_4: boolean = wanMaster.wifi2_4;
    const isWifi5: boolean = wanMaster.wifi5;
    
    return {
        isWifi2_4,
        isWifi5,
    };
}

export function Hide(command: string, Hide: boolean) {
    // make the bool yes or no
    const hide = Hide ? "yes" : "no";
    command = `${command} configuration.hide-ssid=${hide}`;
    return command;
}

export function SSIDListGenerator(SSID: string, SplitBand: boolean) {
    const SSIDList = {
        "2.4": "",
        "5": "",
    };
    if (SplitBand) {
        SSIDList["2.4"] = `${SSID} 2.4`;
        SSIDList["5"] = `${SSID} 5`;
    } else {
        SSIDList["2.4"] = `${SSID}`;
        SSIDList["5"] = `${SSID}`;
    }
    return SSIDList;
}

export function Passphrase(passphrase: string, command: string) {
    return `${command} security.authentication-types=wpa2-psk,wpa3-psk .passphrase="${passphrase}" disabled=no`;
}

export function StationMode( SSID: string, Password: string, Band: Band, availableBands?: AvailableBands, name?: string ): RouterConfig {
    const config: RouterConfig = {
        "/interface wifi": [],
    };

    // For WAN wireless, we may not have availableBands, so use a fallback
    // In this case, assume standard multi-band mapping (wifi2 for 2.4GHz, wifi1 for 5GHz)
    let DInterfaceName: string;
    if (availableBands) {
        DInterfaceName = DefaultBandToInterfaceName(Band, availableBands);
    } else {
        // Fallback: assume multi-band router (standard MikroTik naming)
        DInterfaceName = Band === "2.4" ? "wifi2" : "wifi1";
    }
    
    const command = `set [ find default-name=${DInterfaceName} ] comment="${name} ${Band}WAN" configuration.mode=station-pseudobridge .ssid="${SSID}" \\
    security.passphrase="${Password}" configuration.station-roaming=yes configuration.multicast-enhance=enabled \\
    security.ft=yes security.ft-over-ds=yes steering.rrm=yes steering.wnm=yes disabled=no`;
    config["/interface wifi"].push(command);
    return config;
}

export function Slave( Network: WifiTarget, Band: Band, WirelessConfig: WirelessConfig, availableBands: AvailableBands, bandSuffix?: string ): RouterConfig {
    const config: RouterConfig = {
        "/interface wifi": [],
    };

    const { SSID, Password, isHide, SplitBand, NetworkName } = WirelessConfig;
    const SSIDList = SSIDListGenerator(SSID, SplitBand);
    
    // Determine master interface based on band and suffix
    const totalBands = (availableBands.has2_4 ? 1 : 0) + availableBands.bands5GHz.length;
    let Master: string;
    if (Band === "2.4") {
        Master = totalBands === 1 ? "wifi1" : "wifi2";
    } else {
        Master = bandSuffix === "5-2" ? "wifi3" : "wifi1";
    }
    const MMaster = `[ find default-name=${Master} ]`;
    
    // Map WifiTarget to base network names
    const networkMap: Record<WifiTarget, string> = {
        Domestic: "Domestic",
        Foreign: "Foreign",
        VPN: "VPN",
        Split: "Split",
        SingleDomestic: "Domestic",
        SingleForeign: "Foreign",
        SingleVPN: "VPN",
    };
    
    const baseNetwork = networkMap[Network];
    // NetworkName should only be used if it's a custom name different from the base network
    const hasCustomNetworkName = NetworkName && NetworkName !== baseNetwork;
    const interfaceSuffix = hasCustomNetworkName 
        ? `${baseNetwork}-${NetworkName}LAN`
        : `${baseNetwork}LAN`;
    
    // Determine interface name based on band and suffix
    const bandName = bandSuffix || Band;
    
    let command = `add configuration.mode=ap .ssid="${SSIDList[Band]}" .installation=indoor master-interface=${MMaster} name="wifi${bandName}-${interfaceSuffix}" comment="${interfaceSuffix}"`;
    command = Hide(command, isHide);
    command = Passphrase(Password, command);
    command = `${command} security.ft=yes .ft-over-ds=yes`;

    config["/interface wifi"].push(command);

    return CommandShortner(config);
}

export function Master( Network: WifiTarget, Band: Band, WirelessConfig: WirelessConfig, availableBands: AvailableBands, bandSuffix?: string ): RouterConfig {
    const { SSID, Password, isHide, SplitBand, NetworkName } = WirelessConfig;
    const SSIDList = SSIDListGenerator(SSID, SplitBand);
    
    // Determine default interface name based on band and suffix
    const totalBands = (availableBands.has2_4 ? 1 : 0) + availableBands.bands5GHz.length;
    let DefaultName: string;
    if (Band === "2.4") {
        DefaultName = totalBands === 1 ? "wifi1" : "wifi2";
    } else {
        DefaultName = bandSuffix === "5-2" ? "wifi3" : "wifi1";
    }
    
    // Map WifiTarget to base network names
    const networkMap: Record<WifiTarget, string> = {
        Domestic: "Domestic",
        Foreign: "Foreign",
        VPN: "VPN",
        Split: "Split",
        SingleDomestic: "Domestic",
        SingleForeign: "Foreign",
        SingleVPN: "VPN",
    };
    
    const baseNetwork = networkMap[Network];
    // NetworkName should only be used if it's a custom name different from the base network
    const hasCustomNetworkName = NetworkName && NetworkName !== baseNetwork;
    const interfaceSuffix = hasCustomNetworkName 
        ? `${baseNetwork}-${NetworkName}LAN`
        : `${baseNetwork}LAN`;
    
    // Determine interface name based on band and suffix
    const bandName = bandSuffix || Band;
    
    let command = `set [ find default-name=${DefaultName} ] configuration.country=Japan .mode=ap .ssid="${SSIDList[Band]}" .installation=indoor name="wifi${bandName}-${interfaceSuffix}" comment="${interfaceSuffix}"`;
    command = Hide(command, isHide);
    command = Passphrase(Password, command);
    command = `${command} security.ft=yes .ft-over-ds=yes`;

    const config: RouterConfig = {
        "/interface wifi": [command],
    };
    return CommandShortner(config);
}

export function WirelessBridge( WirelessConfig: WirelessConfig[], availableBands: AvailableBands ): RouterConfig {
    const config: RouterConfig = {
        "/interface bridge port": [],
    };

    // Map WifiTarget to network names
    const networkMap: Record<WifiTarget, string> = {
        Domestic: "Domestic",
        Foreign: "Foreign",
        VPN: "VPN",
        Split: "Split",
        SingleDomestic: "Domestic",
        SingleForeign: "Foreign",
        SingleVPN: "VPN",
    };

    WirelessConfig.forEach((wireless) => {
        // Skip disabled wireless configs
        if (wireless.isDisabled) return;

        const baseNetwork = networkMap[wireless.WifiTarget];
        
        // Determine the bridge name and interface suffix
        // NetworkName should only be used if it's a custom name different from the base network
        // If NetworkName is empty or equals the base network name, treat it as a base network
        const hasCustomNetworkName = wireless.NetworkName && wireless.NetworkName !== baseNetwork;
        
        let bridgeName: string;
        let interfaceSuffix: string;
        
        if (hasCustomNetworkName) {
            // For named networks with custom names, use: LANBridge{NetworkType}-{NetworkName}
            bridgeName = `LANBridge${baseNetwork}-${wireless.NetworkName}`;
            interfaceSuffix = `${baseNetwork}-${wireless.NetworkName}LAN`;
        } else {
            // For base networks (no custom name), use: LANBridge{NetworkType}
            bridgeName = `LANBridge${baseNetwork}`;
            interfaceSuffix = `${baseNetwork}LAN`;
        }

        // Add 2.4GHz interface if available
        if (availableBands.has2_4) {
            config["/interface bridge port"].push(
                `add bridge="${bridgeName}" interface="wifi2.4-${interfaceSuffix}" comment="${interfaceSuffix}"`
            );
        }
        
        // Add all 5GHz interfaces if available
        availableBands.bands5GHz.forEach(band => {
            const interfaceName = band === "wifi5" ? "wifi5" : "wifi5-2";
            config["/interface bridge port"].push(
                `add bridge="${bridgeName}" interface="${interfaceName}-${interfaceSuffix}" comment="${interfaceSuffix}"`
            );
        });
    });

    return config;
}

export function WirelessInterfaceList( WirelessConfig: WirelessConfig[], availableBands: AvailableBands ): RouterConfig {
    const config: RouterConfig = {
        "/interface list member": [],
    };

    // Map WifiTarget to network names
    const networkMap: Record<WifiTarget, string> = {
        Domestic: "Domestic",
        Foreign: "Foreign",
        VPN: "VPN",
        Split: "Split",
        SingleDomestic: "Domestic",
        SingleForeign: "Foreign",
        SingleVPN: "VPN",
    };

    WirelessConfig.forEach((wireless) => {
        // Skip disabled wireless configs
        if (wireless.isDisabled) return;

        const baseNetwork = networkMap[wireless.WifiTarget];
        
        // Determine the list name and interface suffix
        // NetworkName should only be used if it's a custom name different from the base network
        // If NetworkName is empty or equals the base network name, treat it as a base network
        const hasCustomNetworkName = wireless.NetworkName && wireless.NetworkName !== baseNetwork;
        
        let listName: string;
        let interfaceSuffix: string;
        
        if (hasCustomNetworkName) {
            // For named networks with custom names, use: {NetworkType}-{NetworkName}-LAN
            listName = `${baseNetwork}-${wireless.NetworkName}-LAN`;
            interfaceSuffix = `${baseNetwork}-${wireless.NetworkName}LAN`;
        } else {
            // For base networks (no custom name), use: {NetworkType}-LAN
            listName = `${baseNetwork}-LAN`;
            interfaceSuffix = `${baseNetwork}LAN`;
        }

        // Add 2.4GHz interface if available
        if (availableBands.has2_4) {
            config["/interface list member"].push(
                `add interface="wifi2.4-${interfaceSuffix}" list="${listName}" comment="${interfaceSuffix}"`
            );
            // Also add to the general LAN list
            config["/interface list member"].push(
                `add interface="wifi2.4-${interfaceSuffix}" list="LAN" comment="${interfaceSuffix}"`
            );
        }
        
        // Add all 5GHz interfaces if available
        availableBands.bands5GHz.forEach(band => {
            const interfaceName = band === "wifi5" ? "wifi5" : "wifi5-2";
            config["/interface list member"].push(
                `add interface="${interfaceName}-${interfaceSuffix}" list="${listName}" comment="${interfaceSuffix}"`
            );
            // Also add to the general LAN list
            config["/interface list member"].push(
                `add interface="${interfaceName}-${interfaceSuffix}" list="LAN" comment="${interfaceSuffix}"`
            );
        });
    });

    return config;
}

export function WirelessSteering(wirelessConfig: WirelessConfig, availableBands: AvailableBands): RouterConfig {
    // Map WifiTarget to base network names
    const networkMap: Record<WifiTarget, string> = {
        Domestic: "Domestic",
        Foreign: "Foreign",
        VPN: "VPN",
        Split: "Split",
        SingleDomestic: "Domestic",
        SingleForeign: "Foreign",
        SingleVPN: "VPN",
    };
    
    const baseNetwork = networkMap[wirelessConfig.WifiTarget];
    // NetworkName should only be used if it's a custom name different from the base network
    const hasCustomNetworkName = wirelessConfig.NetworkName && wirelessConfig.NetworkName !== baseNetwork;
    
    const steeringName = hasCustomNetworkName 
        ? `${baseNetwork}-${wirelessConfig.NetworkName}`
        : baseNetwork;
    
    const interfaceSuffix = hasCustomNetworkName 
        ? `${baseNetwork}-${wirelessConfig.NetworkName}LAN`
        : `${baseNetwork}LAN`;
    
    // Build neighbor group with only available bands
    const neighborInterfaces: string[] = [];
    if (availableBands.has2_4) {
        neighborInterfaces.push(`wifi2.4-${interfaceSuffix}`);
    }
    availableBands.bands5GHz.forEach(band => {
        const interfaceName = band === "wifi5" ? "wifi5" : "wifi5-2";
        neighborInterfaces.push(`${interfaceName}-${interfaceSuffix}`);
    });
    
    const neighborGroup = neighborInterfaces.join(',');
    
    const config: RouterConfig = {
        "/interface wifi": [
            `steering add comment="${steeringName}" disabled=no name="${steeringName}" neighbor-group="${neighborGroup}" rrm=yes wnm=yes`
        ]
    };
    
    return config;
}

export function WirelessSteeringAssignment(wirelessConfigs: WirelessConfig[], availableBands: AvailableBands): RouterConfig {
    const config: RouterConfig = {
        "/interface wifi": []
    };
    
    // Map WifiTarget to base network names
    const networkMap: Record<WifiTarget, string> = {
        Domestic: "Domestic",
        Foreign: "Foreign",
        VPN: "VPN",
        Split: "Split",
        SingleDomestic: "Domestic",
        SingleForeign: "Foreign",
        SingleVPN: "VPN",
    };
    
    wirelessConfigs.forEach((wireless) => {
        if (wireless.isDisabled) return;
        
        const baseNetwork = networkMap[wireless.WifiTarget];
        // NetworkName should only be used if it's a custom name different from the base network
        const hasCustomNetworkName = wireless.NetworkName && wireless.NetworkName !== baseNetwork;
        
        const steeringName = hasCustomNetworkName 
            ? `${baseNetwork}-${wireless.NetworkName}`
            : baseNetwork;
        
        const interfaceSuffix = hasCustomNetworkName 
            ? `${baseNetwork}-${wireless.NetworkName}LAN`
            : `${baseNetwork}LAN`;
        
        // Assign steering to 2.4GHz interface if available
        if (availableBands.has2_4) {
            config["/interface wifi"].push(
                `set [ find name="wifi2.4-${interfaceSuffix}" ] steering="${steeringName}"`
            );
        }
        
        // Assign steering to all 5GHz interfaces if available
        availableBands.bands5GHz.forEach(band => {
            const interfaceName = band === "wifi5" ? "wifi5" : "wifi5-2";
            config["/interface wifi"].push(
                `set [ find name="${interfaceName}-${interfaceSuffix}" ] steering="${steeringName}"`
            );
        });
    });
    
    return config;
}

// export const WirelessBridgePortsSingle = ( DomesticLink: boolean ): RouterConfig => {
//     const config: RouterConfig = {
//         "/interface bridge port": [],
//     };
//     if (DomesticLink) {
//         config["/interface bridge port"].push(
//             `add bridge=LANBridgeSplit interface=wifi2.4-SplitLAN`,
//             `add bridge=LANBridgeSplit interface=wifi5-SplitLAN`,
//         );
//     } else {
//         config["/interface bridge port"].push(
//             `add bridge=LANBridgeVPN interface=wifi2.4-VPNLAN`,
//             `add bridge=LANBridgeVPN interface=wifi5-VPNLAN`,
//         );
//     }
//     return config;
// };

// export const WirelessBridgePortsMulti = (wireless: Wireless): RouterConfig => {
//     const config: RouterConfig = {
//         "/interface bridge port": [],
//     };

//     if (!wireless.MultiMode) {
//         return config;
//     }

//     const Networks = Object.keys(wireless.MultiMode);
//     // Use full network names for interface naming
//     const NetworkNames = Networks.map((Network) =>
//         Network === "Split"
//             ? "Split"
//             : Network === "Domestic"
//               ? "Domestic"
//               : Network === "Foreign"
//                 ? "Foreign"
//                 : Network === "VPN"
//                   ? "VPN"
//                   : "",
//     );

//     // Map network types to bridge names (matching the full bridge naming)
//     const bridgeNameMap: Record<string, string> = {
//         Foreign: "LANBridgeFRN",
//         Domestic: "LANBridgeDOM",
//         VPN: "LANBridgeVPN",
//         Split: "LANBridgeSplit",
//     };

//     for (const Network of NetworkNames) {
//         if (Network) {
//             // Only add if Network is not empty
//             const bridgeName = bridgeNameMap[Network] || Network;
//             config["/interface bridge port"].push(
//                 `add bridge=${bridgeName} interface=wifi2.4-${Network}LAN`,
//                 `add bridge=${bridgeName} interface=wifi5-${Network}LAN`,
//             );
//         }
//     }
//     return config;
// };

// export const WirelessInterfaceListSingle = ( DomesticLink: boolean ): RouterConfig => {
//     const config: RouterConfig = {
//         "/interface list member": [],
//     };

//     if (DomesticLink) {
//         config["/interface list member"].push(
//             `add interface=wifi2.4-SplitLAN list=Split-LAN`,
//             `add interface=wifi5-SplitLAN list=Split-LAN`,
//             `add interface=wifi2.4-SplitLAN list=LAN`,
//             `add interface=wifi5-SplitLAN list=LAN`,
//         );
//     } else {
//         config["/interface list member"].push(
//             `add interface=wifi2.4-VPNLAN list=VPN-LAN`,
//             `add interface=wifi5-VPNLAN list=VPN-LAN`,
//             `add interface=wifi2.4-VPNLAN list=LAN`,
//             `add interface=wifi5-VPNLAN list=LAN`,
//         );
//     }
//     return config;
// };

// export const WirelessInterfaceListMulti = ( wireless: Wireless ): RouterConfig => {
//     const config: RouterConfig = {
//         "/interface list member": [],
//     };

//     if (!wireless.MultiMode) {
//         return config;
//     }

//     const networks = GetWirelessNetworks(wireless.MultiMode);

//     for (const network of networks) {
//         // Convert network names to their appropriate list names and full interface names
//         let listName: string;
//         let interfaceName: string;

//         switch (network) {
//             case "Split":
//                 listName = "Split-LAN";
//                 interfaceName = "Split";
//                 break;
//             case "Domestic":
//                 listName = "DOM-LAN";
//                 interfaceName = "Domestic";
//                 break;
//             case "Foreign":
//                 listName = "FRN-LAN";
//                 interfaceName = "Foreign";
//                 break;
//             case "VPN":
//                 listName = "VPN-LAN";
//                 interfaceName = "VPN";
//                 break;
//             default:
//                 continue;
//         }

//         // Add both 2.4GHz and 5GHz interfaces to their respective network lists
//         config["/interface list member"].push(
//             `add interface=wifi2.4-${interfaceName}LAN list=${listName}`,
//             `add interface=wifi5-${interfaceName}LAN list=${listName}`,
//             `add interface=wifi2.4-${interfaceName}LAN list=LAN`,
//             `add interface=wifi5-${interfaceName}LAN list=LAN`,
//         );
//     }

//     return config;
// };
