import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { Subnets, MasterSlaveInterfaceType, ExtraConfigState, RouterModels, WirelessConfig, Band } from "~/components/Star/StarContext";
import { 
    mergeMultipleConfigs,
    BaseExtra,
    IdentityRomon,
    AccessServices,
    Timezone,
    AReboot,
    AUpdate,
    NTP,
    Graph
} from "~/components/Star/ConfigGenerator";
import { 
    Slave,
    Master,
    WirelessBridge,
    WirelessInterfaceList,
    WirelessSteering,
    WirelessSteeringAssignment,
    detectAvailableBands,
    StationMode
} from "~/components/Star/ConfigGenerator/LAN/Wireless/WirelessUtil";


const extractThirdOctet = (subnet: string): number => {
    const parts = subnet.split('/')[0].split('.');
    return parseInt(parts[2], 10);
};

const createVLAN = ( vlanId: number, interfaceName: string, networkName: string, comment: string ): RouterConfig => {
    return {
        "/interface vlan": [
            `add name="VLAN${vlanId}-${interfaceName}-${networkName}" comment="${comment}" interface="${interfaceName}" vlan-id=${vlanId}`,
        ],
    };
};

const addVLANToBridge = ( vlanInterfaceName: string, bridgeName: string, comment: string ): RouterConfig => {
    return {
        "/interface bridge port": [
            `add bridge="${bridgeName}" interface="${vlanInterfaceName}" comment="${comment}"`,
        ],
    };
};

export const createBridgesForNetworks = (subnets?: Subnets): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge": [],
    };

    // BaseNetworks
    const baseNetworks = subnets?.BaseSubnets;
    if (baseNetworks) {
        if (baseNetworks.Split) {
            config["/interface bridge"].push(`add name="LANBridgeSplit" comment="Split"`);
        }
        if (baseNetworks.Domestic) {
            config["/interface bridge"].push(`add name="LANBridgeDomestic" comment="Domestic"`);
        }
        if (baseNetworks.Foreign) {
            config["/interface bridge"].push(`add name="LANBridgeForeign" comment="Foreign"`);
        }
        if (baseNetworks.VPN) {
            config["/interface bridge"].push(`add name="LANBridgeVPN" comment="VPN"`);
        }
    }

    // ForeignNetworks
    const foreignNetworks = subnets?.ForeignSubnets;
    if (foreignNetworks && foreignNetworks.length > 0) {
        foreignNetworks.forEach((subnetConfig) => {
            const networkName = subnetConfig.name;
            config["/interface bridge"].push(
                `add name="LANBridgeForeign-${networkName}" comment="Foreign-${networkName}"`
            );
        });
    }

    // DomesticNetworks
    const domesticNetworks = subnets?.DomesticSubnets;
    if (domesticNetworks && domesticNetworks.length > 0) {
        domesticNetworks.forEach((subnetConfig) => {
            const networkName = subnetConfig.name;
            config["/interface bridge"].push(
                `add name="LANBridgeDomestic-${networkName}" comment="Domestic-${networkName}"`
            );
        });
    }

    // VPNClientNetworks
    const vpnClient = subnets?.VPNClientSubnets;
    if (vpnClient) {
        // Wireguard
        if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
            vpnClient.Wireguard.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name="LANBridgeVPN-${networkName}" comment="VPN-${networkName}"`
                );
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name="LANBridgeVPN-${networkName}" comment="VPN-${networkName}"`
                );
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name="LANBridgeVPN-${networkName}" comment="VPN-${networkName}"`
                );
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name="LANBridgeVPN-${networkName}" comment="VPN-${networkName}"`
                );
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name="LANBridgeVPN-${networkName}" comment="VPN-${networkName}"`
                );
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name="LANBridgeVPN-${networkName}" comment="VPN-${networkName}"`
                );
            });
        }
    }

    return config["/interface bridge"].length === 0 ? {} : config;
};

