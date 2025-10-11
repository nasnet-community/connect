import { CommandShortner, type RouterConfig } from "~/components/Star/ConfigGenerator";
import { type ChooseState, type WirelessConfig, type Subnets } from "~/components/Star/StarContext";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";



/**
 * Extract the third octet from a subnet string to use as VLAN ID
 * Example: "192.168.10.0/24" → 10
 */
const extractThirdOctet = (subnet: string): number => {
    const parts = subnet.split('/')[0].split('.');
    return parseInt(parts[2], 10);
};










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


export const generateBaseNetworkVLANs = ( subnets: Subnets, trunkInterface: string ): RouterConfig => {
    const configs: RouterConfig[] = [];
    const baseNetworks = subnets.BaseNetworks;

    // Split Network
    if (baseNetworks.Split?.subnet) {
        const vlanId = extractThirdOctet(baseNetworks.Split.subnet);
        const networkName = "Split";
        const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;

        configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
    }

    // Domestic Network
    if (baseNetworks.Domestic?.subnet) {
        const vlanId = extractThirdOctet(baseNetworks.Domestic.subnet);
        const networkName = "Domestic";
        const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;

        configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
    }

    // Foreign Network
    if (baseNetworks.Foreign?.subnet) {
        const vlanId = extractThirdOctet(baseNetworks.Foreign.subnet);
        const networkName = "Foreign";
        const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;

        configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
    }

    // VPN Network
    if (baseNetworks.VPN?.subnet) {
        const vlanId = extractThirdOctet(baseNetworks.VPN.subnet);
        const networkName = "VPN";
        const vlanName = `VLAN${vlanId}-${trunkInterface}-${networkName}`;

        configs.push(createVLAN(vlanId, trunkInterface, networkName, `${networkName} Network VLAN`));
        configs.push(addVLANToBridge(vlanName, `LANBridge${networkName}`, `${networkName} VLAN to Bridge`));
    }

    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};


export const generateAdditionalNetworkVLANs = ( subnets: Subnets, trunkInterface: string ): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Foreign Networks
    if (subnets.ForeignNetworks && subnets.ForeignNetworks.length > 0) {
        subnets.ForeignNetworks.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `Foreign-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeForeign-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // Domestic Networks
    if (subnets.DomesticNetworks && subnets.DomesticNetworks.length > 0) {
        subnets.DomesticNetworks.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `Domestic-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeDomestic-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};


export const generateVPNClientNetworkVLANs = ( subnets: Subnets, trunkInterface: string ): RouterConfig => {
    const configs: RouterConfig[] = [];
    const vpnClient = subnets.VPNClientNetworks;

    if (!vpnClient) return {};

    // Wireguard Client
    if (vpnClient.Wireguard && vpnClient.Wireguard.length > 0) {
        vpnClient.Wireguard.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `WG-Client-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-WG-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // OpenVPN Client
    if (vpnClient.OpenVPN && vpnClient.OpenVPN.length > 0) {
        vpnClient.OpenVPN.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `OVPN-Client-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-OVPN-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // L2TP Client
    if (vpnClient.L2TP && vpnClient.L2TP.length > 0) {
        vpnClient.L2TP.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `L2TP-Client-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-L2TP-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // PPTP Client
    if (vpnClient.PPTP && vpnClient.PPTP.length > 0) {
        vpnClient.PPTP.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `PPTP-Client-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-PPTP-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // SSTP Client
    if (vpnClient.SSTP && vpnClient.SSTP.length > 0) {
        vpnClient.SSTP.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `SSTP-Client-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-SSTP-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
        });
    }

    // IKEv2 Client
    if (vpnClient.IKev2 && vpnClient.IKev2.length > 0) {
        vpnClient.IKev2.forEach((subnetConfig) => {
            const vlanId = extractThirdOctet(subnetConfig.subnet);
            const fullNetworkName = `IKEv2-Client-${subnetConfig.name}`;
            const vlanName = `VLAN${vlanId}-${trunkInterface}-${fullNetworkName}`;

            configs.push(createVLAN(vlanId, trunkInterface, fullNetworkName, `${fullNetworkName} Network VLAN`));
            configs.push(addVLANToBridge(vlanName, `LANBridgeVPN-IKEv2-Client-${subnetConfig.name}`, `${fullNetworkName} VLAN to Bridge`));
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
    if (baseNetworks?.Split) {
        bridgeName = "LANBridgeSplit";
    } else if (baseNetworks?.VPN) {
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