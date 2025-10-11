import type {
    WirelessConfig,
    RouterModels,
    Band,
} from "~/components/Star/StarContext";
import type { WANLinks } from "~/components/Star/StarContext";
import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import {
    CommandShortner,
    mergeMultipleConfigs,
} from "~/components/Star/ConfigGenerator";
import {
    CheckMasters,
    DisableInterfaces,
    Master,
    Slave,
    WirelessBridge,
    WirelessInterfaceList,
    WirelessSteering,
    WirelessSteeringAssignment,
    CheckWireless,
} from "~/components/Star/ConfigGenerator";


export function WirelessConfig(
    wirelessConfigs: WirelessConfig[],
    wanLinks: WANLinks,
    routerModels: RouterModels[],
): RouterConfig {
    // Base configuration for wifi interfaces
    const baseConfig: RouterConfig = {
        "/interface wifi": [
            "set [ find default-name=wifi2 ] name=wifi2.4 disabled=no",
            "set [ find default-name=wifi1 ] name=wifi5 disabled=no",
        ],
    };

    // Check if wireless configuration is valid
    if (!CheckWireless(wirelessConfigs)) {
        return DisableInterfaces();
    }

    // Check which wifi bands are being used as WAN or Trunk masters
    const { isWifi2_4, isWifi5 } = CheckMasters(wanLinks, routerModels);

    const configs: RouterConfig[] = [baseConfig];

    // Track which bands have master interfaces assigned
    let masterAssigned2_4 = isWifi2_4; // If WAN/Trunk uses wifi2.4, it's already a master
    let masterAssigned5 = isWifi5; // If WAN/Trunk uses wifi5, it's already a master

    // Process each wireless configuration
    wirelessConfigs.forEach((wirelessConfig) => {
        // Skip disabled configurations
        if (wirelessConfig.isDisabled) {
            return;
        }

        // Configure 2.4GHz band
        if (masterAssigned2_4) {
            // wifi2.4 is used as WAN/Trunk master, create slave interface
            const slaveConfig = Slave(wirelessConfig.WifiTarget, "2.4" as Band, wirelessConfig);
            configs.push(slaveConfig);
        } else {
            // wifi2.4 is available, configure as master
            const masterConfig = Master(wirelessConfig.WifiTarget, "2.4" as Band, wirelessConfig);
            configs.push(masterConfig);
            masterAssigned2_4 = true; // Mark 2.4GHz master as assigned
        }

        // Configure 5GHz band
        if (masterAssigned5) {
            // wifi5 is used as WAN/Trunk master, create slave interface
            const slaveConfig = Slave(wirelessConfig.WifiTarget, "5" as Band, wirelessConfig);
            configs.push(slaveConfig);
        } else {
            // wifi5 is available, configure as master
            const masterConfig = Master(wirelessConfig.WifiTarget, "5" as Band, wirelessConfig);
            configs.push(masterConfig);
            masterAssigned5 = true; // Mark 5GHz master as assigned
        }
    });

    // Generate steering profiles for all wireless configs
    wirelessConfigs.forEach((wirelessConfig) => {
        if (!wirelessConfig.isDisabled) {
            const steeringConfig = WirelessSteering(wirelessConfig);
            configs.push(steeringConfig);
        }
    });

    // Assign steering profiles to interfaces
    const steeringAssignment = WirelessSteeringAssignment(wirelessConfigs);
    configs.push(steeringAssignment);

    // Add bridge port configuration
    const bridgeConfig = WirelessBridge(wirelessConfigs);
    configs.push(bridgeConfig);

    // Add interface list configuration
    const interfaceListConfig = WirelessInterfaceList(wirelessConfigs);
    configs.push(interfaceListConfig);

    // Merge all configurations
    const finalConfig = mergeMultipleConfigs(...configs);

    return CommandShortner(finalConfig);
}

// export const SingleSSID = (
//     SingleMode: WirelessConfig,
//     WANLink: WANLinks,
//     DomesticLink: boolean,
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/interface wifi": [],
//     };

//     const { isWifi2_4, isWifi5 } = CheckMasters(WANLink);
//     const Network = DomesticLink ? "Split" : "VPN";

//     // Configure 2.4GHz band
//     if (isWifi2_4) {
//         // If this is already a master interface, we'll use slave configuration
//         const slaveConfig = Slave(Network, "2.4", SingleMode);
//         config["/interface wifi"] = [
//             ...config["/interface wifi"],
//             ...slaveConfig["/interface wifi"],
//         ];
//     } else {
//         // Otherwise, configure as master
//         const masterConfig = Master(Network, "2.4", SingleMode);
//         config["/interface wifi"] = [
//             ...config["/interface wifi"],
//             ...masterConfig["/interface wifi"],
//         ];
//     }

//     // Configure 5GHz band
//     if (isWifi5) {
//         // If this is already a master interface, we'll use slave configuration
//         const slaveConfig = Slave(Network, "5", SingleMode);
//         config["/interface wifi"] = [
//             ...config["/interface wifi"],
//             ...slaveConfig["/interface wifi"],
//         ];
//     } else {
//         // Otherwise, configure as master
//         const masterConfig = Master(Network, "5", SingleMode);
//         config["/interface wifi"] = [
//             ...config["/interface wifi"],
//             ...masterConfig["/interface wifi"],
//         ];
//     }

