import type { RouterConfig } from "../../../ConfigGenerator";
import type { WireguardClientConfig } from "../../../../StarContext/Utils/VPNClientType";
import {
    mergeConfigurations,
    mergeMultipleConfigs,
} from "../../../utils/ConfigGeneratorUtil";
import { BaseVPNConfig, GenerateVCInterfaceName } from "./../VPNClientUtils";


// Wireguard Client

export const WireguardClient = ( config: WireguardClientConfig ): RouterConfig => {
    const routerConfig: RouterConfig = {
        "/interface wireguard": [],
        "/interface wireguard peers": [],
        "/ip address": [],
        "/ip route": [],
    };

    const {
        Name,
        InterfacePrivateKey,
        InterfaceAddress,
        InterfaceListenPort,
        InterfaceMTU,
        PeerPublicKey,
        PeerEndpointAddress,
        PeerEndpointPort,
        PeerAllowedIPs,
        PeerPresharedKey,
        PeerPersistentKeepalive,
    } = config;

    const interfaceName = GenerateVCInterfaceName(Name, "Wireguard");

    let interfaceCommand = `add name=${interfaceName} private-key="${InterfacePrivateKey}"`;

    if (InterfaceListenPort) {
        interfaceCommand += ` listen-port=${InterfaceListenPort}`;
    }

    if (InterfaceMTU) {
        interfaceCommand += ` mtu=${InterfaceMTU}`;
    }

    routerConfig["/interface wireguard"].push(interfaceCommand);

    let peerCommand = `add interface=${interfaceName} public-key="${PeerPublicKey}" \\
         endpoint-address=${PeerEndpointAddress} endpoint-port=${PeerEndpointPort} \\
         allowed-address=${PeerAllowedIPs}`;

    if (PeerPresharedKey) {
        peerCommand += ` preshared-key="${PeerPresharedKey}"`;
    }

    if (PeerPersistentKeepalive) {
        peerCommand += ` persistent-keepalive=${PeerPersistentKeepalive}s`;
    }

    routerConfig["/interface wireguard peers"].push(peerCommand);

    routerConfig["/ip address"].push(
        `add address=${InterfaceAddress} interface=${interfaceName}`,
    );

    // routerConfig["/ip route"].push(
    //     `add dst-address=${PeerEndpointAddress}/32 gateway=[/ip dhcp-client get [find] gateway] \\
    //      comment="WireGuard endpoint route"`
    // );

    routerConfig["/ip route"].push(
        `add dst-address=0.0.0.0/0 gateway=${interfaceName} routing-table=to-VPN \\
         comment="WireGuard endpoint route"`,
    );

    return routerConfig;
};

export const WireguardClientWrapper = ( configs: WireguardClientConfig[] ): RouterConfig => {
    const routerConfigs: RouterConfig[] = [];

    configs.forEach((wgConfig) => {
        const vpnConfig = WireguardClient(wgConfig);
        const interfaceName = GenerateVCInterfaceName(wgConfig.Name, "Wireguard");
        const endpointAddress = wgConfig.PeerEndpointAddress;

        const baseConfig = BaseVPNConfig(
            interfaceName,
            endpointAddress,
            wgConfig.Name,
        );

        routerConfigs.push(mergeConfigurations(vpnConfig, baseConfig));
    });

    return mergeMultipleConfigs(...routerConfigs);
};