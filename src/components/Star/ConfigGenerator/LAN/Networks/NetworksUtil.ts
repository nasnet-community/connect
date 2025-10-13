import type { WANLinks, VPNClient, Networks as Networksinterface, Subnets } from "~/components/Star/StarContext";







export const shouldSkipMangleRules = (wanLinks?: WANLinks, vpnClient?: VPNClient): boolean => {
    // Check Foreign WAN Link
    if (wanLinks?.Foreign?.MultiLinkConfig?.loadBalanceMethod) {
        const method = wanLinks.Foreign.MultiLinkConfig.loadBalanceMethod;
        if (method === "PCC" || method === "NTH") {
            return true;
        }
    }
    
    // Check Domestic WAN Link
    if (wanLinks?.Domestic?.MultiLinkConfig?.loadBalanceMethod) {
        const method = wanLinks.Domestic.MultiLinkConfig.loadBalanceMethod;
        if (method === "PCC" || method === "NTH") {
            return true;
        }
    }
    
    // Check VPN Client MultiLink Config
    if (vpnClient?.MultiLinkConfig?.loadBalanceMethod) {
        const method = vpnClient.MultiLinkConfig.loadBalanceMethod;
        if (method === "PCC" || method === "NTH") {
            return true;
        }
    }
    
    return false;
};

export const extractBridgeNames = (networks: Networksinterface, subnets?: Subnets): string[] => {
    const bridgeNames: string[] = [];

    // Base Networks - use the network type as the name
    if (networks.BaseNetworks) {
        if (networks.BaseNetworks.Split && subnets?.BaseNetworks.Split?.subnet) {
            bridgeNames.push("LANBridgeSplit");
        }
        if (networks.BaseNetworks.Domestic && subnets?.BaseNetworks.Domestic?.subnet) {
            bridgeNames.push("LANBridgeDomestic");
        }
        if (networks.BaseNetworks.Foreign && subnets?.BaseNetworks.Foreign?.subnet) {
            bridgeNames.push("LANBridgeForeign");
        }
        if (networks.BaseNetworks.VPN && subnets?.BaseNetworks.VPN?.subnet) {
            bridgeNames.push("LANBridgeVPN");
        }
    }

    // Additional Foreign Networks
    if (networks.ForeignNetworks && subnets?.ForeignNetworks) {
        subnets.ForeignNetworks.forEach((subnet) => {
            if (subnet.subnet) {
                const name = subnet.name || "Foreign";
                bridgeNames.push(`LANBridgeForeign-${name}`);
            }
        });
    }

    // Additional Domestic Networks
    if (networks.DomesticNetworks && subnets?.DomesticNetworks) {
        subnets.DomesticNetworks.forEach((subnet) => {
            if (subnet.subnet) {
                const name = subnet.name || "Domestic";
                bridgeNames.push(`LANBridgeDomestic-${name}`);
            }
        });
    }

    // VPN Client Networks
    if (networks.VPNClientNetworks && subnets?.VPNClientNetworks) {
        const vpnClient = networks.VPNClientNetworks;
        const vpnSubnets = subnets.VPNClientNetworks;

        // Wireguard
        if (vpnClient.Wireguard && vpnSubnets.Wireguard) {
            vpnSubnets.Wireguard.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "WG-Client";
                    bridgeNames.push(`LANBridgeVPN-${name}`);
                }
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnSubnets.OpenVPN) {
            vpnSubnets.OpenVPN.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "OVPN-Client";
                    bridgeNames.push(`LANBridgeVPN-${name}`);
                }
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnSubnets.L2TP) {
            vpnSubnets.L2TP.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "L2TP-Client";
                    bridgeNames.push(`LANBridgeVPN-${name}`);
                }
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnSubnets.PPTP) {
            vpnSubnets.PPTP.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "PPTP-Client";
                    bridgeNames.push(`LANBridgeVPN-${name}`);
                }
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnSubnets.SSTP) {
            vpnSubnets.SSTP.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "SSTP-Client";
                    bridgeNames.push(`LANBridgeVPN-${name}`);
                }
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnSubnets.IKev2) {
            vpnSubnets.IKev2.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "IKEv2-Client";
                    bridgeNames.push(`LANBridgeVPN-${name}`);
                }
            });
        }
    }

    return bridgeNames;
};

