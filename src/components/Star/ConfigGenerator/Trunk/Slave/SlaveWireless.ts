import type { WirelessConfig, RouterModels } from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import { mergeMultipleConfigs, CommandShortner } from "~/components/Star/ConfigGenerator";
import { getBridgeName, hasWirelessInterfaces } from "./SlaveUtils";


const networkTypeMap: Record<string, string> = {
    Domestic: "Domestic",
    Foreign: "Foreign",
    VPNClient: "VPN",
    Split: "Split",
    SingleDomestic: "Domestic",
    SingleForeign: "Foreign",
    SingleVPN: "VPN",
};


const createWiFiSecurity = (wirelessConfigs: WirelessConfig[]): RouterConfig => {
    const config: RouterConfig = {
        "/interface wifi security": [],
    };

    // Track unique security profiles (by password)
    const securityProfiles = new Map<string, number>();
    let profileCounter = 1;

    wirelessConfigs.forEach((wireless) => {
        if (wireless.isDisabled) return;

        if (!securityProfiles.has(wireless.Password)) {
            const profileName = `sec${profileCounter}`;
            securityProfiles.set(wireless.Password, profileCounter);

            config["/interface wifi security"].push(
                `add authentication-types=wpa2-psk,wpa3-psk disabled=no name=${profileName} wps=disable`
            );
            profileCounter++;
        }
    });

    return config;
};


const getSecurityProfile = (password: string, wirelessConfigs: WirelessConfig[]): string => {
    let profileCounter = 1;
    for (const wireless of wirelessConfigs) {
        if (wireless.isDisabled) continue;
        if (wireless.Password === password) {
            return `sec${profileCounter}`;
        }
        profileCounter++;
    }
    return "sec1"; // fallback
};


const getSSID = (baseSSID: string, band: "2.4" | "5", splitBand: boolean): string => {
    if (splitBand) {
        return band === "2.4" ? `${baseSSID} 2.4` : `${baseSSID} 5`;
    }
    return baseSSID;
};


const createWiFiInterfaces = (
    wirelessConfigs: WirelessConfig[],
    routerModels: RouterModels[]
): RouterConfig => {
    const config: RouterConfig = {
        "/interface wifi": [
            "set [ find default-name=wifi2 ] name=wifi2.4 disabled=no",
            "set [ find default-name=wifi1 ] name=wifi5 disabled=no",
        ],
    };

    if (wirelessConfigs.length === 0) return config;

    // Track if master interfaces have been assigned
    let masterAssigned24 = false;
    let masterAssigned5 = false;

    wirelessConfigs.forEach((wireless, index) => {
        if (wireless.isDisabled) return;

        const networkType = networkTypeMap[wireless.WifiTarget] || "Split";
        const networkName = wireless.NetworkName;
        const securityProfile = getSecurityProfile(wireless.Password, wirelessConfigs);

        // Configure 2.4GHz band
        if (!masterAssigned24) {
            // First network uses wifi2.4 as master
            const ssid24 = getSSID(wireless.SSID, "2.4", wireless.SplitBand);
            const hideConfig = wireless.isHide ? "configuration.hide-ssid=yes" : "configuration.hide-ssid=no";
            const interfaceName = networkName ? `wifi2.4-${networkType}-${networkName}LAN` : `wifi2.4-${networkType}LAN`;
            const comment = networkName ? `${networkType}-${networkName}LAN` : `${networkType}LAN`;

            config["/interface wifi"].push(
                `set [ find default-name=wifi2 ] comment="${comment}" configuration.mode=ap .ssid="${ssid24}" ${hideConfig} disabled=no security=${securityProfile} name="${interfaceName}"`
            );
            masterAssigned24 = true;
        } else {
            // Subsequent networks use slave (virtual) interfaces
            const ssid24 = getSSID(wireless.SSID, "2.4", wireless.SplitBand);
            const hideConfig = wireless.isHide ? "configuration.hide-ssid=yes" : "configuration.hide-ssid=no";
            const interfaceName = networkName ? `wifi2.4-${networkType}-${networkName}LAN` : `wifi2.4-${networkType}LAN`;
            const comment = networkName ? `${networkType}-${networkName}LAN` : `${networkType}LAN`;

            config["/interface wifi"].push(
                `add comment="${comment}" configuration.mode=ap .ssid="${ssid24}" ${hideConfig} disabled=no master-interface=wifi2.4 name="${interfaceName}" security=${securityProfile}`
            );
        }

        // Configure 5GHz band
        if (!masterAssigned5) {
            // First network uses wifi5 as master
            const ssid5 = getSSID(wireless.SSID, "5", wireless.SplitBand);
            const hideConfig = wireless.isHide ? "configuration.hide-ssid=yes" : "configuration.hide-ssid=no";
            const interfaceName = networkName ? `wifi5-${networkType}-${networkName}LAN` : `wifi5-${networkType}LAN`;
            const comment = networkName ? `${networkType}-${networkName}LAN` : `${networkType}LAN`;

            config["/interface wifi"].push(
                `set [ find default-name=wifi1 ] comment="${comment}" configuration.mode=ap .ssid="${ssid5}" ${hideConfig} disabled=no security=${securityProfile} name="${interfaceName}"`
            );
            masterAssigned5 = true;
        } else {
            // Subsequent networks use slave (virtual) interfaces
            const ssid5 = getSSID(wireless.SSID, "5", wireless.SplitBand);
            const hideConfig = wireless.isHide ? "configuration.hide-ssid=yes" : "configuration.hide-ssid=no";
            const interfaceName = networkName ? `wifi5-${networkType}-${networkName}LAN` : `wifi5-${networkType}LAN`;
            const comment = networkName ? `${networkType}-${networkName}LAN` : `${networkType}LAN`;

            config["/interface wifi"].push(
                `add comment="${comment}" configuration.mode=ap .ssid="${ssid5}" ${hideConfig} disabled=no master-interface=wifi5 name="${interfaceName}" security=${securityProfile}`
            );
        }
    });

    return config;
};


