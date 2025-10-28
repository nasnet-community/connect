import type { VPNClient, WANLinks } from "~/components/Star/StarContext";
import {
    type RouterConfig,
    mergeMultipleConfigs,
    WireguardClientWrapper,
    OpenVPNClientWrapper,
    PPTPClientWrapper,
    L2TPClientWrapper,
    SSTPClientWrapper,
    IKeV2ClientWrapper,
    convertVPNClientToMultiWAN,
    FailoverRecursive,
    LoadBalanceRoute,
    VPNEndpointMangle,
    VPNEScript,
} from "~/components/Star/ConfigGenerator";




export const VPNSingleLink = ( vpnClient: VPNClient, checkIPOffset: number = 0 ): RouterConfig => {
    // Convert VPN client configurations to MultiWANInterface format
    const vpnInterfaces = convertVPNClientToMultiWAN(vpnClient, checkIPOffset);

    // Check if there's exactly one VPN interface
    if (vpnInterfaces.length !== 1) {
        return {};
    }

    const singleInterface = vpnInterfaces[0];
    
    // For a single VPN link, create routes in the VPN routing table
    const config: RouterConfig = {
        "/ip route": [
            `add dst-address="0.0.0.0/0" gateway="${singleInterface.gateway}" routing-table="to-VPN" distance=${singleInterface.distance} comment="Route-to-VPN-${singleInterface.name}"`,
        ],
    };

    // Add CheckIP route for failover monitoring
    if (singleInterface.checkIP) {
        const checkIPDistance = 1; // Distance 1 for single VPN link in to-VPN table
        
        config["/ip route"].push(
            `add check-gateway=ping dst-address="${singleInterface.checkIP}" gateway="${singleInterface.gateway}" routing-table="to-VPN" \\
            distance=${checkIPDistance} target-scope="11" comment="Route-to-VPN-${singleInterface.name}"`
        );
    }

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

    // Pre-convert all VPN clients to MultiWANInterface to get consistent CheckIPs
    // This ensures the same CheckIP is used across individual, aggregated, and main tables
    const vpnInterfaces = convertVPNClientToMultiWAN(vpnClient, vpnCheckIPOffset);
    
    // Create checkIP map for easy lookup by VPN name
    const vpnCheckIPMap = new Map<string, string>();
    vpnInterfaces.forEach((iface) => {
        if (iface.checkIP) {
            vpnCheckIPMap.set(iface.name, iface.checkIP);
        }
    });

    // 1. Process all VPN protocol configurations with pre-assigned CheckIPs
    if (Wireguard && Wireguard.length > 0) {
        configs.push(WireguardClientWrapper(Wireguard, vpnCheckIPMap));
    }

    if (OpenVPN && OpenVPN.length > 0) {
        configs.push(OpenVPNClientWrapper(OpenVPN, vpnCheckIPMap));
    }

    if (PPTP && PPTP.length > 0) {
        configs.push(PPTPClientWrapper(PPTP, vpnCheckIPMap));
    }

    if (L2TP && L2TP.length > 0) {
        configs.push(L2TPClientWrapper(L2TP, vpnCheckIPMap));
    }

    if (SSTP && SSTP.length > 0) {
        configs.push(SSTPClientWrapper(SSTP, vpnCheckIPMap));
    }

    if (IKeV2 && IKeV2.length > 0) {
        configs.push(IKeV2ClientWrapper(IKeV2, vpnCheckIPMap));
    }

    // 2. Add VPN routing configuration based on number of VPN interfaces
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
        configs.push(VPNEScript());
    }

    // Merge all VPN client configurations
    return mergeMultipleConfigs(...configs);
};