export const extractTableNames = (networks: Networksinterface, subnets?: Subnets): string[] => {
    const tableNames: string[] = [];

    // Base Networks - use the network type as the name
    if (networks.BaseNetworks) {
        if (networks.BaseNetworks.Split && subnets?.BaseNetworks.Split?.subnet) {
            tableNames.push("to-Split");
        }
        if (networks.BaseNetworks.Domestic && subnets?.BaseNetworks.Domestic?.subnet) {
            tableNames.push("to-Domestic");
        }
        if (networks.BaseNetworks.Foreign && subnets?.BaseNetworks.Foreign?.subnet) {
            tableNames.push("to-Foreign");
        }
        if (networks.BaseNetworks.VPN && subnets?.BaseNetworks.VPN?.subnet) {
            tableNames.push("to-VPN");
        }
    }

    // Additional Foreign Networks
    if (networks.ForeignNetworks && subnets?.ForeignNetworks) {
        subnets.ForeignNetworks.forEach((subnet) => {
            if (subnet.subnet) {
                const name = subnet.name || "Foreign";
                tableNames.push(`to-Foreign-${name}`);
            }
        });
    }

    // Additional Domestic Networks
    if (networks.DomesticNetworks && subnets?.DomesticNetworks) {
        subnets.DomesticNetworks.forEach((subnet) => {
            if (subnet.subnet) {
                const name = subnet.name || "Domestic";
                tableNames.push(`to-Domestic-${name}`);
            }
        });
    }

    // VPN Client Networks
    if (networks.VPNClientNetworks && subnets?.VPNClientNetworks) {
        const vpnClient = networks.VPNClientNetworks;
        const vpnSubnets = subnets.VPNClientNetworks;

        // Wireguard
        if (vpnClient.Wireguard && vpnSubnets.Wireguard) {
            vpnSubnets.Wireguard.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "WG-Client";
                    tableNames.push(`to-VPN-${name}`);
                }
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnSubnets.OpenVPN) {
            vpnSubnets.OpenVPN.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "OVPN-Client";
                    tableNames.push(`to-VPN-${name}`);
                }
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnSubnets.L2TP) {
            vpnSubnets.L2TP.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "L2TP-Client";
                    tableNames.push(`to-VPN-${name}`);
                }
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnSubnets.PPTP) {
            vpnSubnets.PPTP.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "PPTP-Client";
                    tableNames.push(`to-VPN-${name}`);
                }
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnSubnets.SSTP) {
            vpnSubnets.SSTP.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "SSTP-Client";
                    tableNames.push(`to-VPN-${name}`);
                }
            });
        }

        // IKev2
        if (vpnClient.IKev2 && vpnSubnets.IKev2) {
            vpnSubnets.IKev2.forEach((subnet) => {
                if (subnet.subnet) {
                    const name = subnet.name || "IKEv2-Client";
                    tableNames.push(`to-VPN-${name}`);
                }
            });
        }
    }

    return tableNames;
};

export const mapNetworkToRoutingTable = (networkName: string, networks: Networksinterface): string | null => {
    // Check Base Networks
    if (networks.BaseNetworks) {
        if (networkName === "Domestic" && networks.BaseNetworks.Domestic) {
            return "to-Domestic";
        }
        if (networkName === "Foreign" && networks.BaseNetworks.Foreign) {
            return "to-Foreign";
        }
        if (networkName === "VPN" && networks.BaseNetworks.VPN) {
            return "to-VPN";
        }
    }

    // Check Foreign Networks
    if (networks.ForeignNetworks && networks.ForeignNetworks.includes(networkName)) {
        return `to-Foreign-${networkName}`;
    }

    // Check Domestic Networks
    if (networks.DomesticNetworks && networks.DomesticNetworks.includes(networkName)) {
        return `to-Domestic-${networkName}`;
    }

    // Check VPN Client Networks
    if (networks.VPNClientNetworks) {
        const vpnClient = networks.VPNClientNetworks;
        
        if (vpnClient.Wireguard && vpnClient.Wireguard.includes(networkName)) {
            return `to-VPN-${networkName}`;
        }
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.includes(networkName)) {
            return `to-VPN-${networkName}`;
        }
        if (vpnClient.L2TP && vpnClient.L2TP.includes(networkName)) {
            return `to-VPN-${networkName}`;
        }
        if (vpnClient.PPTP && vpnClient.PPTP.includes(networkName)) {
            return `to-VPN-${networkName}`;
        }
        if (vpnClient.SSTP && vpnClient.SSTP.includes(networkName)) {
            return `to-VPN-${networkName}`;
        }
        if (vpnClient.IKev2 && vpnClient.IKev2.includes(networkName)) {
            return `to-VPN-${networkName}`;
        }
    }

    return null;
};

export const mapNetworkToBridgeName = (networkName: string, networks: Networksinterface): string | null => {
    // Check Base Networks
    if (networks.BaseNetworks) {
        if (networkName === "Split" && networks.BaseNetworks.Split) {
            return "LANBridgeSplit";
        }
        if (networkName === "Domestic" && networks.BaseNetworks.Domestic) {
            return "LANBridgeDomestic";
        }
        if (networkName === "Foreign" && networks.BaseNetworks.Foreign) {
            return "LANBridgeForeign";
        }
        if (networkName === "VPN" && networks.BaseNetworks.VPN) {
            return "LANBridgeVPN";
        }
    }

    // Check Foreign Networks
    if (networks.ForeignNetworks && networks.ForeignNetworks.includes(networkName)) {
        return `LANBridgeForeign-${networkName}`;
    }

    // Check Domestic Networks
    if (networks.DomesticNetworks && networks.DomesticNetworks.includes(networkName)) {
        return `LANBridgeDomestic-${networkName}`;
    }

    // Check VPN Client Networks
    if (networks.VPNClientNetworks) {
        const vpnClient = networks.VPNClientNetworks;
        
        if (vpnClient.Wireguard && vpnClient.Wireguard.includes(networkName)) {
            return `LANBridgeVPN-${networkName}`;
        }
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.includes(networkName)) {
            return `LANBridgeVPN-${networkName}`;
        }
        if (vpnClient.L2TP && vpnClient.L2TP.includes(networkName)) {
            return `LANBridgeVPN-${networkName}`;
        }
        if (vpnClient.PPTP && vpnClient.PPTP.includes(networkName)) {
            return `LANBridgeVPN-${networkName}`;
        }
        if (vpnClient.SSTP && vpnClient.SSTP.includes(networkName)) {
            return `LANBridgeVPN-${networkName}`;
        }
        if (vpnClient.IKev2 && vpnClient.IKev2.includes(networkName)) {
            return `LANBridgeVPN-${networkName}`;
        }
    }

    return null;
};