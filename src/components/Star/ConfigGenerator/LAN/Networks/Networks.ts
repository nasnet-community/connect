import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { Subnets, SubnetConfig, WANLinks, VPNClient } from "~/components/Star/StarContext";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";
import {
    SubnetToRange,
    SubnetToFirstIP,
    SubnetToNetwork,
    SubnetToTunnelGateway,
    SubnetToTunnelGatewayIP,
    SubnetToTunnelDHCPRange,
    shouldSkipMangleRules,
} from "~/components/Star/ConfigGenerator";

type NetworkType = "Domestic" | "Foreign" | "VPN" | "Split";



// Network Base Generator
export const NetworkBaseGenerator = (NetworkType: NetworkType, Subnet: string, NetworkName?: string, includeMangle: boolean = false ): RouterConfig => {
    // Extract the prefix length from the subnet
    const [, prefix] = Subnet.split("/");
    const prefixLength = prefix || "24"; // Default to /24 if not specified

    // If NetworkName is provided, append it to NetworkType, otherwise use NetworkType alone
    const FNetworkName = NetworkName ? `${NetworkType}-${NetworkName}` : NetworkType;

    const config: RouterConfig = {
        "/interface bridge": [
            `add name="LANBridge${FNetworkName}" comment="${FNetworkName}"`
        ],
        "/interface list": [
            `add name="${FNetworkName}-WAN" comment="${FNetworkName}"`,
            `add name="${FNetworkName}-LAN" comment="${FNetworkName}"`,
        ],
        "/ip pool": [
            `add name="DHCP-pool-${FNetworkName}" ranges="${SubnetToRange(Subnet)}" comment="${FNetworkName}"`,
        ],
        "/ip dhcp-server": [
            `add address-pool="DHCP-pool-${FNetworkName}" interface="LANBridge${FNetworkName}" name="DHCP-${FNetworkName}" comment="${FNetworkName}"`,
        ],
        "/ip dhcp-server network": [
            `add address="${Subnet}" dns-server="${SubnetToFirstIP(Subnet)}" gateway="${SubnetToFirstIP(Subnet)}" comment="${FNetworkName}"`,
        ],
        "/ip address": [
            `add address="${SubnetToFirstIP(Subnet)}/${prefixLength}" interface="LANBridge${FNetworkName}" network="${SubnetToNetwork(Subnet)}" comment="${FNetworkName}"`,
        ],
        "/routing table": [
            `add fib name="to-${FNetworkName}" comment="${FNetworkName}"`
        ],
        "/interface list member": [
            `add interface="LANBridge${FNetworkName}" list="LAN" comment="${FNetworkName}"`,
            `add interface="LANBridge${FNetworkName}" list="${FNetworkName}-LAN" comment="${FNetworkName}"`,
        ],
        "/ip firewall address-list": [
            `add address="${Subnet}" list="${FNetworkName}-LAN" comment="${FNetworkName}"`,
        ],
        // "/ip firewall mangle": [
        //     // `add action=mark-connection chain=prerouting comment="DNS ${NetworkName}-LAN" dst-port=53 new-connection-mark=dns-conn-${NetworkName} passthrough=yes protocol=udp src-address-list=${NetworkName}-LAN`,
        //     // `add action=mark-connection chain=prerouting comment="DNS ${NetworkName}-LAN" dst-port=53 new-connection-mark=dns-conn-${NetworkName} passthrough=yes protocol=tcp src-address-list=${NetworkName}-LAN`,
        //     // `add action=mark-routing chain=prerouting comment="DNS ${NetworkName}-LAN" connection-mark=dns-conn-${NetworkName} new-routing-mark=to-${NetworkName} passthrough=no src-address-list=${NetworkName}-LAN`,
        //     `add action=mark-connection chain=forward comment="${NetworkName} Connection" new-connection-mark=conn-${NetworkName} passthrough=yes src-address-list=${NetworkName}-LAN`,
        //     `add action=mark-routing chain=prerouting comment="${NetworkName} Routing" connection-mark=conn-${NetworkName} new-routing-mark=to-${NetworkName} passthrough=no src-address-list=${NetworkName}-LAN`,
        // ],
        "/ip route": [
            `add comment=Blackhole blackhole disabled=no distance=99 dst-address=0.0.0.0/0 gateway="" routing-table="to-${FNetworkName}"`,
        ],
    };

    // Add routing rules for all networks except Split
    if (NetworkType !== "Split") {
        config["/routing rule"] = [
            `add action=lookup-only-in-table comment="Routing the ${FNetworkName} SRC Address" disabled=no src-address="${Subnet}" table="to-${FNetworkName}"`,
            `add action=lookup-only-in-table comment="Routing the ${FNetworkName} Routing Mark" disabled=no routing-mark="to-${FNetworkName}" table="to-${FNetworkName}"`,
        ];
    }

    // Add mangle rules if requested
    if (includeMangle) {
        config["/ip firewall mangle"] = [
            // `add action=mark-connection chain=forward comment="${FNetworkName} Connection" new-connection-mark="conn-${FNetworkName}" passthrough=yes src-address-list="${FNetworkName}-LAN"`,
            // `add action=mark-routing chain=prerouting comment="${FNetworkName} Routing" connection-mark="conn-${FNetworkName}" new-routing-mark="to-${FNetworkName}" passthrough=no src-address-list="${FNetworkName}-LAN"`,
            `add action=mark-routing chain=prerouting comment="${FNetworkName} Routing" new-routing-mark="to-${FNetworkName}" passthrough=no src-address-list="${FNetworkName}-LAN"`,
        
        ];
    }

    return config;
};

