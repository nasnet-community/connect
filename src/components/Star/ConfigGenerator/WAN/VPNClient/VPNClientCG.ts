import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { VPNClient, WANLinks } from "~/components/Star/StarContext";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";
import {
    convertVPNClientToMultiWAN,
    FailoverRecursive,
    LoadBalanceRoute,
} from "~/components/Star/ConfigGenerator";
import {
    WireguardClientWrapper,
    OpenVPNClientWrapper,
    PPTPClientWrapper,
    L2TPClientWrapper,
    SSTPClientWrapper,
    IKeV2ClientWrapper,
} from "~/components/Star/ConfigGenerator";
import { VPNEndpointMangle } from "./VPNClientUtils";




export const VPNSingleLink = ( vpnClient: VPNClient, checkIPOffset: number = 0 ): RouterConfig => {
    // Convert VPN client configurations to MultiWANInterface format
    const vpnInterfaces = convertVPNClientToMultiWAN(vpnClient, checkIPOffset);

    // Check if there's exactly one VPN interface
    if (vpnInterfaces.length !== 1) {
        return {};
    }

    const singleInterface = vpnInterfaces[0];
    
    // For a single VPN link, create a simple route in the VPN routing table
    const config: RouterConfig = {
        "/ip route": [
            `add dst-address="0.0.0.0/0" gateway="${singleInterface.gateway}" routing-table="to-VPN" distance=${singleInterface.distance} comment="Route-to-VPN-${singleInterface.name}"`,
        ],
    };

    return config;
};

export const VPNMultiLink = ( VPNClient: VPNClient, checkIPOffset: number = 0 ): RouterConfig => {
    const configs: RouterConfig[] = [];
    
    // Convert VPN client configurations to MultiWANInterface format
    const vpnInterfaces = convertVPNClientToMultiWAN(VPNClient, checkIPOffset);

    // If no VPN interfaces or only one, no multi-link configuration needed
    if (vpnInterfaces.length <= 1) {
        return {};
    }

    // Check if MultiLinkConfig is defined
    const multiLinkConfig = VPNClient.MultiLinkConfig;

    if (!multiLinkConfig) {
        // Default behavior: use failover for VPN connections in to-VPN table
        return FailoverRecursive(vpnInterfaces, "to-VPN");
    }

    // Handle different strategies based on configuration
    switch (multiLinkConfig.strategy) {
        case "LoadBalance": {
            const loadBalanceMethod = multiLinkConfig.loadBalanceMethod || "PCC";
            // Only PCC and NTH are supported for LoadBalanceRoute
            if (loadBalanceMethod === "PCC" || loadBalanceMethod === "NTH") {
                configs.push(LoadBalanceRoute(vpnInterfaces, loadBalanceMethod, "to-VPN"));
            } else if (loadBalanceMethod === "ECMP") {
                // ECMP would be handled differently - for now fallback to PCC
                configs.push(LoadBalanceRoute(vpnInterfaces, "PCC", "to-VPN"));
            }
            // Also add failover routes for VPN table
            configs.push(FailoverRecursive(vpnInterfaces, "to-VPN"));
            break;
        }

        case "Failover":
            // Use recursive failover in VPN routing table
            configs.push(FailoverRecursive(vpnInterfaces, "to-VPN"));
            break;

        case "RoundRobin":
            // Round-robin using NTH method
            configs.push(LoadBalanceRoute(vpnInterfaces, "NTH", "to-VPN"));
            configs.push(FailoverRecursive(vpnInterfaces, "to-VPN"));
            break;

        case "Both": {
            // Combine load balancing with failover
            const loadBalanceMethod = multiLinkConfig.loadBalanceMethod || "PCC";
            // Only PCC and NTH are supported for LoadBalanceRoute
            if (loadBalanceMethod === "PCC" || loadBalanceMethod === "NTH") {
                configs.push(LoadBalanceRoute(vpnInterfaces, loadBalanceMethod, "to-VPN"));
            } else if (loadBalanceMethod === "ECMP") {
                // ECMP would be handled differently - for now fallback to PCC
                configs.push(LoadBalanceRoute(vpnInterfaces, "PCC", "to-VPN"));
            }
            configs.push(FailoverRecursive(vpnInterfaces, "to-VPN"));
            break;
        }

        default:
            configs.push(FailoverRecursive(vpnInterfaces, "to-VPN"));
    }

    return mergeMultipleConfigs(...configs);
}


export const VPNClientWrapper = ( vpnClient: VPNClient, wanLinks?: WANLinks ): RouterConfig => {
    const { Wireguard, OpenVPN, PPTP, L2TP, SSTP, IKeV2 } = vpnClient;

    const configs: RouterConfig[] = [];

    // Calculate offset for VPN check IPs to avoid conflicts with Foreign WAN
    // If there are Foreign WAN links, offset VPN by their count
    const foreignWANCount = wanLinks?.Foreign?.WANConfigs ? wanLinks.Foreign.WANConfigs.length : 0;
    const vpnCheckIPOffset = foreignWANCount;

    // 1. Process all VPN protocol configurations
    if (Wireguard && Wireguard.length > 0) {
        configs.push(WireguardClientWrapper(Wireguard));
    }

    if (OpenVPN && OpenVPN.length > 0) {
        configs.push(OpenVPNClientWrapper(OpenVPN));
    }

    if (PPTP && PPTP.length > 0) {
        configs.push(PPTPClientWrapper(PPTP));
    }

    if (L2TP && L2TP.length > 0) {
        configs.push(L2TPClientWrapper(L2TP));
    }

    if (SSTP && SSTP.length > 0) {
        configs.push(SSTPClientWrapper(SSTP));
    }

    if (IKeV2 && IKeV2.length > 0) {
        configs.push(IKeV2ClientWrapper(IKeV2));
    }

    // 2. Add VPN routing configuration based on number of VPN interfaces
    const vpnInterfaces = convertVPNClientToMultiWAN(vpnClient, vpnCheckIPOffset);

    if (vpnInterfaces.length === 1) {
        // Single VPN link - add simple routing
        configs.push(VPNSingleLink(vpnClient, vpnCheckIPOffset));
    } else if (vpnInterfaces.length > 1) {
        // Multiple VPN links - add multi-link routing (load balancing/failover)
        configs.push(VPNMultiLink(vpnClient, vpnCheckIPOffset));
    }

    // 3. Add VPN endpoint mangle rules (once for all VPN clients)
    if (vpnInterfaces.length > 0) {
        configs.push(VPNEndpointMangle());
    }

    // Merge all VPN client configurations
    return mergeMultipleConfigs(...configs);
};