export const createStationTrunkInterface = (
    trunkInterface: MasterSlaveInterfaceType,
    wirelessConfigs?: WirelessConfig[]
): RouterConfig => {
    // Only handle wireless trunk interfaces
    if (!trunkInterface.includes("wifi") || !wirelessConfigs || wirelessConfigs.length === 0) {
        return {};
    }

    // Use first wireless config to get trunk SSID and password
    const firstConfig = wirelessConfigs[0];
    const trunkSSID = `${firstConfig.SSID}!`;
    const trunkPassword = `${firstConfig.Password}!`;

    // Determine which band to use based on trunkInterface
    let band: Band;
    let bandName: string;
    
    if (trunkInterface.includes("2.4")) {
        band = "2.4";
        bandName = "2.4";
    } else if (trunkInterface.includes("5-2")) {
        band = "5";
        bandName = "5-2";
    } else if (trunkInterface.includes("6")) {
        band = "5";
        bandName = "6";
    } else {
        // Default to 5GHz
        band = "5";
        bandName = "5";
    }

    // Use the existing StationMode function from WirelessUtil
    const config = StationMode(trunkSSID, trunkPassword, band, undefined, "Trunk Station");
    
    // Add the name parameter to the command to create a named interface
    // Format: name="wifi{band}-Trunk"
    if (config["/interface wifi"] && config["/interface wifi"][0]) {
        const originalCommand = config["/interface wifi"][0];
        // Insert name parameter after the default-name find command
        const nameParam = `name="wifi${bandName}-Trunk" `;
        const modifiedCommand = originalCommand.replace(
            /(\] )/,
            `] ${nameParam}`
        );
        config["/interface wifi"][0] = modifiedCommand;
    }
    
    return config;
};

export const commentTrunkInterface = (trunkInterface?: MasterSlaveInterfaceType): RouterConfig => {
    // Only comment non-wireless trunk interfaces (ethernet, SFP)
    // Wireless trunk interfaces are handled by createStationTrunkInterface
    if (!trunkInterface || trunkInterface.includes("wifi")) {
        return {};
    }

    // Both Ethernet and SFP use the /interface ethernet config path
    return {
        "/interface ethernet": [
            `set [ find default-name=${trunkInterface} ] comment="Trunk Interface"`,
        ],
    };
};

export const createVLANsOnTrunkInterface = ( subnets: Subnets | undefined, trunkInterface: string ): RouterConfig => {
    if (!trunkInterface) return {};

    // Determine the actual interface name for VLANs
    // For wireless trunk interfaces, use the named interface (wifi{band}-Trunk)
    let vlanInterfaceName = trunkInterface;
    if (trunkInterface.includes("wifi")) {
        // Extract band name and create trunk interface name
        // wifi2.4 -> wifi2.4-Trunk
        // wifi5 -> wifi5-Trunk
        // wifi5-2 -> wifi5-2-Trunk
        vlanInterfaceName = `${trunkInterface}-Trunk`;
    }

    const configs: RouterConfig[] = [];

    // BaseNetworks
    const baseNetworks = subnets?.BaseSubnets;
    if (baseNetworks) {
        if (baseNetworks.Split?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Split.subnet);
            const networkName = "Split";
            configs.push(createVLAN(vlanId, vlanInterfaceName, networkName, `${networkName} Network VLAN`));
        }

        if (baseNetworks.Domestic?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Domestic.subnet);
            const networkName = "Domestic";
            configs.push(createVLAN(vlanId, vlanInterfaceName, networkName, `${networkName} Network VLAN`));
        }

        if (baseNetworks.Foreign?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Foreign.subnet);
            const networkName = "Foreign";
            configs.push(createVLAN(vlanId, vlanInterfaceName, networkName, `${networkName} Network VLAN`));
        }

        if (baseNetworks.VPN?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.VPN.subnet);
            const networkName = "VPN";
            configs.push(createVLAN(vlanId, vlanInterfaceName, networkName, `${networkName} Network VLAN`));
        }
    }

    // ForeignNetworks
    const foreignNetworks = subnets?.ForeignSubnets;
    if (foreignNetworks && foreignNetworks.length > 0) {
        foreignNetworks.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `Foreign-${subnetConfig.name}`;
            configs.push(createVLAN(vlanId, vlanInterfaceName, fullNetworkName, `${fullNetworkName} Network VLAN`));
        });
    }

    // DomesticNetworks
    const domesticNetworks = subnets?.DomesticSubnets;
    if (domesticNetworks && domesticNetworks.length > 0) {
        domesticNetworks.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `Domestic-${subnetConfig.name}`;
            configs.push(createVLAN(vlanId, vlanInterfaceName, fullNetworkName, `${fullNetworkName} Network VLAN`));
        });
    }

    // VPNClientNetworks
    const vpnClient = subnets?.VPNClientSubnets;
    if (vpnClient) {
        // Wireguard
        if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
            vpnClient.Wireguard.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `WG-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, vlanInterfaceName, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `OVPN-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, vlanInterfaceName, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `L2TP-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, vlanInterfaceName, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `PPTP-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, vlanInterfaceName, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `SSTP-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, vlanInterfaceName, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `IKEv2-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, vlanInterfaceName, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }
    }

    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};

