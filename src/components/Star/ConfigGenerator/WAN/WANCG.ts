import type { RouterConfig } from "../ConfigGenerator";
import type { WANState } from "../../StarContext/WANType";
import { VPNClientWrapper } from "./VPNClient/VPNClientCG";
import { generateWANLinksConfig } from "./WAN/WANInterface";
import { MainTableRoute } from "./MultiLink/MultiLink";
import { mergeMultipleConfigs } from "../utils/ConfigGeneratorUtil";


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
