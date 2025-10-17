import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { WANState, Networks, Subnets, LTE } from "~/components/Star/StarContext";
import { VPNClientWrapper } from "~/components/Star/ConfigGenerator";
import { generateWANLinksConfig } from "~/components/Star/ConfigGenerator";
import { MainTableRoute } from "~/components/Star/ConfigGenerator";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";
import { DNS } from "~/components/Star/ConfigGenerator";


export const WANCG = (WANState: WANState, networks: Networks, subnets?: Subnets, availableLTEInterfaces?: LTE[]): RouterConfig => {
    const { WANLink, VPNClient } = WANState;

    const configs: RouterConfig[] = [];

    // 1. Generate WAN Links Configuration (interfaces, connections, routes)
    configs.push(generateWANLinksConfig(WANLink, availableLTEInterfaces));

    // 2. Generate VPN Client Configuration (all VPN protocols)
    // Pass WANLink to calculate proper check IP offset
    if (VPNClient) {
        configs.push(VPNClientWrapper(VPNClient, WANLink));
    }

    // 3. Generate Main Table Routes (failover routing for all WAN links and VPN clients)
    configs.push(MainTableRoute(VPNClient, WANLink));

    // 4. Generate DNS Configuration (forwarders, mDNS, IRTLD, blocking, DOH)
    // Pass WANLink and VPNClient to ensure DNS forwarders use same CheckIPs as routing
    configs.push(DNS(networks, subnets, WANLink, VPNClient));

    return mergeMultipleConfigs(...configs);
};
