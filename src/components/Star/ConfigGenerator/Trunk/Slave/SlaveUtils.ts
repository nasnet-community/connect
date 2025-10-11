import type { RouterModels } from "~/components/Star/StarContext";
import type { Networks } from "~/components/Star/StarContext";


export const VLAN_IDS = {
    Split: 10,
    Domestic: 20,
    Foreign: 30,
    VPN: 40,
    // VPN Client base IDs
    Wireguard: 50,
    OpenVPN: 60,
    L2TP: 70,
    PPTP: 75,
    SSTP: 80,
    IKev2: 85,
    // VPN Server base IDs
    WireguardServer: 100,
    OpenVPNServer: 110,
    L2TPServer: 120,
    PPTPServer: 121,
    SSTPServer: 122,
    IKev2Server: 123,
    Socks5: 124,
    SSH: 125,
    HTTPProxy: 126,
    BackToHome: 127,
    ZeroTier: 128,
    // Tunnel base IDs
    IPIP: 130,
    Eoip: 140,
    Gre: 150,
    Vxlan: 160,
} as const;


export const getSlaveRouter = (routerModels: RouterModels[]): RouterModels | undefined => {
    return routerModels.find(router => router.isMaster === false);
};


export const getTrunkInterface = (routerModels: RouterModels[]): string | undefined => {
    const slaveRouter = getSlaveRouter(routerModels);

    if (!slaveRouter || !slaveRouter.MasterSlaveInterface) {
        return undefined;
    }

    return slaveRouter.MasterSlaveInterface;
};


export const getVLANName = (vlanId: number, networkName: string): string => {
    return `vlan${vlanId}-${networkName}`;
};


export const getBridgeName = (networkType: string, networkName?: string): string => {
    if (networkName) {
        return `LANBridge${networkType}-${networkName}`;
    }
    return `LANBridge${networkType}`;
};