// Base Networks
export const DomesticBase = (NetworkName: string, Subnet: string, skipMangle: boolean = false): RouterConfig => {
    // Base networks don't use the NetworkName parameter - they are always named just "Domestic"
    const baseConfig = NetworkBaseGenerator("Domestic", Subnet);
    
    if (skipMangle) {
        return baseConfig;
    }
    
    const mangleConfig: RouterConfig = {
        "/ip firewall mangle": [
            // `add action=mark-connection chain=prerouting comment="DNS ${NetworkName}-LAN" dst-port=53 new-connection-mark=dns-conn-${NetworkName} passthrough=yes protocol=udp src-address-list=${NetworkName}-LAN`,
            // `add action=mark-connection chain=prerouting comment="DNS ${NetworkName}-LAN" dst-port=53 new-connection-mark=dns-conn-${NetworkName} passthrough=yes protocol=tcp src-address-list=${NetworkName}-LAN`,
            // `add action=mark-routing chain=prerouting comment="DNS ${NetworkName}-LAN" connection-mark=dns-conn-${NetworkName} new-routing-mark=to-${NetworkName} passthrough=no src-address-list=${NetworkName}-LAN`,
            // `add action=mark-connection chain=forward comment="${NetworkName} Connection" new-connection-mark="conn-${NetworkName}" passthrough=yes src-address-list="${NetworkName}-LAN"`,
            // `add action=mark-routing chain=prerouting comment="${NetworkName} Routing" connection-mark="conn-${NetworkName}" new-routing-mark="to-${NetworkName}" passthrough=no src-address-list="${NetworkName}-LAN"`,
            `add action=mark-routing chain=prerouting comment="${NetworkName} Routing" new-routing-mark="to-${NetworkName}" passthrough=no src-address-list="${NetworkName}-LAN"`,

        ],
    };

    return mergeMultipleConfigs(baseConfig, mangleConfig);
};

export const ForeignBase = (NetworkName: string, Subnet: string, skipMangle: boolean = false): RouterConfig => {
    // Base networks don't use the NetworkName parameter - they are always named just "Foreign"
    const baseConfig = NetworkBaseGenerator("Foreign", Subnet);
    
    if (skipMangle) {
        return baseConfig;
    }
    
    const mangleConfig: RouterConfig = {
        "/ip firewall mangle": [
            // `add action=mark-connection chain=prerouting comment="DNS ${NetworkName}-LAN" dst-port=53 new-connection-mark=dns-conn-${NetworkName} passthrough=yes protocol=udp src-address-list=${NetworkName}-LAN`,
            // `add action=mark-connection chain=prerouting comment="DNS ${NetworkName}-LAN" dst-port=53 new-connection-mark=dns-conn-${NetworkName} passthrough=yes protocol=tcp src-address-list=${NetworkName}-LAN`,
            // `add action=mark-routing chain=prerouting comment="DNS ${NetworkName}-LAN" connection-mark=dns-conn-${NetworkName} new-routing-mark=to-${NetworkName} passthrough=no src-address-list=${NetworkName}-LAN`,
            // `add action=mark-connection chain=forward comment="${NetworkName} Connection" new-connection-mark="conn-${NetworkName}" passthrough=yes src-address-list="${NetworkName}-LAN"`,
            // `add action=mark-routing chain=prerouting comment="${NetworkName} Routing" connection-mark="conn-${NetworkName}" new-routing-mark="to-${NetworkName}" passthrough=no src-address-list="${NetworkName}-LAN"`,
            `add action=mark-routing chain=prerouting comment="${NetworkName} Routing" new-routing-mark="to-${NetworkName}" passthrough=no src-address-list="${NetworkName}-LAN"`,

        ],
    };
    
    return mergeMultipleConfigs(baseConfig, mangleConfig);
};