export const addVLANsToBridges = ( subnets: Subnets | undefined, trunkInterface: string ): RouterConfig => {
    if (!trunkInterface) return {};

    // Determine the actual interface name for VLANs
    // For wireless trunk interfaces, use the named interface (wifi{band}-Trunk)
    let vlanInterfaceName = trunkInterface;
    if (trunkInterface.includes("wifi")) {
        vlanInterfaceName = `${trunkInterface}-Trunk`;
    }

    const configs: RouterConfig[] = [];

    // BaseNetworks
    const baseNetworks = subnets?.BaseSubnets;
    if (baseNetworks) {
        if (baseNetworks.Split?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Split.subnet);
            const networkName = "Split";
            const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${networkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
        }

        if (baseNetworks.Domestic?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Domestic.subnet);
            const networkName = "Domestic";
            const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${networkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
        }

        if (baseNetworks.Foreign?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Foreign.subnet);
            const networkName = "Foreign";
            const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${networkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
        }

        if (baseNetworks.VPN?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.VPN.subnet);
            const networkName = "VPN";
            const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${networkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
        }
    }

    // ForeignNetworks
    const foreignNetworks = subnets?.ForeignSubnets;
    if (foreignNetworks && foreignNetworks.length > 0) {
        foreignNetworks.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `Foreign-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${fullNetworkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridgeForeign-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // DomesticNetworks
    const domesticNetworks = subnets?.DomesticSubnets;
    if (domesticNetworks && domesticNetworks.length > 0) {
        domesticNetworks.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `Domestic-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${fullNetworkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridgeDomestic-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // VPNClientNetworks
    const vpnClient = subnets?.VPNClientSubnets;
    if (vpnClient) {
        // Wireguard
        if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
            vpnClient.Wireguard.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `WG-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `OVPN-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `L2TP-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `PPTP-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `SSTP-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `IKEv2-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${vlanInterfaceName}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }
    }

    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};

export const createDHCPClientsOnBridges = (subnets?: Subnets): RouterConfig => {
    const config: RouterConfig = {
        "/ip dhcp-client": [],
    };

    // BaseNetworks
    const baseNetworks = subnets?.BaseSubnets;
    if (baseNetworks) {
        if (baseNetworks.Split) {
            config["/ip dhcp-client"].push("add interface=LANBridgeSplit");
        }
        if (baseNetworks.Domestic) {
            config["/ip dhcp-client"].push("add interface=LANBridgeDomestic");
        }
        if (baseNetworks.Foreign) {
            config["/ip dhcp-client"].push("add interface=LANBridgeForeign");
        }
        if (baseNetworks.VPN) {
            config["/ip dhcp-client"].push("add interface=LANBridgeVPN");
        }
    }

    // ForeignNetworks
    const foreignNetworks = subnets?.ForeignSubnets;
    if (foreignNetworks && foreignNetworks.length > 0) {
        foreignNetworks.forEach((subnetConfig) => {
            config["/ip dhcp-client"].push(`add interface="LANBridgeForeign-${subnetConfig.name}"`);
        });
    }

    // DomesticNetworks
    const domesticNetworks = subnets?.DomesticSubnets;
    if (domesticNetworks && domesticNetworks.length > 0) {
        domesticNetworks.forEach((subnetConfig) => {
            config["/ip dhcp-client"].push(`add interface="LANBridgeDomestic-${subnetConfig.name}"`);
        });
    }

    // VPNClientNetworks
    const vpnClient = subnets?.VPNClientSubnets;
    if (vpnClient) {
        // Wireguard
        if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
            vpnClient.Wireguard.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-${subnetConfig.name}"`);
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-${subnetConfig.name}"`);
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-${subnetConfig.name}"`);
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-${subnetConfig.name}"`);
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-${subnetConfig.name}"`);
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-${subnetConfig.name}"`);
            });
        }
    }

    return config["/ip dhcp-client"].length === 0 ? {} : config;
};

