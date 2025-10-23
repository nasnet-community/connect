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
    WirelessBridge,
    WirelessInterfaceList,
    detectAvailableBands
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
            config["/interface bridge"].push(`add name=LANBridgeSplit comment="Split"`);
        }
        if (baseNetworks.Domestic) {
            config["/interface bridge"].push(`add name=LANBridgeDomestic comment="Domestic"`);
        }
        if (baseNetworks.Foreign) {
            config["/interface bridge"].push(`add name=LANBridgeForeign comment="Foreign"`);
        }
        if (baseNetworks.VPN) {
            config["/interface bridge"].push(`add name=LANBridgeVPN comment="VPN"`);
        }
    }

    // ForeignNetworks
    const foreignNetworks = subnets?.ForeignSubnets;
    if (foreignNetworks && foreignNetworks.length > 0) {
        foreignNetworks.forEach((subnetConfig) => {
            const networkName = subnetConfig.name;
            config["/interface bridge"].push(
                `add name=LANBridgeForeign-${networkName} comment="Foreign-${networkName}"`
            );
        });
    }

    // DomesticNetworks
    const domesticNetworks = subnets?.DomesticSubnets;
    if (domesticNetworks && domesticNetworks.length > 0) {
        domesticNetworks.forEach((subnetConfig) => {
            const networkName = subnetConfig.name;
            config["/interface bridge"].push(
                `add name=LANBridgeDomestic-${networkName} comment="Domestic-${networkName}"`
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
                    `add name=LANBridgeVPN-WG-Client-${networkName} comment="WG-Client-${networkName}"`
                );
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name=LANBridgeVPN-OVPN-Client-${networkName} comment="OVPN-Client-${networkName}"`
                );
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name=LANBridgeVPN-L2TP-Client-${networkName} comment="L2TP-Client-${networkName}"`
                );
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name=LANBridgeVPN-PPTP-Client-${networkName} comment="PPTP-Client-${networkName}"`
                );
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name=LANBridgeVPN-SSTP-Client-${networkName} comment="SSTP-Client-${networkName}"`
                );
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((subnetConfig) => {
                const networkName = subnetConfig.name;
                config["/interface bridge"].push(
                    `add name=LANBridgeVPN-IKEv2-Client-${networkName} comment="IKEv2-Client-${networkName}"`
                );
            });
        }
    }

    return config["/interface bridge"].length === 0 ? {} : config;
};

export const commentTrunkInterface = (trunkInterface?: MasterSlaveInterfaceType): RouterConfig => {
    if (!trunkInterface) return {};

    // Check if interface is wireless
    const isWireless = trunkInterface.includes("wifi");

    if (isWireless) {
        return {
            "/interface wifi": [
                `set [ find default-name=${trunkInterface} ] comment="Trunk Interface"`,
            ],
        };
    } else {
        return {
            "/interface ethernet": [
                `set [ find default-name=${trunkInterface} ] comment="Trunk Interface"`,
            ],
        };
    }
};

export const createVLANsOnTrunkInterface = ( subnets: Subnets | undefined, trunkInterface: string ): RouterConfig => {
    if (!trunkInterface) return {};

    const configs: RouterConfig[] = [];

    // BaseNetworks
    const baseNetworks = subnets?.BaseSubnets;
    if (baseNetworks) {
        if (baseNetworks.Split?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Split.subnet);
            const networkName = "Split";
            configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        }

        if (baseNetworks.Domestic?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Domestic.subnet);
            const networkName = "Domestic";
            configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        }

        if (baseNetworks.Foreign?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Foreign.subnet);
            const networkName = "Foreign";
            configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        }

        if (baseNetworks.VPN?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.VPN.subnet);
            const networkName = "VPN";
            configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        }
    }

    // ForeignNetworks
    const foreignNetworks = subnets?.ForeignSubnets;
    if (foreignNetworks && foreignNetworks.length > 0) {
        foreignNetworks.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `Foreign-${subnetConfig.name}`;
            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
        });
    }

    // DomesticNetworks
    const domesticNetworks = subnets?.DomesticSubnets;
    if (domesticNetworks && domesticNetworks.length > 0) {
        domesticNetworks.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `Domestic-${subnetConfig.name}`;
            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
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
                configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `OVPN-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `L2TP-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `PPTP-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `SSTP-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `IKEv2-Client-${subnetConfig.name}`;
                configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            });
        }
    }

    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};