export const VPNBase = (NetworkName: string, Subnet: string, skipMangle: boolean = false): RouterConfig => {
    // Base networks don't use the NetworkName parameter - they are always named just "VPN"
    const baseConfig = NetworkBaseGenerator("VPN", Subnet);
    
    if (skipMangle) {
        return baseConfig;
    }
    
    const mangleConfig: RouterConfig = {
        "/ip firewall mangle": [
            // `add action=mark-connection chain=prerouting comment="DNS ${NetworkName}-LAN" dst-port=53 new-connection-mark=dns-conn-${NetworkName} passthrough=yes protocol=udp src-address-list=${NetworkName}-LAN`,
            // `add action=mark-connection chain=prerouting comment="DNS ${NetworkName}-LAN" dst-port=53 new-connection-mark=dns-conn-${NetworkName} passthrough=yes protocol=tcp src-address-list=${NetworkName}-LAN`,
            // `add action=mark-routing chain=prerouting comment="DNS ${NetworkName}-LAN" connection-mark=dns-conn-${NetworkName} new-routing-mark=to-${NetworkName} passthrough=no src-address-list=${NetworkName}-LAN`,
            // `add action=mark-connection chain=forward comment="${NetworkName} Connection" new-connection-mark="conn-${NetworkName}" passthrough=yes src-address-list="${NetworkName}-LAN"`,
            // `add action=mark-routing chain=prerouting comment="${NetworkName} Routing" connection-mark="conn-${NetworkName}" new-routing-mark="to-${NetworkName}" passthrough=no src-address-list="${NetworkName}-LAN"`,
            `add action=mark-routing chain=prerouting comment="${NetworkName} Routing" new-routing-mark="to-${NetworkName}" passthrough=no src-address-list="${NetworkName}-LAN"`,

        ],
    };

    return mergeMultipleConfigs(baseConfig, mangleConfig);
};

export const SplitBase = (NetworkName: string, Subnet: string): RouterConfig => {
    // Base networks don't use the NetworkName parameter - they are always named just "Split"
    const baseConfig = NetworkBaseGenerator("Split", Subnet);
    
    const mangleConfig: RouterConfig = {
        "/ip firewall mangle": [
            // Split DOM IP/Domain/Game Traffic
            `add action=mark-routing chain=prerouting comment="Split-DOM" dst-address-list="SplitDOMAddList" \\
                new-routing-mark="to-Domestic" passthrough=no src-address-list="Split-LAN"`,
            // Split VPN IP/Domain/Game Traffic
            `add action=mark-routing chain=prerouting comment="Split-VPN" dst-address-list="SplitVPNAddList" \\
                new-routing-mark="to-VPN" passthrough=no src-address-list="Split-LAN"`,
            // Split FRN IP/Domain/Game Traffic
            `add action=mark-routing chain=prerouting comment="Split-FRN" dst-address-list="SplitFRNAddList" \\
                new-routing-mark="to-Foreign" passthrough=no src-address-list="Split-LAN"`,
            // Split DOM Traffic
            // `add action=mark-connection chain=forward comment="Split-DOM" dst-address-list="DOMAddList" \\
                // new-connection-mark="conn-Split-DOM" passthrough=yes src-address-list="Split-LAN"`,
            // `add action=mark-routing chain=prerouting comment="Split-DOM" connection-mark="conn-Split-DOM" \\
                // dst-address-list="DOMAddList" new-routing-mark="to-Domestic" passthrough=no src-address-list="Split-LAN"`,
            `add action=mark-routing chain=prerouting comment="Split-DOM" \\
            dst-address-list="DOMAddList" new-routing-mark="to-Domestic" passthrough=no src-address-list="Split-LAN"`,
            // Split FRN Traffic
            // `add action=mark-connection chain=forward comment="Split-!DOM" dst-address-list="!DOMAddList"\\
                // new-connection-mark="conn-Split-!DOM" passthrough=yes src-address-list="Split-LAN"`,
            // `add action=mark-routing chain=prerouting comment="Split-!DOM" connection-mark="conn-Split-!DOM"\\
                // dst-address-list="!DOMAddList" new-routing-mark="to-VPN" passthrough=no src-address-list="Split-LAN"`,
            `add action=mark-routing chain=prerouting comment="Split-!DOM"\\
            dst-address-list="!DOMAddList" new-routing-mark="to-VPN" passthrough=no src-address-list="Split-LAN"`,
        ],
    };

    return mergeMultipleConfigs(baseConfig, mangleConfig);
};