const addWiFiToBridges = (wirelessConfigs: WirelessConfig[]): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge port": [],
    };

    wirelessConfigs.forEach((wireless) => {
        if (wireless.isDisabled) return;

        const networkType = networkTypeMap[wireless.WifiTarget] || "Split";
        const networkName = wireless.NetworkName;
        const bridgeName = networkName
            ? getBridgeName(networkType, networkName)
            : getBridgeName(networkType);

        const interface24Name = networkName
            ? `wifi2.4-${networkType}-${networkName}LAN`
            : `wifi2.4-${networkType}LAN`;

        const interface5Name = networkName
            ? `wifi5-${networkType}-${networkName}LAN`
            : `wifi5-${networkType}LAN`;

        const comment = networkName ? `${networkType}-${networkName}LAN` : `${networkType}LAN`;

        config["/interface bridge port"].push(
            `add bridge=${bridgeName} interface=${interface24Name} comment="${comment}"`,
            `add bridge=${bridgeName} interface=${interface5Name} comment="${comment}"`
        );
    });

    return config;
};


const disableWiFiInterfaces = (): RouterConfig => {
    return {
        "/interface wifi": [
            "set [ find default-name=wifi1 ] disabled=yes",
            "set [ find default-name=wifi2 ] disabled=yes",
        ],
    };
};


export const SlaveWirelessConfig = (
    wirelessConfigs: WirelessConfig[],
    routerModels: RouterModels[]
): RouterConfig => {
    // Check if router has wireless capability
    if (!hasWirelessInterfaces(routerModels)) {
        return {};
    }

    // If no wireless configs or all disabled, disable WiFi interfaces
    const hasActiveWireless = wirelessConfigs.some(w => !w.isDisabled);
    if (!hasActiveWireless) {
        return disableWiFiInterfaces();
    }

    const configs: RouterConfig[] = [];

    // Create WiFi security profiles
    configs.push(createWiFiSecurity(wirelessConfigs));

    // Create WiFi interfaces
    configs.push(createWiFiInterfaces(wirelessConfigs, routerModels));

    // Add WiFi to bridges
    configs.push(addWiFiToBridges(wirelessConfigs));

    // Merge all configurations
    const finalConfig = mergeMultipleConfigs(...configs);

    return CommandShortner(finalConfig);
};
