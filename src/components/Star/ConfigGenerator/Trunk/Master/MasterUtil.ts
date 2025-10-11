import { CommandShortner, type RouterConfig } from "~/components/Star/ConfigGenerator";
import { type ChooseState, type WirelessConfig } from "~/components/Star/StarContext";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";







const VLAN_IDS = {
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










export const createVLAN = ( vlanId: number, interfaceName: string, networkName: string, comment: string ): RouterConfig => {
    return {
        "/interface vlan": [
            `add name="VLAN${vlanId}-${interfaceName}-${networkName}" comment="${comment}" interface="${interfaceName}" vlan-id=${vlanId}`,
        ],
    };
};


export const addVLANToBridge = ( vlanInterfaceName: string, bridgeName: string, comment: string ): RouterConfig => {
    return {
        "/interface bridge port": [
            `add bridge="${bridgeName}" interface="${vlanInterfaceName}" comment="${comment}"`,
        ],
    };
};


export const generateBaseNetworkVLANs = ( choose: ChooseState, trunkInterface: string ): RouterConfig => {
    const configs: RouterConfig[] = [];
    const networks = choose.Networks.BaseNetworks;

    // Split Network
    if (networks.Split) {
        const vlanId = VLAN_IDS.Split;
        const networkName = "Split";
        const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;

        configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
    }

    // Domestic Network
    if (networks.Domestic) {
        const vlanId = VLAN_IDS.Domestic;
        const networkName = "Domestic";
        const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;

        configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
    }

    // Foreign Network
    if (networks.Foreign) {
        const vlanId = VLAN_IDS.Foreign;
        const networkName = "Foreign";
        const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;

        configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
    }

    // VPN Network
    if (networks.VPN) {
        const vlanId = VLAN_IDS.VPN;
        const networkName = "VPN";
        const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;

        configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
    }

    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};


export const generateAdditionalNetworkVLANs = ( choose: ChooseState, trunkInterface: string ): RouterConfig => {
    const configs: RouterConfig[] = [];
    const networks = choose.Networks;

    // Foreign Networks (Foreign-1, Foreign-2, etc.)
    if (networks.ForeignNetworks && networks.ForeignNetworks.length > 0) {
        networks.ForeignNetworks.forEach((networkName, index) => {
            const vlanId = VLAN_IDS.Foreign + index + 1;
            const fullNetworkName = `Foreign-${networkName}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeForeign-${networkName}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // Domestic Networks (Domestic-1, Domestic-2, etc.)
    if (networks.DomesticNetworks && networks.DomesticNetworks.length > 0) {
        networks.DomesticNetworks.forEach((networkName, index) => {
            const vlanId = VLAN_IDS.Domestic + index + 1;
            const fullNetworkName = `Domestic-${networkName}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeDomestic-${networkName}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};


export const generateVPNClientNetworkVLANs = ( choose: ChooseState, trunkInterface: string ): RouterConfig => {
    const configs: RouterConfig[] = [];
    const vpnClient = choose.Networks.VPNClientNetworks;

    if (!vpnClient) return {};

    // Wireguard Client
    if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
        vpnClient.Wireguard.forEach((networkName, index) => {
            const vlanId = VLAN_IDS.Wireguard + index;
            const fullNetworkName = `WG-Client-${networkName}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-WG-Client-${networkName}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // OpenVPN Client
    if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
        vpnClient.OpenVPN.forEach((networkName, index) => {
            const vlanId = VLAN_IDS.OpenVPN + index;
            const fullNetworkName = `OVPN-Client-${networkName}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-OVPN-Client-${networkName}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // L2TP Client
    if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
        vpnClient.L2TP.forEach((networkName, index) => {
            const vlanId = VLAN_IDS.L2TP + index;
            const fullNetworkName = `L2TP-Client-${networkName}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-L2TP-Client-${networkName}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // PPTP Client
    if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
        vpnClient.PPTP.forEach((networkName, index) => {
            const vlanId = VLAN_IDS.PPTP + index;
            const fullNetworkName = `PPTP-Client-${networkName}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-PPTP-Client-${networkName}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // SSTP Client
    if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
        vpnClient.SSTP.forEach((networkName, index) => {
            const vlanId = VLAN_IDS.SSTP + index;
            const fullNetworkName = `SSTP-Client-${networkName}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-SSTP-Client-${networkName}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // IKEv2 Client
    if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
        vpnClient.IKev2.forEach((networkName, index) => {
            const vlanId = VLAN_IDS.IKev2 + index;
            const fullNetworkName = `IKEv2-Client-${networkName}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-IKEv2-Client-${networkName}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};


export const generateTrunkWirelessSteering = (): RouterConfig => {
    const steeringName = "Trunk";
    const neighborGroup = "wifi2.4-Trunk,wifi5-Trunk";
    
    const config: RouterConfig = {
        "/interface wifi": [
            `steering add comment="${steeringName}" disabled=no name="${steeringName}" neighbor-group="${neighborGroup}" rrm=yes wnm=yes`
        ]
    };
    
    return config;
};


export const generateTrunkWirelessSteeringAssignment = (): RouterConfig => {
    const steeringName = "Trunk";
    
    const config: RouterConfig = {
        "/interface wifi": [
            `set [ find name="wifi2.4-Trunk" ] steering="${steeringName}"`,
            `set [ find name="wifi5-Trunk" ] steering="${steeringName}"`
        ]
    };
    
    return config;
};


export const addTrunkInterfaceToBridge = (choose: ChooseState, trunkInterface: string): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge port": []
    };
    
    const baseNetworks = choose.Networks.BaseNetworks;
    
    // Determine which bridge to use (Split takes priority)
    let bridgeName: string | null = null;
    if (baseNetworks.Split) {
        bridgeName = "LANBridgeSplit";
    } else if (baseNetworks.VPN) {
        bridgeName = "LANBridgeVPN";
    }
    
    // If no Split or VPN network exists, return empty config
    if (!bridgeName) {
        return {};
    }
    
    // Check if trunk interface is wireless
    const isWirelessTrunk = trunkInterface.includes("wifi");
    
    if (isWirelessTrunk) {
        // Add both wireless trunk interfaces to bridge
        config["/interface bridge port"].push(
            `add bridge="${bridgeName}" interface=wifi2.4-Trunk comment="Trunk 2.4"`,
            `add bridge="${bridgeName}" interface=wifi5-Trunk comment="Trunk 5"`
        );
    } else {
        // Add wired trunk interface to bridge
        config["/interface bridge port"].push(
            `add bridge="${bridgeName}" interface="${trunkInterface}" comment="Trunk Interface"`
        );
    }
    
    return config;
};


export const generateWirelessTrunkInterface = (  wirelessConfigs: WirelessConfig[] ): RouterConfig => {
    // Only generate if there are wireless configurations
    if (wirelessConfigs.length === 0) {
        return {};
    }
    
    // Use the first wireless config for the trunk connection
    const firstConfig = wirelessConfigs[0];
    
    // Create trunk station slave interface with "!" prefix for station mode SSID
    const trunkSSID = `${firstConfig.SSID}!`;
    const trunkPassword = `${firstConfig.Password}!`;
    
    const commands: string[] = [];
    
    // Generate slave interface for 2.4GHz band
    const masterInterface24 = "wifi2";
    const masterInterfaceFind24 = `[ find default-name=${masterInterface24} ]`;
    const interfaceName24 = "wifi2.4-Trunk";
    
    let command24 = `add configuration.mode=ap .ssid="${trunkSSID}" .installation=indoor master-interface=${masterInterfaceFind24} name="${interfaceName24}" comment="Trunk 2.4"`;
    command24 = `${command24} configuration.hide-ssid=yes`;
    command24 = `${command24} security.authentication-types=wpa2-psk,wpa3-psk .passphrase="${trunkPassword}" disabled=no`;
    command24 = `${command24} security.ft=yes .ft-over-ds=yes`;
    commands.push(command24);
    
    // Generate slave interface for 5GHz band
    const masterInterface5 = "wifi1";
    const masterInterfaceFind5 = `[ find default-name=${masterInterface5} ]`;
    const interfaceName5 = "wifi5-Trunk";
    
    let command5 = `add configuration.mode=ap .ssid="${trunkSSID}" .installation=indoor master-interface=${masterInterfaceFind5} name="${interfaceName5}" comment="Trunk 5"`;
    command5 = `${command5} configuration.hide-ssid=yes`;
    command5 = `${command5} security.authentication-types=wpa2-psk,wpa3-psk .passphrase="${trunkPassword}" disabled=no`;
    command5 = `${command5} security.ft=yes .ft-over-ds=yes`;
    commands.push(command5);
    
    // Add steering profile
    const steeringConfig = generateTrunkWirelessSteering();
    commands.push(...steeringConfig["/interface wifi"]);
    
    // Add steering assignments
    const steeringAssignment = generateTrunkWirelessSteeringAssignment();
    commands.push(...steeringAssignment["/interface wifi"]);
    
    const config: RouterConfig = {
        "/interface wifi": commands,
    };
    
    // VLANs and bridge configurations will be handled by the existing VLAN generation functions
    return CommandShortner(config);
};