export const SlaveExtraCG = (extraConfigState: ExtraConfigState): RouterConfig => {
    const configs: RouterConfig[] = [
        BaseExtra(),
    ];

    // Add Router Identity and Romon configuration
    if (extraConfigState.RouterIdentityRomon) {
        // Append "-Slave" suffix to identity for slave routers
        const slaveIdentity = {
            ...extraConfigState.RouterIdentityRomon,
            RouterIdentity: extraConfigState.RouterIdentityRomon.RouterIdentity 
                ? `${extraConfigState.RouterIdentityRomon.RouterIdentity}-Slave`
                : ""
        };
        configs.push(IdentityRomon(slaveIdentity));
    }

    // Add Service access configurations
    if (extraConfigState.services) {
        configs.push(AccessServices(extraConfigState.services));
    }

    // Add RUI configurations (Timezone, Reboot, Update)
    const rui = extraConfigState.RUI;
    
    // Handle timezone configuration
    if (rui.Timezone) {
        configs.push(Timezone(rui.Timezone));
    }

    // Handle auto-reboot scheduler
    if (rui.Reboot && rui.Reboot.interval && rui.Reboot.time) {
        configs.push(AReboot(rui.Reboot));
    }

    // Handle auto-update scheduler
    if (rui.Update && rui.Update.interval && rui.Update.time) {
        configs.push(AUpdate(rui.Update));
    }

    // Add Useful Services configurations
    if (extraConfigState.usefulServices) {
        // Handle NTP configuration
        if (extraConfigState.usefulServices.ntp) {
            configs.push(NTP(extraConfigState.usefulServices.ntp));
        }

        // Handle Graphing configuration
        if (extraConfigState.usefulServices.graphing) {
            configs.push(Graph(extraConfigState.usefulServices.graphing));
        }
    }

    // Add Cloud DDNS configuration
    // For slave routers, we typically don't enable DDNS, but include it if needed
    // configs.push(CloudDDNS("foreign"));

    return mergeMultipleConfigs(...configs);
};

export const addSlaveInterfacesToBridge = ( routerModels: RouterModels[], subnets?: Subnets ): RouterConfig => {
    const config: RouterConfig = {
        "/interface ethernet": [],
        "/interface sfp": [],
        "/interface bridge port": [],
    };

    // Find the slave router (the one that is NOT master)
    const slaveRouter = routerModels.find(router => router.isMaster === false);
    
    // If no slave router, return empty config
    if (!slaveRouter) {
        return {};
    }

    // Determine target bridge name (prefer Split, fallback to VPN)
    let targetBridge: string | null = null;
    if (subnets?.BaseSubnets?.Split) {
        targetBridge = "LANBridgeSplit";
    } else if (subnets?.BaseSubnets?.VPN) {
        targetBridge = "LANBridgeVPN";
    }

    // If no suitable bridge exists, return empty config
    if (!targetBridge) {
        return {};
    }

    // Collect occupied interface names
    const occupiedInterfaces = new Set<string>();
    if (slaveRouter.MasterSlaveInterface) {
        occupiedInterfaces.add(slaveRouter.MasterSlaveInterface);
    }
    slaveRouter.Interfaces.OccupiedInterfaces.forEach(occupied => {
        occupiedInterfaces.add(occupied.interface);
    });

    // Collect all unoccupied ethernet interfaces
    if (slaveRouter.Interfaces.Interfaces.ethernet) {
        slaveRouter.Interfaces.Interfaces.ethernet.forEach(ethInterface => {
            if (!occupiedInterfaces.has(ethInterface)) {
                // Add comment to ethernet interface
                config["/interface ethernet"].push(
                    `set [find default-name=${ethInterface}] comment="${targetBridge} Network"`
                );
                // Add interface to bridge
                config["/interface bridge port"].push(
                    `add bridge="${targetBridge}" interface="${ethInterface}" comment="Slave ${ethInterface} to ${targetBridge}"`
                );
            }
        });
    }

    // Collect all unoccupied SFP interfaces
    if (slaveRouter.Interfaces.Interfaces.sfp) {
        slaveRouter.Interfaces.Interfaces.sfp.forEach(sfpInterface => {
            if (!occupiedInterfaces.has(sfpInterface)) {
                // Add comment to SFP interface
                config["/interface sfp"].push(
                    `set [find default-name=${sfpInterface}] comment="${targetBridge} Network"`
                );
                // Add interface to bridge
                config["/interface bridge port"].push(
                    `add bridge="${targetBridge}" interface="${sfpInterface}" comment="Slave ${sfpInterface} to ${targetBridge}"`
                );
            }
        });
    }

    // Remove empty sections from config
    const result: RouterConfig = {};
    if (config["/interface ethernet"].length > 0) {
        result["/interface ethernet"] = config["/interface ethernet"];
    }
    if (config["/interface sfp"] && config["/interface sfp"].length > 0) {
        result["/interface sfp"] = config["/interface sfp"];
    }
    if (config["/interface bridge port"].length > 0) {
        result["/interface bridge port"] = config["/interface bridge port"];
    }

    return Object.keys(result).length === 0 ? {} : result;
};

