import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { WANState } from "~/components/Star/StarContext";
import { VPNClientWrapper } from "~/components/Star/ConfigGenerator";
import { generateWANLinksConfig } from "~/components/Star/ConfigGenerator";
import { MainTableRoute } from "~/components/Star/ConfigGenerator";
import { mergeMultipleConfigs } from "~/components/Star/ConfigGenerator";


export const WANCG = (WANState: WANState): RouterConfig => {
    const { WANLink, VPNClient } = WANState;

    const configs: RouterConfig[] = [];

    // 1. Generate WAN Links Configuration (interfaces, connections, routes)
    configs.push(generateWANLinksConfig(WANLink));

    // 2. Generate VPN Client Configuration (all VPN protocols)
    if (VPNClient) {
        configs.push(VPNClientWrapper(VPNClient));
    }

    // 3. Generate Main Table Routes (failover routing for all WAN links and VPN clients)
    configs.push(MainTableRoute(VPNClient, WANLink));

    return mergeMultipleConfigs(...configs);
};