export const getActiveNetworks = (networks: Networks): Array<{
    type: string;
    name?: string;
    vlanId: number;
    bridgeName: string;
    vlanName: string;
}> => {
    const activeNetworks: Array<{
        type: string;
        name?: string;
        vlanId: number;
        bridgeName: string;
        vlanName: string;
    }> = [];

    // Base Networks
    if (networks.BaseNetworks.Split) {
        activeNetworks.push({
            type: "Split",
            vlanId: VLAN_IDS.Split,
            bridgeName: getBridgeName("Split"),
            vlanName: getVLANName(VLAN_IDS.Split, "Split"),
        });
    }

    if (networks.BaseNetworks.Domestic) {
        activeNetworks.push({
            type: "Domestic",
            vlanId: VLAN_IDS.Domestic,
            bridgeName: getBridgeName("Domestic"),
            vlanName: getVLANName(VLAN_IDS.Domestic, "Domestic"),
        });
    }

    if (networks.BaseNetworks.Foreign) {
        activeNetworks.push({
            type: "Foreign",
            vlanId: VLAN_IDS.Foreign,
            bridgeName: getBridgeName("Foreign"),
            vlanName: getVLANName(VLAN_IDS.Foreign, "Foreign"),
        });
    }

    if (networks.BaseNetworks.VPN) {
        activeNetworks.push({
            type: "VPN",
            vlanId: VLAN_IDS.VPN,
            bridgeName: getBridgeName("VPN"),
            vlanName: getVLANName(VLAN_IDS.VPN, "VPN"),
        });
    }

    // Additional Foreign Networks
    if (networks.ForeignNetworks && networks.ForeignNetworks.length > 0) {
        networks.ForeignNetworks.forEach((networkName, index) => {
            const vlanId = VLAN_IDS.Foreign + index + 1;
            const fullName = `Foreign-${networkName}`;
            activeNetworks.push({
                type: "Foreign",
                name: networkName,
                vlanId,
                bridgeName: getBridgeName("Foreign", networkName),
                vlanName: getVLANName(vlanId, fullName),
            });
        });
    }

    // Additional Domestic Networks
    if (networks.DomesticNetworks && networks.DomesticNetworks.length > 0) {
        networks.DomesticNetworks.forEach((networkName, index) => {
            const vlanId = VLAN_IDS.Domestic + index + 1;
            const fullName = `Domestic-${networkName}`;
            activeNetworks.push({
                type: "Domestic",
                name: networkName,
                vlanId,
                bridgeName: getBridgeName("Domestic", networkName),
                vlanName: getVLANName(vlanId, fullName),
            });
        });
    }

    // VPN Client Networks
    if (networks.VPNClientNetworks) {
        const vpnClient = networks.VPNClientNetworks;

        // Wireguard
        if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
            vpnClient.Wireguard.forEach((networkName, index) => {
                const vlanId = VLAN_IDS.Wireguard + index;
                const fullName = `WG-Client-${networkName}`;
                activeNetworks.push({
                    type: "VPN",
                    name: `WG-Client-${networkName}`,
                    vlanId,
                    bridgeName: getBridgeName("VPN", `WG-Client-${networkName}`),
                    vlanName: getVLANName(vlanId, fullName),
                });
            });
        }

        // OpenVPN
        if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
            vpnClient.OpenVPN.forEach((networkName, index) => {
                const vlanId = VLAN_IDS.OpenVPN + index;
                const fullName = `OVPN-Client-${networkName}`;
                activeNetworks.push({
                    type: "VPN",
                    name: `OVPN-Client-${networkName}`,
                    vlanId,
                    bridgeName: getBridgeName("VPN", `OVPN-Client-${networkName}`),
                    vlanName: getVLANName(vlanId, fullName),
                });
            });
        }

        // L2TP
        if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
            vpnClient.L2TP.forEach((networkName, index) => {
                const vlanId = VLAN_IDS.L2TP + index;
                const fullName = `L2TP-Client-${networkName}`;
                activeNetworks.push({
                    type: "VPN",
                    name: `L2TP-Client-${networkName}`,
                    vlanId,
                    bridgeName: getBridgeName("VPN", `L2TP-Client-${networkName}`),
                    vlanName: getVLANName(vlanId, fullName),
                });
            });
        }

        // PPTP
        if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
            vpnClient.PPTP.forEach((networkName, index) => {
                const vlanId = VLAN_IDS.PPTP + index;
                const fullName = `PPTP-Client-${networkName}`;
                activeNetworks.push({
                    type: "VPN",
                    name: `PPTP-Client-${networkName}`,
                    vlanId,
                    bridgeName: getBridgeName("VPN", `PPTP-Client-${networkName}`),
                    vlanName: getVLANName(vlanId, fullName),
                });
            });
        }

        // SSTP
        if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
            vpnClient.SSTP.forEach((networkName, index) => {
                const vlanId = VLAN_IDS.SSTP + index;
                const fullName = `SSTP-Client-${networkName}`;
                activeNetworks.push({
                    type: "VPN",
                    name: `SSTP-Client-${networkName}`,
                    vlanId,
                    bridgeName: getBridgeName("VPN", `SSTP-Client-${networkName}`),
                    vlanName: getVLANName(vlanId, fullName),
                });
            });
        }

        // IKEv2
        if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
            vpnClient.IKev2.forEach((networkName, index) => {
                const vlanId = VLAN_IDS.IKev2 + index;
                const fullName = `IKEv2-Client-${networkName}`;
                activeNetworks.push({
                    type: "VPN",
                    name: `IKEv2-Client-${networkName}`,
                    vlanId,
                    bridgeName: getBridgeName("VPN", `IKEv2-Client-${networkName}`),
                    vlanName: getVLANName(vlanId, fullName),
                });
            });
        }
    }

    return activeNetworks;
};


export const hasWirelessInterfaces = (routerModels: RouterModels[]): boolean => {
    const slaveRouter = getSlaveRouter(routerModels);
    if (!slaveRouter) return false;

    return slaveRouter.Interfaces.Interfaces.wireless !== undefined &&
           slaveRouter.Interfaces.Interfaces.wireless.length > 0;
};


export const getAvailableEthernetInterfaces = (routerModels: RouterModels[]): string[] => {
    const slaveRouter = getSlaveRouter(routerModels);
    if (!slaveRouter || !slaveRouter.Interfaces.Interfaces.ethernet) {
        return [];
    }

    const trunkInterface = getTrunkInterface(routerModels);

    // Filter out trunk interface and occupied interfaces
    return slaveRouter.Interfaces.Interfaces.ethernet.filter(iface => {
        const isOccupied = slaveRouter.Interfaces.OccupiedInterfaces.some(
            occupied => occupied.interface === iface
        );
        return iface !== trunkInterface && !isOccupied;
    });
};
