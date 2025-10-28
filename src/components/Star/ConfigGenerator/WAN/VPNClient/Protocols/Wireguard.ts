import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { WireguardClientConfig } from "~/components/Star/StarContext";
import {
    mergeConfigurations,
    mergeMultipleConfigs,
} from "~/components/Star/ConfigGenerator";
import { BaseVPNConfig, GenerateVCInterfaceName } from "~/components/Star/ConfigGenerator";
import { ForeignCheckIPs } from "~/components/Star/ConfigGenerator";


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
        // PeerPersistentKeepalive,
    } = config;

    const interfaceName = GenerateVCInterfaceName(Name, "Wireguard");

    let interfaceCommand = `add name="${interfaceName}" private-key="${InterfacePrivateKey}" comment="wg-client-${Name}"`;

    if (InterfaceListenPort) {
        interfaceCommand += ` listen-port="${InterfaceListenPort}"`;
    }

    if (InterfaceMTU) {
        interfaceCommand += ` mtu="${InterfaceMTU}"`;
    }

    routerConfig["/interface wireguard"].push(interfaceCommand);

    let peerCommand = `add interface="${interfaceName}" public-key="${PeerPublicKey}" \\
         endpoint-address="${PeerEndpointAddress}" endpoint-port="${PeerEndpointPort}" \\
         allowed-address="${PeerAllowedIPs}" comment="wg-client-peer-${Name}"`;

    if (PeerPresharedKey) {
        peerCommand += ` preshared-key="${PeerPresharedKey}"`;
    }

    // if (PeerPersistentKeepalive) {
        peerCommand += ` persistent-keepalive=25s`;
    // }

    routerConfig["/interface wireguard peers"].push(peerCommand);

    // Replace /32 with /30 for better routing compatibility
    const finalInterfaceAddress = InterfaceAddress.endsWith('/32') 
        ? InterfaceAddress.replace('/32', '/30') 
        : InterfaceAddress;

    routerConfig["/ip address"].push(
        `add address="${finalInterfaceAddress}" interface="${interfaceName}" comment="VPN-client-${Name}"`,
    );

    // routerConfig["/ip route"].push(
    //     `add dst-address=${PeerEndpointAddress}/32 gateway=[/ip dhcp-client get [find] gateway] \\
    //      comment="WireGuard endpoint route"`
    // );

    // routerConfig["/ip route"].push(
    //     `add dst-address=0.0.0.0/0 gateway=${interfaceName} routing-table=to-VPN \\
    //      comment="WireGuard endpoint route"`,
    // );

    return routerConfig;
};

export const WireguardClientWrapper = ( configs: WireguardClientConfig[] ): RouterConfig => {
    const routerConfigs: RouterConfig[] = [];

    configs.forEach((wgConfig, index) => {
        const vpnConfig = WireguardClient(wgConfig);
        const interfaceName = GenerateVCInterfaceName(wgConfig.Name, "Wireguard");
        const endpointAddress = wgConfig.PeerEndpointAddress;
        
        // Calculate checkIP using the same logic as convertVPNClientToMultiWAN
        const checkIP = ForeignCheckIPs[index % ForeignCheckIPs.length];

        const baseConfig = BaseVPNConfig(
            interfaceName,
            endpointAddress,
            wgConfig.Name,
            wgConfig.WanInterface,
            checkIP,
        );

        routerConfigs.push(mergeConfigurations(vpnConfig, baseConfig));
    });

    return mergeMultipleConfigs(...routerConfigs);
};