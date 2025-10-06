import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { VPNClient, WANLinks } from "~/components/Star/StarContext";
import {
    PCCMangle,
    NTHMangle,
    LoadBalanceRoute,
    FailoverRecursive,
    combineMultiWANInterfaces,
    type MultiWANInterface,
} from "~/components/Star/ConfigGenerator";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";




export const PCC = ( interfaces: MultiWANInterface[], addressList: string, routingMark: string ): RouterConfig => {
    const linkCount = interfaces.length;
    const wanInterfaces = interfaces.map(iface => iface.name);

    // Generate mangle rules for PCC
    const mangleConfig = PCCMangle(linkCount, wanInterfaces, addressList, routingMark);

    // Generate routing rules for PCC
    const routeConfig = LoadBalanceRoute(interfaces, "PCC");

    // Merge configurations
    return mergeMultipleConfigs(mangleConfig, routeConfig);
};


export const NTH = ( interfaces: MultiWANInterface[], localNetwork: string, routingMark: string ): RouterConfig => {
    const linkCount = interfaces.length;
    const wanInterfaces = interfaces.map(iface => iface.name);

    // Generate mangle rules for NTH
    const mangleConfig = NTHMangle(linkCount, wanInterfaces, localNetwork, routingMark);

    // Generate routing rules for NTH
    const routeConfig = LoadBalanceRoute(interfaces, "NTH");

    // Merge configurations
    return mergeMultipleConfigs(mangleConfig, routeConfig);
};


export const MainTableRoute = ( vpnClient?: VPNClient, wanLinks?: WANLinks ): RouterConfig => {
    // Combine all interfaces in priority order: VPN -> Domestic -> Foreign
    const allInterfaces = combineMultiWANInterfaces(vpnClient, wanLinks);

    // If no interfaces available, return empty config
    if (allInterfaces.length === 0) {
        return {
            "/ip route": [],
        };
    }

    // Generate recursive failover routes for main table
    // Uses check-gateway=ping with recursive gateway checking
    return FailoverRecursive(allInterfaces, "main");
};