// Tunnel Network Base Generator - Uses .4 as gateway, .5+ for DHCP
export const TunnelNetworkBaseGenerator = (NetworkName: string, Subnet: string): RouterConfig => {
    const config: RouterConfig = {
        "/interface bridge": [`add name="LANBridge${NetworkName}"`],
        "/interface list": [
            `add name="${NetworkName}-WAN"`,
            `add name="${NetworkName}-LAN"`,
        ],
        "/ip pool": [
            `add name="DHCP-pool-${NetworkName}" ranges="${SubnetToTunnelDHCPRange(Subnet)}"`,
        ],
        "/ip dhcp-server": [
            `add address-pool="DHCP-pool-${NetworkName}" interface="LANBridge${NetworkName}" name="DHCP-${NetworkName}"`,
        ],
        "/ip dhcp-server network": [
            `add address="${Subnet}" dns-server="${SubnetToTunnelGatewayIP(Subnet)}" gateway="${SubnetToTunnelGatewayIP(Subnet)}"`,
        ],
        "/ip address": [
            `add address="${SubnetToTunnelGateway(Subnet)}" interface="LANBridge${NetworkName}" network="${SubnetToNetwork(Subnet)}"`,
        ],
        "/routing table": [
            `add fib name="to-${NetworkName}"`
        ],
        "/interface list member": [
            `add interface="LANBridge${NetworkName}" list=LAN`,
            `add interface="LANBridge${NetworkName}" list="${NetworkName}-LAN"`,
        ],
        "/ip firewall address-list": [
            `add address="${Subnet}" list="${NetworkName}-LAN"`,
        ],
        "/ip firewall mangle": [
            `add action=mark-connection chain=forward comment="${NetworkName} Connection" new-connection-mark="conn-${NetworkName}" passthrough=yes src-address-list="${NetworkName}-LAN"`,
            `add action=mark-routing chain=prerouting comment="${NetworkName} Routing" connection-mark="conn-${NetworkName}" new-routing-mark="to-${NetworkName}" passthrough=no src-address-list="${NetworkName}-LAN"`,
        ],
        "/ip route": [
            `add comment=Blackhole blackhole disabled=no distance=99 dst-address=0.0.0.0/0 gateway="" routing-table="to-${NetworkName}"`,
        ],
    };

    return config;
};

// Helper Functions
export const addNetwork = ( 
    network: SubnetConfig, 
    defaultName: string, 
    generator: (name: string, subnet: string, skipMangle?: boolean) => RouterConfig,
    skipMangle: boolean = false
): RouterConfig => {
    if (!network.subnet) return {};
    return generator(network.name || defaultName, network.subnet, skipMangle);
};

export const addNetworks = ( networks: SubnetConfig[], namePrefix: string, networkType: NetworkType ): RouterConfig => {
    if (!networks.length) return {};

    const configs = networks
        .filter((net): net is SubnetConfig & { subnet: string } => !!net.subnet)
        .map((net, i) => NetworkBaseGenerator(networkType, net.subnet, net.name || `${namePrefix}-${i + 1}`, true)); // Always include mangle rules for additional networks

    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};

