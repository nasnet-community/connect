import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type {
    IpipTunnelConfig,
    EoipTunnelConfig,
    GreTunnelConfig,
    VxlanInterfaceConfig,
    Tunnel,
    SubnetConfig,
    TunnelNetworksSubnets,
} from "~/components/Star/StarContext";
import {
    CommandShortner,
    mergeRouterConfigs,
} from "~/components/Star/ConfigGenerator";
import {
    TunnelInboundTraffic,
    findSubnetByName,
    generateIPAddress,
    buildTunnelIPAddress,
    TunnelInterfaceList,
    TunnelAddressList,
    IPIPInterface,
    EoipInterface,
    GreInterface,
    VxlanInterface,
} from "./TunnelUtils";



export const IPIPInterfaceWrapper = (ipip: IpipTunnelConfig, subnet?: SubnetConfig): RouterConfig => {
    const configs: RouterConfig[] = [];
    
    // Create the interface
    configs.push(IPIPInterface(ipip));

    // Add subnet-based configurations if subnet is provided
    if (subnet && subnet.subnet) {
        const networkType = ipip.NetworkType || "VPN";
        const tunnelType = "IPIP";
        
        // Add IP address to tunnel interface
        configs.push(generateIPAddress(
            buildTunnelIPAddress(ipip.localAddress, subnet),
            ipip.name,
            `${tunnelType} tunnel ${ipip.name}`
        ));

        // Add interface to interface lists
        configs.push(TunnelInterfaceList(
            ipip.name,
            networkType,
            `${tunnelType} tunnel ${ipip.name}`
        ));

        // Add subnet to address list
        configs.push(TunnelAddressList(
            subnet.subnet,
            networkType,
            `${tunnelType} tunnel subnet ${ipip.name}`
        ));
    }

    return CommandShortner(mergeRouterConfigs(...configs));
};

export const EoipInterfaceWrapper = (eoip: EoipTunnelConfig, subnet?: SubnetConfig): RouterConfig => {
    const configs: RouterConfig[] = [];
    
    // Create the interface
    configs.push(EoipInterface(eoip));

    // Add subnet-based configurations if subnet is provided
    if (subnet && subnet.subnet) {
        const networkType = eoip.NetworkType || "VPN";
        const tunnelType = "EoIP";
        
        // Add IP address to tunnel interface
        configs.push(generateIPAddress(
            buildTunnelIPAddress(eoip.localAddress, subnet),
            eoip.name,
            `${tunnelType} tunnel ${eoip.name}`
        ));

        // Add interface to interface lists
        configs.push(TunnelInterfaceList(
            eoip.name,
            networkType,
            `${tunnelType} tunnel ${eoip.name}`
        ));

        // Add subnet to address list
        configs.push(TunnelAddressList(
            subnet.subnet,
            networkType,
            `${tunnelType} tunnel subnet ${eoip.name}`
        ));
    }

    return CommandShortner(mergeRouterConfigs(...configs));
};

export const GreInterfaceWrapper = (gre: GreTunnelConfig, subnet?: SubnetConfig): RouterConfig => {
    const configs: RouterConfig[] = [];
    
    // Create the interface
    configs.push(GreInterface(gre));

    // Add subnet-based configurations if subnet is provided
    if (subnet && subnet.subnet) {
        const networkType = gre.NetworkType || "VPN";
        const tunnelType = "GRE";
        
        // Add IP address to tunnel interface
        configs.push(generateIPAddress(
            buildTunnelIPAddress(gre.localAddress, subnet),
            gre.name,
            `${tunnelType} tunnel ${gre.name}`
        ));

        // Add interface to interface lists
        configs.push(TunnelInterfaceList(
            gre.name,
            networkType,
            `${tunnelType} tunnel ${gre.name}`
        ));

        // Add subnet to address list
        configs.push(TunnelAddressList(
            subnet.subnet,
            networkType,
            `${tunnelType} tunnel subnet ${gre.name}`
        ));
    }

    return CommandShortner(mergeRouterConfigs(...configs));
};

export const VxlanInterfaceWrapper = (vxlan: VxlanInterfaceConfig, subnet?: SubnetConfig): RouterConfig => {
    const configs: RouterConfig[] = [];
    
    // Create the interface
    configs.push(VxlanInterface(vxlan));

    // Add subnet-based configurations if subnet is provided
    if (subnet && subnet.subnet) {
        const networkType = vxlan.NetworkType || "VPN";
        const tunnelType = "VXLAN";
        
        // Add IP address to tunnel interface
        configs.push(generateIPAddress(
            buildTunnelIPAddress(vxlan.localAddress, subnet),
            vxlan.name,
            `${tunnelType} tunnel ${vxlan.name}`
        ));

        // Add interface to interface lists
        configs.push(TunnelInterfaceList(
            vxlan.name,
            networkType,
            `${tunnelType} tunnel ${vxlan.name}`
        ));

        // Add subnet to address list
        configs.push(TunnelAddressList(
            subnet.subnet,
            networkType,
            `${tunnelType} tunnel subnet ${vxlan.name}`
        ));
    }

    return CommandShortner(mergeRouterConfigs(...configs));
};

export const TunnelWrapper = (tunnel: Tunnel, tunnelSubnets?: TunnelNetworksSubnets): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Add Inbound Traffic Marking rules for tunnel protocols
    const inboundTrafficConfig = TunnelInboundTraffic(tunnel);
    if (inboundTrafficConfig["/ip firewall mangle"].length > 0) {
        configs.push(inboundTrafficConfig);
    }

    // Process IPIP tunnels
    if (tunnel.IPIP && tunnel.IPIP.length > 0) {
        tunnel.IPIP.forEach((ipip) => {
            const matchedSubnet = findSubnetByName(ipip.name, tunnelSubnets?.IPIP);
            const ipipConfig = IPIPInterfaceWrapper(ipip, matchedSubnet);
            configs.push(ipipConfig);
        });
    }

    // Process EoIP tunnels
    if (tunnel.Eoip && tunnel.Eoip.length > 0) {
        tunnel.Eoip.forEach((eoip) => {
            const matchedSubnet = findSubnetByName(eoip.name, tunnelSubnets?.Eoip);
            const eoipConfig = EoipInterfaceWrapper(eoip, matchedSubnet);
            configs.push(eoipConfig);
        });
    }

    // Process GRE tunnels
    if (tunnel.Gre && tunnel.Gre.length > 0) {
        tunnel.Gre.forEach((gre) => {
            const matchedSubnet = findSubnetByName(gre.name, tunnelSubnets?.Gre);
            const greConfig = GreInterfaceWrapper(gre, matchedSubnet);
            configs.push(greConfig);
        });
    }

    // Process VXLAN tunnels
    if (tunnel.Vxlan && tunnel.Vxlan.length > 0) {
        tunnel.Vxlan.forEach((vxlan) => {
            const matchedSubnet = findSubnetByName(vxlan.name, tunnelSubnets?.Vxlan);
            const vxlanConfig = VxlanInterfaceWrapper(vxlan, matchedSubnet);
            configs.push(vxlanConfig);
        });
    }

    return CommandShortner(mergeRouterConfigs(...configs));
};