export const configureSlaveWireless = ( wirelessConfigs: WirelessConfig[], routerModels: RouterModels[], subnets?: Subnets ): RouterConfig => {
    // Find the slave router
    const slaveRouter = routerModels.find(router => router.isMaster === false);
    
    // If no slave router or no wireless interfaces, return empty
    if (!slaveRouter || !slaveRouter.Interfaces.Interfaces.wireless) {
        return {};
    }

    // Detect available bands for the slave router
    const availableBands = detectAvailableBands(routerModels);

    // Check if MasterSlaveInterface uses specific wireless bands
    let masterSlaveUsesWifi24 = false;
    let masterSlaveUsesWifi5 = false;
    let masterSlaveUsesWifi5_2 = false;
    
    if (slaveRouter.MasterSlaveInterface) {
        const msInterface = String(slaveRouter.MasterSlaveInterface);
        if (msInterface.includes("wifi2.4")) {
            masterSlaveUsesWifi24 = true;
        }
        if (msInterface.includes("wifi5-2")) {
            masterSlaveUsesWifi5_2 = true;
        } else if (msInterface.includes("wifi5")) {
            masterSlaveUsesWifi5 = true;
        }
    }

    // Filter enabled wireless configs
    const enabledConfigs = wirelessConfigs.filter(config => !config.isDisabled);
    
    if (enabledConfigs.length === 0) {
        return {};
    }

    // Determine network target (prefer Split, fallback to SingleVPN)
    let networkTarget: "Split" | "SingleVPN" | null = null;
    if (subnets?.BaseSubnets?.Split) {
        networkTarget = "Split";
    } else if (subnets?.BaseSubnets?.VPN) {
        networkTarget = "SingleVPN";
    }

    // If no suitable network exists, return empty
    if (!networkTarget) {
        return {};
    }

    const configs: RouterConfig[] = [];

    // Track which bands have master interfaces assigned
    let masterAssigned2_4 = masterSlaveUsesWifi24; // If trunk uses wifi2.4, it's already a master
    let masterAssigned5 = masterSlaveUsesWifi5 || masterSlaveUsesWifi5_2; // If trunk uses any 5GHz, mark as assigned

    // Process each wireless configuration
    enabledConfigs.forEach((wirelessConfig) => {
        // Skip disabled configurations
        if (wirelessConfig.isDisabled) {
            return;
        }

        // Configure 2.4GHz band (only if available)
        if (availableBands.has2_4) {
            if (masterAssigned2_4) {
                // wifi2.4 is used as trunk master, create slave interface
                const slaveConfig = Slave(wirelessConfig.WifiTarget, "2.4" as Band, wirelessConfig, availableBands);
                configs.push(slaveConfig);
            } else {
                // wifi2.4 is available, configure as master
                const masterConfig = Master(wirelessConfig.WifiTarget, "2.4" as Band, wirelessConfig, availableBands);
                configs.push(masterConfig);
                masterAssigned2_4 = true; // Mark 2.4GHz master as assigned
            }
        }

        // Configure all 5GHz bands (if available)
        if (availableBands.has5 || availableBands.has5_2) {
            // For each 5GHz band, create the same configuration
            availableBands.bands5GHz.forEach((band5Interface, index) => {
                const bandName = band5Interface === "wifi5" ? "5" : "5-2";
                
                // Check if this specific 5GHz band is used by trunk
                const thisWifi5UsedByTrunk = (band5Interface === "wifi5" && masterSlaveUsesWifi5) || 
                                              (band5Interface === "wifi5-2" && masterSlaveUsesWifi5_2);
                
                if (thisWifi5UsedByTrunk) {
                    // This specific 5GHz interface is used as trunk master, create slave interface
                    const slaveConfig = Slave(wirelessConfig.WifiTarget, "5" as Band, wirelessConfig, availableBands, bandName);
                    configs.push(slaveConfig);
                } else if (masterAssigned5 && index === 0) {
                    // First 5GHz interface: another 5GHz is used as trunk master, create slave interface
                    const slaveConfig = Slave(wirelessConfig.WifiTarget, "5" as Band, wirelessConfig, availableBands, bandName);
                    configs.push(slaveConfig);
                } else if (!masterAssigned5 && index === 0) {
                    // First 5GHz interface becomes master
                    const masterConfig = Master(wirelessConfig.WifiTarget, "5" as Band, wirelessConfig, availableBands, bandName);
                    configs.push(masterConfig);
                    masterAssigned5 = true; // Only first 5GHz becomes master
                } else {
                    // All subsequent 5GHz interfaces are slaves
                    const slaveConfig = Slave(wirelessConfig.WifiTarget, "5" as Band, wirelessConfig, availableBands, bandName);
                    configs.push(slaveConfig);
                }
            });
        }
    });

    // Generate steering profiles for all wireless configs
    enabledConfigs.forEach((wirelessConfig) => {
        if (!wirelessConfig.isDisabled) {
            const steeringConfig = WirelessSteering(wirelessConfig, availableBands);
            configs.push(steeringConfig);
        }
    });

    // Assign steering profiles to interfaces
    const steeringAssignment = WirelessSteeringAssignment(enabledConfigs, availableBands);
    configs.push(steeringAssignment);

    // Add wireless bridge configuration
    const bridgeConfig = WirelessBridge(enabledConfigs, availableBands);
    if (Object.keys(bridgeConfig).length > 0) {
        configs.push(bridgeConfig);
    }

    // Add wireless interface list configuration
    const interfaceListConfig = WirelessInterfaceList(enabledConfigs, availableBands);
    if (Object.keys(interfaceListConfig).length > 0) {
        configs.push(interfaceListConfig);
    }

    // Merge all configs
    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};