//     // Add bridge port configuration
//     const bridgePortsConfig = WirelessBridgePortsSingle(DomesticLink);

//     // Merge bridge port configuration
//     if (bridgePortsConfig["/interface bridge port"]) {
//         config["/interface bridge port"] =
//             bridgePortsConfig["/interface bridge port"];
//     }

//     // Add interface list configuration
//     const interfaceListConfig = WirelessInterfaceListSingle(DomesticLink);

//     // Merge interface list configuration
//     if (interfaceListConfig["/interface list member"]) {
//         config["/interface list member"] =
//             interfaceListConfig["/interface list member"];
//     }

//     return config;
// };

// export const MultiSSID = (
//     MultiMode: MultiMode,
//     WANLink: WANLinks,
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/interface wifi": [],
//     };

//     const networks = GetNetworks(MultiMode);
//     const { isWifi2_4, isWifi5 } = CheckMasters(WANLink);

//     // Determine which networks get master interfaces
//     // Only 2 masters total - either used by WAN or assigned to first networks
//     let masterAssigned2_4 = isWifi2_4; // Track if 2.4GHz master is already assigned (to WAN)
//     let masterAssigned5 = isWifi5; // Track if 5GHz master is already assigned (to WAN)

//     for (let i = 0; i < networks.length; i++) {
//         const network = networks[i];
//         const wirelessConfig = MultiMode[network];
//         if (!wirelessConfig) continue;

//         // Configure 2.4GHz band
//         if (isWifi2_4) {
//             // If wifi2.4 is used as WAN (master), create slave interface
//             const slaveConfig = Slave(network, "2.4", wirelessConfig);
//             config["/interface wifi"] = [
//                 ...config["/interface wifi"],
//                 ...slaveConfig["/interface wifi"],
//             ];
//         } else if (!masterAssigned2_4) {
//             // If wifi2.4 is not used as WAN and no master assigned yet, configure as master
//             const masterConfig = Master(network, "2.4", wirelessConfig);
//             config["/interface wifi"] = [
//                 ...config["/interface wifi"],
//                 ...masterConfig["/interface wifi"],
//             ];
//             masterAssigned2_4 = true; // Mark 2.4GHz master as assigned
//         } else {
//             // All subsequent networks use slave interfaces for 2.4GHz
//             const slaveConfig = Slave(network, "2.4", wirelessConfig);
//             config["/interface wifi"] = [
//                 ...config["/interface wifi"],
//                 ...slaveConfig["/interface wifi"],
//             ];
//         }

//         // Configure 5GHz band
//         if (isWifi5) {
//             // If wifi5 is used as WAN (master), create slave interface
//             const slaveConfig = Slave(network, "5", wirelessConfig);
//             config["/interface wifi"] = [
//                 ...config["/interface wifi"],
//                 ...slaveConfig["/interface wifi"],
//             ];
//         } else if (!masterAssigned5) {
//             // If wifi5 is not used as WAN and no master assigned yet, configure as master
//             const masterConfig = Master(network, "5", wirelessConfig);
//             config["/interface wifi"] = [
//                 ...config["/interface wifi"],
//                 ...masterConfig["/interface wifi"],
//             ];
//             masterAssigned5 = true; // Mark 5GHz master as assigned
//         } else {
//             // All subsequent networks use slave interfaces for 5GHz
//             const slaveConfig = Slave(network, "5", wirelessConfig);
//             config["/interface wifi"] = [
//                 ...config["/interface wifi"],
//                 ...slaveConfig["/interface wifi"],
//             ];
//         }
//     }

//     // Add bridge port configuration
//     const bridgePortsConfig = WirelessBridgePortsMulti({ MultiMode });

//     // Merge bridge port configuration
//     if (bridgePortsConfig["/interface bridge port"]) {
//         config["/interface bridge port"] =
//             bridgePortsConfig["/interface bridge port"];
//     }

//     // Add interface list configuration
//     const interfaceListConfig = WirelessInterfaceListMulti({ MultiMode });

//     // Merge interface list configuration
//     if (interfaceListConfig["/interface list member"]) {
//         config["/interface list member"] =
//             interfaceListConfig["/interface list member"];
//     }

//     return config;
// };

// export function WirelessConfig(
//     Wireless: Wireless,
//     WANLink: WANLinks,
//     DomesticLink: boolean,
// ): RouterConfig {
//     const baseConfig: RouterConfig = {
//         "/interface wifi": [
//             "set [ find default-name=wifi2 ] name=wifi2.4 disabled=no",
//             "set [ find default-name=wifi1 ] name=wifi5 disabled=no",
//         ],
//     };
//     const { SingleMode, MultiMode } = Wireless;

//     if (!CheckWireless(Wireless)) {
//         // use DisableInterfaces() and return the config
//         return DisableInterfaces();
//     }

//     if (SingleMode) {
//         const singleSSIDConfig = SingleSSID(SingleMode, WANLink, DomesticLink);
//         const mergedConfig = mergeMultipleConfigs(baseConfig, singleSSIDConfig);
//         return CommandShortner(mergedConfig);
//     } else if (MultiMode) {
//         const multiSSIDConfig = MultiSSID(MultiMode, WANLink);
//         const mergedConfig = mergeMultipleConfigs(baseConfig, multiSSIDConfig);
//         return CommandShortner(mergedConfig);
//     }

//     // Fallback to disable interfaces if no valid configuration
//     return DisableInterfaces();
// }