export const addVLANsToBridges = ( subnets: Subnets | undefined, trunkInterface: string ): RouterConfig => {
    if (!trunkInterface) return {};

    const configs: RouterConfig[] = [];

    // BaseNetworks
    const baseNetworks = subnets?.BaseSubnets;
    if (baseNetworks) {
        if (baseNetworks.Split?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Split.subnet);
            const networkName = "Split";
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
        }

        if (baseNetworks.Domestic?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Domestic.subnet);
            const networkName = "Domestic";
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
        }

        if (baseNetworks.Foreign?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.Foreign.subnet);
            const networkName = "Foreign";
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
        }

        if (baseNetworks.VPN?.subnet) {
            const vlanId = extractThirdOctet(baseNetworks.VPN.subnet);
            const networkName = "VPN";
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
        }
    }

    // ForeignNetworks
    const foreignNetworks = subnets?.ForeignSubnets;
    if (foreignNetworks && foreignNetworks.length > 0) {
        foreignNetworks.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `Foreign-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;
            configs.push(addVLANToBridge(vlanName, `LANBridgeForeign-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // DomesticNetworks
    const domesticNetworks = subnets?.DomesticSubnets;
    if (domesticNetworks && domesticNetworks.length > 0) {
        domesticNetworks.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `Domestic-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;
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
                const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-WG-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `OVPN-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-OVPN-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `L2TP-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-L2TP-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `PPTP-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-PPTP-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `SSTP-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-SSTP-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((subnetConfig) => {
                const vlanId = extractThirdOctet(subnetConfig.subnet);
                const fullNetworkName = `IKEv2-Client-${subnetConfig.name}`;
                const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;
                configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-IKEv2-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
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
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-WG-Client-${subnetConfig.name}"`);
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-OVPN-Client-${subnetConfig.name}"`);
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-L2TP-Client-${subnetConfig.name}"`);
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-PPTP-Client-${subnetConfig.name}"`);
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-SSTP-Client-${subnetConfig.name}"`);
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((subnetConfig) => {
                config["/ip dhcp-client"].push(`add interface="LANBridgeVPN-IKEv2-Client-${subnetConfig.name}"`);
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
                config["/interface bridge port"].push(
                    `add bridge="${targetBridge}" interface="${sfpInterface}" comment="Slave ${sfpInterface} to ${targetBridge}"`
                );
            }
        });
    }

    return config["/interface bridge port"].length === 0 ? {} : config;
};

export const configureSlaveWireless = ( wirelessConfigs: WirelessConfig[], routerModels: RouterModels[], subnets?: Subnets ): RouterConfig => {
    // Find the slave router
    const slaveRouter = routerModels.find(router => router.isMaster === false);
    
    // If no slave router or no wireless interfaces, return empty
    if (!slaveRouter || !slaveRouter.Interfaces.Interfaces.wireless) {
        return {};
    }

    // Check which bands are available on the slave router
    const wirelessInterfaces = slaveRouter.Interfaces.Interfaces.wireless;
    const has24GHz = wirelessInterfaces.some(iface => 
        iface === "wifi2.4"
    );
    const has5GHz = wirelessInterfaces.some(iface => 
        iface === "wifi5" || iface === "wifi5-2"
    );

    // Check if MasterSlaveInterface uses wireless
    let masterSlaveUses24GHz = false;
    let masterSlaveUses5GHz = false;
    if (slaveRouter.MasterSlaveInterface) {
        const msInterface = String(slaveRouter.MasterSlaveInterface);
        if (msInterface.includes("wifi2.4")) {
            masterSlaveUses24GHz = true;
        }
        if (msInterface.includes("wifi5")) {
            masterSlaveUses5GHz = true;
        }
    }

    // Determine available bands (exclude band used by MasterSlaveInterface)
    const available24GHz = has24GHz && !masterSlaveUses24GHz;
    const available5GHz = has5GHz && !masterSlaveUses5GHz;

    // If no bands available, return empty
    if (!available24GHz && !available5GHz) {
        return {};
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

    // Generate wireless configuration for each enabled config and available band
    enabledConfigs.forEach(wirelessConfig => {
        // Configure 2.4GHz band if available
        if (available24GHz) {
            const band24: Band = "2.4";
            const slaveConfig = Slave(networkTarget!, band24, wirelessConfig);
            configs.push(slaveConfig);
        }

        // Configure 5GHz band if available
        if (available5GHz) {
            const band5: Band = "5";
            const slaveConfig = Slave(networkTarget!, band5, wirelessConfig);
            configs.push(slaveConfig);
        }
    });

    // Detect available bands for the slave router
    const availableBands = detectAvailableBands(routerModels);

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