export const SlaveMDNS = (subnets?: Subnets): RouterConfig => {
    const config: RouterConfig = {
        "/ip dns": [],
    };

    if (!subnets) {
        return config;
    }

    // Extract all bridge names from the subnets structure
    const bridgeNames: string[] = [];

    // Base Networks
    const baseNetworks = subnets.BaseSubnets;
    if (baseNetworks) {
        if (baseNetworks.Split) {
            bridgeNames.push("LANBridgeSplit");
        }
        if (baseNetworks.Domestic) {
            bridgeNames.push("LANBridgeDomestic");
        }
        if (baseNetworks.Foreign) {
            bridgeNames.push("LANBridgeForeign");
        }
        if (baseNetworks.VPN) {
            bridgeNames.push("LANBridgeVPN");
        }
    }

    // Foreign Networks
    const foreignNetworks = subnets.ForeignSubnets;
    if (foreignNetworks && foreignNetworks.length > 0) {
        foreignNetworks.forEach((subnetConfig) => {
            const networkName = subnetConfig.name;
            bridgeNames.push(`LANBridgeForeign-${networkName}`);
        });
    }

    // Domestic Networks
    const domesticNetworks = subnets.DomesticSubnets;
    if (domesticNetworks && domesticNetworks.length > 0) {
        domesticNetworks.forEach((subnetConfig) => {
            const networkName = subnetConfig.name;
            bridgeNames.push(`LANBridgeDomestic-${networkName}`);
        });
    }

    // VPN Client Networks
    const vpnClient = subnets.VPNClientSubnets;
    if (vpnClient) {
        // Wireguard
        if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
            vpnClient.Wireguard.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                bridgeNames.push(`LANBridgeVPN-${networkName}`);
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                bridgeNames.push(`LANBridgeVPN-${networkName}`);
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                bridgeNames.push(`LANBridgeVPN-${networkName}`);
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                bridgeNames.push(`LANBridgeVPN-${networkName}`);
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                bridgeNames.push(`LANBridgeVPN-${networkName}`);
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                bridgeNames.push(`LANBridgeVPN-${networkName}`);
            });
        }
    }

    // If no bridges found, return empty config
    if (bridgeNames.length === 0) {
        return config;
    }

    // Join all bridge names with commas
    const mdnsInterfaces = bridgeNames.join(",");
    config["/ip dns"].push(`set mdns-repeat-ifaces="${mdnsInterfaces}"`);

    return config;
};