// Helper function for Tunnel Networks - uses TunnelNetworkBaseGenerator
export const addTunnelNetworks = ( networks: SubnetConfig[], namePrefix: string ): RouterConfig => {
    if (!networks.length) return {};

    const configs = networks
        .filter((net): net is SubnetConfig & { subnet: string } => !!net.subnet)
        .map((net, i) => TunnelNetworkBaseGenerator(net.name || `${namePrefix}-${i + 1}`, net.subnet));

    return configs.length === 0 ? {} : mergeMultipleConfigs(...configs);
};

// Main Networks Function
export const Networks = (subnets: Subnets, wanLinks?: WANLinks, vpnClient?: VPNClient): RouterConfig => {
    const configs: RouterConfig[] = [];

    // Base Networks - check skipMangle per network type
    if (subnets.BaseSubnets?.Split) configs.push(addNetwork(subnets.BaseSubnets.Split, "Split", SplitBase));
    if (subnets.BaseSubnets?.Domestic) {
        const skipMangle = shouldSkipMangleRules("Domestic", wanLinks, vpnClient);
        configs.push(addNetwork(subnets.BaseSubnets.Domestic, "Domestic", DomesticBase, skipMangle));
    }
    if (subnets.BaseSubnets?.Foreign) {
        const skipMangle = shouldSkipMangleRules("Foreign", wanLinks, vpnClient);
        configs.push(addNetwork(subnets.BaseSubnets.Foreign, "Foreign", ForeignBase, skipMangle));
    }
    if (subnets.BaseSubnets?.VPN) {
        const skipMangle = shouldSkipMangleRules("VPN", wanLinks, vpnClient);
        configs.push(addNetwork(subnets.BaseSubnets.VPN, "VPN", VPNBase, skipMangle));
    }

    // Additional Networks
    configs.push(addNetworks(subnets.ForeignSubnets ?? [], "Foreign", "Foreign"));
    configs.push(addNetworks(subnets.DomesticSubnets ?? [], "Domestic", "Domestic"));

    // VPN Client Networks
    if (subnets.VPNClientSubnets) {
        const vpnClient = subnets.VPNClientSubnets;
        configs.push(addNetworks(vpnClient.Wireguard ?? [], "WG-Client", "VPN"));
        configs.push(addNetworks(vpnClient.OpenVPN ?? [], "OVPN-Client", "VPN"));
        configs.push(addNetworks(vpnClient.L2TP ?? [], "L2TP-Client", "VPN"));
        configs.push(addNetworks(vpnClient.PPTP ?? [], "PPTP-Client", "VPN"));
        configs.push(addNetworks(vpnClient.SSTP ?? [], "SSTP-Client", "VPN"));
        configs.push(addNetworks(vpnClient.IKev2 ?? [], "IKEv2-Client", "VPN"));
    }

    // // VPN Server Networks
    // if (subnets.VPNServerNetworks) {
    //     const vpnServer = subnets.VPNServerNetworks;
    //     configs.push(addNetworks(vpnServer.Wireguard ?? [], "WG-Server"));
    //     configs.push(addNetworks(vpnServer.OpenVPN ?? [], "OVPN-Server"));
    //     if (vpnServer.L2TP) configs.push(addNetwork(vpnServer.L2TP, "L2TP-Server", NetworkBaseGenerator));
    //     if (vpnServer.PPTP) configs.push(addNetwork(vpnServer.PPTP, "PPTP-Server", NetworkBaseGenerator));
    //     if (vpnServer.SSTP) configs.push(addNetwork(vpnServer.SSTP, "SSTP-Server", NetworkBaseGenerator));
    //     if (vpnServer.IKev2) configs.push(addNetwork(vpnServer.IKev2, "IKEv2-Server", NetworkBaseGenerator));
    // }

    // // Tunnel Networks - Use special IP allocation (.4 gateway, .5+ DHCP)
    // if (subnets.TunnelNetworks) {
    //     const tunnel = subnets.TunnelNetworks;
    //     configs.push(addTunnelNetworks(tunnel.IPIP ?? [], "IPIP"));
    //     configs.push(addTunnelNetworks(tunnel.Eoip ?? [], "EoIP"));
    //     configs.push(addTunnelNetworks(tunnel.Gre ?? [], "GRE"));
    //     configs.push(addTunnelNetworks(tunnel.Vxlan ?? [], "VXLAN"));
    // }

    // Filter out empty configs and merge
    const validConfigs = configs.filter(c => Object.keys(c).length > 0);
    return validConfigs.length === 0 ? {} : mergeMultipleConfigs(...validConfigs);
};